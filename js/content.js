/**
 * content.js — 主入口模組
 * 
 * 負責匯入所有模組、連接跨模組相依性、並啟動初始化流程。
 * 此檔案對應原始 content.js 的初始化邏輯。
 */

// ====== Config ======
import { STORAGE_KEYS, PERPLEXITY_DELAY } from './config/constants.js';

// ====== Core ======
import { getUILanguage } from './core/i18n.js';
import {
  supportOtherSite, supportGemini, supportClaude, supportPerplexity,
  defaultPromptList, defaultQuickReplyMessageList,
  defaultSuperPromptList, defaultSuperPromptCategoryList,
  setDefaultPromptList, setDefaultQuickReplyMessageList,
  setDefaultSuperPromptList, setDefaultSuperPromptCategoryList,
  setPromptList, setQuickReplyMessageList,
  setSuperPromptList, setSuperPromptCategoryList,
  setIsComposing,
} from './core/state.js';
import { getData, getDataFromChromeStorage, setSupportOtherSiteFlag } from './core/storage.js';

// ====== Data ======
import { getDefaultPromptList } from './data/default_prompts.js';
import { getDefaultQuickReplyList } from './data/default_quick_replies.js';
import {
  getDefaultSuperPromptList,
  buildDefaultSuperPromptCategoryList,
} from './data/default_super_prompts.js';

// ====== UI — Styles ======
import { injectStyles } from './ui/styles.js';

// ====== UI — Dialogs ======
import { appendAllDialogs, collectDialogElements } from './ui/dialogs/base_dialog.js';
import {
  initQuestionDialog, showQuestionDialog, sendQuestionForm,
  setShowSettingsDialog as setQuestionShowSettings,
} from './ui/dialogs/question_dialog.js';
import {
  initSettingsDialog, showSettingsDialog, saveSittings,
  setGenerateButtons as setSettingsGenBtn,
} from './ui/dialogs/settings_dialog.js';
import { initShortcutHintDialog } from './ui/dialogs/shortcut_hint_dialog.js';
import {
  initQuickReplyDialog, showQuickReplySettingsDialog, saveQuickReplySettings,
  setGenerateButtons as setQuickReplyGenBtn,
} from './ui/dialogs/quick_reply_dialog.js';
import {
  initExportImportDialog, openExportAndImportDialog,
  setGenerateButtons as setExportGenBtn,
  setResetCustomMenuItem as setExportResetMenu,
} from './ui/dialogs/export_import_dialog.js';
import {
  initSuperPromptSettingsDialog, showSuperPromptSettingDialog, saveSuperPromptSittings,
  setGenerateButtons as setSuperSettingsGenBtn,
} from './ui/dialogs/super_prompt_settings.js';
import {
  initSuperPromptDialog, showSuperPromptDialog, sendSuperPrompt,
  setShowSuperPromptSettingDialog as setSuperDialogShowSettings,
} from './ui/dialogs/super_prompt_dialog.js';
import {
  initCategoryNameDialog, showSuperPromptCategoryNameSettingsDialog,
  saveSuperPromptCategoryNameSettings,
  setResetCustomMenuItem as setCategoryResetMenu,
} from './ui/dialogs/category_name_dialog.js';

// ====== UI — Menu & Sidebar ======
import {
  generateButtons, collapseToggle,
  setShowQuestionDialog, setShowSuperPromptDialog,
  setDownloadChatGPTConversationAsHtml,
} from './ui/menu.js';
import {
  subscribeMutationObserver, resetCustomMenuItem, handleDocumentClick,
  setShowSettingsDialog as setSidebarShowSettings,
  setShowQuickReplySettingsDialog as setSidebarShowQuickReply,
  setOpenExportAndImportDialog as setSidebarOpenExportImport,
  setShowSuperPromptSettingDialog as setSidebarShowSuperSettings,
  setShowSuperPromptCategoryNameSettingsDialog as setSidebarShowCategoryName,
} from './ui/chatgpt_sidebar.js';

// ====== Features ======
import { startAdsRotation } from './features/ads_rotator.js';
import {
  checkGeminiTheme, checkClaudeOrClaudeTheme, checkPerplexityTheme,
  darkModeToggle,
} from './features/theme_manager.js';
import { downloadChatGPTConversationAsHtml } from './features/chat_downloader.js';
import {
  initShortcuts,
  setCollapseToggle, setDarkModeToggle,
  setSendQuestionForm, setSaveSittings,
  setSaveQuickReplySettings, setSaveSuperPromptSittings,
  setSendSuperPrompt, setSaveSuperPromptCategoryNameSettings,
} from './features/shortcuts.js';

// ==========================================================
// 啟動流程
// ==========================================================

/**
 * 設定 locale 對應的預設資料列表
 */
function setDefaultList() {
  const locale = getUILanguage();
  setDefaultPromptList(getDefaultPromptList(locale));
  setDefaultQuickReplyMessageList(getDefaultQuickReplyList(locale));
  setDefaultSuperPromptList(getDefaultSuperPromptList(locale));
  setDefaultSuperPromptCategoryList(buildDefaultSuperPromptCategoryList());
}

/**
 * init() — 對應原始 content.js 的 init()
 * 隱藏所有 Dialog → 偵測佈景主題 → 載入 4 組資料 + 選單收合狀態
 */
function init(els) {
  // 隱藏所有 dialog
  els.questionDialog.style.display = 'none';
  els.settingsDialog.style.display = 'none';
  els.shortcutKeyHintDialog.style.display = 'none';
  els.exportAndImportDialog.style.display = 'none';
  els.superPromptSettingsDialog.style.display = 'none';
  els.superPromptDialog.style.display = 'none';

  if (supportOtherSite) {
    // 偵測佈景主題
    if (supportGemini) checkGeminiTheme();
    if (supportClaude) checkClaudeOrClaudeTheme();
    if (supportPerplexity) checkPerplexityTheme();

    // 從 chrome.storage 讀取資料
    getDataFromChromeStorage(STORAGE_KEYS.PROMPT, defaultPromptList, (value) => {
      setPromptList(value);
    });
    getDataFromChromeStorage(STORAGE_KEYS.QUICK_REPLY, defaultQuickReplyMessageList, (value) => {
      setQuickReplyMessageList(value);
    });
    getDataFromChromeStorage(STORAGE_KEYS.SUPER_PROMPT, defaultSuperPromptList, (value) => {
      setSuperPromptList(value);
    });
    getDataFromChromeStorage(STORAGE_KEYS.SUPER_PROMPT_CATEGORY, defaultSuperPromptCategoryList, (value) => {
      setSuperPromptCategoryList(value);
    });

    // 處理選單收合狀態
    document.body.classList.add('hidden-template-buttons');
    getDataFromChromeStorage(STORAGE_KEYS.MENU_HIDDEN, 'N', (value) => {
      if (window.localStorage.getItem(STORAGE_KEYS.MENU_HIDDEN)) {
        value = window.localStorage.getItem(STORAGE_KEYS.MENU_HIDDEN);
      }
      window.localStorage.setItem(STORAGE_KEYS.MENU_HIDDEN, value);
      if (value === 'Y') {
        document.body.classList.add('hidden-template-buttons');
      } else {
        document.body.classList.remove('hidden-template-buttons');
      }
      generateButtons();
    });
  } else {
    // ChatGPT 平台：localStorage 優先
    getData(STORAGE_KEYS.PROMPT, defaultPromptList, (value) => {
      setPromptList(value);
    });
    getData(STORAGE_KEYS.QUICK_REPLY, defaultQuickReplyMessageList, (value) => {
      setQuickReplyMessageList(value);
    });
    getData(STORAGE_KEYS.SUPER_PROMPT, defaultSuperPromptList, (value) => {
      setSuperPromptList(value);
    });
    getData(STORAGE_KEYS.SUPER_PROMPT_CATEGORY, defaultSuperPromptCategoryList, (value) => {
      setSuperPromptCategoryList(value);
    });

    // 處理選單收合狀態
    getData(STORAGE_KEYS.MENU_HIDDEN, 'N', (value) => {
      if (value === 'Y') {
        document.body.classList.add('hidden-template-buttons');
      } else {
        document.body.classList.remove('hidden-template-buttons');
      }
      generateButtons();
    });

    // 同步 chrome.storage.local 的多平台支援旗標
    if (window.localStorage.getItem(STORAGE_KEYS.GEMINI_SUPPORT)) {
      const flag = window.localStorage.getItem(STORAGE_KEYS.GEMINI_SUPPORT) === 'true';
      setSupportOtherSiteFlag(flag);
    }
  }
}

/**
 * 為各 Dialog textarea / input 加上 composition 事件監聽
 * 防止 IME 輸入中被 Enter/Esc 快捷鍵攔截
 */
function addAllCompositionEventListeners(els) {
  // questionDialog textarea
  els.questionDialogTextarea.addEventListener('compositionstart', () => setIsComposing(true));
  els.questionDialogTextarea.addEventListener('compositionend', () => setIsComposing(false));

  // 各 dialog 中的 input/textarea
  [
    '.btnTextInput',
    '.prefixInput',
    '.suffixInput',
    '.quickReplyButtonText',
    '.quickReplyMessage',
    '.superPromptButtonText',
    '.superPromptText',
  ].forEach((selector) => {
    document.querySelectorAll(selector).forEach((input) => {
      input.addEventListener('compositionstart', () => setIsComposing(true));
      input.addEventListener('compositionend', () => setIsComposing(false));
    });
  });
}

// ==========================================================
// 主啟動函式
// ==========================================================

function main() {
  // 1. 設定 locale 預設資料
  setDefaultList();

  // 2. 注入 CSS
  injectStyles();

  // 3. 注入 Dialog DOM
  appendAllDialogs(collapseToggle);

  // 4. 收集 Dialog DOM 元素
  const els = collectDialogElements();

  // 5. 初始化各 Dialog 模組
  initQuestionDialog(els);
  initSettingsDialog(els);
  initShortcutHintDialog(els);
  initQuickReplyDialog(els);
  initExportImportDialog(els);
  initSuperPromptSettingsDialog(els);
  initSuperPromptDialog(els);
  initCategoryNameDialog(els);

  // 6. 連接跨模組相依性 (Setter Injection)
  //    question_dialog ← settings_dialog
  setQuestionShowSettings(showSettingsDialog);
  //    settings_dialog ← generateButtons
  setSettingsGenBtn(generateButtons);
  //    quick_reply_dialog ← generateButtons
  setQuickReplyGenBtn(generateButtons);
  //    export_import_dialog ← generateButtons, resetCustomMenuItem
  setExportGenBtn(generateButtons);
  setExportResetMenu(resetCustomMenuItem);
  //    super_prompt_settings ← generateButtons
  setSuperSettingsGenBtn(generateButtons);
  //    super_prompt_dialog ← showSuperPromptSettingDialog
  setSuperDialogShowSettings(showSuperPromptSettingDialog);
  //    category_name_dialog ← resetCustomMenuItem
  setCategoryResetMenu(resetCustomMenuItem);
  //    menu ← showQuestionDialog, showSuperPromptDialog, downloadChatGPTConversationAsHtml
  setShowQuestionDialog(showQuestionDialog);
  setShowSuperPromptDialog(showSuperPromptDialog);
  setDownloadChatGPTConversationAsHtml(downloadChatGPTConversationAsHtml);
  //    chatgpt_sidebar ← 各 dialog 開啟函式
  setSidebarShowSettings(showSettingsDialog);
  setSidebarShowQuickReply(showQuickReplySettingsDialog);
  setSidebarOpenExportImport(openExportAndImportDialog);
  setSidebarShowSuperSettings(showSuperPromptSettingDialog);
  setSidebarShowCategoryName(showSuperPromptCategoryNameSettingsDialog);

  // 7. 初始化鍵盤快捷鍵
  setCollapseToggle(collapseToggle);
  setDarkModeToggle(darkModeToggle);
  setSendQuestionForm(sendQuestionForm);
  setSaveSittings(saveSittings);
  setSaveQuickReplySettings(saveQuickReplySettings);
  setSaveSuperPromptSittings(saveSuperPromptSittings);
  setSendSuperPrompt(sendSuperPrompt);
  setSaveSuperPromptCategoryNameSettings(saveSuperPromptCategoryNameSettings);
  initShortcuts(els);

  // 8. 監聽 composition 事件
  addAllCompositionEventListeners(els);

  // 9. 監聽全域點擊事件 (關閉 dropdown)
  document.addEventListener('click', handleDocumentClick);

  // 10. 執行 init (載入資料、偵測主題、處理選單收合)
  init(els);

  // 11. 先以預設資料產生按鈕 (資料載入完成後會再次呼叫)
  generateButtons();

  // 12. 延遲啟動 MutationObserver (左側選單注入)
  setTimeout(() => {
    subscribeMutationObserver();
  }, 1000);

  // 13. 啟動廣告輪播
  startAdsRotation();
}

// ==========================================================
// 支援 supportOtherSite 的 body class
// ==========================================================

if (supportOtherSite) {
  document.body.classList.add('supportOtherSite');
}

// ==========================================================
// Perplexity 平台延遲啟動，其他平台立即啟動
// ==========================================================

const delay = supportPerplexity ? PERPLEXITY_DELAY : 0;
setTimeout(main, delay);
