/**
 * ui/dialogs/base_dialog.js — 共用 Dialog 邏輯
 * 提供 Dialog HTML 注入、DOM 元素引用收集、Tab 循環等共用功能。
 */

import { i18n } from '../../core/i18n.js';
import { supportOtherSite, mainKeyText, menuDivElement } from '../../core/state.js';
import { capitalizeFirstLetter } from '../../utils/helpers.js';
import { disableMenuItemTabindex, restoreMenuItemTabindex } from '../../utils/dom.js';
import { SuperPromptSettingsListLength, QuickReplyMessageAllItems } from '../../config/constants.js';

// ====== Dialog HTML 模板生成 ======

export function getDialogHTML() {
  return `
    <div id="dialog" class="dialog-wrapper" style="display;none">
        <div class="dialog" style="max-width: 1106px;">
            <div id="questionPreviewArea"></div>
            <textarea id="dialog-textarea" class="question-textarea" tabindex="1" placeholder="${i18n('placeholder_prompt_textarea')}"></textarea>
            <div class="footer center">
                <button ${supportOtherSite ? 'hidden' : ''} id="dialog-edit" class="info" tabindex="2">${i18n('button_edit')}</button>
                <button id="dialog-ok" class="primary" tabindex="3">${i18n('button_send')} ( ${mainKeyText} + s )</button>
                <button id="dialog-insert" class="primary" tabindex="4">${i18n('button_insert')} </button>
                <button id="dialog-cancel" class="secondary" tabindex="5">${i18n('button_cancel')} ( esc )</button>
                <div class="super-sun-o-pt"></div>
            </div>
        </div>
    </div>
  `;
}

export function getFormDialogHTML() {
  const cap = capitalizeFirstLetter(mainKeyText);
  const ph = i18n('placeholder_please_input');
  
  let rows = '';
  for (let i = 0; i < 10; i++) {
    const shortcutLabel = i < 5 ? `${cap} + ${i + 1}` : 'none';
    const tabBase = i * 3;
    const checkboxId = i === 0 ? 'slideCheckbox' : `slideCheckbox${i + 1}`;
    rows += `
      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${shortcutLabel} </span>
          </div>
        </td>
        <td><input tabindex="${tabBase + 1}" class="btnTextInput" type="text" placeholder="${ph}"></td>
        <td>
          <div class="center">
            <textarea tabindex="${tabBase + 2}" class="prefixInput" placeholder="${ph}"></textarea>
          </div>
        </td>
        <td>
          <div class="center">
            <textarea tabindex="${tabBase + 3}" class="suffixInput" placeholder="${ph}"></textarea>
          </div>
        </td>
        <td>
          <div class="slide-checkbox">
            <input class="promptSlide" type="checkbox" value="true" id="${checkboxId}" name="check" />
            <label for="${checkboxId}"><span></span></label>
          </div>
        </td>
      </tr>`;
  }

  return `
  <div id="dialog2" class="dialog-wrapper" style="display:none">
    <div class="dialog" style="max-width: 95%;">
      <div class="table-container" style="margin-bottom:0px;">
        <table id="table-form" class="my-table scroll-table-form">
          <thead>
            <tr>
              <th style="width:118px">${i18n('table_title_shortcut')}</th>
              <th style="width:160px">${i18n('table_title_button_name')}</th>
              <th>${i18n('table_title_prefix_text')}</th>
              <th>${i18n('table_title_suffix_text')}</th>
              <th style="width:118px">${i18n('table_title_is_show')}</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="footer" class="center">
        <button tabindex="99" id="dialog2-ok" class="primary">${i18n('button_save')} ( ${mainKeyText} + s )</button>
        <button tabindex="100" id="dialog2-cancel" class="secondary">${i18n('button_cancel')} ( esc ) </button>
        <div class="super-sun-o-pt"></div>
      </div>
    </div>
  </div>`;
}

export function getKeyboardShortcutHTML() {
  const cap = capitalizeFirstLetter(mainKeyText);

  return `
  <div id="dialog3" class="dialog-wrapper" style="display;none">
    <div class="dialog" style="max-width:1300px;padding-bottom:20px">
      <table style="width:100%">
        <tr>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + Z </span></div></td>
          <td><div class="ellipsis">${i18n('shortcut_key_tips_Z')}</div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ESC </span></div></td>
          <td><div class="ellipsis">${i18n('shortcut_key_tips_ESC')}</div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + B </span></div></td>
          <td><div class="ellipsis">${i18n('shortcut_key_tips_D')}</div></td>
        </tr>
        <tr>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + A </span></div></td>
          <td><div class="ellipsis">${i18n('shortcut_key_tips_A')}</div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + S </span></div></td>
          <td><div class="ellipsis">${i18n('shortcut_key_tips_S')}</div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + G </span></div></td>
          <td><div class="ellipsis"> none </div></td>
        </tr>
        <tr>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + D </span></div></td>
          <td><div class="ellipsis"> none </div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + W </span></div></td>
          <td><div class="ellipsis">none</div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + S </span></div></td>
          <td><div class="ellipsis">none</div></td>
        </tr>
        <tr>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + N </span></div></td>
          <td><div class="ellipsis">none</div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + 1 </span></div></td>
          <td><div class="templateButtonText ellipsis"></div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + 6 </span></div></td>
          <td><div class="ellipsis">none</div></td>
        </tr>
        <tr>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + M </span></div></td>
          <td><div class="ellipsis">none</div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + 2 </span></div></td>
          <td><div class="templateButtonText ellipsis"></div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + 7 </span></div></td>
          <td><div class="ellipsis">none</div></td>
        </tr>
        <tr>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + C </span></div></td>
          <td><div class="ellipsis"> none </div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + 3 </span></div></td>
          <td><div class="templateButtonText ellipsis"></div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + 8 </span></div></td>
          <td><div class="ellipsis">none</div></td>
        </tr>
        <tr>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + X </span></div></td>
          <td><div class="ellipsis">none</div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + 4 </span></div></td>
          <td><duv class="templateButtonText ellipsis"></duv></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + 9 </span></div></td>
          <td><div class="ellipsis">none</div></td>
        </tr>
        <tr>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + R </span></div></td>
          <td><div class="ellipsis">none</div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + 5 </span></div></td>
          <td><div class="templateButtonText ellipsis"></div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + 0 </span></div></td>
          <td><div class="ellipsis">none</div></td>
        </tr>
        <tr>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + E </span></div></td>
          <td><div class="ellipsis"> none </div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + Y </span></div></td>
          <td><div class="ellipsis">none</div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + U </span></div></td>
          <td><div class="ellipsis">none</div></td>
        </tr>
        <tr>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + I </span></div></td>
          <td><div class="ellipsis">none</div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + O </span></div></td>
          <td><div class="ellipsis">none</div></td>
          <td><div class="shortcut-wrapper"><span class="shortcut-content"> ${cap} + P </span></div></td>
          <td><div class="ellipsis">none</div></td>
        </tr>
      </table>
    </div>
  </div>`;
}

export function getQuickReplyHTML() {
  const ph = i18n('placeholder_please_input');
  const rows = Array.from({ length: QuickReplyMessageAllItems }).map((_, index) => `
    <tr class="customDragItem" draggable="false">
      <td><input tabindex="${index * 2 + 1}" class="quickReplyButtonText" type="text" placeholder="${ph}"></td>
      <td>
        <div class="center">
          <textarea style="width:100%" tabindex="${index * 2 + 2}" class="quickReplyMessage" placeholder="${ph}"></textarea>
        </div>
      </td>
      <td>
        <div class="slide-checkbox">
          <input class="quickReplySlide" type="checkbox" value="true" id="slideCheckboxReplayMessage${index}" name="check"/>
          <label for="slideCheckboxReplayMessage${index}"><span></span></label>
        </div>
      </td>
      <td style="width:40px;">
        <button class="drag-btn" style="margin:0px;padding:5px;font-size:1.5rem">☰</button>
      </td>
    </tr>`).join('');

  return `
  <div id="dialog4" class="dialog-wrapper" style="display:none">
    <div class="dialog" style="max-width: 85%;">
      <div id="quickReplyFormContainer" class="table-container">
        <table class="my-table scroll-table-form" style="width:100%">
          <thead>
            <tr>
              <th style="width:160px">${i18n('table_title_button_name')}</th>
              <th>${i18n('table_title_replay_message')}</th>
              <th style="width:118px">${i18n('table_title_is_show')}</th>
              <th style="width:40px;"></th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="footer" class="center">
        <button tabindex="999" id="dialog4-ok" class="primary">${i18n('button_save')} ( ${mainKeyText} + s )</button>
        <button tabindex="1000" id="dialog4-cancel" class="secondary">${i18n('button_cancel')} ( esc ) </button>
        <div class="super-sun-o-pt"></div>
      </div>
    </div>
  </div>`;
}

export function getExportAndImportHTML() {
  return `
  <div id="dialog5" class="dialog-wrapper" style="display:none">
    <div class="dialog" style="max-width:950px;">
      <table class="my-table" style="width:100%">
        <tr>
          <th colspan="3">${i18n('table_header_import_export')}</th>
        </tr>
        <tr>
          <td style="width:100px">
            <div class="center">
              <button id="export" style="margin-right:0px;flex:0 0 65px;" class="success">${i18n('button_export')}</button>
            </div>
          </td>
          <td>
            <div class="center" style="justify-content: space-evenly;">
              <button id="importAll" class="warning">${i18n('button_import_all')}</button>
              <button id="importPrompt" class="warning">${i18n('button_import_only_prompt')}</button>
              <button id="importSuperPrompt" class="warning">${i18n('button_import_only_super_prompt')}</button>
              <button id="importQuickReply" class="warning" style="margin-right:0px">${i18n('button_import_only_replay')}</button>
            </div>
          </td>
          <td>
            <div class="center">
              <button id="resetSetting" class="info" style="margin-right:0px">${i18n('button_reset')}</button>
            </div>
          </td>
        </tr>
      </table>
      <input style="display:none" type="file" id="importFileInput" name="file" accept="application/json">
      <div class="footer" class="center">
        <button id="dialog5-cancel" class="secondary">${i18n('button_close')} ( esc ) </button>
        <div class="super-sun-o-pt"></div>
      </div>
    </div>
  </div>`;
}

export function getSuperPromptSettingsHTML() {
  const ph = i18n('placeholder_please_input');
  const spDesc = i18n('placeholder_supper_prompt_desc');
  const expandSvg = '<svg class="expandEditPrompt expand-edit-prompt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome --><path d="M32 64c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32V96C0 78.3 14.3 64 32 64zm214.6 73.4c12.5 12.5 12.5 32.8 0 45.3L205.3 224l229.5 0-41.4-41.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 288l-229.5 0 41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0zM640 96V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V96c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>';

  const rows = Array.from({ length: SuperPromptSettingsListLength }).map((_, index) => `
    <tr class="customDragItem" draggable="false">
      <td style="text-align:center;width:50px">
        <span class="superPromptId super-prompt-id"></span>
      </td>
      <td style="width:180px">
        <input tabindex="${index * 2 + 1}" class="superPromptButtonText" type="text" placeholder="${ph}">
      </td>
      <td style="width:auto">
        <div class="center">
          <textarea style="width:100%;" tabindex="${index * 2 + 2}" class="superPromptText super-prompt-text" placeholder="${spDesc}"></textarea>
          ${expandSvg}
        </div>
      </td>
      <td style="width:118px">
        <div class="slide-checkbox">
          <input class="superPromptSlide" type="checkbox" value="true" id="superSlideCheckbox${index}" name="check" />
          <label for="superSlideCheckbox${index}"><span></span></label>
        </div>
      </td>
      <td style="width:40px;">
        <button class="drag-btn" style="margin:0px;padding:5px;font-size:1.5rem">☰</button>
      </td>
    </tr>`).join('');

  return `
  <div id="dialog6" class="dialog-wrapper" style="display:none">
    <div class="dialog" style="max-width:95%;">
      <div class="dialog-title"></div>
      <div id="superTableFormContainer" class="table-container">
        <table id="superTableForm" class="my-table scroll-table-form" style="width:100%;margin-top:0px;">
          <thead>
            <tr>
              <th style="width:50px">#</th>
              <th style="width:180px">${i18n('table_title_button_name')}</th>
              <th style="width:auto">${i18n('table_title_super_prompt_text')}</th>
              <th style="width:118px">${i18n('table_title_is_show')}</th>
              <th style="width:40px;"></th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="footer" class="center">
        <div class="fixed-left">
          <button tabindex="996" id="dialog6-export" class="info">${i18n('button_export_super_prompt_category')}</button>
          <button tabindex="997" id="dialog6-import" class="success">${i18n('button_import_super_prompt_category')}</button>
          <input style="display:none" type="file" id="importCategoryFileInput" name="file" accept="application/json">
          <button tabindex="998" id="dialog6-all-show-or-hide" class="warning">${i18n('button_show_all_or_hide_all')}</button>
        </div>
        <button tabindex="999" id="dialog6-ok" class="primary">${i18n('button_save')} ( ${mainKeyText} + s )</button>
        <button tabindex="1000" id="dialog6-cancel" class="secondary">${i18n('button_cancel')} ( esc ) </button>
        <div class="super-sun-o-pt"></div>
      </div>
    </div>
  </div>`;
}

export function getSuperPromptHTML() {
  return `
  <div id="dialog7" class="dialog-wrapper" style="display:none">
    <div class="dialog" style="max-width: 1106px;">
      <div class="super-prompt-preview-area" id="superPromptPreviewArea"></div>
      <div class="super-prompt-table-wrapper">
        <div id="superPromptTable" class="my-table super-prompt-table" style="width:100%"></div>
      </div>
      <div class="footer" class="center">
        <button ${supportOtherSite ? 'hidden' : ''} tabindex="97" id="dialog7-edit" class="info">${i18n('button_edit')}</button>
        <button tabindex="98" id="dialog7-ok" class="primary">${i18n('button_send')} ( ${mainKeyText} + s )</button>
        <button id="dialog7-insert" class="primary" tabindex="99">${i18n('button_insert')} </button>
        <button tabindex="100" id="dialog7-cancel" class="secondary">${i18n('button_cancel')} ( esc ) </button>
        <div class="super-sun-o-pt"></div>
      </div>
    </div>
  </div>`;
}

export function getCategoryNameSettingHTML() {
  return `
  <div id="dialog8" class="dialog-wrapper" style="display:none">
    <div class="dialog" style="max-width: 1200px;">
      <div id="superPromptCategoryNameList" class="super-prompt-category-name-list"></div>
      <div class="footer" class="center">
        <button tabindex="99" id="dialog8-ok" class="primary">${i18n('button_send')} ( ${mainKeyText} + s )</button>
        <button tabindex="100" id="dialog8-cancel" class="secondary">${i18n('button_cancel')} ( esc ) </button>
        <div class="super-sun-o-pt"></div>
      </div>
    </div>
  </div>`;
}

// ====== Collapse Button SVG ======
const COLLAPSE_BUTTON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome --><path d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128v64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9V128c0-16.8-12.9-30.5-29.3-31.9zM336 144v16c0 53-43 96-96 96H208c-53 0-96-43-96-96V144c0-26.5 21.5-48 48-48H288c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512H128V448c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64l98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16v48h32V464c0-8.8-7.2-16-16-16zm96 32a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"></path></svg>';

/**
 * 將所有 Dialog 注入到 DOM，並建立收合按鈕
 * @param {function} collapseToggleFn - 收合切換函式
 * @returns {object} 所有建立的容器元素
 */
export function appendAllDialogs(collapseToggleFn) {
  const containers = {};

  // 建立各 dialog 容器
  const htmlEntries = [
    ['dialog', getDialogHTML()],
    ['formDialog', getFormDialogHTML()],
    ['keyboardShortcut', getKeyboardShortcutHTML()],
    ['quickReply', getQuickReplyHTML()],
    ['exportAndImport', getExportAndImportHTML()],
    ['superPromptSettings', getSuperPromptSettingsHTML()],
    ['superPrompt', getSuperPromptHTML()],
    ['categoryNameSetting', getCategoryNameSettingHTML()],
  ];

  htmlEntries.forEach(([key, html]) => {
    const el = document.createElement('div');
    el.innerHTML = html;
    document.body.appendChild(el);
    containers[key] = el;
  });

  // 收合按鈕
  const collapseButtonEl = document.createElement('div');
  collapseButtonEl.classList.add('collapse-button');
  collapseButtonEl.innerHTML = COLLAPSE_BUTTON_SVG;
  document.body.appendChild(collapseButtonEl);
  collapseButtonEl.addEventListener('click', () => {
    collapseToggleFn();
  });
  containers.collapseButton = collapseButtonEl;

  // 非 ChatGPT 平台：檢查 EnableGeminiSupport
  if (supportOtherSite) {
    chrome.storage.local.get(['Custom.EnableGeminiSupport'], (res) => {
      const enableGeminiSupport = res['Custom.EnableGeminiSupport'];
      if (enableGeminiSupport) {
        setTimeout(() => {
          if (menuDivElement) {
            menuDivElement.style.visibility = null;
          }
          const value = window.localStorage.getItem('Custom.Settings.Menu.Hidden');
          if (value === 'Y') {
            document.body.classList.add('hidden-template-buttons');
          } else {
            document.body.classList.remove('hidden-template-buttons');
          }
        }, 500);
      } else {
        // 移除所有 UI
        Object.values(containers).forEach((el) => el.remove());
        if (menuDivElement) menuDivElement.remove();
      }
    });
  }

  return containers;
}

/**
 * 收集所有 Dialog 的 DOM 元素引用
 * @returns {object}
 */
export function collectDialogElements() {
  return {
    // #dialog - Question
    questionDialog: document.getElementById('dialog'),
    questionPreviewAreaDiv: document.getElementById('questionPreviewArea'),
    questionDialogTextarea: document.querySelector('#dialog-textarea'),
    questionDialogOkBtn: document.querySelector('#dialog-ok'),
    questionDialogInsertBtn: document.querySelector('#dialog-insert'),
    questionDialogCancelBtn: document.querySelector('#dialog-cancel'),
    questionDialogEditBtn: document.querySelector('#dialog-edit'),

    // #dialog2 - Settings
    settingsDialog: document.getElementById('dialog2'),
    settingsDialogOkBtn: document.querySelector('#dialog2-ok'),
    settingsDialogCancelBtn: document.querySelector('#dialog2-cancel'),
    settingsTableForm: document.getElementById('dialog2')?.querySelector('#table-form'),

    // #dialog3 - Shortcut Key Hint
    shortcutKeyHintDialog: document.getElementById('dialog3'),

    // #dialog4 - Quick Reply
    quickReplySettingsDialog: document.getElementById('dialog4'),
    quickReplySettingsDialogOkBtn: document.querySelector('#dialog4-ok'),
    quickReplySettingsDialogCancelBtn: document.querySelector('#dialog4-cancel'),

    // #dialog5 - Export/Import
    exportAndImportDialog: document.getElementById('dialog5'),
    exportSettingsBtn: document.getElementById('export'),
    importAllBtn: document.getElementById('importAll'),
    importOnlyPromptBtn: document.getElementById('importPrompt'),
    importOnlySuperPromptBtn: document.getElementById('importSuperPrompt'),
    importOnlyQuickReplyBtn: document.getElementById('importQuickReply'),
    resetSettingBtn: document.getElementById('resetSetting'),
    exportAndImportDialogCancelBtn: document.getElementById('dialog5-cancel'),
    importFileInput: document.getElementById('importFileInput'),

    // #dialog6 - Super Prompt Settings
    superPromptSettingsDialog: document.getElementById('dialog6'),
    superPromptSettingsDialogOkBtn: document.querySelector('#dialog6-ok'),
    superPromptSettingsDialogCancelBtn: document.querySelector('#dialog6-cancel'),
    superPromptSettingsTableForm: document.getElementById('dialog6')?.querySelector('#superTableForm'),
    superPromptDialogExportBtn: document.querySelector('#dialog6-export'),
    superPromptDialogImportBtn: document.querySelector('#dialog6-import'),
    importCategoryFileInput: document.querySelector('#importCategoryFileInput'),
    superPromptDialogAllShowOrHideBtn: document.querySelector('#dialog6-all-show-or-hide'),

    // #dialog7 - Super Prompt
    superPromptDialog: document.getElementById('dialog7'),
    superPromptPreviewAreaDiv: document.getElementById('superPromptPreviewArea'),
    superPromptTableDiv: document.getElementById('superPromptTable'),
    superPromptDialogOkBtn: document.querySelector('#dialog7-ok'),
    superPromptDialogInsertBtn: document.querySelector('#dialog7-insert'),
    superPromptDialogCancelBtn: document.querySelector('#dialog7-cancel'),
    superPromptDialogEditBtn: document.querySelector('#dialog7-edit'),

    // #dialog8 - Category Name
    superPromptCategoryNameSettingsDialog: document.getElementById('dialog8'),
    superPromptCategoryNameListDiv: document.getElementById('superPromptCategoryNameList'),
    superPromptCategoryNameSettingsDialogOkBtn: document.querySelector('#dialog8-ok'),
    superPromptCategoryNameSettingsDialogCancelBtn: document.querySelector('#dialog8-cancel'),
  };
}
