/**
 * ui/dialogs/settings_dialog.js — Settings Dialog (#dialog2) 邏輯
 * 處理設定視窗的顯示、表單讀寫與儲存。
 */

import { promptList } from '../../core/state.js';
import { updateChromeStorage } from '../../core/storage.js';
import { handleTabindex, disableMenuItemTabindex, restoreMenuItemTabindex } from '../../utils/dom.js';

// ====== 內部狀態 ======

/** @type {Function|null} generateButtons 的參考，由外部透過 setter 注入 */
let _generateButtons = null;

/** @type {Object} DOM 元素引用，由 initSettingsDialog 設定 */
let els = {};

// ====== Setter ======

/**
 * 設定 generateButtons 的函式參考（避免循環依賴）
 * @param {Function} fn
 */
export function setGenerateButtons(fn) {
  _generateButtons = fn;
}

// ====== 內部函式 ======

/**
 * 控制 Settings Dialog 內的 Tab/Shift+Tab 焦點循環
 */
function controlSettingsDialogTabindex() {
  const focusableElements = els.settingsDialog.querySelectorAll('input, textarea, button');
  if (focusableElements.length === 0) return;

  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length - 1];

  els.settingsDialog.addEventListener('keydown', (e) => {
    handleTabindex(firstEl, lastEl, e);
  });
}

// ====== 匯出函式 ======

/**
 * 初始化 Settings Dialog 的事件監聽
 * @param {Object} elements - 由 base_dialog.js collectDialogElements() 收集的 DOM 元素
 */
export function initSettingsDialog(elements) {
  els = elements;

  // OK 按鈕：儲存設定
  els.settingsDialogOkBtn.addEventListener('click', () => {
    saveSittings();
  });

  // Cancel 按鈕：關閉 dialog
  els.settingsDialogCancelBtn.addEventListener('click', () => {
    els.settingsDialog.style.display = 'none';
    restoreMenuItemTabindex();
  });

  // Esc 鍵盤快捷鍵：關閉 dialog
  els.settingsDialog.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      els.settingsDialog.style.display = 'none';
      restoreMenuItemTabindex();
    }
  });

  // Tab 循環
  controlSettingsDialogTabindex();
}

/**
 * 顯示 Settings Dialog，將 promptList 資料填入表單
 * @param {number|null} focusElementIndex - 要聚焦的欄位索引（可選）
 */
export function showSettingsDialog(focusElementIndex = null) {
  els.settingsDialog.style.display = 'flex';
  disableMenuItemTabindex();

  const btnTextInputElements = document.querySelectorAll('.btnTextInput');
  const prefixInputElements = document.querySelectorAll('.prefixInput');
  const suffixInputElements = document.querySelectorAll('.suffixInput');
  const promptSlideElements = document.querySelectorAll('.promptSlide');

  let startIndex = 0;
  let endIndex = 10;

  for (let index = startIndex; index < endIndex; index++) {
    btnTextInputElements[index].value = promptList[index].text;
    prefixInputElements[index].value = promptList[index].prefix;
    suffixInputElements[index].value = promptList[index].suffix;
    promptSlideElements[index].checked = promptList[index].isVisible;
    prefixInputElements[index].style.height = '85px';
    suffixInputElements[index].style.height = '85px';
  }

  if (focusElementIndex) {
    btnTextInputElements[focusElementIndex].focus();
  } else {
    btnTextInputElements[0].focus();
  }
}

/**
 * 讀取表單值寫回 promptList，儲存至 localStorage 與 chromeStorage，並重新產生按鈕
 */
export function saveSittings() {
  const btnTextInputElements = document.querySelectorAll('.btnTextInput');
  const prefixInputElements = document.querySelectorAll('.prefixInput');
  const suffixInputElements = document.querySelectorAll('.suffixInput');
  const promptSlideElements = document.querySelectorAll('.promptSlide');

  let startIndex = 0;
  let endIndex = 10;

  const previousPromptList = JSON.parse(JSON.stringify(promptList));

  for (let index = startIndex; index < endIndex; index++) {
    promptList[index].text = btnTextInputElements[index].value;
    promptList[index].prefix = prefixInputElements[index].value;
    promptList[index].suffix = suffixInputElements[index].value;
    promptList[index].isVisible = promptSlideElements[index].checked;

    if (previousPromptList.isVisible) {
      promptList[index].buttonElement.removeEventListener('click', promptList[index].handleClickFn);
      promptList[index].buttonElement.remove();
      delete promptList[index].buttonElement;
      delete promptList[index].handleClickFn;
    }
  }

  localStorage.setItem('Custom.Settings.Prompt', JSON.stringify(promptList));
  updateChromeStorage('Custom.Settings.Prompt', promptList);

  if (_generateButtons) {
    _generateButtons();
  }

  els.settingsDialog.style.display = 'none';
  restoreMenuItemTabindex();
}
