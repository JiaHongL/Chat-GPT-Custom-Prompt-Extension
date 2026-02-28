# 資料儲存結構

## 儲存策略

| 平台 | 讀取來源 | 寫入目標 |
|------|---------|---------|
| ChatGPT | `localStorage` 優先，fallback 到 `chrome.storage.local` | 雙寫（localStorage + chrome.storage.local） |
| 其他平台 | `chrome.storage.local` | `chrome.storage.local` |

**原因**：ChatGPT 平台使用 localStorage 可以更快速讀取；其他平台因跨域無法共享 localStorage，統一使用 chrome.storage.local。

## Storage Keys

定義在 `js/config/constants.js` 的 `STORAGE_KEYS`：

```javascript
STORAGE_KEYS = {
  PROMPT:               'Custom.Settings.Prompt',
  QUICK_REPLY:          'Custom.Settings.QuickReply',
  SUPER_PROMPT:         'Custom.Settings.SuperPrompt',
  SUPER_PROMPT_CATEGORY: 'Custom.Settings.SuperPromptCategoryList',
  MENU_HIDDEN:          'Custom.Settings.Menu.Hidden',
  GEMINI_SUPPORT:       'Custom.EnableGeminiSupport',
  THEME:                'theme',
}
```

## 資料結構

### 提問樣板（`Custom.Settings.Prompt`）

Array，最多 10 筆。

```json
[
  {
    "key": "1",
    "text": "自由提問",
    "prefix": "",
    "suffix": "，請使用繁體中文回答。",
    "buttonElement": null,
    "handleClickFn": null,
    "isVisible": true
  },
  {
    "key": "2",
    "text": "英文解釋",
    "prefix": "你現在是一個英文教育專家，請解釋英文單字 [",
    "suffix": "]，拼音、詞性，並給出 5 個中英文的範例。",
    "buttonElement": null,
    "handleClickFn": null,
    "isVisible": true
  }
]
```

| 欄位 | 類型 | 說明 |
|------|------|------|
| `key` | string | 唯一識別碼（"1"~"10"） |
| `text` | string | 按鈕顯示文字 |
| `prefix` | string | 前綴文字（送出時加在使用者輸入前面） |
| `suffix` | string | 後綴文字（送出時加在使用者輸入後面） |
| `buttonElement` | null | 執行期 DOM 引用（不儲存） |
| `handleClickFn` | null | 執行期 click handler（不儲存） |
| `isVisible` | boolean | 是否在右側選單顯示 |

### 快速回覆（`Custom.Settings.QuickReply`）

Array，最多 100 筆（`QuickReplyMessageAllItems`）。

```json
[
  {
    "key": "Y",
    "text": "提供其它範例",
    "quickReplyMessage": "請提供其它範例",
    "buttonElement": null,
    "handleClickFn": null,
    "isVisible": true
  }
]
```

| 欄位 | 類型 | 說明 |
|------|------|------|
| `key` | string | "Y" 表示有內容，"none" 表示空白項 |
| `text` | string | 按鈕顯示文字 |
| `quickReplyMessage` | string | 點擊後直接送出的訊息內容 |
| `buttonElement` | null | 執行期 DOM 引用（不儲存） |
| `handleClickFn` | null | 執行期 click handler（不儲存） |
| `isVisible` | boolean | 是否在右側選單顯示 |

### 超級樣板（`Custom.Settings.SuperPrompt`）

Array，最多 1500 筆（30 分類 × 50 個，`SuperPromptSettingsAllItems`）。

```json
[
  {
    "key": 1,
    "text": "GPTs 產生器",
    "prompt": "可以幫我客製一個專屬的 Instructions...",
    "buttonElement": null,
    "handleClickFn": null,
    "isVisible": true
  }
]
```

| 欄位 | 類型 | 說明 |
|------|------|------|
| `key` | number | 流水號 1~1500 |
| `text` | string | 按鈕顯示文字 |
| `prompt` | string | 樣板內容（可含 `{{ }}` 變數語法） |
| `buttonElement` | null | 執行期 DOM 引用（不儲存） |
| `handleClickFn` | null | 執行期 click handler（不儲存） |
| `isVisible` | boolean | 是否在右側選單顯示 |

**分類映射**：使用 `findGroupAndIndex(key, 50)` 計算：
- key 1~50 → 分類 1
- key 51~100 → 分類 2
- ...
- key 1451~1500 → 分類 30

### 超級樣板分類（`Custom.Settings.SuperPromptCategoryList`）

Array，固定 30 筆（`SuperPromptCategoryListLimit`）。

```json
[
  { "key": 1, "name": "一般常用" },
  { "key": 2, "name": "工程師" },
  { "key": 3, "name": "行銷" }
]
```

| 欄位 | 類型 | 說明 |
|------|------|------|
| `key` | number | 分類序號 1~30 |
| `name` | string | 分類名稱（顯示在左側邊欄 dropdown 和右側分隔標題） |

### 選單收合狀態（`Custom.Settings.Menu.Hidden`）

```
"Y" — 選單隱藏（body 加上 class "hidden-template-buttons"）
"N" — 選單顯示
```

### 多平台支援旗標（`Custom.EnableGeminiSupport`）

```
true  — 啟用（Gemini、Claude 等平台也會注入選單）
false — 停用（僅 ChatGPT 平台有效）
```

### 主題（`theme`）

```
"dark"  — 深色主題
"light" — 淺色主題
```

## 容量估算

| 資料 | 單筆估算 | 滿載筆數 | 滿載容量 |
|------|---------|---------|---------|
| 提問樣板 | ~200 bytes | 10 | ~2 KB |
| 快速回覆 | ~150 bytes | 100 | ~15 KB |
| 超級樣板 | ~500 bytes | 1500 | ~750 KB |
| 分類名稱 | ~50 bytes | 30 | ~1.5 KB |
| 其他設定 | - | - | ~1 KB |
| **合計** | | | **~770 KB** |

Chrome Storage Local 上限 10 MB，容量充足。

## 存取函式

定義在 `js/core/storage.js`：

| 函式 | 用途 |
|------|------|
| `getData(key, defaultValue, callback)` | ChatGPT 平台讀取（localStorage 優先） |
| `getDataFromChromeStorage(key, defaultValue, callback)` | 其他平台讀取 |
| `saveData(key, value)` | 儲存（雙寫 localStorage + chrome.storage） |
| `updateChromeStorage(key, value)` | 僅寫入 chrome.storage |
| `setSupportOtherSiteFlag(flag)` | 設定多平台支援旗標（雙寫） |
