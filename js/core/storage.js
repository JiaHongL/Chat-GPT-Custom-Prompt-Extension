/**
 * core/storage.js — Data Access Layer
 * 封裝 localStorage 與 chrome.storage.local 的雙向同步邏輯。
 */

import { STORAGE_KEYS } from '../config/constants.js';

/**
 * ChatGPT 平台用：localStorage 優先，chrome.storage.local 補充
 * @param {string} storageKey - Storage key
 * @param {*} defaultValue - 預設值
 * @param {function} callback - 取得資料後的回調 callback(parsedData)
 */
export function getData(storageKey, defaultValue, callback) {
  const localData = localStorage.getItem(storageKey);

  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      callback(parsed);
    } catch (e) {
      callback(defaultValue);
    }
  } else {
    chrome.storage.local.get([storageKey], (result) => {
      if (result[storageKey]) {
        try {
          const parsed =
            typeof result[storageKey] === 'string'
              ? JSON.parse(result[storageKey])
              : result[storageKey];
          localStorage.setItem(storageKey, JSON.stringify(parsed));
          callback(parsed);
        } catch (e) {
          callback(defaultValue);
        }
      } else {
        callback(defaultValue);
      }
    });
  }
}

/**
 * 非 ChatGPT 平台用：直接從 chrome.storage.local 讀取
 * @param {string} storageKey - Storage key
 * @param {*} defaultValue - 預設值
 * @param {function} callback - 取得資料後的回調 callback(parsedData)
 */
export function getDataFromChromeStorage(storageKey, defaultValue, callback) {
  chrome.storage.local.get([storageKey], (result) => {
    if (result[storageKey]) {
      try {
        const parsed =
          typeof result[storageKey] === 'string'
            ? JSON.parse(result[storageKey])
            : result[storageKey];
        callback(parsed);
      } catch (e) {
        callback(defaultValue);
      }
    } else {
      callback(defaultValue);
    }
  });
}

/**
 * 儲存資料（雙寫 localStorage + chrome.storage.local）
 * @param {string} storageKey - Storage key
 * @param {*} value - 要儲存的值（會自動 JSON.stringify）
 */
export function saveData(storageKey, value) {
  const jsonStr = JSON.stringify(value);
  localStorage.setItem(storageKey, jsonStr);
  updateChromeStorage(storageKey, jsonStr);
}

/**
 * 將資料同步到 chrome.storage.local
 * @param {string} storageKey - Storage key
 * @param {*} value - 要儲存的值
 */
export function updateChromeStorage(storageKey, value) {
  chrome.storage.local.set({ [storageKey]: value });
}

/**
 * 設定多平台支援旗標（雙寫）
 * @param {boolean} flag
 */
export function setSupportOtherSiteFlag(flag) {
  localStorage.setItem(STORAGE_KEYS.GEMINI_SUPPORT, flag);
  chrome.storage.local.set({ [STORAGE_KEYS.GEMINI_SUPPORT]: flag });
}
