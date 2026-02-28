/**
 * platforms/grok.js — Grok 平台適配器
 */

import { BasePlatform } from './base.js';

export class GrokPlatform extends BasePlatform {
  getChatInput() {
    return (
      document.querySelector('form')?.querySelector('textarea') ||
      document.querySelector('div[contenteditable="true"]')
    );
  }

  getSendButton() {
    return document.querySelector('form')?.querySelector('button[type="submit"]');
  }

  insertMessage(input, message) {
    if (input instanceof HTMLTextAreaElement) {
      input.value = message;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
      // contenteditable 模式：逐行 <p>
      const messageArray = message.split('\n');
      messageArray?.forEach((msg) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = msg;
        input.appendChild(paragraph);
      });
    }
  }
}
