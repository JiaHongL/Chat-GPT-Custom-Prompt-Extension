/**
 * core/state.js — 全域狀態管理
 * 集中管理所有運行時狀態變數。
 */

// ====== 平台偵測 ======
export const supportOtherSite = !window.location.href.includes('chatgpt.com');
export const supportGemini = window.location.href.includes('gemini.google.com');
export const supportClaude = window.location.href.includes('claude.ai');
export const supportGrok = window.location.href.includes('grok.com');
export const supportFelo = window.location.href.includes('felo.ai');
export const supportPerplexity = window.location.href.includes('perplexity.ai');
export const supportChatGPT = !supportOtherSite && !supportClaude && !supportGrok && !supportFelo && !supportPerplexity;

// ====== 語系偵測 ======
const userLanguage = navigator.language || chrome.i18n.getUILanguage();
export const isTW =
  Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Taipei' ||
  userLanguage?.includes('zh-TW');

// ====== 平台按鍵設定 ======
const isMac = navigator.userAgent.indexOf('Mac') !== -1;
export const mainKey = isMac ? 'ctrlKey' : 'altKey';
export const mainKeyText = isMac ? 'control' : 'alt';

// ====== 資料列表 (可變狀態) ======

/** 預設 prompt list (由 locale 決定) */
export let defaultPromptList = null;

/** 預設 quick reply list (由 locale 決定) */
export let defaultQuickReplyMessageList = null;

/** 預設 super prompt list (由 locale 決定) */
export let defaultSuperPromptList = null;

/** 預設 super prompt category list */
export let defaultSuperPromptCategoryList = null;

/** 目前使用的 prompt list */
export let promptList = [];

/** 目前使用的 quick reply list */
export let quickReplyMessageList = [];

/** 目前使用的 super prompt list */
export let superPromptList = [];

/** 目前使用的 super prompt category list */
export let superPromptCategoryList = [];

// ====== Dialog 狀態 ======
export let questionId = '';
export let prefix = '';
export let suffix = '';
export let superPrompt = '';
export let superPromptId = '';
export let superPromptName = '';
export let isComposing = false;
export let currentSuperSettingFormType = 1;
export let importType = 0;

// ====== DOM 元素引用 ======
export let menuDivElement = null;

// ====== Setter 函式 (因為 ES Module export 是 live binding 只讀) ======

export function setDefaultPromptList(val) { defaultPromptList = val; }
export function setDefaultQuickReplyMessageList(val) { defaultQuickReplyMessageList = val; }
export function setDefaultSuperPromptList(val) { defaultSuperPromptList = val; }
export function setDefaultSuperPromptCategoryList(val) { defaultSuperPromptCategoryList = val; }

export function setPromptList(val) { promptList = val; }
export function setQuickReplyMessageList(val) { quickReplyMessageList = val; }
export function setSuperPromptList(val) { superPromptList = val; }
export function setSuperPromptCategoryList(val) { superPromptCategoryList = val; }

export function setQuestionId(val) { questionId = val; }
export function setPrefix(val) { prefix = val; }
export function setSuffix(val) { suffix = val; }
export function setSuperPrompt(val) { superPrompt = val; }
export function setSuperPromptId(val) { superPromptId = val; }
export function setSuperPromptName(val) { superPromptName = val; }
export function setIsComposing(val) { isComposing = val; }
export function setCurrentSuperSettingFormType(val) { currentSuperSettingFormType = val; }
export function setImportType(val) { importType = val; }
export function setMenuDivElement(val) { menuDivElement = val; }
