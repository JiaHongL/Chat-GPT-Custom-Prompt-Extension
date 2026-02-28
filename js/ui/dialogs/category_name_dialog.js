import { superPromptCategoryList } from '../../core/state.js';
import { SuperPromptCategoryListLimit } from '../../config/constants.js';
import { i18n } from '../../core/i18n.js';
import { handleTabindex, disableMenuItemTabindex, restoreMenuItemTabindex } from '../../utils/dom.js';

let _resetCustomMenuItem = null;
let els = {};
const placeholderPleaseInput = i18n("placeholder_please_input");

/** @type {Function|null} 儲存目前的 Tab 循環 keydown handler */
let categoryNameTabindexHandler = null;

export function setResetCustomMenuItem(fn) {
  _resetCustomMenuItem = fn;
}

export function initCategoryNameDialog(elements) {
  els = elements;

  els.superPromptCategoryNameSettingsDialogOkBtn.addEventListener("click", () => {
    saveSuperPromptCategoryNameSettings();
  });

  els.superPromptCategoryNameSettingsDialogCancelBtn.addEventListener("click", () => {
    els.superPromptCategoryNameSettingsDialog.style.display = "none";
    restoreMenuItemTabindex();
  });
}

export function showSuperPromptCategoryNameSettingsDialog() {
  els.superPromptCategoryNameSettingsDialog.style.display = "flex";
  const superPromptCategoryNameListElement = document.getElementById("superPromptCategoryNameList");

  // Remove existing inputs
  const existingInputs = superPromptCategoryNameListElement.querySelectorAll(".superPromptCategoryNameInput");
  existingInputs.forEach((input) => input.remove());

  let htmlStr = "";
  Array.from({ length: SuperPromptCategoryListLimit }).forEach((_, index) => {
    htmlStr += `<input class="superPromptCategoryNameInput" tabindex="${index + 1}" class="btnTextInput" type="text" placeholder="${placeholderPleaseInput}" value="${superPromptCategoryList[index].name}">`;
  });

  superPromptCategoryNameListElement.innerHTML += htmlStr;

  els.superPromptCategoryNameSettingsDialog.querySelector(".superPromptCategoryNameInput").focus();

  disableMenuItemTabindex();
  controlTabindex();
}

export function saveSuperPromptCategoryNameSettings() {
  const superPromptCategoryNameInputs = els.superPromptCategoryNameSettingsDialog.querySelectorAll(".superPromptCategoryNameInput");

  Array.from({ length: SuperPromptCategoryListLimit }).forEach((_, index) => {
    superPromptCategoryList[index].name = superPromptCategoryNameInputs[index].value;
  });

  localStorage.setItem("Custom.Settings.SuperPromptCategoryList", JSON.stringify(superPromptCategoryList));

  if (_resetCustomMenuItem) _resetCustomMenuItem();

  els.superPromptCategoryNameSettingsDialog.style.display = "none";
  restoreMenuItemTabindex();
}

/**
 * 控制 Category Name Settings Dialog 內的 Tab/Shift+Tab 焦點循環。
 * 每次呼叫時會先移除前一個 handler，避免累積多個 stale listener。
 */
function controlTabindex() {
  const focusableElements = els.superPromptCategoryNameSettingsDialog.querySelectorAll("input, button");
  if (focusableElements.length === 0) return;

  const allEls = [...focusableElements];
  const firstEl = allEls[0];
  const lastEl = allEls[allEls.length - 1];

  if (categoryNameTabindexHandler) {
    els.superPromptCategoryNameSettingsDialog.removeEventListener('keydown', categoryNameTabindexHandler);
  }

  categoryNameTabindexHandler = handleTabindex.bind(null, firstEl, lastEl);
  els.superPromptCategoryNameSettingsDialog.addEventListener('keydown', categoryNameTabindexHandler);
}
