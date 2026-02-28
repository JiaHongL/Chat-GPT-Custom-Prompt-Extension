/**
 * platforms/perplexity.js — Perplexity AI 平台適配器
 *
 * 特殊：contenteditable 模式需使用 document.execCommand('insertText')
 * 以及不檢查 sendButton 存在性（直接 optional chaining）。
 */

import { i18n } from '../core/i18n.js';
import { BasePlatform } from './base.js';

export class PerplexityPlatform extends BasePlatform {
  getChatInput() {
    return document.querySelector('#ask-input');
  }

  getSendButton() {
    const nodeList = document.querySelector('.bottom-safeAreaInsetBottom').querySelectorAll('button[type="button"][data-state="closed"]');
    return nodeList[nodeList.length - 1];
  }

  insertMessage(input, message) {
    if (input instanceof HTMLTextAreaElement) {
      input.value = message;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
      // contenteditable 特殊策略
      const editable = input;
      if (!editable) throw new Error('找不到可編輯區');
      editable.focus();
      // 把整個 editable 裡的文字全選起來
      const sel = window.getSelection();
      sel.removeAllRanges();
      const range = document.createRange();
      range.selectNodeContents(editable);
      sel.addRange(range);
      setTimeout(() => {
        // 覆蓋掉被選取的內容
        document.execCommand('insertText', false, message);
      });
    }
  }

  /**
   * Perplexity 不檢查 sendButton 存在性
   * @override
   */
  _clickSend(isGenerating) {
    const delay = isGenerating ? 500 : 100;
    setTimeout(() => {
      this.getSendButton()?.click();
    }, delay);
  }
}
