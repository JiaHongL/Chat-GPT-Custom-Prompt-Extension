import { supportOtherSite, superPromptCategoryList } from '../core/state.js';
import { SuperPromptCategoryListLimit } from '../config/constants.js';
import { setSupportOtherSiteFlag } from '../core/storage.js';
import { i18n } from '../core/i18n.js';
import { disableMenuItemTabindex, restoreMenuItemTabindex } from '../utils/dom.js';

let mutationTimer = null;
let lastInsertedMenuItem = null;
let _showSettingsDialog = null;
let _showQuickReplySettingsDialog = null;
let _openExportAndImportDialog = null;
let _showSuperPromptSettingDialog = null;
let _showSuperPromptCategoryNameSettingsDialog = null;

export function setShowSettingsDialog(fn) {
  _showSettingsDialog = fn;
}

export function setShowQuickReplySettingsDialog(fn) {
  _showQuickReplySettingsDialog = fn;
}

export function setOpenExportAndImportDialog(fn) {
  _openExportAndImportDialog = fn;
}

export function setShowSuperPromptSettingDialog(fn) {
  _showSuperPromptSettingDialog = fn;
}

export function setShowSuperPromptCategoryNameSettingsDialog(fn) {
  _showSuperPromptCategoryNameSettingsDialog = fn;
}

export function resetCustomMenuItem() {
  const customMenuItemElements = document.querySelectorAll(".customMenuItem");
  customMenuItemElements.forEach(el => el.remove());
  lastInsertedMenuItem = null;
}

/**
 * 共用插入邏輯：確保所有 customMenuItem 依序相鄰
 */
function insertMenuItemToNav(customATagEl) {
  const nav = document.querySelector("nav.flex").lastChild;
  if (lastInsertedMenuItem && lastInsertedMenuItem.parentNode === nav) {
    nav.insertBefore(customATagEl, lastInsertedMenuItem.nextSibling);
  } else {
    const navItemCount = document.querySelector("nav.flex")?.childNodes?.length;
    nav.insertBefore(customATagEl, nav.children[navItemCount - 1]);
  }
  lastInsertedMenuItem = customATagEl;
}

export function handleDocumentClick(event) {
  document.querySelectorAll(".chatgpt-dropdown-content").forEach(el => {
    if (!el.contains(event.target) && el.classList.contains("show")) {
      el.classList.remove("show");
    }
  });
}

function addCustomLeftMenuItem() {
  try {
    const customATagEl = document.createElement("a");
    customATagEl.classList.add(
      "customMenuItem",
      "flex",
      "py-3",
      "px-3",
      "items-center",
      "gap-3",
      "rounded-md",
      "custom-hover",
      "transition-colors",
      "duration-200",
      "text-black",
      "dark:text-white",
      "cursor-pointer",
      "text-sm"
    );
    const switchMenuDiv = document.createElement("div");
    switchMenuDiv.style = "width:100%";
    switchMenuDiv.innerHTML = `    
      <div class="flex items-center">
        <svg 
          class="custom-icon",
          style="height:16px;width:16px;margin-right: 12px;" 
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128v64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9V128c0-16.8-12.9-30.5-29.3-31.9zM336 144v16c0 53-43 96-96 96H208c-53 0-96-43-96-96V144c0-26.5 21.5-48 48-48H288c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512H128V448c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64l98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16v48h32V464c0-8.8-7.2-16-16-16zm96 32a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></svg>
        <div class="flex-1" style="margin-right:5px">${i18n(
          "nav_menu_help_menu"
        )}</div>
        <div class="slide-checkbox" style="margin: 0 0 0 0">  
          <input type="checkbox" value="true" id="switchMenu" name="check"/>
          <label for="switchMenu"><span></span></label>
        </div>
      </div>
    `;

    customATagEl.appendChild(switchMenuDiv);
    insertMenuItemToNav(customATagEl);

    document.getElementById("switchMenu").checked =
      localStorage.getItem("Custom.Settings.Menu.Hidden") === "Y"
        ? false
        : true;

    document
      .getElementById("switchMenu")
      .addEventListener("change", function () {
        if (this.checked) {
          localStorage.setItem("Custom.Settings.Menu.Hidden", "N");
          document.body.classList.remove("hidden-template-buttons");
        } else {
          localStorage.setItem("Custom.Settings.Menu.Hidden", "Y");
          document.body.classList.add("hidden-template-buttons");
        }
      });
  } catch (error) {
    console.log(error);
  }
}

function addCustomLeftMenuItem2() {
  try {
    const customATagEl = document.createElement("a");
    customATagEl.classList.add(
      "customMenuItem",
      "flex",
      "py-3",
      "px-3",
      "items-center",
      "gap-3",
      "rounded-md",
      "custom-hover",
      "transition-colors",
      "duration-200",
      "text-black",
      "dark:text-white",
      "cursor-pointer",
      "text-sm"
    );

    const supportOtherSiteDiv = document.createElement("div");
    supportOtherSiteDiv.style = "width:100%";
    supportOtherSiteDiv.innerHTML = `    
      <div class="flex items-center">
        <svg class="custom-icon" style="height:16px;width:16px;margin-right: 12px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"/></svg>
        <div class="flex-1" style="font-size:10px;margin-right:5px;white-space: normal;">${i18n(
          "nav_menu_enable_gemini_support"
        )}</div>
        <div class="slide-checkbox" style="margin: 0 0 0 0">  
          <input type="checkbox" value="true" id="supportOtherSiteCheckbox" name="check"/>
          <label for="supportOtherSiteCheckbox"><span></span></label>
        </div>
      </div>
    `;

    customATagEl.appendChild(supportOtherSiteDiv);
    insertMenuItemToNav(customATagEl);

    const enableGeminiSupport = window.localStorage.getItem("Custom.EnableGeminiSupport") === 'true' ? true : false;
    document.getElementById("supportOtherSiteCheckbox").checked = enableGeminiSupport;
    document
      .getElementById("supportOtherSiteCheckbox")
      .addEventListener("change", function () {
        setSupportOtherSiteFlag(this.checked);
      });
  } catch (error) {
    console.log(error);
  }
}

function addCustomLeftMenuItem3() {
  try {
    const customATagEl = document.createElement("a");
    customATagEl.classList.add(
      "customMenuItem",
      "flex",
      "py-3",
      "px-3",
      "items-center",
      "gap-3",
      "rounded-md",
      "custom-hover",
      "transition-colors",
      "duration-200",
      "text-black",
      "dark:text-white",
      "cursor-pointer",
      "text-sm"
    );

    const menuItemDiv = document.createElement("div");
    menuItemDiv.style = "width:100%;";
    menuItemDiv.innerHTML = `    
      <div id="allSettings" class="chatgpt-dropdown chatgpt-dropdown-up" style="width:100%">
        <div class="flex items-center">
          <svg class="custom-icon" style="height:16px;width:16px;margin-right: 12px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>  
          <div>${i18n("nav_item_settings")}</div>
        </div>
        <div class="chatgpt-dropdown-content">
          <a class="custom-menu-item">${i18n(
            "menu_prompt_template_settings"
          )}</a>
          <a class="custom-menu-item">${i18n(
            "menu_reply_message_settings"
          )}</a>
          <a class="custom-menu-item">${i18n("menu_import_export")}</a>
        </div>
      </div>
    `;

    customATagEl.appendChild(menuItemDiv);
    insertMenuItemToNav(customATagEl);

    const menuItems = customATagEl.querySelectorAll(".custom-menu-item");
    const chatgptDropdownContentEl = customATagEl.querySelector(
      ".chatgpt-dropdown-content"
    );

    customATagEl.addEventListener("click", (event) => {
      event.stopPropagation();
      chatgptDropdownContentEl.classList.add("show");
    });

    menuItems[0].addEventListener("click", (event) => {
      event.stopPropagation();
      chatgptDropdownContentEl.classList.remove("show");
      _showSettingsDialog();
    });

    menuItems[1].addEventListener("click", (event) => {
      event.stopPropagation();
      chatgptDropdownContentEl.classList.remove("show");
      _showQuickReplySettingsDialog();
    });

    menuItems[2].addEventListener("click", (event) => {
      event.stopPropagation();
      chatgptDropdownContentEl.classList.remove("show");
      _openExportAndImportDialog();
    });
  } catch (error) {
    console.log(error);
  }
}

function addCustomLeftMenuItem4() {
  try {
    const customATagEl = document.createElement("a");
    customATagEl.classList.add(
      "customMenuItem",
      "flex",
      "py-3",
      "px-3",
      "items-center",
      "gap-3",
      "rounded-md",
      "custom-hover",
      "transition-colors",
      "duration-200",
      "text-black",
      "dark:text-white",
      "cursor-pointer",
      "text-sm"
    );

    const menuItemDiv = document.createElement("div");
    menuItemDiv.style = "width:100%;";
    menuItemDiv.innerHTML = `    
      <div id="allSettings" class="chatgpt-dropdown chatgpt-dropdown-up" style="width:100%">
        <div class="flex items-center">
        <svg class="custom-icon" style="height:16px;width:16px;margin-right: 12px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"/></svg>
          <div>${i18n("nav_item_super_prompt_template")}</div>
        </div>
        <div class="chatgpt-dropdown-content" style="max-height:400px;overflow:auto">
          <a class="custom-menu-item"> ✏️ ${i18n(
            "menu_custom_super_prompt_category"
          )}</a>
          ${Array.from({ length: SuperPromptCategoryListLimit }).map(
            (_, index) => `
              <a class="custom-menu-item" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">${superPromptCategoryList[index].name}</a>
            `
          ).join("")}
        </div>
      </div>
    `;

    customATagEl.appendChild(menuItemDiv);
    insertMenuItemToNav(customATagEl);

    const menuItems = customATagEl.querySelectorAll(".custom-menu-item");
    const chatgptDropdownContentEl = customATagEl.querySelector(
      ".chatgpt-dropdown-content"
    );

    customATagEl.addEventListener("click", (event) => {
      event.stopPropagation();
      chatgptDropdownContentEl.scrollIntoView();
      chatgptDropdownContentEl.classList.add("show");
    });

    menuItems[0].addEventListener("click", (event) => {
      event.stopPropagation();
      chatgptDropdownContentEl.classList.remove("show");
      _showSuperPromptCategoryNameSettingsDialog();
    });

    Array.from({ length: SuperPromptCategoryListLimit }).forEach((_, index) => {
      menuItems[index + 1].addEventListener("click", (event) => {
        event.stopPropagation();
        chatgptDropdownContentEl.classList.remove("show");
        _showSuperPromptSettingDialog(index + 1);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export function subscribeMutationObserver() {
  var targetNode = document.body;
  var observer = new MutationObserver(function (mutations) {
    clearTimeout(mutationTimer);
    mutationTimer = setTimeout(function () {
      if (
        !supportOtherSite &&
        document.querySelector("nav.flex") &&
        document.querySelector("nav.flex")?.childNodes?.length >= 2 &&
        !document.getElementById("switchMenu")
      ) {
        addCustomLeftMenuItem();
        addCustomLeftMenuItem2();
        addCustomLeftMenuItem3();
        addCustomLeftMenuItem4();
      }

      try {
        const modifyAttributeElement = mutations.filter(
          (m) => m.type === "attributes"
        );
        modifyAttributeElement.forEach((mutation) => {
          if (
            mutation.target &&
            mutation.target.classList.contains("dialog-wrapper")
          ) {
            mutation.target.style.display === "flex"
              ? disableMenuItemTabindex()
              : restoreMenuItemTabindex();
          }
        });
      } catch (error) {
        console.log("mutations error", error);
      }
    }, 0);
  });

  const config = { attributes: true, childList: true, subtree: true };
  observer.observe(targetNode, config);
}
