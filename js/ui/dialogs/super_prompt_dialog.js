/**
 * ui/dialogs/super_prompt_dialog.js — Super Prompt Dialog (#dialog7) 邏輯
 * 最複雜的 Dialog，包含 {{ }} 模板欄位解析與表單渲染。
 */

import { supportOtherSite, superPrompt, superPromptId, superPromptName, isComposing, setIsComposing } from '../../core/state.js';
import { sendMessage } from '../../platforms/factory.js';
import { i18n } from '../../core/i18n.js';
import { handleTabindex, disableMenuItemTabindex, restoreMenuItemTabindex } from '../../utils/dom.js';
import { escapeRegExp, findGroupAndIndex } from '../../utils/helpers.js';

// ====== 內部狀態 ======

/** @type {Function|null} showSuperPromptSettingDialog 的參考，由外部透過 setter 注入 */
let _showSuperPromptSettingDialog = null;

/** @type {Object} DOM 元素引用，由 initSuperPromptDialog 設定 */
let els = {};

const PlaceholderPromptInputTips = i18n("placeholder_prompt_input_tips");
const PlaceholderPromptTextarea = i18n("placeholder_prompt_textarea");

// ====== Setter ======

/**
 * 設定 showSuperPromptSettingDialog 的函式參考（避免循環依賴）
 * @param {Function} fn
 */
export function setShowSuperPromptSettingDialog(fn) {
  _showSuperPromptSettingDialog = fn;
}

// ====== 內部狀態（Tab 循環） ======

/** @type {Function|null} 儲存目前的 Tab 循環 keydown handler（用於移除舊的再加新的） */
let superDialogTabindexHandler = null;

// ====== 內部函式 ======

/**
 * 控制 Super Prompt Dialog 內的 Tab/Shift+Tab 焦點循環。
 * 每次呼叫時會先移除前一個 handler，避免累積多個 stale listener。
 */
function controlSuperDialogTabindex() {
  const focusableElements = els.superPromptDialog.querySelectorAll('input, select, textarea, button');
  if (focusableElements.length === 0) return;

  const allEls = [...focusableElements];
  const firstEl = allEls[0];
  const lastEl = allEls[allEls.length - 1];

  if (superDialogTabindexHandler) {
    els.superPromptDialog.removeEventListener('keydown', superDialogTabindexHandler);
  }

  superDialogTabindexHandler = handleTabindex.bind(null, firstEl, lastEl);
  els.superPromptDialog.addEventListener('keydown', superDialogTabindexHandler);
}

// ====== 匯出函式 ======

/**
 * 初始化 Super Prompt Dialog 的事件監聽
 * @param {Object} elements - 由 base_dialog.js collectDialogElements() 收集的 DOM 元素
 */
export function initSuperPromptDialog(elements) {
  els = elements;

  // OK 按鈕：送出 super prompt
  els.superPromptDialogOkBtn.addEventListener('click', () => {
    sendSuperPrompt();
  });

  // Insert 按鈕：插入 super prompt
  els.superPromptDialogInsertBtn.addEventListener('click', () => {
    sendSuperPrompt(true);
  });

  // Cancel 按鈕：關閉 dialog
  els.superPromptDialogCancelBtn.addEventListener('click', () => {
    els.superPromptDialog.style.display = "none";
    restoreMenuItemTabindex();
  });

  // Edit 按鈕：開啟設定 dialog 編輯目前 super prompt
  els.superPromptDialogEditBtn.addEventListener('click', () => {
    if (supportOtherSite) return;
    els.superPromptDialog.style.display = "none";
    const { group, order } = findGroupAndIndex(superPromptId);
    if (_showSuperPromptSettingDialog) {
      _showSuperPromptSettingDialog(group, order - 1);
    }
  });
}

/**
 * 顯示 Super Prompt Dialog，解析 {{ }} 模板欄位並渲染表單
 */
export function showSuperPromptDialog() {
  els.superPromptDialog.style.display = "flex";
  disableMenuItemTabindex();

  const table = document.querySelector("#superPromptTable");
  const fieldItemList = table.querySelectorAll(".fieldItem");
  for (let i = 0; i < fieldItemList.length; i++) {
    fieldItemList[i].parentNode.removeChild(fieldItemList[i]);
  }

  // Clear preview area
  els.superPromptPreviewAreaDiv.textContent = '';
  const titleBold = document.createElement('b');
  titleBold.textContent = `#${superPromptId} ${superPromptName}`;
  els.superPromptPreviewAreaDiv.appendChild(titleBold);
  els.superPromptPreviewAreaDiv.appendChild(document.createElement('br'));

  const lines = superPrompt.split('\n');
  lines?.forEach((line, index) => {
    els.superPromptPreviewAreaDiv.appendChild(document.createTextNode(line));
    if (index < lines.length - 1) {
      els.superPromptPreviewAreaDiv.appendChild(document.createElement('br'));
    }
  });

  // Parse {{ }} template fields
  const matches = superPrompt.match(/{{\s*([^}]*)\s*}}/g) || [];
  const uniqueMatches = [];
  const countMap = {};
  for (const match of matches) {
    if (match === "{{}}") {
      uniqueMatches.push(match);
    } else {
      if (!countMap[match]) {
        countMap[match] = true;
        uniqueMatches.push(match);
      }
    }
  }

  if (!uniqueMatches) return;

  let htmlStr = "";
  let tabIndex = 1;

  uniqueMatches.forEach((string, i) => {
    let [fieldName = "", fieldValue = "", fieldType = "t", defaultValue = ""] = string
      ?.slice(2, -2)?.split("||")?.map((s) => s?.trim());
    if (!fieldValue) fieldValue = "";
    if (!defaultValue) defaultValue = "";
    fieldType = fieldType?.trim()?.toLocaleLowerCase();

    switch (fieldType) {
      case "s": // select
        htmlStr += `<div class="fieldItem">
          <div class="superPromptName" style="width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:bold;">${fieldName}</div>
          <div class="center">
            <select style="width:100%;cursor:pointer;" tabindex="${tabIndex}" class="super-prompt-text superPromptText">
              ${fieldValue.split(",").map((option, index) =>
                index === 0 ? `<option value="${option}" selected>${option}</option>` : `<option value="${option}">${option}</option>`
              ).join("")}
            </select>
          </div>
        </div>`;
        tabIndex++;
        break;

      case "c": // checkbox
        htmlStr += `<div class="fieldItem">
          <div class="superPromptName" style="width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:bold;">${fieldName}</div>
          <div style="display:flex;flex-wrap:wrap;">
            ${fieldValue.split(",").map((option, index) => {
              let defaultValueList = defaultValue?.split(",") || [];
              defaultValueList = defaultValueList.map((s) => s.trim());
              const checkboxStr = `<div style="display:flex;align-items:center;height:30px;margin-right:10px">
                <input type="checkbox" class="super-prompt-text superPromptText"
                  id="${fieldName + '___custom___checkbox___' + i + '' + index}"
                  name="${fieldName + '___custom___checkbox___' + i}"
                  ${defaultValueList.includes(option.trim()) ? "checked" : ""}
                  value="${option}" tabindex="${tabIndex}"
                  style="width:20px;height:20px;margin:0 4px 0 4px;cursor:pointer;"/>
                <label style="cursor:pointer;" for="${fieldName + '___custom___checkbox___' + i + '' + index}">${option}</label>
              </div>`;
              tabIndex++;
              return checkboxStr;
            }).join("")}
          </div>
        </div>`;
        break;

      case "r": // radio
        htmlStr += `<div class="fieldItem">
          <div class="superPromptName" style="width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:bold;">${fieldName}</div>
          <div style="display:flex;flex-wrap:wrap;">
            ${fieldValue.split(",").map((option, index) => {
              let radioDefaultValue = defaultValue || "";
              const radioStr = `<div style="display:flex;align-items:center;height:30px;margin-right:10px">
                <input type="radio" class="super-prompt-text superPromptText"
                  id="${fieldName + '___custom___radio___' + i + '' + index}"
                  name="${fieldName + '___custom___radio___' + i}"
                  ${radioDefaultValue === option.trim() ? "checked" : ""}
                  value="${option}" tabindex="${tabIndex}"
                  style="width:20px;height:20px;margin:0 4px 0 4px;border-radius:10px;cursor:pointer;"/>
                <label style="cursor:pointer;" for="${fieldName + '___custom___radio___' + i + '' + index}">${option}</label>
              </div>`;
              tabIndex++;
              return radioStr;
            }).join("")}
          </div>
        </div>`;
        break;

      default:
      case "t": // textarea (default)
        htmlStr += `<div class="fieldItem">
          <div class="superPromptName" style="width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:bold;">${fieldName}</div>
          <div class="center">
            <textarea rows="3" style="width:100%" tabindex="${tabIndex}" class="super-prompt-text superPromptText" placeholder="${PlaceholderPromptInputTips}">${fieldValue}</textarea>
          </div>
        </div>`;
        tabIndex++;
        break;
    }
  });

  table.innerHTML += htmlStr;

  // Single field special behavior
  if (table.querySelectorAll(".superPromptText").length === 1) {
    const textarea = table.querySelectorAll(".superPromptText")[0];
    if (table.querySelectorAll("textarea.superPromptText").length === 1) {
      textarea.style = "width:100%;height:380px;";
      textarea.placeholder = PlaceholderPromptTextarea;
    }
    textarea.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey && textarea.value.trim() === "") {
        event.preventDefault();
        return;
      }
      if (!isComposing && !event.shiftKey && document.activeElement === textarea && event.key === "Enter") {
        sendSuperPrompt();
        return;
      }
      if (!isComposing && event.target !== document.activeElement && event.key === "Escape") {
        els.superPromptDialog.style.display = "none";
        restoreMenuItemTabindex();
        return;
      }
    });
  }

  // 2 fields — both textarea → height 165px each
  if (table.querySelectorAll(".fieldItem").length === 2 && table.querySelectorAll("textarea.superPromptText").length === 2) {
    table.querySelectorAll("textarea.superPromptText").forEach((textarea) => {
      textarea.style = "width:100%;height:165px;";
    });
  }

  // 2 fields — one textarea → height 380px
  if (table.querySelectorAll(".fieldItem").length === 2 && table.querySelectorAll("textarea.superPromptText").length === 1) {
    table.querySelectorAll("textarea.superPromptText").forEach((textarea) => {
      textarea.style = "width:100%;height:380px;";
    });
  }

  // No fields → preview area max-height 570px; otherwise 165px
  if (table.querySelectorAll(".fieldItem").length === 0) {
    els.superPromptPreviewAreaDiv.style.maxHeight = "570px";
  } else {
    els.superPromptPreviewAreaDiv.style.maxHeight = "165px";
  }

  // Add composition event listeners on .superPromptText
  document.querySelectorAll('.superPromptText').forEach(el => {
    el.addEventListener('compositionstart', () => setIsComposing(true));
    el.addEventListener('compositionend', () => setIsComposing(false));
  });

  controlSuperDialogTabindex();

  if (table.querySelector(".superPromptText")) {
    table.querySelector(".superPromptText").focus();
  }
}

/**
 * 處理表單值並送出 super prompt
 * @param {boolean} isInsert - 是否為插入模式（預設 false）
 */
export function sendSuperPrompt(isInsert = false) {
  const table = document.querySelector("#superPromptTable");
  const superPromptTextList = table.querySelectorAll(".superPromptText");
  const matches = superPrompt.match(/{{\s*([^}]*)\s*}}/g) || [];
  const uniqueMatches = [];
  const countMap = {};
  for (const match of matches) {
    if (match === "{{}}") {
      uniqueMatches.push(match);
    } else {
      if (!countMap[match]) {
        countMap[match] = true;
        uniqueMatches.push(match);
      }
    }
  }

  let message = superPrompt;
  if (!message) return;
  if (!uniqueMatches) {
    els.superPromptDialog.style.display = "none";
    restoreMenuItemTabindex();
    sendMessage(message, isInsert);
    return;
  }

  let checkboxSet = new Set();
  let radioSet = new Set();
  let uniqueMatchesIndex = 0;

  for (let i = 0; i < superPromptTextList.length; i++) {
    const uniqueMatch = escapeRegExp(uniqueMatches[uniqueMatchesIndex]);
    const flag = uniqueMatch == escapeRegExp("{{}}") ? "" : "g";
    const regex = new RegExp(uniqueMatch, flag);
    let checkboxValue = "";

    if (superPromptTextList[i].type === "checkbox") {
      if (checkboxSet.has(superPromptTextList[i].name)) continue;
      document.querySelectorAll(`[name="${superPromptTextList[i].name}"]`).forEach((checkbox) => {
        if (checkbox.checked) checkboxValue += checkbox.value + ",";
      });
      checkboxValue = checkboxValue.slice(0, -1);
      message = message?.replace(regex, checkboxValue);
      checkboxSet.add(superPromptTextList[i].name);
      uniqueMatchesIndex++;
    } else if (superPromptTextList[i].type === "radio") {
      if (radioSet.has(superPromptTextList[i].name)) continue;
      let radioValue = "";
      document.querySelectorAll(`[name="${superPromptTextList[i].name}"]`).forEach((radio) => {
        if (radio.checked) radioValue = radio.value;
      });
      message = message?.replace(regex, radioValue);
      radioSet.add(superPromptTextList[i].name);
      uniqueMatchesIndex++;
    } else {
      message = message.replace(regex, superPromptTextList[i].value);
      uniqueMatchesIndex++;
    }
  }

  els.superPromptDialog.style.display = "none";
  restoreMenuItemTabindex();
  sendMessage(message, isInsert);
}
