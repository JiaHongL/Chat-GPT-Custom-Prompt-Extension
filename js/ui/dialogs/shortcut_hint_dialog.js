import { mainKey, promptList, quickReplyMessageList } from '../../core/state.js';

/**
 * Shortcut Key Hint Dialog (#dialog3)
 * Shown on mainKey+Z keydown, hidden on keyup.
 */

export function initShortcutHintDialog(elements) {
  const {
    shortcutKeyHintDialog,
    questionDialog,
    settingsDialog,
    quickReplySettingsDialog,
    exportAndImportDialog,
  } = elements;

  document.addEventListener("keydown", (event) => {
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "z"
    ) {
      shortcutKeyHintDialog.style.display = "flex";
      const templateButtonTextList = document.querySelectorAll(".templateButtonText");
      templateButtonTextList[0].textContent = promptList[0].text;
      templateButtonTextList[1].textContent = promptList[5].text;
      templateButtonTextList[2].textContent = promptList[1].text;
      templateButtonTextList[3].textContent = promptList[6].text;
      templateButtonTextList[4].textContent = promptList[2].text;
      templateButtonTextList[5].textContent = promptList[7].text;
      templateButtonTextList[6].textContent = promptList[3].text;
      templateButtonTextList[7].textContent = promptList[8].text;
      templateButtonTextList[8].textContent = promptList[4].text;
      templateButtonTextList[9].textContent = promptList[9].text;
      templateButtonTextList[10].textContent = quickReplyMessageList[0].text;
      templateButtonTextList[11].textContent = quickReplyMessageList[1].text;
      templateButtonTextList[12].textContent = quickReplyMessageList[2].text;
      templateButtonTextList[13].textContent = quickReplyMessageList[3].text;
      templateButtonTextList[14].textContent = quickReplyMessageList[4].text;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (
      (shortcutKeyHintDialog.style.display === "flex" && event.key.toLocaleLowerCase() === "z") ||
      (shortcutKeyHintDialog.style.display === "flex" && event[mainKey])
    ) {
      shortcutKeyHintDialog.style.display = "none";
    }
  });
}
