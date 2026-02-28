# 架構文件

## 啟動流程

```
manifest.json
  → content_scripts: ["js/loader.js"]
    → loader.js: import(chrome.runtime.getURL('js/content.js'))
      → content.js: main()
        1. setDefaultList()        — 根據 locale 設定預設資料
        2. injectStyles()          — 注入所有 CSS（深色/淺色主題）
        3. appendAllDialogs()      — 注入 8 個 Dialog 的 HTML
        4. collectDialogElements() — 收集所有 Dialog DOM 引用
        5. init*Dialog() × 8       — 初始化各 Dialog 模組
        6. Setter Injection        — 連接跨模組相依性
        7. initShortcuts()         — 鍵盤快捷鍵
        8. addCompositionListeners — IME 輸入事件
        9. document.click handler  — 全域點擊（關閉 dropdown）
       10. init()                  — 載入 Storage 資料、偵測主題、選單收合
       11. generateButtons()       — 首次產生右側選單按鈕
       12. subscribeMutationObserver() — 延遲 1s，監聽 ChatGPT nav 變化
       13. startAdsRotation()      — 廣告輪播
```

### Perplexity 特殊處理
Perplexity 延遲 500ms 才呼叫 `main()`（頁面載入較慢），其他平台立即啟動。

## 模組依賴關係

```
content.js (主入口，連接所有模組)
│
├── config/
│   ├── constants.js           ← 純常數，無依賴
│   └── selectors.js           ← 純常數，無依賴
│
├── core/
│   ├── i18n.js                ← 無依賴（chrome.i18n wrapper）
│   ├── state.js               ← 無依賴（全域狀態容器）
│   └── storage.js             ← 依賴 constants.js
│
├── data/
│   ├── default_prompts.js     ← 純資料，無依賴
│   ├── default_quick_replies.js ← 依賴 constants.js
│   └── default_super_prompts.js ← 依賴 constants.js, i18n.js
│
├── platforms/
│   ├── base.js                ← 依賴 i18n.js
│   ├── factory.js             ← 依賴 state.js, 所有平台適配器
│   ├── chatgpt.js             ← 繼承 base.js, 依賴 selectors.js
│   ├── gemini.js              ← 繼承 base.js, 依賴 selectors.js
│   ├── claude.js              ← 繼承 base.js, 依賴 selectors.js
│   ├── grok.js                ← 繼承 base.js, 依賴 selectors.js
│   ├── felo.js                ← 繼承 base.js, 依賴 selectors.js
│   └── perplexity.js          ← 繼承 base.js, 依賴 selectors.js
│
├── ui/
│   ├── styles.js              ← 無依賴（純 CSS 字串注入）
│   ├── menu.js                ← 依賴 state, i18n, factory, button, helpers, dom, constants
│   ├── chatgpt_sidebar.js     ← 依賴 state, constants, storage, i18n, dom
│   ├── components/
│   │   ├── button.js          ← 依賴 helpers, state
│   │   └── drag_drop_list.js  ← 依賴 constants
│   └── dialogs/
│       ├── base_dialog.js     ← 依賴 i18n, state, helpers, dom, constants
│       ├── question_dialog.js ← 依賴 state, factory, dom
│       ├── settings_dialog.js ← 依賴 state, storage, i18n, dom
│       ├── quick_reply_dialog.js    ← 依賴 state, storage, i18n, dom, drag_drop_list
│       ├── export_import_dialog.js  ← 依賴 state, storage, i18n, dom
│       ├── super_prompt_dialog.js   ← 依賴 state, factory, helpers, dom
│       ├── super_prompt_settings.js ← 依賴 state, storage, i18n, dom, drag_drop_list, helpers
│       ├── category_name_dialog.js  ← 依賴 state, storage, i18n, dom
│       └── shortcut_hint_dialog.js  ← 依賴 dom
│
├── features/
│   ├── shortcuts.js           ← 依賴 state, dom (函式透過 setter injection 注入)
│   ├── theme_manager.js       ← 無依賴（直接操作 DOM classList）
│   ├── chat_downloader.js     ← 無依賴（獨立功能）
│   └── ads_rotator.js         ← 依賴 state, constants
│
└── utils/
    ├── helpers.js             ← 無依賴（純工具函式）
    └── dom.js                 ← 無依賴（純 DOM 工具）
```

## 跨模組相依注入（Setter Injection）

因為 ES Module 的 `export` 是 live binding 且單向，無法處理循環依賴。
`content.js` 中使用 setter 函式注入跨模組引用：

| 來源模組 | 注入目標 | setter 函式 | 注入的函式 |
|---------|---------|------------|----------|
| `question_dialog.js` | `menu.js` | `setShowQuestionDialog` | `showQuestionDialog` |
| `super_prompt_dialog.js` | `menu.js` | `setShowSuperPromptDialog` | `showSuperPromptDialog` |
| `chat_downloader.js` | `menu.js` | `setDownloadChatGPTConversationAsHtml` | `downloadChatGPTConversationAsHtml` |
| `settings_dialog.js` | `question_dialog.js` | `setShowSettingsDialog` | `showSettingsDialog` |
| `menu.js` | `settings_dialog.js` | `setGenerateButtons` | `generateButtons` |
| `menu.js` | `quick_reply_dialog.js` | `setGenerateButtons` | `generateButtons` |
| `menu.js` | `super_prompt_settings.js` | `setGenerateButtons` | `generateButtons` |
| `menu.js` | `export_import_dialog.js` | `setGenerateButtons` | `generateButtons` |
| `chatgpt_sidebar.js` | `export_import_dialog.js` | `setResetCustomMenuItem` | `resetCustomMenuItem` |
| `chatgpt_sidebar.js` | `category_name_dialog.js` | `setResetCustomMenuItem` | `resetCustomMenuItem` |
| `super_prompt_settings.js` | `super_prompt_dialog.js` | `setShowSuperPromptSettingDialog` | `showSuperPromptSettingDialog` |
| 各 dialog | `chatgpt_sidebar.js` | `setShow*Dialog` | 各 dialog 開啟函式 |
| 各操作函式 | `shortcuts.js` | `set*` | 各 save/send 函式 |

## UI 層級結構

```
<body>（目標網站）
│
├── <style id="custom-prompt-styles">      ← styles.js 注入的 CSS
│
├── <div class="custom-menu">              ← 右側浮動選單（menu.js）
│   ├── .search-box                        ← 搜尋框
│   │   └── #customKeywordInput
│   ├── .prompt-list-area                  ← 按鈕列表區
│   │   ├── .custom-template-buttons       ← 提問樣板按鈕 (最多 10 個)
│   │   ├── .custom-template-buttons       ← 超級樣板按鈕 (依分類)
│   │   └── .custom-template-buttons       ← 快速回覆按鈕 (最多 100 個)
│   ├── .menu-collapse-button              ← 收合按鈕（Control+A）
│   └── .super-sun-o-pt                    ← 廣告/推廣區
│
├── #dialog (dialog-wrapper)               ← 提問 Dialog (question_dialog.js)
├── #dialog2 (dialog-wrapper)              ← 提問樣板設定 Dialog (settings_dialog.js)
├── #dialog3 (dialog-wrapper)              ← 快捷鍵提示 Dialog (shortcut_hint_dialog.js)
├── #dialog4 (dialog-wrapper)              ← 快速回覆設定 Dialog (quick_reply_dialog.js)
├── #dialog5 (dialog-wrapper)              ← 匯入/匯出 Dialog (export_import_dialog.js)
├── #dialog6 (dialog-wrapper)              ← 超級樣板設定 Dialog (super_prompt_settings.js)
├── #dialog7 (dialog-wrapper)              ← 超級樣板填寫 Dialog (super_prompt_dialog.js)
├── #dialog8 (dialog-wrapper)              ← 分類名稱設定 Dialog (category_name_dialog.js)
│
└── nav.flex（ChatGPT 原生左側欄）
    └── 最後一個 child
        ├── .customMenuItem                ← 提問助手選單（toggle 開關）
        ├── .customMenuItem                ← Gemini 支援（toggle 開關）
        ├── .customMenuItem                ← 相關設定（dropdown）
        │   └── .chatgpt-dropdown-content
        │       ├── 提問樣板設定
        │       ├── 快速回覆設定
        │       └── 匯入/匯出
        └── .customMenuItem                ← 超級樣板（dropdown）
            └── .chatgpt-dropdown-content
                ├── 分類 1 ~ 30
                └── 分類名稱設定
```

## 事件流

### 提問樣板流程
```
使用者點擊右側提問樣板按鈕
  → menu.js: handleClick()
    → state.js: setQuestionId(), setPrefix(), setSuffix()
    → question_dialog.js: showQuestionDialog()
      → 顯示 Dialog，使用者填入內容
      → 點擊「送出」或 Control+S
        → sendQuestionForm()
          → 組合 prefix + 使用者輸入 + suffix
          → factory.js: sendMessage(message)
            → platform.insertMessage(input, message)
            → platform._clickSend()
```

### 超級樣板流程
```
使用者點擊右側超級樣板按鈕
  → menu.js: handleSuperPromptClick()
    → 解析 {{ }} 變數
    → 有變數？
      → super_prompt_dialog.js: showSuperPromptDialog()
        → 動態產生輸入表單（text/select/checkbox/radio）
        → 使用者填入 → 點擊送出
          → sendSuperPrompt()
            → 將變數替換為使用者輸入值
            → factory.js: sendMessage(message)
    → 無變數？
      → factory.js: sendMessage(prompt) 直接送出
```

### 快速回覆流程
```
使用者點擊右側快速回覆按鈕
  → menu.js: handleQuickReplyClick()
    → factory.js: sendMessage(quickReplyMessage) 直接送出
```

## 主題系統

```
ChatGPT:     自動偵測 <html class="dark"> 或 <html class="light">
Gemini:      偵測 <body class="dark-theme"> → 同步到 <html class="dark">
Claude:      偵測 <html data-mode="dark"> → 同步到 <html class="dark">
Perplexity:  偵測 <html data-color-scheme="dark"> → 同步到 <html class="dark">
Grok/Felo:   跟隨 ChatGPT 的 dark/light class

CSS 選擇器規則：
  預設（淺色）: .chatgpt-dropdown-content { background: #fff; }
  深色主題:     .dark .chatgpt-dropdown-content { background: rgba(5,5,9,1); }
```
