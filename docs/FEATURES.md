# 功能清單

## 已完成功能

### 右側浮動選單
- [x] Control+A 切換顯示/隱藏（Mac: Control, Windows: Alt）
- [x] 搜尋框（依按鈕名稱即時過濾，300ms 防抖）
- [x] 提問樣板區（最多 10 個按鈕，可自訂前綴/後綴）
- [x] 超級樣板區（30 分類 × 50 個，支援 `{{ }}` 變數語法）
- [x] 快速回覆區（最多 100 個按鈕，點擊直接送出）
- [x] 按鈕顏色自訂（success / info / warning / primary / secondary / light）
- [x] 按鈕顯示/隱藏切換
- [x] 選單收合狀態持久化

### 提問樣板
- [x] 前綴 + 使用者輸入 + 後綴 組合送出
- [x] 預覽區顯示前綴/後綴
- [x] 10 組提問樣板設定 Dialog（表格形式）
- [x] 前 5 組支援快捷鍵（Control/Alt + 1~5）

### 超級樣板
- [x] `{{ }}` 變數語法（text / select / checkbox / radio）
- [x] `{{ 變數 || 預設值 }}` 帶預設值
- [x] 填寫 Dialog 動態產生表單
- [x] 30 組分類，每組最多 50 個
- [x] 分類名稱自訂 Dialog
- [x] 顯示/隱藏切換
- [x] 拖曳排序（同分類內）

### 快速回覆
- [x] 點擊直接送出（不彈 Dialog）
- [x] 最多 100 個
- [x] 設定 Dialog（按鈕文字 + 回覆內容）
- [x] 拖曳排序
- [x] 顯示/隱藏切換

### 匯入/匯出
- [x] 匯出為 JSON 檔案
- [x] 從 JSON 匯入
- [x] 支援提問樣板、超級樣板、快速回覆分別匯入匯出

### ChatGPT 左側邊欄
- [x] 提問助手選單 toggle（顯示/隱藏右側選單）
- [x] Gemini 支援 toggle（啟用/停用多平台支援）
- [x] 相關設定 dropdown（提問樣板設定、快速回覆設定、匯入/匯出）
- [x] 超級樣板 dropdown（30 個分類入口 + 分類名稱設定）
- [x] MutationObserver 自動重新注入（ChatGPT 動態更換 nav 時）

### 多平台支援
- [x] ChatGPT（chatgpt.com, chat.openai.com）
- [x] Gemini（gemini.google.com）
- [x] Claude（claude.ai）
- [x] Grok（grok.com）
- [x] Felo（felo.ai）
- [x] Perplexity（perplexity.ai）

### 主題
- [x] 深色/淺色主題自動偵測
- [x] 各平台主題偵測適配（Gemini, Claude, Perplexity 各有不同機制）
- [x] 主題手動切換（Control+D）
- [x] 右側選單深色/淺色配色
- [x] 左側邊欄 dropdown 深色/淺色配色

### 鍵盤快捷鍵
- [x] Control/Alt + A：切換選單顯示
- [x] Control/Alt + D：切換深色/淺色主題
- [x] Control/Alt + 1~5：觸發前 5 個提問樣板
- [x] Control/Alt + S：在各 Dialog 中儲存/送出
- [x] Esc：關閉 Dialog / dropdown
- [x] Tab/Shift+Tab：Dialog 內焦點循環
- [x] 快捷鍵提示 Dialog

### 其他
- [x] 下載當前對話為 HTML 檔案
- [x] 多語系支援（zh-TW, zh-CN, en, ja, ko）
- [x] 底部廣告/推廣輪播
- [x] IME composition 事件處理（防止中文/日文輸入中被快捷鍵攔截）

## 計畫中功能

- [ ] Prompt 收藏夾 / 釘選功能
- [ ] Prompt 使用次數統計與排序
- [ ] 最近使用記錄
- [ ] 對話書籤
- [ ] 智慧右鍵選單
- [ ] 輸出格式範本
- [ ] Prompt 鏈（Chain / Workflow）

## 已知限制

- ChatGPT 的 DOM 結構會頻繁改版，選擇器需定期更新
- Content Script 無法使用 `eval()` 或 inline script（Manifest V3 CSP）
- Chrome Storage Local 容量上限 10 MB
- 不同平台的輸入框行為差異大（contenteditable vs textarea vs rich-textarea）
- Perplexity 頁面載入較慢，需延遲 500ms 才能正確注入
