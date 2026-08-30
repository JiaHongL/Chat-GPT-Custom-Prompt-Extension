import { promptList, superPromptList, quickReplyMessageList, superPromptCategoryList,
         setPrefix, setSuffix, setQuestionId, setSuperPromptId, setSuperPromptName, setSuperPrompt,
         supportChatGPT, supportOtherSite, menuDivElement, setMenuDivElement } from '../core/state.js';
import { i18n } from '../core/i18n.js';
import { sendMessage } from '../platforms/factory.js';
import { createButton } from './components/button.js';
import { findGroupAndIndex } from '../utils/helpers.js';
import { handleTabindex, restoreMenuItemTabindex } from '../utils/dom.js';
import { SEARCH_DEBOUNCE } from '../config/constants.js';

let _showQuestionDialog = null;
let _showSuperPromptDialog = null;
let _downloadChatGPTConversationAsHtml = null;
let keywordInputValueTemp = '';
let lastScrollPosition = 0;
let controlCustomMenuTabindexHandler = null;

export function setShowQuestionDialog(fn) {
  _showQuestionDialog = fn;
}

export function setShowSuperPromptDialog(fn) {
  _showSuperPromptDialog = fn;
}

export function setDownloadChatGPTConversationAsHtml(fn) {
  _downloadChatGPTConversationAsHtml = fn;
}

export function generateButtons() {
    const findCustomMenu = document.querySelector(".custom-menu");

    if (document.querySelector("#customKeywordInput") && document.querySelector("#customKeywordInput").value) {
      keywordInputValueTemp = document.querySelector("#customKeywordInput").value;
    } else { keywordInputValueTemp = ""; }

    if (document.querySelector(".prompt-list-area") && document.querySelector(".prompt-list-area").scrollTop) {
      lastScrollPosition = document.querySelector(".prompt-list-area").scrollTop;
    } else { lastScrollPosition = 0; }

    if (findCustomMenu) findCustomMenu.remove();

    const menuDiv = document.createElement("div");
    menuDiv.classList.add("custom-menu");
    menuDiv.style.position = "fixed";
    menuDiv.style.top = "72px";
    menuDiv.style.right = "8px";
    menuDiv.style.left = "auto";
    menuDiv.style.zIndex = "99998";

    // Search box
    const searchBoxDiv = document.createElement("div");
    searchBoxDiv.classList.add("search-box");
    searchBoxDiv.innerHTML = `<input style="width:100%" tabindex="1" type="text" id="customKeywordInput" class="custom-keyword-input" placeholder="${i18n('placeholder_keyword_input')}">`;

    let timerId;
    const inputBox = searchBoxDiv.querySelector("#customKeywordInput");
    inputBox.addEventListener("input", (event) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        const customTemplateButtons = document.querySelector(".prompt-list-area");
        customTemplateButtons.childNodes.forEach((customTemplateButton) => {
          if (event.target.value === "") { customTemplateButton.style.display = "block"; return; }
          if (customTemplateButton.title.toLowerCase().includes(event.target.value?.toLowerCase())) {
            customTemplateButton.style.display = "block";
          } else { customTemplateButton.style.display = "none"; }
        });
        controlCustomMenuTabindex();
      }, SEARCH_DEBOUNCE);
    });
    inputBox.addEventListener("focus", () => { restoreMenuItemTabindex(); });

    const promptListDiv = document.createElement("div");
    promptListDiv.classList.add("prompt-list-area");
    const quickReplyDiv = document.createElement("div");
    quickReplyDiv.classList.add("quick-reply-area");
    const otherDiv = document.createElement("div");
    otherDiv.classList.add("other-area");

    menuDiv.appendChild(searchBoxDiv);
    menuDiv.appendChild(promptListDiv);
    menuDiv.appendChild(quickReplyDiv);
    menuDiv.appendChild(otherDiv);

    // Prompt buttons
    promptList.forEach((settings, index) => {
      if (!settings.isVisible) return;
      const button = createButton(`${settings.text}`);
      button.tabIndex = index + 2;
      const handleClick = () => {
        setPrefix(settings.prefix);
        setSuffix(settings.suffix);
        setQuestionId(settings.key);
        _showQuestionDialog();
      };
      button.addEventListener("click", handleClick);
      settings.buttonElement = button;
      settings.handleClickFn = handleClick;
      promptListDiv.appendChild(button);
    });

    // Super prompt buttons
    superPromptList.forEach((settings, index) => {
      if (!settings.isVisible || !settings.text || !settings.prompt) return;
      const { group } = findGroupAndIndex(settings.key);
      const button = createButton(`${settings.text}`, "warning",
        `${superPromptCategoryList[group - 1].name} \n #${settings.key} ${settings.text}`);
      button.tabIndex = index + 13;
      const handleClick = () => {
        setSuperPromptId(settings.key);
        setSuperPromptName(settings.text);
        setSuperPrompt(settings.prompt);
        _showSuperPromptDialog();
      };
      button.addEventListener("click", handleClick);
      settings.buttonElement = button;
      settings.handleClickFn = handleClick;
      promptListDiv.appendChild(button);
    });

    // Quick reply buttons
    quickReplyMessageList.forEach((settings) => {
      if (!settings.isVisible) return;
      const button = createButton(`${settings.text}`, "info");
      const handleClick = () => {
        if (settings.quickReplyMessage.trim()) sendMessage(settings.quickReplyMessage);
      };
      button.addEventListener("click", handleClick);
      settings.buttonElement = button;
      settings.handleClickFn = handleClick;
      quickReplyDiv.appendChild(button);
    });

    // Download button (ChatGPT only)
    if (supportChatGPT) {
      const downloadHtmlButton = createButton(i18n("menu_item_download_html"), "secondary", "");
      downloadHtmlButton.addEventListener("click", () => { if (_downloadChatGPTConversationAsHtml) _downloadChatGPTConversationAsHtml(); });
      otherDiv.appendChild(downloadHtmlButton);
    }

    // Collapse button
    const menuCollapseButton = createButton("", "light", "", true);
    menuCollapseButton.addEventListener("click", () => { collapseToggle(); });
    otherDiv.appendChild(menuCollapseButton);

    // TransitionEnd auto-focus
    menuDiv.addEventListener("transitionend", function(event) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) return;
      if (localStorage.getItem("Custom.Settings.Menu.Hidden") === "N") {
        document.querySelector("#customKeywordInput").focus();
      }
    });

    if (supportOtherSite) menuDiv.style.visibility = "hidden";

    setMenuDivElement(menuDiv);
    document.body.appendChild(menuDiv);
    controlCustomMenuTabindex();

    if (keywordInputValueTemp) {
      document.querySelector("#customKeywordInput").value = keywordInputValueTemp;
      document.querySelector("#customKeywordInput").dispatchEvent(new Event("input", { bubbles: true }));
      keywordInputValueTemp = "";
    }
    if (lastScrollPosition) {
      document.querySelector(".prompt-list-area").scrollTo(0, lastScrollPosition);
      lastScrollPosition = 0;
    }
}

export function collapseToggle() {
    if (localStorage.getItem("Custom.Settings.Menu.Hidden") === "Y") {
      localStorage.setItem("Custom.Settings.Menu.Hidden", "N");
      document.body.classList.remove("hidden-template-buttons");
      try { document.getElementById("switchMenu").checked = true; } catch (error) {}
    } else {
      localStorage.setItem("Custom.Settings.Menu.Hidden", "Y");
      document.body.classList.add("hidden-template-buttons");
      try { document.getElementById("switchMenu").checked = false; } catch (error) {}
    }
}

export function controlCustomMenuTabindex() {
    let allTabindexElements = [
      document.querySelector("#customKeywordInput"),
      ...document.querySelector(".prompt-list-area").querySelectorAll("button"),
    ];
    allTabindexElements = allTabindexElements.filter(el => el.style.display !== "none");
    const firstEl = allTabindexElements[0];
    const lastEl = allTabindexElements[allTabindexElements.length - 1];

    if (controlCustomMenuTabindexHandler) {
      document.querySelector(".custom-menu").removeEventListener("keydown", controlCustomMenuTabindexHandler);
    }
    controlCustomMenuTabindexHandler = handleTabindex.bind(null, firstEl, lastEl);
    document.querySelector(".custom-menu").addEventListener("keydown", controlCustomMenuTabindexHandler);
}
