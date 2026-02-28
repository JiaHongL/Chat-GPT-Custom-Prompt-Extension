/**
 * ui/dialogs/quick_reply_dialog.js — Quick Reply Settings Dialog (#dialog4) 邏輯
 * 處理快速回覆設定視窗的顯示、儲存與拖放排序。
 */

import { quickReplyMessageList } from '../../core/state.js';
import { updateChromeStorage } from '../../core/storage.js';
import { handleTabindex, disableMenuItemTabindex, restoreMenuItemTabindex } from '../../utils/dom.js';
import { setupDragDrop } from '../components/drag_drop_list.js';

// ====== 內部狀態 ======

/** @type {Function|null} generateButtons 的參考，由外部透過 setter 注入 */
let _generateButtons = null;

/** @type {Function|null} 重新綁定拖曳按鈕事件的函式 */
let _bindDragHandles = null;

/** @type {Object} DOM 元素引用，由 initQuickReplyDialog 設定 */
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
 * 拖放排序後重算各列 tabindex
 */
function recalculateIndexes() {
  const rows = els.quickReplySettingsDialog.querySelectorAll('tr.customDragItem');
  rows.forEach((row, index) => {
    const buttonTextInput = row.querySelector('.quickReplyButtonText');
    const messageTextarea = row.querySelector('.quickReplyMessage');
    if (buttonTextInput) {
      buttonTextInput.setAttribute('tabindex', index * 2 + 1);
    }
    if (messageTextarea) {
      messageTextarea.setAttribute('tabindex', index * 2 + 2);
    }
  });
}

/** @type {Function|null} 儲存目前的 Tab 循環 keydown handler */
let quickReplyTabindexHandler = null;

/**
 * 控制 Quick Reply Settings Dialog 內的 Tab/Shift+Tab 焦點循環。
 * 每次呼叫時會先移除前一個 handler，避免累積多個 stale listener。
 */
function controlTabindex() {
  const focusableElements = els.quickReplySettingsDialog.querySelectorAll(
    'input, textarea, button'
  );
  if (focusableElements.length === 0) return;

  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length - 1];

  if (quickReplyTabindexHandler) {
    els.quickReplySettingsDialog.removeEventListener('keydown', quickReplyTabindexHandler);
  }

  quickReplyTabindexHandler = handleTabindex.bind(null, firstEl, lastEl);
  els.quickReplySettingsDialog.addEventListener('keydown', quickReplyTabindexHandler);
}

// ====== 匯出函式 ======

/**
 * 初始化 Quick Reply Settings Dialog 的事件監聽
 * @param {Object} elements - 由 base_dialog.js collectDialogElements() 收集的 DOM 元素
 */
export function initQuickReplyDialog(elements) {
  els = elements;

  // OK 按鈕：儲存設定
  els.quickReplySettingsDialogOkBtn.addEventListener('click', () => {
    saveQuickReplySettings();
  });

  // Cancel 按鈕：關閉 dialog
  els.quickReplySettingsDialogCancelBtn.addEventListener('click', () => {
    els.quickReplySettingsDialog.style.display = 'none';
    restoreMenuItemTabindex();
  });

  // 設定拖放排序
  const { bindDragHandles: bindQuickReplyDragHandles } = setupDragDrop(
    els.quickReplySettingsDialog,
    '#quickReplyFormContainer',
    recalculateIndexes,
    controlTabindex
  );
  _bindDragHandles = bindQuickReplyDragHandles;

  // 初始化時設定一次 Tab 焦點循環
  controlTabindex();
}

/**
 * 顯示 Quick Reply Settings Dialog 並填入目前設定值
 */
export function showQuickReplySettingsDialog() {
  disableMenuItemTabindex();
  els.quickReplySettingsDialog.style.display = 'flex';

  const quickReplyButtonTextElements = document.querySelectorAll('.quickReplyButtonText');
  const quickReplyMessageElements = document.querySelectorAll('.quickReplyMessage');
  const quickReplySlideElements = document.querySelectorAll('.quickReplySlide');

  quickReplyMessageList.forEach((settings, index) => {
    quickReplyButtonTextElements[index].value = settings.text;
    quickReplyMessageElements[index].value = settings.quickReplyMessage;
    quickReplySlideElements[index].checked = settings.isVisible;
    quickReplyMessageElements[index].style.height = '85px';
  });

  quickReplyButtonTextElements[0].focus();

  // Reset dragging state
  const draggingRow = els.quickReplySettingsDialog.querySelector('.dragging-row');
  if (draggingRow) draggingRow.classList.remove('dragging-row');

  // 重新綁定拖曳按鈕事件
  if (_bindDragHandles) _bindDragHandles();
}

/**
 * 儲存 Quick Reply Settings Dialog 的表單資料
 */
export function saveQuickReplySettings() {
  const quickReplyButtonTextElements = document.querySelectorAll('.quickReplyButtonText');
  const quickReplyMessageElements = document.querySelectorAll('.quickReplyMessage');
  const quickReplySlideElements = document.querySelectorAll('.quickReplySlide');

  const previousQuickReplyMessageList = JSON.parse(JSON.stringify(quickReplyMessageList));

  quickReplyMessageList.forEach((settings, index) => {
    settings.text = quickReplyButtonTextElements[index].value;
    settings.quickReplyMessage = quickReplyMessageElements[index].value;
    settings.isVisible = quickReplySlideElements[index].checked;

    if (previousQuickReplyMessageList.isVisible) {
      settings.buttonElement.removeEventListener('click', settings.handleClickFn);
      settings.buttonElement.remove();
      delete settings.buttonElement;
      delete settings.handleClickFn;
    }
  });

  localStorage.setItem('Custom.Settings.QuickReply', JSON.stringify(quickReplyMessageList));
  updateChromeStorage('Custom.Settings.QuickReply', quickReplyMessageList);
  _generateButtons();

  els.quickReplySettingsDialog.style.display = 'none';
  restoreMenuItemTabindex();
}
