# 開發指南

## 環境需求

- Chrome 瀏覽器（或 Chromium-based 瀏覽器）
- 任意文字編輯器（推薦 VS Code）
- 無需 Node.js 或任何構建工具

## 本地開發

### 安裝步驟
1. Clone 專案
2. Chrome → `chrome://extensions/`
3. 開啟右上角「開發人員模式」
4. 點擊「載入未封裝項目」→ 選擇專案根目錄
5. 開啟任一支援的 AI 網站（如 chatgpt.com）測試

### 開發循環
1. 修改程式碼
2. 到 `chrome://extensions/` 點擊擴充功能的 🔄 重新整理按鈕
3. 重新整理目標網頁（如 ChatGPT 頁面）
4. 在頁面上測試功能

### Debug 方式
- **Content Script console**：在目標網站的 DevTools → Console 查看（注意要切到正確的 context）
- **Chrome Storage 查看**：DevTools → Application → Storage → Extension Storage
- **選單 DOM 查看**：DevTools → Elements，搜尋 `.custom-menu`
- **Dialog DOM 查看**：搜尋 `.dialog-wrapper`

## 新增功能 Checklist

- [ ] 功能邏輯放在 `js/features/` 下
- [ ] UI 元件放在 `js/ui/components/` 下
- [ ] Dialog 放在 `js/ui/dialogs/` 下
- [ ] 新的 CSS 加入 `js/ui/styles.js`（深色/淺色都要處理）
- [ ] 使用者可見文字加入 `_locales/` 所有語系（en, ja, ko, zh_CN, zh_TW）
- [ ] 新的 Storage Key 加入 `js/config/constants.js` 的 `STORAGE_KEYS`
- [ ] 如需跨模組引用，在 `content.js` 中用 setter injection 連接
- [ ] 考慮 6 個平台的相容性
- [ ] 考慮深色/淺色主題
- [ ] null check 所有 DOM 操作
- [ ] 更新文件（執行 `#update-docs`）

## 新增平台適配器

1. 在 `js/platforms/` 新增 `{platform}.js`
2. 繼承 `BasePlatform`，實作：
   - `getChatInput()` — 取得輸入框 DOM
   - `getSendButton()` — 取得送出按鈕 DOM
   - `insertMessage(input, message)` — 將訊息寫入輸入框
   - `_clickSend(isGenerating)` — 觸發送出
3. 在 `js/config/selectors.js` 加入該平台的 DOM selectors
4. 在 `js/core/state.js` 加入平台偵測變數（如 `export const supportXxx = ...`）
5. 在 `js/platforms/factory.js` 加入工廠判斷
6. 在 `manifest.json` 的 `content_scripts.matches` 和 `web_accessible_resources.matches` 加入 URL
7. 在 `js/features/theme_manager.js` 加入主題偵測（如有需要）
8. 在 `js/content.js` 的 `init()` 中加入主題偵測呼叫（如有需要）

## 新增 Dialog

1. 在 `js/ui/dialogs/base_dialog.js` 新增 HTML 模板函式（如 `getNewDialogHTML()`）
2. 在 `appendAllDialogs()` 中加入 HTML 注入
3. 在 `collectDialogElements()` 中加入 DOM 引用收集
4. 新增 `js/ui/dialogs/{name}_dialog.js`，包含：
   - `init{Name}Dialog(els)` — 初始化（綁定事件）
   - `show{Name}Dialog()` — 開啟 Dialog
   - `save{Name}()` — 儲存（如需要）
5. 在 `js/content.js` 中：
   - import 新模組
   - 呼叫 `init{Name}Dialog(els)`
   - 設定 setter injection（如需要）
6. 在 `js/features/shortcuts.js` 加入 Esc 關閉和快捷鍵支援

## 多語系新增

1. 在 `_locales/en/messages.json` 加入新 key（以英文為基準）
2. 同步加入其他語系：`ja/`, `ko/`, `zh_CN/`, `zh_TW/`
3. 在程式碼中使用 `i18n('key_name')` 取得翻譯文字
4. Key 命名規則：`snake_case`，依功能分組前綴（如 `button_`, `placeholder_`, `alert_`）

## CSS 修改

所有 CSS 集中在 `js/ui/styles.js`，以 JavaScript 字串注入 `<style>` 標籤。

### 主題處理原則
```javascript
// 淺色（預設）
`.my-element { background: #fff; color: #333; }`

// 深色
`.dark .my-element { background: #1a1a2e; color: #eee; }`
```

### 注意事項
- 不要使用獨立的 CSS 檔案
- 新增或修改 CSS 時，深色/淺色都要處理
- ChatGPT 的原生 CSS 可能會覆蓋，需適當使用 `!important`
- 使用 CSS 變數時注意 fallback（如 `var(--sidebar-surface-primary, #f9f9f9)`）

## 常用工具函式

| 函式 | 檔案 | 用途 |
|------|------|------|
| `i18n(key)` | `core/i18n.js` | 取得 i18n 翻譯 |
| `getData(key, default, cb)` | `core/storage.js` | 讀取資料（ChatGPT 平台） |
| `getDataFromChromeStorage(key, default, cb)` | `core/storage.js` | 讀取資料（其他平台） |
| `saveData(key, value)` | `core/storage.js` | 儲存資料（雙寫） |
| `getPlatform()` | `platforms/factory.js` | 取得當前平台適配器 |
| `sendMessage(msg, isInsert)` | `platforms/factory.js` | 送出訊息到 AI |
| `findGroupAndIndex(id, size)` | `utils/helpers.js` | 超級樣板 key → 分類+序號 |
| `escapeRegExp(str)` | `utils/helpers.js` | 跳脫正則特殊字元 |
| `disableMenuItemTabindex()` | `utils/dom.js` | Dialog 開啟時停用選單 tabindex |
| `restoreMenuItemTabindex()` | `utils/dom.js` | Dialog 關閉時恢復選單 tabindex |
| `handleTabindex(first, last, e)` | `utils/dom.js` | Tab 焦點循環 |
