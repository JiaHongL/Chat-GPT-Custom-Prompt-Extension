/**
 * loader.js — Manifest Entry Point (Content Script)
 * 
 * Chrome Manifest V3 的 content_scripts 不直接支援 ES Modules，
 * 因此透過此 loader 動態 import 主模組。
 */
(async () => {
  try {
    const src = chrome.runtime.getURL('js/content.js');
    await import(src);
  } catch (error) {
    console.error('[ChatGPT Custom Prompt Extension] Failed to load modules:', error);
  }
})();
