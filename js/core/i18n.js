/**
 * core/i18n.js — i18n wrapper
 * 封裝 chrome.i18n.getMessage，提供錯誤處理與 Fallback。
 */

/**
 * 取得 i18n 訊息
 * @param {string} key - 訊息 key
 * @param {string[]} params - 替換參數
 * @returns {string}
 */
export const i18n = (key, params = []) => {
  try {
    return chrome.i18n.getMessage(key, params);
  } catch (error) {
    console.log('i18n', error);
    return '';
  }
};

/**
 * 取得 UI 語系
 * @returns {string}
 */
export const getUILanguage = () => {
  try {
    return chrome.i18n.getUILanguage();
  } catch (error) {
    console.log('getUILanguage', error);
    return 'en-US';
  }
};
