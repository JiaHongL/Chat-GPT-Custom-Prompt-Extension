# Copilot Instructions

## 專案概述

這是一個 Chrome Extension（Manifest V3），名稱為「ChatGPT 提問助手」。
在 ChatGPT / Gemini / Claude / Grok / Felo / Perplexity 等 AI 網站的頁面右側注入一個浮動選單，
讓使用者可以快速套用預設的 Prompt 樣板發送訊息。

- **作者**：Joe
- **版本**：2.0.0
- **語系**：zh-TW（預設 en），支援 en / ja / ko / zh_CN / zh_TW

## 技術棧

- 純 JavaScript（無框架、無構建工具、無 bundler）
- Chrome Extension Manifest V3
- Chrome Storage API（`chrome.storage.local`）存取使用者資料
- Content Script 注入到目標網站
- ES Modules 透過 `loader.js` 動態 `import()` 載入
- 支援多語系（`chrome.i18n`），語系檔在 `_locales/` 下

## 專案結構

```
manifest.json              # Extension 設定（Manifest V3）
js/
├── loader.js              # Content Script 進入點（動態 import content.js）
├── content.js             # 主入口模組（匯入所有模組、連接相依性、啟動初始化）
├── config/
│   ├── constants.js       # 全域常數（筆數上限、Storage Keys、延遲時間等）
│   └── selectors.js       # 各平台 DOM Selectors 集中管理
├── core/
│   ├── state.js           # 全域狀態管理（平台偵測、資料列表、Dialog 狀態）
│   ├── storage.js         # 資料存取層（localStorage + chrome.storage.local 雙寫）
│   └── i18n.js            # 多語系 wrapper（chrome.i18n.getMessage）
├── data/
│   ├── default_prompts.js       # 各語系預設提問樣板
│   ├── default_quick_replies.js # 各語系預設快速回覆
│   └── default_super_prompts.js # 各語系預設超級樣板
├── platforms/
│   ├── base.js            # 平台適配器基底類（定義介面）
│   ├── factory.js         # 平台工廠（根據 URL 返回適配器單例）
│   ├── chatgpt.js         # ChatGPT 適配器
│   ├── gemini.js          # Gemini 適配器
│   ├── claude.js          # Claude 適配器
│   ├── grok.js            # Grok 適配器
│   ├── felo.js            # Felo 適配器
│   └── perplexity.js      # Perplexity 適配器
├── ui/
│   ├── styles.js          # 所有 CSS 注入（深色/淺色主題）
│   ├── menu.js            # 右側浮動選單（主選單、搜尋、按鈕生成）
│   ├── chatgpt_sidebar.js # ChatGPT 左側邊欄自訂項目（4 個選單項）
│   ├── components/
│   │   ├── button.js      # 按鈕建立元件
│   │   └── drag_drop_list.js # 拖放排序邏輯
│   └── dialogs/
│       ├── base_dialog.js           # 共用 Dialog 邏輯（HTML 模板、DOM 收集）
│       ├── question_dialog.js       # 提問 Dialog（填入內容後送出）
│       ├── settings_dialog.js       # 提問樣板設定 Dialog
│       ├── quick_reply_dialog.js    # 快速回覆設定 Dialog
│       ├── export_import_dialog.js  # 匯入/匯出 Dialog
│       ├── super_prompt_dialog.js   # 超級樣板填寫 Dialog（變數解析）
│       ├── super_prompt_settings.js # 超級樣板設定 Dialog
│       ├── category_name_dialog.js  # 超級樣板分類名稱設定 Dialog
│       └── shortcut_hint_dialog.js  # 快捷鍵提示 Dialog
├── features/
│   ├── chat_downloader.js # 下載當前對話為 HTML
│   ├── shortcuts.js       # 鍵盤快捷鍵處理
│   ├── theme_manager.js   # 深色/淺色主題偵測與切換
│   └── ads_rotator.js     # 底部廣告/推廣輪播
└── utils/
    ├── helpers.js         # 通用工具函式（escapeRegExp, findGroupAndIndex 等）
    └── dom.js             # DOM 工具函式（tabindex 管理、焦點循環）
_locales/
├── en/messages.json
├── ja/messages.json
├── ko/messages.json
├── zh_CN/messages.json
└── zh_TW/messages.json
```

## 核心概念

### 三種樣板類型

1. **提問樣板**（Prompt Template）：最多 10 個，點擊後彈出 Dialog，使用者填入內容，與前綴/後綴組合後送出
2. **超級樣板**（Super Prompt）：30 個分類 × 50 個 = 最多 1500 個，支援 `{{ }}` 變數語法
3. **快速回覆**（Quick Reply）：最多 100 個，點擊直接送出，不彈 Dialog

### 超級樣板 `{{ }}` 變數語法

```
{{ 變數名稱 }}                          → 文字輸入框
{{ 變數名稱 || 預設值 }}                 → 帶預設值的文字輸入框
{{ 變數名稱 || 選項1, 選項2, 選項3 }}     → 下拉選單（select）
{{ 變數名稱 || 選項1, 選項2 || checkbox }} → 核取方塊（多選）
{{ 變數名稱 || 選項1, 選項2 || radio }}    → 單選按鈕
```

### 資料儲存

- ChatGPT 平台：`localStorage` 優先 + `chrome.storage.local` 備份（雙寫）
- 其他平台：直接使用 `chrome.storage.local`（跨域不共享 localStorage）
- Storage Keys 定義在 `js/config/constants.js` 的 `STORAGE_KEYS`
- 詳細結構見 `docs/STORAGE.md`

### 平台適配（Strategy Pattern）

每個平台適配器繼承 `BasePlatform`，需實作：
- `getChatInput()` — 取得輸入框 DOM 元素
- `getSendButton()` — 取得送出按鈕 DOM 元素
- `insertMessage(input, message)` — 將訊息插入輸入框
- `preSend()` — 送出前的佔位處理（可選）
- `_clickSend(isGenerating)` — 點擊送出按鈕

工廠函式 `getPlatform()` 根據 URL 返回對應適配器單例。

### 模組間相依注入（Setter Injection）

因為 ES Module 的循環依賴問題，跨模組的函式引用透過 setter 注入：
```javascript
// content.js 中連接各模組
setShowQuestionDialog(showQuestionDialog);     // menu.js ← question_dialog.js
setSettingsGenBtn(generateButtons);            // settings_dialog.js ← menu.js
```

### ChatGPT 左側邊欄

在 `nav.flex` 中注入 4 個自訂選單項目（`.customMenuItem`）：
1. **提問助手選單** — toggle 開關（Control+A 顯示/隱藏右側選單）
2. **Gemini 支援** — toggle 開關（啟用/停用多平台支援）
3. **相關設定** — dropdown（提問樣板設定、快速回覆設定、匯入/匯出）
4. **超級樣板** — dropdown（30 個分類 + 分類名稱設定入口）

使用 MutationObserver 監聽 DOM 變化，在 ChatGPT 動態替換 nav 時重新注入。

## 程式碼風格

- ES Modules（`import` / `export`）
- 函式命名：`camelCase`（如 `generateButtons`, `showQuestionDialog`）
- 常數命名：`UPPER_SNAKE_CASE`（如 `STORAGE_KEYS`, `SCROLL_SPEED`）
- 檔案命名：`snake_case.js`（如 `chat_downloader.js`, `base_dialog.js`）
- 所有使用者可見文字必須使用 i18n：`i18n('key')` 或 `chrome.i18n.getMessage('key')`
- 不使用任何外部函式庫（jQuery、React 等皆不使用）
- CSS 全部以 JavaScript 字串注入（`js/ui/styles.js`），不使用獨立 CSS 檔案
- 深色主題使用 `.dark` class prefix 或 CSS 變數

## 注意事項

- Content Script 無法使用 `eval()` 或 inline script（Manifest V3 CSP 限制）
- Chrome Storage Local 容量上限 10 MB
- 目標網站的 DOM 結構會隨時改版，選擇器需要彈性處理（集中管理在 `config/selectors.js`）
- 所有 DOM 操作需考慮元素可能不存在的情況（null check）
- Perplexity 平台需延遲 500ms 啟動（頁面載入較慢）
- `loader.js` 是唯一的 content_scripts 進入點，負責動態 `import()` content.js

## 支援平台

| 平台 | URL | 適配器 |
|------|-----|--------|
| ChatGPT | `chatgpt.com`, `chat.openai.com` | `chatgpt.js` |
| Gemini | `gemini.google.com` | `gemini.js` |
| Claude | `claude.ai` | `claude.js` |
| Grok | `grok.com` | `grok.js` |
| Felo | `felo.ai` | `felo.js` |
| Perplexity | `perplexity.ai` | `perplexity.js` |

## 文件維護

當程式碼有結構性變動（新增/刪除檔案、新增功能、修改 Storage 結構）時，
請提醒使用者執行 `#update-docs` 來同步更新專案文件。

相關文件：
- `docs/ARCHITECTURE.md` — 架構與模組依賴
- `docs/FEATURES.md` — 功能清單與 TODO
- `docs/STORAGE.md` — 資料儲存結構
- `docs/DEVELOPMENT.md` — 開發指南
