/**
 * ui/dialogs/question_dialog.js — Question Dialog (#dialog) 邏輯
 * 處理提問視窗的顯示、事件綁定與送出。
 */

import { supportOtherSite, isComposing, setIsComposing, prefix, suffix, questionId } from '../../core/state.js';
import { sendMessage } from '../../platforms/factory.js';
import { disableMenuItemTabindex, restoreMenuItemTabindex, handleTabindex } from '../../utils/dom.js';

// ====== 內部狀態 ======

/** @type {Function|null} showSettingsDialog 的參考，由外部透過 setter 注入 */
let _showSettingsDialog = null;

/** @type {Object} DOM 元素引用，由 initQuestionDialog 設定 */
let els = {};

// ====== Setter ======

/**
 * 設定 showSettingsDialog 的函式參考（避免循環依賴）
 * @param {Function} fn
 */
export function setShowSettingsDialog(fn) {
  _showSettingsDialog = fn;
}

// ====== 內部函式 ======

/**
 * 組合訊息並送出
 * @param {boolean} isInsert - 是否以插入模式送出
 */
export function sendQuestionForm(isInsert = false) {
  const message = `${prefix}${els.questionDialogTextarea.value}${suffix}`;
  els.questionDialog.style.display = 'none';
  restoreMenuItemTabindex();
  sendMessage(message, isInsert);
}

/**
 * 控制 Question Dialog 內的 Tab/Shift+Tab 焦點循環
 */
function controlQuestionDialogTabindex() {
  const focusableElements = els.questionDialog.querySelectorAll('textarea, button');
  if (focusableElements.length === 0) return;

  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length - 1];

  els.questionDialog.addEventListener('keydown', (e) => {
    handleTabindex(firstEl, lastEl, e);
  });
}

// ====== 匯出函式 ======

/**
 * 初始化 Question Dialog 的事件監聽
 * @param {Object} elements - 由 base_dialog.js collectDialogElements() 收集的 DOM 元素
 */
export function initQuestionDialog(elements) {
  els = elements;

  // Edit 按鈕：關閉 dialog 並開啟設定視窗
  els.questionDialogEditBtn.addEventListener('click', () => {
    if (supportOtherSite) return;
    els.questionDialog.style.display = 'none';
    restoreMenuItemTabindex();
    if (_showSettingsDialog) {
      _showSettingsDialog(questionId - 1);
    }
  });

  // Textarea 鍵盤事件
  els.questionDialogTextarea.addEventListener('keydown', (event) => {
    // 空白時按 Enter → 阻止預設行為
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      els.questionDialogTextarea.value.trim() === ''
    ) {
      event.preventDefault();
      return;
    }

    // Enter（非組合輸入、非 Shift、焦點在 textarea）→ 送出
    if (
      !isComposing &&
      !event.shiftKey &&
      document.activeElement === els.questionDialogTextarea &&
      event.key === 'Enter'
    ) {
      sendQuestionForm();
      return;
    }

    // Esc → 關閉 dialog
    if (
      !isComposing &&
      event.key === 'Escape'
    ) {
      els.questionDialog.style.display = 'none';
      restoreMenuItemTabindex();
      return;
    }
  });

  // OK 按鈕：送出
  els.questionDialogOkBtn.addEventListener('click', () => {
    if (els.questionDialogTextarea.value.trim() === '') return;
    els.questionDialog.style.display = 'none';
    restoreMenuItemTabindex();
    sendQuestionForm();
  });

  // Insert 按鈕：以插入模式送出
  els.questionDialogInsertBtn.addEventListener('click', () => {
    if (els.questionDialogTextarea.value.trim() === '') return;
    els.questionDialog.style.display = 'none';
    restoreMenuItemTabindex();
    sendQuestionForm(true);
  });

  // Cancel 按鈕：關閉 dialog
  els.questionDialogCancelBtn.addEventListener('click', () => {
    els.questionDialog.style.display = 'none';
    restoreMenuItemTabindex();
  });

  // 組合輸入事件（IME）
  els.questionDialogTextarea.addEventListener('compositionstart', () => {
    setIsComposing(true);
  });

  els.questionDialogTextarea.addEventListener('compositionend', () => {
    setIsComposing(false);
  });

  // Tab 焦點循環
  controlQuestionDialogTabindex();
}

/**
 * 顯示 Question Dialog
 */
export function showQuestionDialog() {
  const innerHTML =
    prefix.replace(/\n/g, '<br>') +
    ' {{ $input }} ' +
    suffix.replace(/\n/g, '<br>');

  els.questionPreviewAreaDiv.innerHTML = innerHTML;

  disableMenuItemTabindex();
  els.questionDialog.style.display = 'flex';
  els.questionDialogTextarea.value = '';

  els.questionDialogTextarea.focus();
}
