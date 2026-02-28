/**
 * platforms/chatgpt.js — ChatGPT 平台適配器
 */

import { BasePlatform } from './base.js';

export class ChatGPTPlatform extends BasePlatform {
  getChatInput() {
    return document.querySelector('#prompt-textarea');
  }

  getSendButton() {
    return (
      document.querySelector('button[data-testid="send-button"]') ||
      document.querySelector('#prompt-textarea')
        ?.parentElement?.parentElement?.querySelectorAll('button')[
          document.querySelector('#prompt-textarea')
            ?.parentElement?.parentElement?.querySelectorAll('button')?.length - 1
        ]
    );
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
