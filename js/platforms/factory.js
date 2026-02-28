/**
 * platforms/factory.js — 平台工廠
 * 根據當前 URL 返回對應的平台適配器實例。
 */

import {
  supportChatGPT,
  supportGemini,
  supportClaude,
  supportGrok,
  supportFelo,
  supportPerplexity,
} from '../core/state.js';

import { ChatGPTPlatform } from './chatgpt.js';
import { GeminiPlatform } from './gemini.js';
import { ClaudePlatform } from './claude.js';
import { GrokPlatform } from './grok.js';
import { FeloPlatform } from './felo.js';
import { PerplexityPlatform } from './perplexity.js';

/** @type {import('./base.js').BasePlatform} */
let _platform = null;

/**
 * 取得當前平台的適配器實例（單例）
 * @returns {import('./base.js').BasePlatform}
 */
export function getPlatform() {
  if (_platform) return _platform;

  if (supportGemini) {
    _platform = new GeminiPlatform();
  } else if (supportClaude) {
    _platform = new ClaudePlatform();
  } else if (supportGrok) {
    _platform = new GrokPlatform();
  } else if (supportFelo) {
    _platform = new FeloPlatform();
  } else if (supportPerplexity) {
    _platform = new PerplexityPlatform();
  } else {
    _platform = new ChatGPTPlatform();
  }

  return _platform;
}

/**
 * 便捷函式：取得輸入框
 * @returns {HTMLElement|null}
 */
export function chatInput() {
  return getPlatform().getChatInput();
}

/**
 * 便捷函式：取得送出按鈕
 * @returns {HTMLElement|null}
 */
export function sendButton() {
  return getPlatform().getSendButton();
}

/**
 * 便捷函式：送出訊息
 * @param {string} message
 * @param {boolean} isInsert
 */
export function sendMessage(message, isInsert = false) {
  return getPlatform().sendMessage(message, isInsert);
}
