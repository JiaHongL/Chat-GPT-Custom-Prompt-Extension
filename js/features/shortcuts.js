import { mainKey, isComposing, promptList } from '../core/state.js';
import { restoreMenuItemTabindex } from '../utils/dom.js';

let _collapseToggle = null;
let _darkModeToggle = null;
let _sendQuestionForm = null;
let _saveSittings = null;
let _saveQuickReplySettings = null;
let _saveSuperPromptSittings = null;
let _sendSuperPrompt = null;
let _saveSuperPromptCategoryNameSettings = null;

export function setCollapseToggle(fn) { _collapseToggle = fn; }
export function setDarkModeToggle(fn) { _darkModeToggle = fn; }
export function setSendQuestionForm(fn) { _sendQuestionForm = fn; }
export function setSaveSittings(fn) { _saveSittings = fn; }
export function setSaveQuickReplySettings(fn) { _saveQuickReplySettings = fn; }
export function setSaveSuperPromptSittings(fn) { _saveSuperPromptSittings = fn; }
export function setSendSuperPrompt(fn) { _sendSuperPrompt = fn; }
export function setSaveSuperPromptCategoryNameSettings(fn) { _saveSuperPromptCategoryNameSettings = fn; }

export function initShortcuts(els) {
  const {
    questionDialog,
    settingsDialog,
    quickReplySettingsDialog,
    exportAndImportDialog,
    superPromptSettingsDialog,
    superPromptDialog,
    superPromptCategoryNameSettingsDialog
  } = els;

  document.addEventListener("keydown", (event) => {
    // 1. Esc handling for dropdowns
    if (event.key === "Escape" || event.code === "Escape") {
      document.querySelectorAll(".chatgpt-dropdown-content").forEach(el => {
        if (!el.contains(event.target) && el.classList.contains("show")) el.classList.remove("show");
      });
    }

    // 2. Esc for each dialog (check display==="flex" && !isComposing)
    if ((event.key === "Escape" || event.code === "Escape") && !isComposing) {
      if (questionDialog && questionDialog.style.display === "flex") {
        event.preventDefault();
        questionDialog.style.display = "none";
        restoreMenuItemTabindex();
        return;
      }
      if (settingsDialog && settingsDialog.style.display === "flex") {
        event.preventDefault();
        settingsDialog.style.display = "none";
        restoreMenuItemTabindex();
        return;
      }
      if (quickReplySettingsDialog && quickReplySettingsDialog.style.display === "flex") {
        event.preventDefault();
        quickReplySettingsDialog.style.display = "none";
        restoreMenuItemTabindex();
        return;
      }
      if (exportAndImportDialog && exportAndImportDialog.style.display === "flex") {
        event.preventDefault();
        exportAndImportDialog.style.display = "none";
        restoreMenuItemTabindex();
        return;
      }
      if (superPromptSettingsDialog && superPromptSettingsDialog.style.display === "flex") {
        event.preventDefault();
        superPromptSettingsDialog.style.display = "none";
        restoreMenuItemTabindex();
        return;
      }
      if (superPromptDialog && superPromptDialog.style.display === "flex") {
        event.preventDefault();
        superPromptDialog.style.display = "none";
        restoreMenuItemTabindex();
        return;
      }
      if (superPromptCategoryNameSettingsDialog && superPromptCategoryNameSettingsDialog.style.display === "flex") {
        event.preventDefault();
        superPromptCategoryNameSettingsDialog.style.display = "none";
        restoreMenuItemTabindex();
        return;
      }
    }

    // 3. mainKey + s in question dialog (value not empty) → hide dialog + _sendQuestionForm()
    if (event[mainKey] && (event.key === "s" || event.key === "S")) {
      if (questionDialog && questionDialog.style.display === "flex") {
        const textarea = questionDialog.querySelector("textarea");
        if (textarea && textarea.value.trim() !== "") {
          event.preventDefault();
          questionDialog.style.display = "none";
          if (_sendQuestionForm) _sendQuestionForm();
          return;
        }
      }

      // 4. mainKey + s in settingsDialog → _saveSittings()
      if (settingsDialog && settingsDialog.style.display === "flex") {
        event.preventDefault();
        if (_saveSittings) _saveSittings();
        return;
      }

      // 5. mainKey + s in quickReplySettingsDialog → _saveQuickReplySettings()
      if (quickReplySettingsDialog && quickReplySettingsDialog.style.display === "flex") {
        event.preventDefault();
        if (_saveQuickReplySettings) _saveQuickReplySettings();
        return;
      }

      // 6. mainKey + s in superPromptSettingsDialog → _saveSuperPromptSittings()
      if (superPromptSettingsDialog && superPromptSettingsDialog.style.display === "flex") {
        event.preventDefault();
        if (_saveSuperPromptSittings) _saveSuperPromptSittings();
        return;
      }

      // 7. mainKey + s in superPromptDialog → _sendSuperPrompt()
      if (superPromptDialog && superPromptDialog.style.display === "flex") {
        event.preventDefault();
        if (_sendSuperPrompt) _sendSuperPrompt();
        return;
      }

      // 8. mainKey + s in superPromptCategoryNameSettingsDialog → _saveSuperPromptCategoryNameSettings()
      if (superPromptCategoryNameSettingsDialog && superPromptCategoryNameSettingsDialog.style.display === "flex") {
        event.preventDefault();
        if (_saveSuperPromptCategoryNameSettings) _saveSuperPromptCategoryNameSettings();
        return;
      }
    }

    // 9. mainKey + a → _collapseToggle()
    if (event[mainKey] && (event.key === "a" || event.key === "A")) {
      event.preventDefault();
      if (_collapseToggle) _collapseToggle();
      return;
    }

    // 10. mainKey + b → _darkModeToggle()
    if (event[mainKey] && (event.key === "b" || event.key === "B")) {
      event.preventDefault();
      if (_darkModeToggle) _darkModeToggle();
      return;
    }

    // 11. mainKey + 1-5 (number keys, when no dialogs open)
    if (event[mainKey] && ["1", "2", "3", "4", "5"].includes(event.key)) {
      const allDialogsClosed =
        (!settingsDialog || settingsDialog.style.display === "none") &&
        (!quickReplySettingsDialog || quickReplySettingsDialog.style.display === "none") &&
        (!exportAndImportDialog || exportAndImportDialog.style.display === "none") &&
        (!superPromptSettingsDialog || superPromptSettingsDialog.style.display === "none") &&
        (!superPromptDialog || superPromptDialog.style.display === "none") &&
        (!superPromptCategoryNameSettingsDialog || superPromptCategoryNameSettingsDialog.style.display === "none");

      if (allDialogsClosed) {
        const index = parseInt(event.key, 10) - 1;
        if (promptList[index] && promptList[index].buttonElement) {
          event.preventDefault();
          promptList[index].buttonElement.click();
          return;
        }
      }
    }
  });
}
