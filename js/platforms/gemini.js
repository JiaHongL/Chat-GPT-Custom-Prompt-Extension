/**
 * platforms/gemini.js — Google Gemini 平台適配器
 */

import { BasePlatform } from './base.js';

export class GeminiPlatform extends BasePlatform {
  getChatInput() {
    return document.body.querySelector('rich-textarea');
  }

  getSendButton() {
    return document.querySelector('.send-button-container')?.querySelector('button');
  }

  insertMessage(input, message) {
    input.children[0].textContent = message;
    input.children[0].focus();
  }
}
