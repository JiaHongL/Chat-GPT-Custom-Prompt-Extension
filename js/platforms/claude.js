/**
 * platforms/claude.js — Claude AI 平台適配器
 */

import { BasePlatform } from './base.js';

export class ClaudePlatform extends BasePlatform {
  getChatInput() {
    return document.querySelector('div[contenteditable="true"]');
  }

  getSendButton() {
    return (
      document.querySelector('button[aria-label="Send message"]') ||
      document.querySelector('button[aria-label="Send Message"]')
    );
  }

  insertMessage(input, message) {
    const messageArray = message.split('\n');
    messageArray?.forEach((msg) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = msg;
      input.appendChild(paragraph);
    });
    // 觸發 input 事件，讓 Claude 的 React 偵測到內容變化並啟用送出按鈕
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}
