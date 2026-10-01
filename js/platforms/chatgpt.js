/**
 * platforms/chatgpt.js — ChatGPT 平台適配器
 */

import { BasePlatform } from './base.js';

export class ChatGPTPlatform extends BasePlatform {
  getChatInput() {
    const selectors = [
      '#prompt-textarea',
      'div.ProseMirror[contenteditable="true"][role="textbox"]',
      'form [contenteditable="true"][role="textbox"]',
      '[contenteditable="true"][role="textbox"][data-composer-markdown]',
    ];
    const inputs = [...new Set(selectors.flatMap((selector) => [...document.querySelectorAll(selector)]))];

    return (
      inputs.find((input) => input.isConnected && input.getClientRects().length > 0) ||
      inputs.find((input) => input.isConnected) ||
      null
    );
  }

  getSendButton() {
    const input = this.getChatInput();
    return (
      document.querySelector('button[data-testid="send-button"]') ||
      input?.closest('form')?.querySelector('button[type="submit"]') ||
      input?.parentElement?.parentElement?.querySelectorAll('button')[
        input?.parentElement?.parentElement?.querySelectorAll('button')?.length - 1
      ]
    );
  }

  _getSendDelay() {
    return 500;
  }

  preSend() {
    const input = this.getChatInput();
    if (input) {
      input.textContent = '-';
    }
  }

  insertMessage(input, message) {
    // 清空現有子節點
    if (input?.children?.length) {
      while (input?.firstChild) {
        input.removeChild(input?.firstChild);
      }
    }
    // 逐行建立 <p> 元素
    const messageArray = message?.split('\n');
    messageArray?.forEach((msg) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = msg;
      input.appendChild(paragraph);
    });
  }
}
