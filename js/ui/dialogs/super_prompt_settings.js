import { superPromptList, superPromptCategoryList, currentSuperSettingFormType, setCurrentSuperSettingFormType } from '../../core/state.js';
import { SuperPromptSettingsListLength } from '../../config/constants.js';
import { updateChromeStorage } from '../../core/storage.js';
import { i18n } from '../../core/i18n.js';
import { handleTabindex, disableMenuItemTabindex, restoreMenuItemTabindex } from '../../utils/dom.js';
import { setupDragDrop } from '../components/drag_drop_list.js';

let _generateButtons = null;
let els = {};
let isAllShow = false;
let isShowSuperPromptSettingDialogInit = true;
let _bindDragHandles = null;

/** @type {Function|null} 儲存目前的 Tab 循環 keydown handler */
let superPromptSettingsTabindexHandler = null;

export function setGenerateButtons(fn) {
  _generateButtons = fn;
}

function downloadFile(data, filename, mimeType) {
  const blob = new Blob([data], { type: mimeType });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function checkCategoryFileContent(obj) {
  let isValidated = true;
  try {
    if (!obj.hasOwnProperty("superPrompt")) isValidated = false;
    else {
      if (obj.superPrompt.length !== 50) isValidated = false;
      obj.superPrompt.forEach((setting) => {
        if (!setting.hasOwnProperty("isVisible") || typeof setting.isVisible !== "boolean") isValidated = false;
        if (!setting.hasOwnProperty("text") || typeof setting.text !== "string") isValidated = false;
        if (!setting.hasOwnProperty("prompt") || typeof setting.prompt !== "string") isValidated = false;
      });
    }
  } catch (error) {
    isValidated = false;
    console.log("error", error);
  }
  return isValidated;
}

function recalculateIndexes() {
  const rows = els.superPromptSettingsDialog.querySelectorAll('.customDragItem');
  rows.forEach((row, index) => {
    const btnText = row.querySelector('.superPromptButtonText');
    const promptText = row.querySelector('.superPromptText');
    if (btnText) btnText.setAttribute('tabindex', index * 2 + 1);
    if (promptText) promptText.setAttribute('tabindex', index * 2 + 2);
  });
}

/**
 * 控制 Super Prompt Settings Dialog 內的 Tab/Shift+Tab 焦點循環。
 * 每次呼叫時會先移除前一個 handler，避免累積多個 stale listener。
 */
function controlTabindex() {
  let tableFormElements = els.superPromptSettingsTableForm.querySelectorAll('input, textarea, button');
  const allEls = [
    ...tableFormElements,
    els.superPromptSettingsDialogOkBtn,
    els.superPromptSettingsDialogCancelBtn,
  ];
  if (allEls.length === 0) return;

  const firstEl = allEls[0];
  const lastEl = allEls[allEls.length - 1];

  if (superPromptSettingsTabindexHandler) {
    els.superPromptSettingsDialog.removeEventListener('keydown', superPromptSettingsTabindexHandler);
  }

  superPromptSettingsTabindexHandler = handleTabindex.bind(null, firstEl, lastEl);
  els.superPromptSettingsDialog.addEventListener('keydown', superPromptSettingsTabindexHandler);
}

export function showSuperPromptSettingDialog(superFormType, focusElementIndex = null) {
  setCurrentSuperSettingFormType(superFormType);
  els.superPromptSettingsDialog.style.display = "flex";
  disableMenuItemTabindex();

  const superPromptButtonTextElements = document.querySelectorAll(".superPromptButtonText");
  const superPromptTextElements = document.querySelectorAll(".superPromptText");
  const superPromptSlideElements = document.querySelectorAll(".superPromptSlide");
  const expandEditPromptElements = document.querySelectorAll(".expandEditPrompt");
  const superPromptIdElements = document.querySelectorAll(".superPromptId");

  const dialogTitleElement = els.superPromptSettingsDialog.querySelector(".dialog-title");
  dialogTitleElement.innerHTML = superPromptCategoryList[currentSuperSettingFormType - 1].name;

  const nowSuperPromptList = superPromptList.slice(
    (currentSuperSettingFormType - 1) * SuperPromptSettingsListLength,
    currentSuperSettingFormType * SuperPromptSettingsListLength
  );

  for (let index = 0; index < SuperPromptSettingsListLength; index++) {
    superPromptButtonTextElements[index].value = nowSuperPromptList[index].text;
    superPromptTextElements[index].value = nowSuperPromptList[index].prompt;
    superPromptSlideElements[index].checked = nowSuperPromptList[index].isVisible;
    superPromptIdElements[index].innerHTML = nowSuperPromptList[index].key;
    superPromptTextElements[index].style.height = "132px";
  }

  if (focusElementIndex) {
    superPromptButtonTextElements[focusElementIndex].focus();
  } else {
    superPromptButtonTextElements[0].focus();
  }

  // expandEditPromptElements — only bind once
  if (isShowSuperPromptSettingDialogInit) {
    expandEditPromptElements.forEach((expandEditPromptElement, index) => {
      expandEditPromptElement.addEventListener("click", () => {
        if (superPromptTextElements[index].offsetHeight < 485) {
          superPromptTextElements[index].style.height = "485px";
        } else {
          superPromptTextElements[index].style.height = "132px";
        }
      });
    });
  }

  // Reset dragging state
  const draggingRow = els.superPromptSettingsDialog.querySelector('.dragging-row');
  if (draggingRow) draggingRow.classList.remove('dragging-row');

  // 重新綁定拖曳按鈕事件
  if (_bindDragHandles) _bindDragHandles();

  isAllShow = superPromptSlideElements[0].checked;
  isShowSuperPromptSettingDialogInit = false;

  controlTabindex();
}

export function saveSuperPromptSittings() {
  const btnTextInputElements = document.querySelectorAll(".superPromptButtonText");
  const textInputElements = document.querySelectorAll(".superPromptText");
  const promptSlideElements = document.querySelectorAll(".superPromptSlide");

  const nowSuperPromptList = superPromptList.slice(
    (currentSuperSettingFormType - 1) * SuperPromptSettingsListLength,
    currentSuperSettingFormType * SuperPromptSettingsListLength
  );

  const previousSuperPromptList = JSON.parse(JSON.stringify(nowSuperPromptList));

  for (let index = 0; index < SuperPromptSettingsListLength; index++) {
    nowSuperPromptList[index].text = btnTextInputElements[index].value;
    nowSuperPromptList[index].prompt = textInputElements[index].value;
    nowSuperPromptList[index].isVisible = promptSlideElements[index].checked;

    if (previousSuperPromptList.isVisible) {
      nowSuperPromptList[index].buttonElement.removeEventListener("click", nowSuperPromptList[index].handleClickFn);
      nowSuperPromptList[index].buttonElement.remove();
      delete nowSuperPromptList[index].buttonElement;
      delete nowSuperPromptList[index].handleClickFn;
    }
  }

  localStorage.setItem("Custom.Settings.SuperPrompt", JSON.stringify(superPromptList));
  updateChromeStorage("Custom.Settings.SuperPrompt", superPromptList);
  _generateButtons();
  els.superPromptSettingsDialog.style.display = "none";
  restoreMenuItemTabindex();
}

export function initSuperPromptSettingsDialog(elements) {
  els = elements;

  // OK button
  els.superPromptSettingsDialogOkBtn.addEventListener("click", () => {
    saveSuperPromptSittings();
  });

  // Cancel button
  els.superPromptSettingsDialogCancelBtn.addEventListener("click", () => {
    els.superPromptSettingsDialog.style.display = "none";
    restoreMenuItemTabindex();
  });

  // Export button
  els.superPromptDialogExportBtn.addEventListener("click", () => {
    const superPromptButtonTextElements = document.querySelectorAll(".superPromptButtonText");
    const superPromptTextElements = document.querySelectorAll(".superPromptText");
    const superPromptSlideElements = document.querySelectorAll(".superPromptSlide");

    const exportData = [];
    for (let index = 0; index < SuperPromptSettingsListLength; index++) {
      exportData.push({
        isVisible: superPromptSlideElements[index].checked,
        text: superPromptButtonTextElements[index].value,
        prompt: superPromptTextElements[index].value
      });
    }

    const dialogTitleElement = els.superPromptSettingsDialog.querySelector(".dialog-title");
    const title = dialogTitleElement.innerHTML;
    const json = JSON.stringify({ superPrompt: exportData }, null, 2);
    downloadFile(json, `${title}.json`, "application/json");
  });

  // Import button
  els.superPromptDialogImportBtn.addEventListener("click", () => {
    els.importCategoryFileInput.click();
  });

  // Import file input change
  els.importCategoryFileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const obj = JSON.parse(e.target.result);
        if (checkCategoryFileContent(obj)) {
          const superPromptButtonTextElements = document.querySelectorAll(".superPromptButtonText");
          const superPromptTextElements = document.querySelectorAll(".superPromptText");
          const superPromptSlideElements = document.querySelectorAll(".superPromptSlide");

          for (let index = 0; index < SuperPromptSettingsListLength; index++) {
            superPromptButtonTextElements[index].value = obj.superPrompt[index].text;
            superPromptTextElements[index].value = obj.superPrompt[index].prompt;
            superPromptSlideElements[index].checked = obj.superPrompt[index].isVisible;
          }
        } else {
          alert(i18n("importFileError") || "Invalid file format.");
        }
      } catch (error) {
        console.log("Import error:", error);
        alert(i18n("importFileError") || "Invalid file format.");
      }
      // Reset file input so same file can be re-imported
      event.target.value = "";
    };
    reader.readAsText(file);
  });

  // All Show/Hide button
  els.superPromptDialogAllShowOrHideBtn.addEventListener("click", () => {
    isAllShow = !isAllShow;
    const superPromptSlideElements = document.querySelectorAll(".superPromptSlide");
    for (let index = 0; index < SuperPromptSettingsListLength; index++) {
      superPromptSlideElements[index].checked = isAllShow;
    }
  });

  // Setup drag-drop
  const { bindDragHandles: bindSuperDragHandles } = setupDragDrop(els.superPromptSettingsDialog, '#superTableFormContainer', recalculateIndexes, controlTabindex);
  _bindDragHandles = bindSuperDragHandles;
}
