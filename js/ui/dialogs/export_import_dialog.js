import { promptList, superPromptList, quickReplyMessageList, superPromptCategoryList,
         defaultPromptList, defaultSuperPromptList, defaultQuickReplyMessageList, defaultSuperPromptCategoryList,
         setPromptList, setSuperPromptList, setQuickReplyMessageList, setSuperPromptCategoryList,
         importType, setImportType } from '../../core/state.js';
import { updateChromeStorage } from '../../core/storage.js';
import { i18n } from '../../core/i18n.js';
import { disableMenuItemTabindex, restoreMenuItemTabindex } from '../../utils/dom.js';

let _generateButtons = null;
let _resetCustomMenuItem = null;
let els = {};

export function setGenerateButtons(fn) {
    _generateButtons = fn;
}

export function setResetCustomMenuItem(fn) {
    _resetCustomMenuItem = fn;
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

function checkFileContent(obj) {
    if (!obj || !obj.settings) return false;
    if (!obj.settings.hasOwnProperty("isHiddenMenu")) return false;
    if (!Array.isArray(obj.settings.prompt)) return false;
    for (const item of obj.settings.prompt) {
        if (!item.hasOwnProperty("isVisible") || !item.hasOwnProperty("key") ||
            !item.hasOwnProperty("text") || !item.hasOwnProperty("prefix") ||
            !item.hasOwnProperty("suffix")) {
            return false;
        }
    }
    if (!Array.isArray(obj.settings.quickReply)) return false;
    for (const item of obj.settings.quickReply) {
        if (!item.hasOwnProperty("isVisible") || !item.hasOwnProperty("key") ||
            !item.hasOwnProperty("text") || !item.hasOwnProperty("quickReplyMessage")) {
            return false;
        }
    }
    return true;
}

function handleFileLoad(event) {
    try {
        const json = JSON.parse(event.target.result);
        if (!checkFileContent(json)) {
            els.importFileInput.value = "";
            alert(i18n("alert_import_error"));
            return;
        }

        let confirmMessage = "";
        switch (importType) {
            case 1:
                confirmMessage = i18n("confirm_is_import_only_prompt_template", [els.importFileInput.files[0].name]);
                break;
            case 2:
                confirmMessage = i18n("confirm_is_import_only_reply_message", [els.importFileInput.files[0].name]);
                break;
            case 3:
                confirmMessage = i18n("confirm_is_import_only_super_prompt_template", [els.importFileInput.files[0].name]);
                break;
            default:
                confirmMessage = i18n("confirm_is_import_all", [els.importFileInput.files[0].name]);
                break;
        }

        const result = confirm(confirmMessage);
        if (result) {
            // Import prompt (type 0 or 1)
            if (importType === 0 || importType === 1) {
                const previousPromptList = JSON.parse(JSON.stringify(promptList));
                promptList.forEach((setting, index) => {
                    if (json.settings.prompt[index]) {
                        setting.text = json.settings.prompt[index].text;
                        setting.prefix = json.settings.prompt[index].prefix;
                        setting.suffix = json.settings.prompt[index].suffix;
                        setting.isVisible = json.settings.prompt[index].isVisible;
                        if (previousPromptList.isVisible) {
                            setting.buttonElement.removeEventListener("click", setting.handleClickFn);
                            setting.buttonElement.remove();
                            delete setting.buttonElement;
                            delete setting.handleClickFn;
                        }
                    }
                });
                localStorage.setItem("Custom.Settings.Prompt", JSON.stringify(promptList));
            }

            // Import quickReply (type 0 or 2)
            if (importType === 0 || importType === 2) {
                const previousQuickReplyMessageList = JSON.parse(JSON.stringify(quickReplyMessageList));
                quickReplyMessageList.forEach((settings, index) => {
                    if (json.settings.quickReply[index]) {
                        settings.text = json.settings.quickReply[index].text;
                        settings.quickReplyMessage = json.settings.quickReply[index].quickReplyMessage;
                        settings.isVisible = json.settings.quickReply[index].isVisible;
                        if (previousQuickReplyMessageList.isVisible) {
                            settings.buttonElement.removeEventListener("click", settings.handleClickFn);
                            settings.buttonElement.remove();
                            delete settings.buttonElement;
                            delete settings.handleClickFn;
                        }
                    }
                });
                localStorage.setItem("Custom.Settings.QuickReply", JSON.stringify(quickReplyMessageList));
            }

            // Import superPrompt (type 0 or 3)
            if ((importType === 0 && json.settings.hasOwnProperty("superPrompt") && json.settings.hasOwnProperty("superPromptCategoryList")) ||
                (importType === 3 && json.settings.hasOwnProperty("superPrompt") && json.settings.hasOwnProperty("superPromptCategoryList"))) {
                const previousSuperPromptList = JSON.parse(JSON.stringify(superPromptList));
                superPromptList.forEach((setting, index) => {
                    if (json.settings.superPrompt[index]) {
                        setting.text = json.settings.superPrompt[index].text;
                        setting.prompt = json.settings.superPrompt[index].prompt;
                        setting.isVisible = json.settings.superPrompt[index].isVisible;
                        if (previousSuperPromptList.isVisible) {
                            setting.buttonElement.removeEventListener("click", setting.handleClickFn);
                            setting.buttonElement.remove();
                            delete setting.buttonElement;
                            delete setting.handleClickFn;
                        }
                    }
                });
                localStorage.setItem("Custom.Settings.SuperPrompt", JSON.stringify(superPromptList));

                superPromptCategoryList.forEach((item, index) => {
                    if (json.settings.superPromptCategoryList[index]) {
                        item.name = json.settings.superPromptCategoryList[index].name;
                    }
                });
                localStorage.setItem("Custom.Settings.SuperPromptCategoryList", JSON.stringify(superPromptCategoryList));

                if (_resetCustomMenuItem) _resetCustomMenuItem();
            }

            document.querySelector("#customKeywordInput").value = "";
            document.querySelector(".prompt-list-area").scrollTop = 0;
            _generateButtons();
            alert(i18n("alert_import_success"));
            els.importFileInput.value = "";
        } else {
            els.importFileInput.value = "";
        }
    } catch (error) {
        console.log(error);
    }
}

export function initExportImportDialog(elements) {
    els = elements;

    // Cancel button
    els.exportAndImportDialogCancelBtn.addEventListener("click", () => {
        els.exportAndImportDialog.style.display = "none";
        restoreMenuItemTabindex();
    });

    // Export settings
    els.exportSettingsBtn.addEventListener("click", () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const date = String(now.getDate()).padStart(2, "0");
        const hour = String(now.getHours()).padStart(2, "0");
        const minute = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        const filename = i18n("export_file_name", [year, month, date, hour, minute, seconds]);

        const promptClone = JSON.parse(JSON.stringify(promptList));
        promptClone.forEach((item) => {
            delete item.buttonElement;
            delete item.handleClickFn;
        });

        const superPromptClone = JSON.parse(JSON.stringify(superPromptList));
        superPromptClone.forEach((item) => {
            delete item.buttonElement;
            delete item.handleClickFn;
        });

        const quickReplyClone = JSON.parse(JSON.stringify(quickReplyMessageList));
        quickReplyClone.forEach((item) => {
            delete item.buttonElement;
            delete item.handleClickFn;
        });

        const exportData = {
            settings: {
                prompt: promptClone,
                quickReply: quickReplyClone,
                isHiddenMenu: localStorage.getItem("Custom.Settings.Menu.Hidden"),
                superPrompt: superPromptClone,
                superPromptCategoryList: superPromptCategoryList
            }
        };

        downloadFile(JSON.stringify(exportData), filename, "application/json");
    });

    // Import all
    els.importAllBtn.addEventListener("click", () => {
        setImportType(0);
        els.importFileInput.click();
    });

    // Import only prompt
    els.importOnlyPromptBtn.addEventListener("click", () => {
        setImportType(1);
        els.importFileInput.click();
    });

    // Import only super prompt
    els.importOnlySuperPromptBtn.addEventListener("click", () => {
        setImportType(3);
        els.importFileInput.click();
    });

    // Import only quick reply
    els.importOnlyQuickReplyBtn.addEventListener("click", () => {
        setImportType(2);
        els.importFileInput.click();
    });

    // File input change
    els.importFileInput.addEventListener("change", () => {
        if (els.importFileInput.files.length === 0) return;
        const reader = new FileReader();
        reader.onload = handleFileLoad;
        reader.readAsText(els.importFileInput.files[0]);
    });

    // Reset settings
    els.resetSettingBtn.addEventListener("click", () => {
        const result = confirm(i18n("confirm_is_reset"));
        if (result) {
            const newPromptList = JSON.parse(JSON.stringify(defaultPromptList));
            setPromptList(newPromptList);
            localStorage.setItem("Custom.Settings.Prompt", JSON.stringify(newPromptList));

            const newSuperPromptList = JSON.parse(JSON.stringify(defaultSuperPromptList));
            setSuperPromptList(newSuperPromptList);
            localStorage.setItem("Custom.Settings.SuperPrompt", JSON.stringify(newSuperPromptList));

            const newQuickReplyMessageList = JSON.parse(JSON.stringify(defaultQuickReplyMessageList));
            setQuickReplyMessageList(newQuickReplyMessageList);
            localStorage.setItem("Custom.Settings.QuickReply", JSON.stringify(newQuickReplyMessageList));

            const newSuperPromptCategoryList = JSON.parse(JSON.stringify(defaultSuperPromptCategoryList));
            setSuperPromptCategoryList(newSuperPromptCategoryList);
            localStorage.setItem("Custom.Settings.SuperPromptCategoryList", JSON.stringify(newSuperPromptCategoryList));

            if (_resetCustomMenuItem) _resetCustomMenuItem();

            document.querySelector("#customKeywordInput").value = "";
            document.querySelector(".prompt-list-area").scrollTop = 0;
            _generateButtons();
            alert(i18n("alert_reset_success"));
        }
    });
}

export function openExportAndImportDialog() {
    disableMenuItemTabindex();
    els.exportAndImportDialog.style.display = "flex";
}
