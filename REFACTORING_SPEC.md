# Chat-GPT-Custom-Prompt-Extension 重構規格書

> **版本**: 2.0
> **日期**: 2026-02-27
> **目標**: 將 6753 行單一檔案重構為模組化架構，使用原生 JavaScript (ES Modules)，並精確還原現有邏輯。

---

## 目錄

1. [專案概述](#1-專案概述)
2. [UI 結構總覽](#2-ui-結構總覽)
3. [現有架構分析](#3-現有架構分析)
4. [重構目標架構](#4-重構目標架構)
5. [功能規格](#5-功能規格)
6. [資料結構規格](#6-資料結構規格)
7. [模組規格](#7-模組規格)
8. [UI 元件規格（Dialog 詳細規格）](#8-ui-元件規格dialog-詳細規格)
9. [平台適配器規格](#9-平台適配器規格)
10. [鍵盤快捷鍵規格](#10-鍵盤快捷鍵規格)
11. [拖放排序規格](#11-拖放排序規格)
12. [CSS 詳細規格](#12-css-詳細規格)
13. [重構執行計畫](#13-重構執行計畫)
14. [測試規格](#14-測試規格)
15. [Chrome Extension 載入與資源配置](#15-chrome-extension-載入與資源配置)

---

## 1. 專案概述

### 1.1 專案名稱
**ChatGPT 提問助手** (Chat-GPT Custom Prompt Extension)

### 1.2 專案類型
Chrome 瀏覽器擴充功能 (Manifest V3) — Content Script 注入型

### 1.3 核心功能
- **問題模板系統**：前綴/後綴包裝使用者輸入，支援快捷鍵 (mainKey + 1-5)，共 10 組模板。
- **快速回覆按鈕**：一鍵發送預設訊息，共 100 組，支援拖放排序。
- **超級模板系統**：支援動態表單欄位 `{{}}` 語法，自動生成輸入表單 (Text, Select, Checkbox, Radio)，30 分類 × 50 筆 = 1500 組。
- **設定匯入/匯出**：完整或部分設定的 JSON 匯入/匯出，支援恢復系統預設值。
- **對話下載為 HTML**：將當前對話匯出為 HTML 檔案（僅支援 ChatGPT）。
- **多國語系支援**：繁中、簡中、英、日、韓（自動偵測或手動設定）。
- **深色/淺色模式**：自動偵測平台主題並適配，亦可手動切換 (快捷鍵 mainKey+B)。
- **多平台支援**：支援 ChatGPT 及其他主流 AI 聊天平台。
- **廣告/推廣輪播**：在所有功能對話框底部顯示推廣連結。

### 1.4 支援平台
| 平台 | 判定關鍵字 (URL) | URL Match Patterns | 特殊功能 |
|------|------|------|----------|
| **ChatGPT** | `chatgpt.com`, `chat.openai.com` | `https://chatgpt.com/*`, `https://chat.openai.com/*` | 對話下載、左側選單整合 |
| **Google Gemini** | `gemini.google.com` | `https://gemini.google.com/app/*`, `/share/continue/*`, `/u/*`, `/app?*` | - |
| **Claude AI** | `claude.ai` | `https://claude.ai/*` | - |
| **Grok** | `grok.com` | `https://grok.com/*` | - |
| **Felo AI** | `felo.ai` | `https://felo.ai/*` | - |
| **Perplexity AI** | `perplexity.ai` | `https://www.perplexity.ai/*` | 需要特殊延遲載入 (500ms) |

**排除頁面**: `https://chat.openai.com/auth/login`, `https://claude.ai/login`

**平台偵測變數**:
```javascript
const supportOtherSite = !window.location.href.includes("chatgpt.com");
const supportGemini = window.location.href.includes("gemini.google.com");
const supportClaude = window.location.href.includes("claude.ai");
const supportGrok = window.location.href.includes("grok.com");
const supportFelo = window.location.href.includes("felo.ai");
const supportPerplexity = window.location.href.includes("perplexity.ai");
const supportChatGPT = !supportOtherSite && !supportClaude && !supportGrok && !supportFelo && !supportPerplexity;
```

### 1.5 支援語系
- 繁體中文 (zh_TW) - 預設 (若時區為 Asia/Taipei 或 navigator.language 包含 zh-TW)
- 簡體中文 (zh_CN)
- 英文 (en) - manifest default_locale
- 日文 (ja)
- 韓文 (ko)

**語系偵測邏輯**:
```javascript
const userLanguage = navigator.language || chrome.i18n.getUILanguage();
const isTW = Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Taipei"
             || userLanguage?.includes("zh-TW");
```

### 1.6 mainKey 平台差異
```javascript
// Mac: Control key (event.ctrlKey)
// 其他: Alt key (event.altKey)
const mainKey = navigator.platform.includes("Mac") ? "ctrlKey" : "altKey";
const mainKeyText = navigator.platform.includes("Mac") ? "Control" : "Alt";
```

---

## 2. UI 結構總覽

### 2.1 整體佈局

本擴充功能在 AI 聊天頁面注入兩個主要 UI 區域：

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  AI 聊天平台頁面 (ChatGPT / Gemini / Claude / Grok / Perplexity)          │
├────────────────┬────────────────────────────────────────┬───────────────────┤
│                │                                        │                   │
│   [左側選單]    │              [聊天區域]                 │   [右側浮動選單]   │
│ (僅 ChatGPT)   │                                        │  (.custom-menu)   │
│                │                                        │  ┌─────────────┐  │
│  ┌──────────┐  │                                        │  │  搜尋框     │  │
│  │ 用戶資訊  │  │                                        │  │  (input)    │  │
│  ├──────────┤  │                                        │  ├─────────────┤  │
│  │ 提問助手  │  │                                        │  │ 問題模板    │  │
│  │ 選單開關  │  │                                        │  │ (綠色按鈕)  │  │
│  ├──────────┤  │                                        │  ├─────────────┤  │
│  │ 多平台   │  │                                        │  │ 超級模板    │  │
│  │ 支援開關  │  │                                        │  │ (紫色按鈕)  │  │
│  ├──────────┤  │                                        │  ├─────────────┤  │
│  │ 相關設定  │──┼──► 展開子選單（向上展開）：              │  │ 快速回覆    │  │
│  │  ├ 提問樣板│  │      - 提問樣板設定 → #dialog2         │  │ (藍色按鈕)  │  │
│  │  ├ 快速回覆│  │      - 快速回覆設定 → #dialog4         │  ├─────────────┤  │
│  │  └ 匯入匯出│  │      - 匯入/匯出設定 → #dialog5        │  │ 📥 下載對話 │  │
│  ├──────────┤  │                                        │  │ (僅ChatGPT) │  │
│  │ 超級樣板  │──┼──► 展開分類選擇（向上展開）：            │  ├─────────────┤  │
│  │  ├ ✏️ 自定 │  │      - ✏️ 自定分類名稱 → #dialog8      │  │ Control+A   │  │
│  │  ├ 分類1  │  │      - 超級樣板 設定 → #dialog6         │  │ 收合按鈕    │  │
│  │  ├ 分類2  │  │      - 超級樣板2 設定 → #dialog6        │  └─────────────┘  │
│  │  └ ...×30 │  │      - ... (共 30 個分類)               │                   │
│  └──────────┘  │                                        │                   │
└────────────────┴────────────────────────────────────────┴───────────────────┘
```

### 2.2 左側選單注入項目（僅 ChatGPT）

**注入目標**: `nav.flex` 底部，使用 `insertBefore` 插入至 User Profile 區塊之前。

**MutationObserver 監聽** (`subscribeMutationObserver()`):
- 目標: `document.body`
- Config: `{ attributes: true, childList: true, subtree: true }`
- 防抖: `setTimeout` debounce (0ms)
- 觸發條件: `nav.flex` 存在且 `childNodes >= 2`
- 防重複: 檢查 `!document.getElementById("switchMenu")`

**4 個注入元件**:

1. **Help Menu Toggle** (`addCustomLeftMenuItem()`)
   - ID: `#switchMenu`
   - 功能: 控制右側選單顯示/隱藏
   - 元件: `.slide-checkbox` Toggle Switch
   - 儲存: `Custom.Settings.Menu.Hidden` = `"Y"` | `"N"`

2. **Enable Gemini Support Toggle** (`addCustomLeftMenuItem2()`)
   - ID: `#supportOtherSiteCheckbox`
   - 功能: 控制是否在非 ChatGPT 平台啟用外掛
   - 元件: `.slide-checkbox` Toggle Switch
   - 儲存: `Custom.EnableGeminiSupport`

3. **Settings Dropdown** (`addCustomLeftMenuItem3()`)
   - 類型: `.chatgpt-dropdown.chatgpt-dropdown-up` (向上展開)
   - 子項目:
     - 「提問樣板 設定」 → 開啟 `#dialog2`
     - 「快速回覆 設定」 → 開啟 `#dialog4`
     - 「匯入/匯出 設定」 → 開啟 `#dialog5`

4. **Super Prompt Dropdown** (`addCustomLeftMenuItem4()`)
   - 類型: `.chatgpt-dropdown.chatgpt-dropdown-up` (向上展開)
   - `.chatgpt-dropdown-content`: `max-height: 400px; overflow: auto`
   - 子項目:
     - 「✏️ 自定分類名稱」 → 開啟 `#dialog8`
     - 30 個分類項目 → 分別開啟 `#dialog6` (帶分類索引 1-30)
     - 每個分類項目圖示: 🆕（使用 emoji）+ 分類名稱

**左側項目 CSS class**:
```
.customMenuItem.flex.py-3.px-3.items-center.gap-3.rounded-md.custom-hover
.transition-colors.duration-200.text-black.dark:text-white.cursor-pointer.text-sm
```

**Dropdown 機制**:
- `.chatgpt-dropdown-content` 預設 `display: none`
- 點擊時加 `.show` class
- 全域 `click` 監聽 `handleDocumentClick()` 點擊外部時移除 `.show`
- `Esc` 鍵也移除 `.show`

### 2.3 右側浮動選單 (`.custom-menu`)

**CSS 基本樣式**:
```css
.custom-menu {
    position: fixed;
    top: 65px;
    right: 0;
    width: 155px;
    padding: 5px;
    border-radius: 10px;
    background: rgb(236, 236, 241);
    height: calc(90vh - 65px);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease-in-out;
}
```

**內部區域結構** (`generateButtons()` 函式):

```
.custom-menu
├── .search-box
│   └── input#customKeywordInput.custom-keyword-input
│       placeholder: "分類名稱 或 關鍵字..."
├── .prompt-list-area                    ← 可捲動區域
│   ├── button.success.custom-template-buttons     ← 問題模板 (綠色)
│   ├── button.success.custom-template-buttons     ← ... (最多 10 個)
│   ├── button.warning.custom-template-buttons     ← 超級模板 (紫色)
│   └── button.warning.custom-template-buttons     ← ... (最多 1500 個)
├── .quick-reply-area                    ← max-height: 380px, 可捲動
│   ├── button.info.custom-template-buttons        ← 快速回覆 (藍色)
│   └── button.info.custom-template-buttons        ← ... (最多 100 個)
└── .other-area
    ├── button.secondary.custom-template-buttons   ← 📥 下載當前對話 (僅 ChatGPT)
    └── button.light.custom-template-buttons.menu-collapse-button  ← Control+A 收合
```

**按鈕通用樣式** (`createButton()`):
```javascript
button.style.width = "100%";
button.style.margin = "0 0 5px 0";
button.style.padding = "3px 5px 3px 10px";
button.style.fontSize = "1rem";
button.style.borderRadius = "5px";
button.style.textAlign = "left";
button.style.whiteSpace = "nowrap";
button.style.overflow = "hidden";
button.style.textOverflow = "ellipsis";
```

**搜尋篩選邏輯**:
- 事件: `input` event with 300ms debounce
- 範圍: 僅篩選 `.prompt-list-area` 子按鈕 (問題模板 + 超級模板)
- 邏輯: `button.title.toLowerCase().includes(keyword.toLowerCase())`
- 快速回覆不受搜尋影響

**收合/展開**:
- 收合: `body.hidden-template-buttons` → `.custom-menu { transform: translateX(200px) }`
- 展開時移除 class
- 收合後在頁面右下角顯示 `.collapse-button` (fixed, bottom: 220px, right: 10px)
- 快捷鍵: `mainKey + A`

**層級控制**:
- ChatGPT: `z-index: 0`
- 其他平台: `z-index: 1`
- 非 ChatGPT 平台加 `body.supportOtherSite` class

### 2.4 Dialog 對照表

| Dialog ID | 用途 | max-width | footer 結構 |
|:---|:---|:---|:---|
| `#dialog` | 提問視窗 (Question Dialog) | 1106px | 編輯 + 送出 + 插入 Prompt + 取消 + 廣告 |
| `#dialog2` | 提問樣板設定 (Prompt Settings) | - | 儲存 + 取消 + 廣告 |
| `#dialog3` | 快捷鍵提示 (Shortcut Key Hint) | - | (僅顯示) |
| `#dialog4` | 快速回覆設定 (Quick Reply Settings) | - | 儲存 + 取消 + 廣告 |
| `#dialog5` | 匯入/匯出設定 (Import/Export) | - | 匯出 + 匯入按鈕 + 關閉 + 廣告 |
| `#dialog6` | 超級樣板設定 (Super Prompt Settings) | - | 匯出分類 + 匯入分類 + 全部顯隱 + 儲存 + 取消 + 廣告 |
| `#dialog7` | 超級樣板輸入 (Super Prompt Input) | 1106px | 編輯 + 送出 + 插入 Prompt + 取消 + 廣告 |
| `#dialog8` | 分類名稱設定 (Category Name Settings) | 1200px | 儲存 + 取消 + 廣告 |

**所有 Dialog 共通結構**:
```html
<div class="dialog-wrapper" id="dialogN" style="display:none">
  <div class="dialog" style="max-width: ...">
    <!-- 內容區 -->
    <div class="footer center">
      <!-- 操作按鈕 -->
      <div class="super-sun-o-pt"><!-- 廣告輪播區 --></div>
    </div>
  </div>
</div>
```

---

## 3. 現有架構分析

### 3.1 content.js 關鍵邏輯
-   **Entry Point**: `setTimeout` 包覆的主邏輯，Perplexity 延遲 500ms，其餘 0ms。
-   **Initialization**: `init()` 流程：隱藏所有 Dialog → 偵測佈景主題 → 載入 4 組資料 (prompt / quickReply / superPrompt / superPromptCategory) → 處理選單收合狀態。
-   **Data Sync**: `getData` 優先讀取 localStorage，若無則讀取 chrome.storage.local，並雙向同步。非 ChatGPT 平台使用 `getDataFromChromeStorage` 直接從 chrome.storage 讀取。
-   **Platform Adapters**: `chatInput()` 與 `sendButton()` 包含各平台選擇器。
-   **Super Prompt Parser**: Regex `/{{\s*([^}]*)\s*}}/g` 解析模板。
-   **UI Generation**: `createButton()` 動態生成按鈕，`generateButtons()` 組裝右側選單。
-   **Dialog 管理**: 8 個 Dialog，全部以 `display: none/flex` 控制顯隱。

### 3.2 Storage Keys 總覽

| Storage Key | 用途 | 資料筆數 |
|:---|:---|:---|
| `Custom.Settings.Prompt` | 提問樣板設定 | 10 筆 |
| `Custom.Settings.QuickReply` | 快速回覆設定 | 100 筆 |
| `Custom.Settings.SuperPrompt` | 超級樣板設定 | 1500 筆 (30×50) |
| `Custom.Settings.SuperPromptCategoryList` | 分類名稱 | 30 筆 |
| `Custom.Settings.Menu.Hidden` | 選單隱藏狀態 | `"Y"` / `"N"` |
| `Custom.EnableGeminiSupport` | 多平台支援開關 | boolean |

### 3.3 重要常數

```javascript
const QuickReplyMessageAllItems = 100;       // 快速回覆最大筆數
const SuperPromptSettingsListLength = 50;     // 每分類超級樣板筆數
const SuperPromptSettingsAllItems = 1500;     // 超級樣板總筆數 (30 × 50)
const SuperPromptCategoryListLimit = Array.from({ length: 30 });  // 30 分類
const SCROLL_SPEED = 2;                      // 拖曳自動捲動速度
const SCROLL_THRESHOLD = 50;                 // 拖曳自動捲動閾值
```

### 3.4 分類映射函式

```javascript
function findGroupAndIndex(promptId) {
    const group = Math.floor((promptId - 1) / 50) + 1;  // 分類編號 1-30
    const order = ((promptId - 1) % 50) + 1;            // 分類內序號 1-50
    return { group, order };
}
```

---

## 4. 重構目標架構

採用模組化 (ES Modules) 架構。

### 4.1 目錄結構

```
js/
├── loader.js              # Manifest Entry Point (Dynamic Import)
├── content.js             # Main Logic (Init, Global State)
│
├── config/
│   ├── constants.js       # 常數 (Limits, Keys)
│   └── selectors.js       # 集中管理 DOM Selectors
│
├── data/
│   ├── default_prompts.js
│   ├── default_quick_replies.js
│   └── default_super_prompts.js
│
├── core/
│   ├── state.js           # 狀態管理
│   ├── storage.js         # Data Access Layer (Local/Chrome Sync)
│   └── i18n.js            # i18n wrapper
│
├── platforms/
│   ├── base.js
│   ├── factory.js
│   ├── chatgpt.js
│   ├── gemini.js
│   ├── claude.js
│   ├── grok.js
│   ├── felo.js
│   └── perplexity.js
│
├── ui/
│   ├── menu.js            # 右側選單邏輯
│   ├── chatgpt_sidebar.js # 左側選單注入
│   ├── styles.js          # Dynamic CSS Injection
│   │
│   ├── dialogs/
│   │   ├── base_dialog.js
│   │   ├── question_dialog.js        # #dialog
│   │   ├── settings_dialog.js        # #dialog2
│   │   ├── shortcut_hint_dialog.js   # #dialog3
│   │   ├── quick_reply_dialog.js     # #dialog4
│   │   ├── export_import_dialog.js   # #dialog5
│   │   ├── super_prompt_settings.js  # #dialog6
│   │   ├── super_prompt_dialog.js    # #dialog7
│   │   └── category_name_dialog.js   # #dialog8
│   │
│   └── components/
│       ├── button.js
│       └── drag_drop_list.js
│
├── features/
│   ├── shortcuts.js       # Keyboard Event Listener
│   ├── chat_downloader.js # HTML Export
│   ├── theme_manager.js   # Dark/Light Mode
│   └── ads_rotator.js     # Bottom Ads Logic
│
└── utils/
    ├── dom.js
    └── helpers.js
```

---

## 5. 功能規格

### 5.1 核心功能行為

#### 5.1.1 問題模板 (Prompt Template)

-   **按鈕位置**: 右側選單 `.prompt-list-area`，綠色 (`success`)。
-   **按鈕數量**: 最多 10 個，由 `Custom.Settings.Prompt` 控制，僅 `isVisible: true` 的按鈕顯示。
-   **點擊流程**:
    1.  點擊按鈕 → 開啟 `#dialog` (Question Dialog)。
    2.  `#questionPreviewArea` 顯示預覽：前綴文字 + `{{ $input }}` + 後綴文字。
    3.  `#dialog-textarea` 聚焦等待輸入。
    4.  使用者輸入完畢後：
        - 按 `Enter` (非 Shift+Enter、非 IME composing) → `sendQuestionForm()` 送出。
        - 按 `mainKey+S` → 送出。
        - 按「送出」按鈕 → 送出。
        - 按「插入 Prompt」 → 僅插入到輸入框，不自動送出。
        - 按「編輯」 → 關閉 dialog，開啟 `#dialog2` 對應列的設定。
        - 按 `Esc` / 「取消」 → 關閉 dialog。
-   **發送邏輯**: `sendMessage(prefix + userInput + suffix)`

#### 5.1.2 快速回覆 (Quick Reply)

-   **按鈕位置**: 右側選單 `.quick-reply-area`，藍色 (`info`)。
-   **按鈕數量**: 最多 100 個，由 `Custom.Settings.QuickReply` 控制。
-   **點擊流程**: 點擊按鈕 → 直接呼叫 `sendMessage(quickReplyMessage)` → 送出訊息，**無對話框**。

#### 5.1.3 超級模板 (Super Prompt)

-   **按鈕位置**: 右側選單 `.prompt-list-area`，紫色 (`warning`)。
-   **按鈕數量**: 最多 1500 個 (30 分類 × 50 筆/分類)。
-   **按鈕 title 屬性**: 含分類名稱與按鈕名稱，用於搜尋篩選。
-   **點擊流程**:
    1.  點擊按鈕 → 開啟 `#dialog7` (Super Prompt Input Dialog)。
    2.  `#superPromptPreviewArea` 顯示模板預覽（保留原始 `{{ }}` 語法標記）。
    3.  `#superPromptTable` 動態產生表單欄位（詳見 §8.7）。
    4.  使用者填入資料後：
        - 「送出」 → 將表單值替換回模板，呼叫 `sendMessage()`。
        - 「插入 Prompt」 → 僅插入不送出。
        - 「編輯」 → 開啟 `#dialog6` 對應分類的設定。
        - 「取消」/ `Esc` → 關閉 dialog。
    5.  **特殊行為**: 若模板只有一個 `{{ }}` 欄位（單一 textarea），Enter 直接送出。

#### 5.1.4 設定管理

-   所有列表 (Prompt, QuickReply, SuperPrompt) 皆支援 **拖放排序 (Drag & Drop)**。
-   所有列表皆支援 **顯示/隱藏** Toggle 開關。
-   前 5 組 Prompt 有快捷鍵 (mainKey + 1-5)，第 6-10 組標記為 `none`。

#### 5.1.5 對話下載 (Chat Download) — 僅 ChatGPT

-   **按鈕**: 右側選單底部 `.other-area`，棕色 (`secondary`)。
-   **流程**:
    1.  展開所有折疊內容 (「顯示更多」/「Show more」)。
    2.  找到對話容器: `main [role="presentation"]` 或 `main`。
    3.  Clone DOM → 移除互動 UI (保留 ChatGPT 警語「ChatGPT 可能會出錯」)。
    4.  Avatar 替換: User → "U" 藍色圓形 (`#5A7DAB`)、Assistant → "A" 綠色圓形 (`#10a37f`)。
    5.  所有圖片轉 base64 (blob: 類型圖片直接移除)。
    6.  收集同源 CSS + 注入強制寬版樣式 (98% width)。
    7.  組裝完整 HTML 後以 Blob 下載。
    8.  檔名: `document.title.replace(/[\\/:*?"<>|]/g, "_") + ".html"`。

### 5.2 資料儲存策略
-   **混合儲存**: 同時寫入 `localStorage` 和 `chrome.storage.local`。
-   **讀取優先級**:
    -   ChatGPT 平台: `localStorage` > `chrome.storage.local` > 預設值。
    -   非 ChatGPT 平台: 直接從 `chrome.storage.local` 讀取 > 預設值。
-   **同步**: 讀取時若缺漏則補齊，寫入時雙寫。

### 5.3 廣告輪播 (Ads Rotator)

-   **位置**: 所有 Dialog `.footer` 內的 `.super-sun-o-pt` 容器（**右下角**）。
-   **輪播項目**:
    -   `defaultPtItem`: Buy Me a Coffee 圖片按鈕 (帶時間戳防快取)。
    -   `promptPacksItem`: `📚 Prompt Packs` 連結。
    -   `newPtLists` (僅 `isTW` 時): LINE 貼圖連結陣列 (柴柴系列)。
-   **輪播邏輯**:
    -   初始延遲: `setTimeout(200ms)` 後首次渲染。
    -   輪播間隔: `setInterval(8000ms)`。
    -   首次 (`currentLoopCount === 1`): 強制顯示 Buy Me a Coffee。
    -   後續: 隨機選取，但避免連續相同 (`preRandomIndex` 檢查，相同則遞迴重選)。
    -   非台灣使用者: 僅在 Buy Me a Coffee 與 Prompt Packs 兩項間隨機 (`Math.random() < 0.5 ? 0 : 1`)。
-   **渲染**: `document.querySelectorAll('.super-sun-o-pt')` 統一更新所有 Dialog 底部內容。

---

## 6. 資料結構規格

### 6.1 Prompt Object (問題模板)
```javascript
{
  key: string,        // "1"-"5" (有快捷鍵) 或 "none" (無快捷鍵)
  text: string,       // 按鈕顯示文字，如 "自由提問"、"英文解釋"
  prefix: string,     // 前綴文字
  suffix: string,     // 後綴文字
  isVisible: boolean, // 是否顯示於右側選單
  // Runtime properties (不儲存至 JSON):
  buttonElement: null,    // HTMLElement 參考
  handleClickFn: null     // click handler 參考
}
```
**固定筆數**: 10 筆。第 1-5 筆 key = "1"-"5"，第 6-10 筆 key = "none"。

### 6.2 Quick Reply Object (快速回覆)
```javascript
{
  key: string,              // 保留欄位 (如 "Y", "U")，目前無實際快捷鍵
  text: string,             // 按鈕文字，如 "給完整程式碼"、"繼續"
  quickReplyMessage: string, // 發送內容，如 "給完整程式碼"、"請繼續"
  isVisible: boolean,
  // Runtime properties:
  buttonElement: null,
  handleClickFn: null
}
```
**固定筆數**: 100 筆 (`QuickReplyMessageAllItems`)。

### 6.3 Super Prompt Object (超級模板)
```javascript
{
  key: number,        // 流水號 1-1500
  text: string,       // 按鈕文字
  prompt: string,     // 模板內容 (含 {{}} 語法)
  isVisible: boolean,
  // Runtime properties:
  buttonElement: null,
  handleClickFn: null
}
```
**固定筆數**: 1500 筆 (`SuperPromptSettingsAllItems`)。

### 6.4 Super Prompt Category Object (分類名稱)
```javascript
{
  id: number,     // 1-30
  name: string    // 分類顯示名稱
}
```
**固定筆數**: 30 筆。

### 6.5 Import/Export JSON Schema
```javascript
{
  "settings": {
    "prompt": [ /* 10 Prompt Objects */ ],
    "quickReply": [ /* 100 Quick Reply Objects */ ],
    "superPrompt": [ /* 1500 Super Prompt Objects */ ],
    "superPromptCategoryList": [ /* 30 Category Objects { id, name } */ ],
    "isHiddenMenu": "Y" | "N"
  }
}
```

---

## 7. 模組規格

### 7.1 config/constants.js
**功能概述**: 集中管理全域常數。
```javascript
export const QuickReplyMessageAllItems = 100;
export const SuperPromptSettingsListLength = 50;
export const SuperPromptSettingsAllItems = 1500;
export const SuperPromptCategoryListLimit = 30;
export const SCROLL_SPEED = 2;
export const SCROLL_THRESHOLD = 50;
```

### 7.2 core/storage.js
**功能概述**: 負責資料存取層，封裝 `localStorage` 與 `chrome.storage.local` 的雙向同步邏輯。

**關鍵函式**:
- `getData(storageKey, defaultValue)`: ChatGPT 平台用，localStorage 優先。
- `getDataFromChromeStorage(storageKey, defaultValue)`: 非 ChatGPT 平台用，直接 chrome.storage。
- `saveData(storageKey, value)`: 雙寫 localStorage + chrome.storage。
- `updateChromeStorage()`: 將 localStorage 同步到 chrome.storage。

### 7.3 core/i18n.js
**功能概述**: 封裝 `chrome.i18n.getMessage`，提供錯誤處理與 Fallback。
```javascript
export const i18n = (key, params = []) => {
  try { return chrome.i18n.getMessage(key, params); }
  catch (error) { console.log("i18n", error); return ""; }
};
export const getUILanguage = () => {
  try { return chrome.i18n.getUILanguage(); }
  catch (error) { return "en-US"; }
};
```

### 7.4 UI 注入模組

#### 7.4.1 右側浮動選單 (`ui/menu.js`)

**DOM 注入規格**:
-   **目標容器**: `document.body`。
-   **注入方式**: `document.body.appendChild(menuDiv)`。
-   **初始化時機**: 在 `init()` 流程中執行。
-   **非 ChatGPT 平台**: 初始 `visibility: hidden`，待 `Custom.EnableGeminiSupport` = `true` 後顯示。

**關鍵函式**:
- `generateButtons()`: 完整重建右側選單所有按鈕。
- `createButton(textContent, btnColorClass, title, isCollapseButton)`: 建立單一按鈕。
- `collapseToggle()`: 切換選單收合/展開。
- `controlCustomMenuTabindex()`: 管理選單 tabindex。

#### 7.4.2 ChatGPT 左側選單注入 (`ui/chatgpt_sidebar.js`)

**DOM 注入規格**:
-   **監聽機制**: MutationObserver + debounce (見 §2.2)。
-   **定位邏輯**:
    1.  `const navElement = document.querySelector("nav.flex")`
    2.  `const navContainer = navElement.lastChild`
    3.  `const referenceNode = navContainer.children[navContainer.children.length - 1]`
-   **防呆**: `!document.getElementById("switchMenu")` 檢查避免重複注入。
-   **MutationObserver 額外功能**: 監聽 dialog `.dialog-wrapper` 的 display 變化，開啟時禁用選單 tabindex、關閉時恢復。

### 7.5 platforms/* (平台適配器)

需實作 `getChatInput()`, `getSendButton()`, `sendMessage(msg, isInsert)`。

**`sendMessage()` 通用流程**:
1. 檢查是否正在生成回覆 (找「Stop generating」按鈕)，若是先點擊停止。
2. ChatGPT: 先設 `chatInput().textContent = "-"` 佔位。
3. `setTimeout` 內依各平台邏輯插入訊息。
4. 若 `isInsert = true` 則返回 (僅插入不送出)。
5. 點擊送出按鈕 (`isGenerating` 時延遲 500ms，否則 100ms)。

#### 7.5.1 ChatGPT (`chatgpt.js`)
-   **Input**: `#prompt-textarea`
-   **Send**: `button[data-testid="send-button"]`
-   **Insert**: 清空子節點，逐行建立 `<p>` 插入 (以 `\n` 分割)。

#### 7.5.2 Gemini (`gemini.js`)
-   **Input**: `rich-textarea` (取其第一個子 div)
-   **Send**: `.send-button-container button`
-   **Insert**: `input.textContent = msg` + `focus()`。

#### 7.5.3 Claude (`claude.js`)
-   **Input**: `div[contenteditable="true"]`
-   **Send**: `button[aria-label="Send Message"]`
-   **Insert**: Split by `\n`, append `<p>` elements。

#### 7.5.4 Grok (`grok.js`)
-   **Input**: `form textarea` 或 `div[contenteditable="true"]`
-   **Send**: `form button[type="submit"]`
-   **Insert**: textarea → `value=msg` + dispatch `input` event; contenteditable → `<p>` 逐行。

#### 7.5.5 Felo (`felo.js`)
-   **Input**: `form textarea`
-   **Send**: `form [type=submit]` 或 `button.rounded-3xl`
-   **Insert**: `value=msg` + dispatch `input` event。

#### 7.5.6 Perplexity (`perplexity.js`)
-   **Input**: `#ask-input`
-   **Send**: `[data-testid="submit-button"]`
-   **Insert**:
    -   Textarea: `value=msg` + dispatch event。
    -   ContentEditable: **Critical Strategy**
        1.  `focus()`
        2.  `window.getSelection().removeAllRanges()`
        3.  `range.selectNodeContents(editable)`
        4.  `document.execCommand('insertText', false, message)`

### 7.6 features/theme_manager.js (主題管理)

**`darkModeToggle()` 邏輯**:
- 讀/寫 `localStorage("theme")`
- 切換 `document.documentElement` 的 class: `.dark` / `.light`
- 設定 `colorScheme` style: `"dark"` 或 `"light"`

**各平台主題偵測**:
| 平台 | 偵測方式 |
|:---|:---|
| ChatGPT | `document.documentElement.classList.contains("dark")` |
| Gemini | `document.body.classList.contains("dark-theme")` |
| Claude | `document.documentElement.getAttribute('data-mode') === 'dark'` |
| Perplexity | `document.documentElement.dataset.colorScheme === 'dark'` |

### 7.7 features/ads_rotator.js (廣告/推廣連結輪播)

**廣告項目資料**:
```javascript
const newPtLists = [
  { id: "line-button", url: "https://store.line.me/stickershop/product/30609835/zh-Hant", label: "柴柴貼圖 - 實用篇" },
  { id: "line-button", url: "https://store.line.me/stickershop/product/30599810/zh-Hant", label: "柴柴貼圖 - 失戀篇" },
  { id: "line-button", url: "https://store.line.me/stickershop/product/30598858/zh-Hant", label: "柴柴貼圖 - 工程師" },
  { id: "line-button", url: "https://store.line.me/stickershop/product/30598985/zh-Hant", label: "柴柴貼圖 - 暈船仔" },
  { id: "line-button", url: "https://store.line.me/stickershop/product/30599712/zh-Hant", label: "柴柴貼圖 - 熱戀篇" },
  { id: "line-button", url: "https://store.line.me/stickershop/product/30599606/zh-Hant", label: "柴柴貼圖 - 日常篇" },
  { id: "line-button", url: "https://store.line.me/stickershop/author/5375229/zh-Hant", label: "非柴柴本人貼圖" },
  { id: "line-button", url: "https://store.line.me/stickershop/product/30672796/zh-Hant", label: "柴柴貼圖 - 精選01" },
];

const defaultPtItem = `<a href="https://www.buymeacoffee.com/Joe.lin" target="_blank">
  <img style="scale: 0.9;" src="https://img.buymeacoffee.com/button-api/..." />
</a>`;

const promptPacksItem = `<a id="prompt-packs-button"
  href="https://jiahongl.github.io/prompt-packs" target="_blank">
  📚 Prompt Packs
</a>`;
```

---

## 8. UI 元件規格（Dialog 詳細規格）

### 8.1 提問視窗 — Question Dialog (`#dialog`)

**用途**: 使用者點擊問題模板按鈕後的輸入與送出介面。

**UI 截圖參照**: 顯示前綴 + `{{ $input }}` + 後綴的預覽區，下方大型 textarea，底部 4 個操作按鈕 + 廣告輪播。

```
┌──────────────────────────────────────────────────────────┐
│  {{ $input }}，請使用繁體中文回答。          ← 預覽區域   │  ← #questionPreviewArea
│                                                          │     max-height: 200px
│                                                          │     overflow: auto
│                                                          │     font-size: 18px
├──────────────────────────────────────────────────────────┤
│                                                          │
│  請輸入問題，Shift+Enter 為換行，                         │  ← #dialog-textarea
│  輸入完成後，按下 Enter 即可送出。                         │     .question-textarea
│                                                          │     height: 427px
│                                                          │     font-size: 18px
│                                                          │
├──────────────────────────────────────────────────────────┤
│  [編輯]  [送出(mainKey+s)]  [插入 Prompt]  [取消(esc)]   │  ← .footer.center
│                                        [廣告輪播區]       │  ← .super-sun-o-pt
└──────────────────────────────────────────────────────────┘
```

**按鈕規格**:
| 按鈕 | ID | CSS Class | 快捷鍵 | 備註 |
|:---|:---|:---|:---|:---|
| 編輯 | `#dialog-edit` | `.info` (藍) | - | 非 ChatGPT 時 `hidden` |
| 送出 | `#dialog-ok` | `.primary` (棕) | `mainKey+S` 或 `Enter` | - |
| 插入 Prompt | `#dialog-insert` | `.primary` | - | `sendQuestionForm(true)` |
| 取消 | `#dialog-cancel` | `.secondary` | `Esc` | - |

**事件處理**:
- `Enter` (非 Shift、非 IME composing) → `sendQuestionForm()`
- `mainKey+S` → `sendQuestionForm()`
- `Esc` → 關閉 dialog
- `Tab` / `Shift+Tab` → 在 dialog 內循環焦點 (`handleTabindex()`)
- 「編輯」按鈕 → 關閉 dialog 並 `showSettingsDialog(questionId - 1)` 開啟 #dialog2

**顯示邏輯** (`showQuestionDialog()`):
1. 設定預覽區域: `prefix {{ $input }} suffix` (用 `white-space: pre-wrap` 顯示)
2. 清空 textarea 並 focus

### 8.2 提問樣板設定 — Settings Dialog (`#dialog2`)

**用途**: 管理 10 組問題模板的名稱、前/後綴文字與顯示狀態。

**HTML 變數**: `formDialogHTML`。

**UI 截圖參照**: 5 欄表格（組合鍵、按鈕名稱、前段文字、後段文字、是否顯示），共 10 列。

```
┌────────┬──────────┬────────────────┬────────────────┬─────────┐
│ 組合鍵  │ 按鈕名稱  │    前段文字     │    後段文字     │ 是否顯示 │
│ (118px) │ (160px)  │   (auto flex)  │   (auto flex)  │ (118px) │
├────────┼──────────┼────────────────┼────────────────┼─────────┤
│Ctrl + 1│ [自由提問]│ [             ]│ [，請使用繁體  ]│ [ON ●]  │  ← row 1
│Ctrl + 2│ [英文解釋]│ [你現在是...   ]│ []，拼音...   ]│ [ON ●]  │  ← row 2
│Ctrl + 3│ [多國語系]│ [你現在是...   ]│ []的繁體...   ]│ [ON ●]  │  ← row 3
│Ctrl + 4│ [程式問題]│ [你現在是...   ]│ [，請使用...  ]│ [● OFF] │  ← row 4
│Ctrl + 5│ [CSS範例 ]│ [你現在是...   ]│ [，請使用...  ]│ [● OFF] │  ← row 5
│  none  │ [整理重點]│ [你現在是...   ]│ [，請使用...  ]│ [ON ●]  │  ← row 6
│  none  │ [研究報告]│ [寫一篇有關... ]│ [的300字...   ]│ [ON ●]  │  ← row 7
│  none  │ [      ] │ [             ]│ [             ]│ [● OFF] │  ← row 8
│  none  │ [      ] │ [             ]│ [             ]│ [● OFF] │  ← row 9
│  none  │ [      ] │ [             ]│ [             ]│ [● OFF] │  ← row 10
├────────┴──────────┴────────────────┴────────────────┴─────────┤
│        [儲存(control+s)]   [取消(esc)]          [廣告輪播]     │
└──────────────────────────────────────────────────────────────┘
```

**表格結構**: `.my-table.scroll-table-form`，ID `#table-form`

**DOM 元素引用**:
- `settingsDialog` = `document.getElementById("dialog2")`
- `settingsDialogOkBtn` = `#dialog2-ok`
- `settingsDialogCancelBtn` = `#dialog2-cancel`
- `settingsTableForm` = `#table-form`

**欄位 CSS class**:
| 欄位 | 元素類型 | CSS Class | 備註 |
|:---|:---|:---|:---|
| 組合鍵 | `<span>` | - | 固定顯示文字 (不可編輯) |
| 按鈕名稱 | `<input type="text">` | `.btnTextInput` | - |
| 前段文字 | `<textarea>` | `.prefixInput` | - |
| 後段文字 | `<textarea>` | `.suffixInput` | - |
| 是否顯示 | `<input type="checkbox">` | `.promptSlide` | `.slide-checkbox` toggle |

**Toggle Switch 獨立 ID**: `slideCheckbox`, `slideCheckbox2` ... `slideCheckbox10`

**儲存邏輯** (`saveSittings()`):
1. 讀取所有 `.btnTextInput`, `.prefixInput`, `.suffixInput`, `.promptSlide` 的值
2. 更新 `promptList[]` 陣列
3. 儲存至 `localStorage("Custom.Settings.Prompt")` + `updateChromeStorage()`
4. 呼叫 `generateButtons()` 重新產生右側按鈕

**鍵盤**: `Esc` 關閉、`mainKey+S` 儲存

### 8.3 快捷鍵提示 — Shortcut Key Hint Dialog (`#dialog3`)

**用途**: 按住 `mainKey+Z` 時顯示所有快捷鍵對照表。

**行為**: `keydown` 時顯示、`keyup` 時隱藏（非 toggle，是按住顯示）。

**顯示內容**: 所有快捷鍵配對表，包含:
- Prompt 1-10 的按鈕名稱（從 `promptList` 讀取）
- Quick Reply 1-5 的按鈕名稱（從 `quickReplyMessageList` 讀取）
- 功能鍵 Z/A/B/W/E/G/N/M/C/X/R/S 等

### 8.4 快速回覆設定 — Quick Reply Settings Dialog (`#dialog4`)

**用途**: 管理 100 組快速回覆的名稱、訊息內容、顯示狀態與排序。

**HTML 變數**: `quickReplyHTML`。

**UI 截圖參照**: 4 欄表格（按鈕名稱、快速回覆的訊息、是否顯示、拖曳手柄 ☰），共 100 列。

```
┌──────────┬──────────────────────────┬─────────┬────┐
│ 按鈕名稱  │     快速回覆的訊息         │ 是否顯示 │ ☰  │
│ (160px)  │       (auto flex)        │ (118px) │(40)│
├──────────┼──────────────────────────┼─────────┼────┤
│[給完整   ]│[給完整程式碼             ]│ [ON ●]  │ ☰  │
│[程式碼   ]│                          │         │    │
├──────────┼──────────────────────────┼─────────┼────┤
│[繼續     ]│[請繼續                   ]│ [ON ●]  │ ☰  │
├──────────┼──────────────────────────┼─────────┼────┤
│[提供其它 ]│[請提供其它範例            ]│ [ON ●]  │ ☰  │
│[範例     ]│                          │         │    │
├──────────┼──────────────────────────┼─────────┼────┤
│[更詳細的 ]│[請提供更細節的說明        ]│ [ON ●]  │ ☰  │
│[說明     ]│                          │         │    │
├──────────┴──────────────────────────┴─────────┴────┤
│ ... (共 100 列，用 Array.from({ length: 100 }) 動態產生) │
├─────────────────────────────────────────────────────┤
│       [儲存(control+s)]   [取消(esc)]     [廣告]     │
└─────────────────────────────────────────────────────┘
```

**DOM 元素引用**:
- `quickReplySettingsDialog` = `document.getElementById("dialog4")`
- `quickReplySettingsDialogOkBtn` = `#dialog4-ok`
- `quickReplySettingsDialogCancelBtn` = `#dialog4-cancel`

**結構**: 外層 `.table-container` 內 `#quickReplyFormContainer`

**欄位 CSS class**:
| 欄位 | 元素類型 | CSS Class |
|:---|:---|:---|
| 按鈕名稱 | `<input type="text">` | `.quickReplyButtonText` |
| 快速回覆訊息 | `<textarea>` | `.quickReplyMessage` |
| 是否顯示 | `<input type="checkbox">` | `.quickReplySlide` |
| 拖曳手柄 | `<button>` | `.drag-btn` (顯示 `☰`，font-size: 1.5rem) |

**Toggle ID 格式**: `slideCheckboxReplayMessage{index}` (index 從 1 開始)

**每列**: `<tr class="customDragItem" draggable="false">`（拖曳時才啟用 draggable）

**儲存**: `localStorage("Custom.Settings.QuickReply")` + `updateChromeStorage()`

### 8.5 匯入/匯出設定 — Export Import Dialog (`#dialog5`)

**用途**: 匯出/匯入完整或部分設定檔，以及恢復系統預設值。

**HTML 變數**: `exportAndImportHTML`。

```
┌────────────────────────────────────────────────────────────┐
│                    匯出 與 匯入 設定檔                       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  [匯出]  [匯入全部]  [只匯入問題樣板]  [只匯入超級樣板]      │
│  (綠)    (紫)       (紫)            (紫)                   │
│                                                            │
│  [只匯入快速回覆]   [恢復系統預設值]                          │
│  (紫)              (藍)                                    │
│                                                            │
├────────────────────────────────────────────────────────────┤
│              [關閉(esc)]                      [廣告輪播]    │
└────────────────────────────────────────────────────────────┘
```

**DOM 元素引用**:
- `exportAndImportDialog` = `document.getElementById("dialog5")`
- `exportSettingsBtn` = `#export`
- `importAllBtn` = `#importAll`
- `importOnlyPromptBtn` = `#importPrompt`
- `importOnlySuperPromptBtn` = `#importSuperPrompt`
- `importOnlyQuickReplyBtn` = `#importQuickReply`
- `resetSettingBtn` = `#resetSetting`
- `exportAndImportDialogCancelBtn` = `#dialog5-cancel`
- `importFileInput` = `#importFileInput`

**按鈕規格**:
| 按鈕 | ID | CSS Class | importType |
|:---|:---|:---|:---|
| 匯出 | `#export` | `.success` (綠) | - |
| 匯入全部 | `#importAll` | `.warning` (紫) | `0` |
| 只匯入問題樣板 | `#importPrompt` | `.warning` (紫) | `1` |
| 只匯入超級樣板 | `#importSuperPrompt` | `.warning` (紫) | `3` |
| 只匯入快速回覆 | `#importQuickReply` | `.warning` (紫) | `2` |
| 恢復系統預設值 | `#resetSetting` | `.info` (藍) | - |
| 關閉 | `#dialog5-cancel` | `.secondary` | - |

**隱藏檔案輸入**: `<input type="file" id="importFileInput" accept="application/json" style="display:none">`

**匯出邏輯**:
- JSON 結構: `{ settings: { prompt, quickReply, isHiddenMenu, superPrompt, superPromptCategoryList } }`
- 檔名: 使用 i18n `export_file_name` 含時間戳 (年月日時分秒)

**匯入邏輯** (`handleFileLoad()`):
1. 觸發隱藏的 file input
2. `checkFileContent()` 驗證 JSON 結構完整性
3. `confirm()` 確認視窗
4. 根據 `importType` 覆蓋對應資料
5. 儲存至 localStorage + `generateButtons()` 重新產生按鈕

**恢復預設**: `confirm()` 確認後重置所有 4 個 storage key 為預設值。

### 8.6 超級樣板設定 — Super Prompt Settings Dialog (`#dialog6`)

**用途**: 管理某個分類下的 50 組超級模板。

**UI 截圖參照**: 5 欄表格（#、按鈕名稱、超級樣板文字、是否顯示、拖曳手柄），共 50 列。

```
┌─────┬──────────┬──────────────────────┬─────────┬────┐
│  #  │ 按鈕名稱  │   超級樣板內容         │ 是否顯示 │ ☰  │
│(50) │ (180px)  │    (auto flex)       │ (118px) │(40)│
├─────┼──────────┼──────────────────────┼─────────┼────┤
│  1  │ [貼圖規範]│ [🔵 角色柴柴設定...  ]│ [ON ●]  │ ☰  │
│  2  │ [script ]│ [...               ]│ [ON ●]  │ ☰  │
│ ... │ [       ]│ [                  ]│ [● OFF] │ ☰  │
│ 50  │ [       ]│ [                  ]│ [● OFF] │ ☰  │
├─────┴──────────┴──────────────────────┴─────────┴────┤
│ [匯出分類(藍)] [匯入分類(綠)] [全部顯示/隱藏(紫)]       │
│              [儲存(control+s)]  [取消(esc)]    [廣告]   │
└──────────────────────────────────────────────────────┘
```

**DOM 元素引用**:
- `superPromptSettingsDialog` = `document.getElementById("dialog6")`
- `superPromptSettingsDialogOkBtn` = `#dialog6-ok`
- `superPromptSettingsDialogCancelBtn` = `#dialog6-cancel`

**結構**: 外層 `.table-container` 內 `#superTableFormContainer` → `<table id="superTableForm">`

**欄位 CSS class**:
| 欄位 | 元素類型 | CSS Class |
|:---|:---|:---|
| `#` 編號 | `<span>` | `.superPromptId` |
| 按鈕名稱 | `<input type="text">` | `.superPromptButtonText` |
| 超級樣板文字 | `<textarea>` | `.superPromptText` (含展開 SVG icon) |
| 是否顯示 | `<input type="checkbox">` | `.superPromptSlide` |
| 拖曳手柄 | `<button>` | `.drag-btn` |

**Footer 特殊按鈕**:
- 匯出分類: `.info` (藍) — 匯出當前分類的 50 筆
- 匯入分類: `.success` (綠) — 匯入 JSON 覆蓋當前分類
- 全部顯示/隱藏: `.warning` (紫) — Toggle 全部 toggle 開關

**分類系統**: 開啟時帶入分類索引 (1-30)，使用 `findGroupAndIndex()` 計算對應的 prompt ID 範圍。

### 8.7 超級樣板輸入 — Super Prompt Input Dialog (`#dialog7`)

**用途**: 顯示超級模板的動態表單，使用者填入資料後送出。

**HTML 變數**: `superPromptHTML`。

**UI 截圖參照**: 上方預覽區（顯示模板原始內容含 `{{ }}` 標記）、中間動態表單欄位（根據 `{{ }}` 語法生成 textarea / select / checkbox / radio）、下方操作按鈕。

```
┌──────────────────────────────────────────────────────────┐
│  #1 貼圖規範                                ← 標題       │
│  🔵 角色柴柴設定（最新標準）                               │  ← #superPromptPreviewArea
│  外型：橘黃柴柴（標準台灣柴犬色）、奶油白肚子                │     .super-prompt-preview-area
│                                                          │     max-height: 165px
│  穿著：{{ 穿著 || 不穿衣服（不得穿帽T或任何服裝） }}        │     overflow: auto
├──────────────────────────────────────────────────────────┤
│  穿著                                        ← 欄位標籤   │
│  ┌──────────────────────────────────────────┐            │  ← #superPromptTable
│  │ 不穿衣服（不得穿帽T或任何服裝）            │            │     .my-table.super-prompt-table
│  └──────────────────────────────────────────┘            │     .super-prompt-table-wrapper
│  配件                                        ← 欄位標籤   │     max-height: 500px
│  ┌──────────────────────────────────────────┐            │
│  │ 不能戴眼鏡、不能隨意加帽子、圍巾等配件    │            │
│  └──────────────────────────────────────────┘            │
├──────────────────────────────────────────────────────────┤
│  [編輯]  [送出(control+s)]  [插入 Prompt]  [取消(esc)]   │
│                                        [Buy me a coffee] │
└──────────────────────────────────────────────────────────┘
```

**`{{ }}` 語法解析引擎** (`showSuperPromptDialog()`):

**正規表達式**: `/{{\s*([^}]*)\s*}}/g`

**語法格式**: `{{ fieldName || fieldValue || fieldType || defaultValue }}`，以 `||` 分隔。

**5 種欄位類型與對應截圖**:

| 語法 | 類型 | 產生的 HTML | 行為 |
|:---|:---|:---|:---|
| `{{}}` | text | `<textarea rows="3">` 無標籤 | placeholder 顯示 Tab/Shift+Tab 提示 |
| `{{ 穿著 }}` | text | `<label>穿著</label>` + `<textarea rows="3">` | 帶標籤的輸入框 |
| `{{ 穿著 \|\| 不穿衣服 }}` | text | `<textarea rows="3">不穿衣服</textarea>` | 帶預設值的輸入框 |
| `{{ 風格 \|\| 可愛,寫實,手繪 \|\| s }}` | select | `<select>` + 逗號分隔產生 `<option>` | 預設選第一項 (截圖中可見下拉展開) |
| `{{ 配件 \|\| 帽子,圍巾,眼鏡 \|\| c \|\| 圍巾,眼鏡 }}` | checkbox | 多個 `<input type="checkbox">` | 預設勾選指定項 (截圖中可見 ☑ 標記) |
| `{{ 表情 \|\| 開心,難過,生氣 \|\| r \|\| 生氣 }}` | radio | 多個 `<input type="radio">` | 預設選中指定項 (截圖中可見 ◉ 標記) |

**各欄位類型詳細生成規格**:

1. **Text (預設，`t` 或未指定)**:
   - `<textarea class="super-prompt-text superPromptText" rows="3">`
   - placeholder: `i18n("placeholder_prompt_input_tips")` (「按下 tab 可移動到下一格，按下 shift + tab 可移動回上一格。」)
   - 有預設值時填入 `textarea.value`

2. **Select (`s`)**:
   - fieldValue 用逗號分隔，每個值 `.trim()` 後建立 `<option>`
   - 第一個 option 為預設選取

3. **Checkbox (`c`)**:
   - fieldValue 用逗號分隔，建立多個 `<input type="checkbox">`
   - `name` 格式: `${fieldName}___custom___checkbox___${index}`
   - defaultValue 用逗號分隔後 `.trim()` 比對，匹配的設為 `checked`
   - 截圖中可見：☐ 選項一 ☐ 選項二 ☑ 選項三 ☐ 選項四 ☑ 選項五 ☐ 選項六

4. **Radio (`r`)**:
   - fieldValue 用逗號分隔，建立多個 `<input type="radio">`
   - `name` 格式: `${fieldName}___custom___radio___${index}`
   - defaultValue `.trim()` 後比對，匹配的設為 `checked`
   - 截圖中可見：○ 選項一 ○ 選項二 ○ 選項三 ○ 選項四 ○ 選項五 ◉ 選項六

**解析流程**:
1. Match `/{{\s*([^}]*)\s*}}/g` 收集所有 matches
2. 去除重複 (`uniqueMatches`)，但 `{{}}` (空白欄位) 永遠視為獨立
3. 遍歷 uniqueMatches，以 `string.slice(2, -2).split("||")` 拆分出 fieldName / fieldValue / fieldType / defaultValue
4. 根據 fieldType 產生對應 HTML

**送出邏輯** (`sendSuperPrompt()`):
1. 重新用 regex 配對所有 `{{ }}` 變數
2. 遍歷 DOM 中的表單元素:
   - **Checkbox**: 收集所有 checked 的 value，用逗號串接。使用 `checkboxSet` (Set) 記錄已處理的 group name 避免重複。
   - **Radio**: 取 checked 的 value。使用 `radioSet` (Set) 記錄。
   - **其他** (textarea/select): 直接取 `.value`
3. 替換: `message.replace(new RegExp(escapeRegExp(match), "g"), finalValue)`
4. `{{}}` (空白欄位) 使用 non-global replace (一次只替一個)
5. 呼叫 `sendMessage(message)`

**單一欄位特殊行為**: 若模板只有一個 textarea 欄位：
- textarea height 變為 380px
- Enter 直接送出 (同 Question Dialog 行為)

### 8.8 分類名稱設定 — Category Name Dialog (`#dialog8`)

**用途**: 管理 30 個超級樣板分類的名稱。

**HTML 變數**: `superPromptCategoryNameSettingHTML`。

```
┌──────────────────────────────────────────────────────────┐
│                    自定分類名稱                            │
├──────────────────────────────────────────────────────────┤
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
│  │ 貼圖規範│  │ script │  │ 修飾句子│  │ GPTs   │  │ 命名推薦│
│  └────────┘  └────────┘  └────────┘  └────────┘  └────────┘
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
│  │ 程式碼  │  │ Regex  │  │ API    │  │ 翻譯   │  │        │
│  └────────┘  └────────┘  └────────┘  └────────┘  └────────┘
│  ... (共 30 個輸入框，CSS Grid 排成 5 欄 × 6 列)            │
├──────────────────────────────────────────────────────────┤
│           [儲存(control+s)]  [取消(esc)]        [廣告]    │
└──────────────────────────────────────────────────────────┘
```

**DOM 元素引用**:
- `superPromptCategoryNameSettingsDialog` = `document.getElementById("dialog8")`
- `superPromptCategoryNameSettingsDialogOkBtn` = `#dialog8-ok`
- `superPromptCategoryNameSettingsDialogCancelBtn` = `#dialog8-cancel`

**結構**:
- Dialog: max-width 1200px
- 容器: `#superPromptCategoryNameList` / `.super-prompt-category-name-list`
- CSS Grid: `grid-template-columns: repeat(5, 1fr); grid-gap: 10px`

**輸入框**: `<input class="superPromptCategoryNameInput" type="text">`，共 30 個。

**顯示邏輯** (`showSuperPromptCategoryNameSettingsDialog()`):
1. 清空舊的 `.superPromptCategoryNameInput`
2. 迴圈 30 次，建立 input 並填入現有分類名稱
3. focus 第一個輸入框

**儲存邏輯** (`saveSuperPromptCategoryNameSettings()`):
1. 讀取 30 個 input 的值
2. 更新 `superPromptCategoryList[index].name`
3. 儲存至 `localStorage("Custom.Settings.SuperPromptCategoryList")`
4. 呼叫 `resetCustomMenuItem()` 移除左側選單，等待 MutationObserver 重新注入

---

## 9. 平台適配器規格 (Selectors Summary)

| Platform | Input Selector | Send Button Selector | Insert Strategy | Note |
|:---|:---|:---|:---|:---|
| **ChatGPT** | `#prompt-textarea` | `[data-testid="send-button"]` | 清空子節點 → 逐行 `<p>` | 先塞 `"-"` 佔位 |
| **Gemini** | `rich-textarea` (子 div) | `.send-button-container button` | `textContent = msg` + `focus()` | - |
| **Claude** | `div[contenteditable="true"]` | `[aria-label="Send Message"]` | 按 `\n` 拆分 → `<p>` | - |
| **Grok** | `form textarea` 或 `div[contenteditable]` | `form button[type="submit"]` | textarea: `value` + event; CE: `<p>` | 支援兩種 |
| **Felo** | `form textarea` | `form [type=submit]` 或 `.rounded-3xl` | `value = msg` + dispatch `input` | - |
| **Perplexity** | `#ask-input` | `[data-testid="submit-button"]` | textarea: `value`; CE: `execCommand` | **Critical** |

---

## 10. 鍵盤快捷鍵規格

### 10.1 mainKey 定義
```javascript
// Mac: event.ctrlKey (Control)
// Windows/Linux: event.altKey (Alt)
const mainKey = navigator.platform.includes("Mac") ? "ctrlKey" : "altKey";
```

### 10.2 全域快捷鍵對照表

| 快捷鍵 | 功能 | 作用範圍 |
|:---|:---|:---|
| `mainKey + 1` | 開啟 promptList[0] 的提問 dialog | 全域 |
| `mainKey + 2` | 開啟 promptList[1] 的提問 dialog | 全域 |
| `mainKey + 3` | 開啟 promptList[2] 的提問 dialog | 全域 |
| `mainKey + 4` | 開啟 promptList[3] 的提問 dialog | 全域 |
| `mainKey + 5` | 開啟 promptList[4] 的提問 dialog | 全域 |
| `mainKey + 6~0` | (保留，目前顯示 `none`，無實際處理邏輯) | - |
| `mainKey + Z` | 顯示快捷鍵提示 (#dialog3) — keydown 顯示, keyup 隱藏 | 全域 |
| `mainKey + A` | 收合/展開右側選單 (`collapseToggle()`) | 全域 |
| `mainKey + B` | 切換亮/暗模式 (`darkModeToggle()`) | 全域 |
| `mainKey + W` | 開啟提問樣板設定視窗 (#dialog2) | 全域 |
| `mainKey + E` | 開啟快速回覆設定視窗 (#dialog4) | 全域 |
| `mainKey + G` | 開啟匯入/匯出設定 (#dialog5) | 全域 |
| `mainKey + S` | **Dialog 內**: 送出/儲存 | Dialog 內 |
| `Esc` | 關閉任何開啟中的 dialog；也關閉 dropdown | 全域 |
| `Enter` | **#dialog / #dialog7 textarea 內**: 送出 (非 Shift、非 composing) | Dialog textarea |
| `Tab` / `Shift+Tab` | Dialog 內循環焦點 (`handleTabindex()`) | Dialog 內 |

### 10.3 Tab 焦點管理 (`handleTabindex()`)

在 Dialog 開啟時，Tab/Shift+Tab 在 dialog 內部元素間循環：
- 找到所有可聚焦元素 (input, textarea, select, button) 中 `tabindex >= 0` 者
- Tab 到最後一個元素後跳回第一個
- Shift+Tab 到第一個元素後跳到最後一個

### 10.4 Menu Tabindex 管理

**Dialog 開啟時**:
- `disableMenuItemTabindex()`: 將 `.custom-menu` 內所有 `[tabindex]` 設為 `-1`，並在 `data-orig-tabindex` 儲存原值

**Dialog 關閉時**:
- `restoreMenuItemTabindex()`: 從 `data-orig-tabindex` 恢復原值

---

## 11. 拖放排序規格

### 11.1 共同機制

兩套平行實作 — Super Prompt Settings (#dialog6) 和 Quick Reply Settings (#dialog4)，邏輯完全相同。

**核心元素**:
- 拖曳手柄: `<button class="drag-btn">☰</button>` (font-size: 1.5rem)
- 可拖曳列: `<tr class="customDragItem" draggable="false">`
- 容器: 各自的 `#superTableFormContainer` / `#quickReplyFormContainer`

### 11.2 事件流程

1. **mousedown** on `.drag-btn`:
   - 記錄 `dragged = tr` (最近的 `tr` 祖先)
   - 設定 `tr.draggable = true`

2. **mouseup** on `.drag-btn`:
   - 重置 `dragged.draggable = false`

3. **dragstart** on `.customDragItem`:
   - `dataTransfer.effectAllowed = 'move'`
   - 加上 `.dragging-row` class (opacity: 0.5)

4. **dragover** on `.customDragItem`:
   - `preventDefault()`
   - 依滑鼠位置判斷在目標行上/下半部
   - 上半: `.drag-over` (border-top: 2px solid blue)
   - 下半: `.drag-over-bottom` (border-bottom: 2px solid blue)
   - **自動捲動**: 靠近容器上/下邊緣 `SCROLL_THRESHOLD`(50px) 內時，以 `SCROLL_SPEED`(2px) 自動捲動

5. **drop**:
   - `tbody.insertBefore(dragged, target)` 或 `insertBefore(dragged, target.nextSibling)`
   - 呼叫 `recalculate*Indexes()` 重新計算 ID 和 tabindex

6. **dragend**:
   - 清除所有 `.dragging-row`, `.drag-over`, `.drag-over-bottom` class

### 11.3 重算函式

- `recalculateSupperSettingIndexes()`: 重算 #dialog6 內的 `.superPromptId` 編號和 tabindex
- `recalculateQuickReplyIndexes()`: 重算 #dialog4 內的 tabindex

---

## 12. CSS 詳細規格

### 12.1 Dialog 基礎樣式

```css
.dialog-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);  /* 半透明黑色 overlay */
    display: flex;
    align-items: center;
    justify-content: center;
}
.dialog {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    padding: 20px 20px 0px 20px;
    width: 100%;
}
.footer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0px;
}
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

### 12.2 按鈕色彩規格

**Light Mode**:

| Class | Background | Text Color |
|:---|:---|:---|
| `.primary` | `#9a8e81` | white |
| `.secondary` | `#c3bda9` | white |
| `.success` | `#7f9a87` | white |
| `.info` | `#5A7DAB` | white |
| `.warning` | `hsl(267, 30%, 55%)` | white |
| `.light` | `#9ca3af` | white |

**Dark Mode**:

| Class | Background | Text Color |
|:---|:---|:---|
| `.dark button.primary` | `#5a5646` | `#d1d5db` |
| `.dark button.secondary` | `#7a7363` | `#d1d5db` |
| `.dark button.success` | `#4f6654` | `#d1d5db` |
| `.dark button.info` | `#3A5276` | `#d1d5db` |
| `.dark button.warning` | `hsl(267, 30%, 40%)` | `#d1d5db` |
| `.dark button.light` | `rgba(64,65,79,1)` | `#d1d5db` |

### 12.3 Dark/Light Mode 主題色

```css
.light .dialog-wrapper { color: black !important; }
.dark .dialog-wrapper { color: white !important; }
.dark .dialog { background-color: rgba(68, 70, 84, 1); }
.dark .custom-menu { background: gray; }
```

### 12.4 Toggle Switch (`.slide-checkbox`)

-   **Size**: 80px × 26px
-   **Structure**: `<input type="checkbox">` + `<label><span></span></label>`
-   **Off 狀態**: 背景 `#333`，span 在 `left: 3px`
-   **On 狀態**: span 在 `left: 43px`
-   **Knob**: `#fcfff4` gradient
-   **Labels**: `:before` = "ON" (綠 `#27ae60`)，`:after` = "OFF" (黑 `#000`)
-   **Shadows**: `box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), ...`
-   **Animation**: `transition: all 0.4s ease`
-   **每個 toggle 有獨立 ID**: 如 `slideCheckbox`, `slideCheckbox2`, `slideCheckboxReplayMessage1` 等

### 12.5 右側選單收合動畫

```css
/* 收合 */
body.hidden-template-buttons .custom-menu {
    transform: translateX(200px);
}

/* 收合後的小按鈕 */
.collapse-button {
    position: fixed;
    bottom: 220px;
    right: 10px;
    /* 圓形 avatar icon SVG */
}
```

### 12.6 拖放排序樣式

```css
.dragging-row { opacity: 0.5; }
.drag-over { border-top: 2px solid blue; }
.drag-over-bottom { border-bottom: 2px solid blue; }
.drag-btn {
    font-size: 1.5rem;
    cursor: grab;
}
```

### 12.7 Promotion Buttons 漸層色

```css
#pinkoi-button { /* Pink gradient */ }
#fb-button { /* Blue gradient */ }
#line-button { /* Green gradient */ }
#prompt-packs-button { /* IG-style gradient */ }
#threads-button { /* Black */ }
```

---

## 13. 重構執行計畫

### Phase 1: Structure & Loader
-   Setup `js/loader.js` (Dynamic Import)。
-   Update `manifest.json` (Web Accessible Resources)。
-   Extract `styles/content.css`。

### Phase 2: Core & Config
-   Impl `config/constants.js` (所有常數)。
-   Impl `config/selectors.js` (所有平台 DOM selectors)。
-   Impl `core/storage.js` (Hybrid Sync)。
-   Impl `core/i18n.js`。
-   Impl `core/state.js` (全域狀態管理)。
-   Move default data to `data/*.js`。

### Phase 3: Platforms
-   Impl `platforms/base.js` (抽象基底類)。
-   Impl `platforms/chatgpt.js`, `gemini.js`, `claude.js`, `grok.js`, `felo.js`, `perplexity.js`。
-   Impl `platforms/factory.js` (含 Perplexity 500ms delay)。

### Phase 4: UI Components
-   Impl `ui/components/button.js` (`createButton`)。
-   Impl `ui/components/drag_drop_list.js` (共用拖放邏輯)。
-   Impl `ui/styles.js` (Dynamic CSS Injection)。

### Phase 5: UI Dialogs
-   Impl `ui/dialogs/base_dialog.js` (共用 dialog 邏輯: 開啟/關閉/Tab 循環)。
-   Impl `ui/dialogs/question_dialog.js` (#dialog)。
-   Impl `ui/dialogs/settings_dialog.js` (#dialog2)。
-   Impl `ui/dialogs/shortcut_hint_dialog.js` (#dialog3)。
-   Impl `ui/dialogs/quick_reply_dialog.js` (#dialog4)。
-   Impl `ui/dialogs/export_import_dialog.js` (#dialog5)。
-   Impl `ui/dialogs/super_prompt_settings.js` (#dialog6)。
-   Impl `ui/dialogs/super_prompt_dialog.js` (#dialog7 — 含完整 `{{ }}` 解析引擎)。
-   Impl `ui/dialogs/category_name_dialog.js` (#dialog8)。

### Phase 6: UI Layout
-   Impl `ui/menu.js` (右側浮動選單 + 搜尋篩選 + 收合/展開)。
-   Impl `ui/chatgpt_sidebar.js` (左側選單注入 + MutationObserver + Dropdown)。

### Phase 7: Features
-   Impl `features/shortcuts.js` (全域鍵盤事件)。
-   Impl `features/theme_manager.js` (多平台主題偵測 + 切換)。
-   Impl `features/chat_downloader.js` (HTML 匯出)。
-   Impl `features/ads_rotator.js` (輪播邏輯)。

### Phase 8: Integration & Verification
-   組裝 `content.js`（主入口，init 流程）。
-   驗證 Perplexity `execCommand` 注入。
-   驗證 Super Prompt Checkbox/Radio 邏輯。
-   驗證 Import/Export JSON 結構相容性。
-   驗證所有 8 個 Dialog 的開啟/關閉/鍵盤行為。
-   驗證拖放排序在 #dialog4 和 #dialog6 中的行為。
-   驗證多平台主題偵測。
-   驗證廣告輪播在所有 Dialog 中的顯示。

---

## 14. 測試規格

### 14.1 核心功能測試

| 測試項目 | 驗證內容 |
|:---|:---|
| 問題模板送出 | 前綴 + 輸入 + 後綴正確組合並送出 |
| 快速回覆送出 | 點擊直接送出，無 dialog |
| 超級模板解析 | 5 種欄位類型 (text/text+default/select/checkbox/radio) 正確生成 |
| 超級模板送出 | checkbox 逗號串接值、radio 單選值、text/select 直接值正確替換 |
| 超級模板空白欄位 | `{{}}` non-global replace 正確逐一替換 |
| 單一欄位特殊行為 | textarea 高度 380px、Enter 直接送出 |
| 匯入/匯出 | JSON 結構完整，部分匯入正確覆蓋 |
| 恢復預設 | 4 組 storage key 正確重置 |
| 對話下載 | HTML 檔案包含完整對話、base64 圖片與樣式 |
| 分類名稱 | 30 個分類名稱正確儲存與左側選單更新 |
| 拖放排序 | 列移動後 ID/tabindex 重新計算 |

### 14.2 跨平台測試

| 平台 | 測試項目 |
|:---|:---|
| ChatGPT | 左側選單注入、對話下載、所有功能 |
| Gemini | 訊息插入、主題偵測 |
| Claude | contenteditable `<p>` 換行插入 |
| Grok | textarea/contenteditable 雙模式 |
| Felo | textarea value + event |
| Perplexity | `execCommand` 插入策略、500ms 延遲載入 |

### 14.3 鍵盤快捷鍵測試

| 測試項目 | 驗證內容 |
|:---|:---|
| mainKey + 1-5 | 正確開啟對應 prompt dialog |
| mainKey + Z | keydown 顯示、keyup 隱藏 |
| mainKey + A | 收合/展開 toggle |
| mainKey + B | 主題切換 |
| mainKey + W/E/G | 正確開啟設定 dialog |
| Esc | 關閉所有 dialog + dropdown |
| Tab/Shift+Tab | dialog 內循環焦點 |

---

## 15. Chrome Extension 載入與資源配置

### 15.1 manifest.json 結構
```json
{
  "manifest_version": 3,
  "name": "__MSG_extension_name__",
  "description": "__MSG_extension_description__",
  "author": "Joe",
  "version": "1.6.4",
  "default_locale": "en",
  "icons": {
    "16": "images/icon/16.png",
    "32": "images/icon/32.png",
    "48": "images/icon/48.png",
    "128": "images/icon/128.png"
  },
  "permissions": ["storage"],
  "content_scripts": [{
    "matches": [
      "https://chatgpt.com/*",
      "https://chat.openai.com/*",
      "https://gemini.google.com/app/*",
      "https://gemini.google.com/share/continue/*",
      "https://gemini.google.com/u/*",
      "https://gemini.google.com/app?*",
      "https://claude.ai/*",
      "https://grok.com/*",
      "https://felo.ai/*",
      "https://www.perplexity.ai/*"
    ],
    "exclude_matches": [
      "https://chat.openai.com/auth/login",
      "https://claude.ai/login"
    ],
    "js": ["js/content.js"]
  }]
}
```

### 15.2 重構後 manifest.json 變更
- `content_scripts.js` 改為 `["js/loader.js"]`
- 新增 `web_accessible_resources` 以允許動態 import ES modules

### 15.3 i18n 訊息 Key 總覽

| i18n Key | 用途 |
|:---|:---|
| `button_edit` / `button_save` / `button_send` / `button_cancel` / `button_close` | 通用按鈕文字 |
| `button_export` / `button_import_all` / `button_import_only_prompt` / `button_import_only_replay` / `button_import_only_super_prompt` / `button_reset` | 匯入匯出按鈕 |
| `button_insert` | 插入 Prompt 按鈕 |
| `button_show_all_or_hide_all` | 全部顯示/隱藏 |
| `button_export_super_prompt_category` / `button_import_super_prompt_category` | 分類匯出/匯入 |
| `nav_menu_help_menu` / `nav_item_settings` / `nav_item_super_prompt_template` | 左側選單項目 |
| `nav_menu_enable_gemini_support` | 多平台支援文字 |
| `menu_prompt_template_settings` / `menu_reply_message_settings` / `menu_import_export` | 設定選單項目 |
| `menu_super_prompt_template_settings` | 超級樣板設定 (含 `$count$` placeholder) |
| `menu_custom_super_prompt_category` | 自定分類名稱 |
| `menu_item_download_html` | 下載對話 |
| `table_title_shortcut` / `table_title_button_name` / `table_title_prefix_text` / `table_title_suffix_text` / `table_title_is_show` | 表格欄位標題 |
| `table_title_replay_message` / `table_title_super_prompt_text` | 快速回覆/超級樣板欄位 |
| `table_header_import_export` | 匯入匯出表頭 |
| `placeholder_prompt_textarea` | 提問 textarea placeholder |
| `placeholder_prompt_input_tips` | 超級樣板欄位 placeholder (Tab 提示) |
| `placeholder_supper_prompt_desc` | 超級樣板語法說明 |
| `placeholder_keyword_input` | 搜尋框 placeholder |
| `alert_not_found_input` / `alert_not_found_send_button` | 錯誤訊息 |
| `alert_reset_success` / `alert_import_success` / `alert_import_error` | 操作結果訊息 |
| `alert_import_super_prompt_success` | 超級樣板匯入成功訊息 |
| `confirm_is_reset_system_settings` | 恢復預設確認 |
| `confirm_is_import_all` / `confirm_is_import_only_prompt_template` / `confirm_is_import_only_reply_message` / `confirm_is_import_only_super_prompt_template` | 匯入確認 (含檔名 placeholder) |
| `export_file_name` | 匯出檔名 (含年月日時分秒 placeholders) |
| `shortcut_key_tips_*` | 快捷鍵提示文字 (Z/A/D/N/M/C/X/R/E/W/B/G/S/S2/ESC) |

---
**文件結束**
