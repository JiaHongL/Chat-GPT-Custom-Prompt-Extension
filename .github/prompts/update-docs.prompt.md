---
mode: agent
description: "程式碼變動後，自動同步更新專案 .md 文件"
---

## 任務

請根據剛才的程式碼變動，檢查並更新以下文件。
只更新受影響的區塊，不要重寫整份文件。

## 需檢查的文件

| 文件 | 路徑 |
|------|------|
| Copilot Instructions | `.github/copilot-instructions.md` |
| 架構文件 | `docs/ARCHITECTURE.md` |
| 功能清單 | `docs/FEATURES.md` |
| 儲存結構 | `docs/STORAGE.md` |
| 開發指南 | `docs/DEVELOPMENT.md` |

## 檢查清單

### 1. 新增/刪除/搬移檔案
- [ ] 更新 `.github/copilot-instructions.md` 的「專案結構」樹狀圖
- [ ] 更新 `docs/ARCHITECTURE.md` 的「模組依賴關係」

### 2. 新增/完成功能
- [ ] 更新 `docs/FEATURES.md`（已完成的打勾 `[x]`，從「計畫中」移到「已完成」）
- [ ] 如有新概念，更新 `.github/copilot-instructions.md` 的「核心概念」

### 3. 修改 Storage Key 或資料結構
- [ ] 更新 `docs/STORAGE.md` 的 Key 表格和資料結構範例

### 4. 新增平台支援
- [ ] 更新 `.github/copilot-instructions.md` 的「支援平台」表格和「專案結構」
- [ ] 更新 `docs/ARCHITECTURE.md` 的模組依賴和平台適配器列表
- [ ] 更新 `docs/FEATURES.md` 的「多平台支援」清單
- [ ] 更新 `docs/DEVELOPMENT.md` 的「新增平台適配器」步驟（如流程有變）

### 5. 修改 UI 結構（新增 Dialog / 元件）
- [ ] 更新 `docs/ARCHITECTURE.md` 的「UI 層級結構」
- [ ] 更新 `docs/ARCHITECTURE.md` 的「跨模組相依注入」表格（如有新的 setter injection）

### 6. 修改啟動流程或事件流
- [ ] 更新 `docs/ARCHITECTURE.md` 的「啟動流程」或「事件流」

### 7. 修改程式碼風格或開發規範
- [ ] 更新 `.github/copilot-instructions.md` 的「程式碼風格」
- [ ] 更新 `docs/DEVELOPMENT.md` 相關區塊

## 速查表

| 變動類型 | copilot-instructions | ARCHITECTURE | FEATURES | STORAGE | DEVELOPMENT |
|---------|:-:|:-:|:-:|:-:|:-:|
| 新增/刪除檔案 | ✅ | ✅ | | | |
| 新增功能 | △ | △ | ✅ | △ | |
| 修改 Storage 結構 | | | | ✅ | |
| 新增平台 | ✅ | ✅ | ✅ | | ✅ |
| 新增 UI/Dialog | | ✅ | | | △ |
| 修改啟動/事件流 | | ✅ | | | |
| 修改開發規範 | ✅ | | | | ✅ |

✅ = 必須更新　△ = 視情況更新

## 更新規則

- **只改有變動的區塊**，不重寫整份文件
- 新完成的功能標記 `- [x]` 並從「計畫中功能」移到「已完成功能」
- 已刪除的功能直接移除，不留刪除線
- 樹狀結構使用 `├──` `└──` `│` 符號
- 表格保持欄位對齊
- Storage Key 說明需包含：Key 名稱、類型、預設值、用途
