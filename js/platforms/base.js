/**
 * platforms/base.js — 平台適配器基底類
 */

import { i18n } from '../core/i18n.js';

export class BasePlatform {
  /**
   * 取得聊天輸入框元素
   * @returns {HTMLElement|null}
   */
  getChatInput() {
    throw new Error('getChatInput() must be implemented');
  }

  /**
   * 取得送出按鈕元素
   * @returns {HTMLElement|null}
   */
  getSendButton() {
    throw new Error('getSendButton() must be implemented');
  }

  /**
   * 將訊息插入輸入框
   * @param {HTMLElement} input - 輸入框元素
   * @param {string} message - 訊息內容
   */
  insertMessage(input, message) {
    throw new Error('insertMessage() must be implemented');
  }

  /**
   * 送出前的佔位處理（預設不做事）
   */
  preSend() {}

  /**
   * 送出完整流程
   * @param {string} message - 訊息內容
   * @param {boolean} isInsert - 若 true 則僅插入不送出
   */
  sendMessage(message, isInsert = false) {
    let isGenerating = false;

    // 檢查是否正在生成回覆，若有則先停止
    document.querySelectorAll('button').forEach((button) => {
      if (button.textContent === 'Stop generating') {
        isGenerating = true;
        button.click();
      }
    });

    // 佔位處理
    this.preSend();

    setTimeout(() => {
      const input = this.getChatInput();
      if (!input) {
        alert(i18n('alert_not_found_input'));
        return;
      }

      // 插入訊息
      this.insertMessage(input, message);

      // 若僅插入不送出
      if (isInsert) {
        return;
      }

      // 送出
      this._clickSend(isGenerating);
    });
  }

  /**
   * 點擊送出按鈕
   * @param {boolean} isGenerating - 是否正在生成中（需較長延遲）
   * @protected
   */
  _clickSend(isGenerating) {
    const delay = isGenerating ? 500 : 100;
    setTimeout(() => {
      const btn = this.getSendButton();
      if (!btn) {
        alert(i18n('alert_not_found_send_button'));
        return;
      }
      btn.click();
    }, delay);
  }
}
