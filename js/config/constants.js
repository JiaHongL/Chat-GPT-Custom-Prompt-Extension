/**
 * config/constants.js — 集中管理全域常數
 */

/** 快速回覆最大筆數 */
export const QuickReplyMessageAllItems = 100;

/** 每分類超級樣板筆數 */
export const SuperPromptSettingsListLength = 50;

/** 超級樣板總筆數 (30 × 50) */
export const SuperPromptSettingsAllItems = 1500;

/** 超級樣板分類總數 */
export const SuperPromptCategoryListLimit = 30;

/** 拖曳自動捲動速度 */
export const SCROLL_SPEED = 2;

/** 拖曳自動捲動閾值 (px) */
export const SCROLL_THRESHOLD = 50;

/** 廣告輪播間隔 (ms) */
export const PROMO_INTERVAL = 8000;

/** 廣告初始延遲 (ms) */
export const PROMO_INITIAL_DELAY = 200;

/** 搜尋防抖時間 (ms) */
export const SEARCH_DEBOUNCE = 300;

/** Perplexity 延遲載入時間 (ms) */
export const PERPLEXITY_DELAY = 500;

// Storage Keys
export const STORAGE_KEYS = {
  PROMPT: 'Custom.Settings.Prompt',
  QUICK_REPLY: 'Custom.Settings.QuickReply',
  SUPER_PROMPT: 'Custom.Settings.SuperPrompt',
  SUPER_PROMPT_CATEGORY: 'Custom.Settings.SuperPromptCategoryList',
  MENU_HIDDEN: 'Custom.Settings.Menu.Hidden',
  GEMINI_SUPPORT: 'Custom.EnableGeminiSupport',
  THEME: 'theme',
};
