/**
 * platforms/felo.js — Felo AI 平台適配器
 */

import { BasePlatform } from './base.js';

export class FeloPlatform extends BasePlatform {
  getChatInput() {
    return document.querySelector('form')?.querySelector('textarea');
  }

  getSendButton() {
    return (
      document.querySelector('form')?.querySelector('[type=submit]') ||
      document.querySelector('form')?.querySelectorAll('button')[
        document.querySelector('form')?.querySelectorAll('button')?.length - 1
      ] ||
      document.querySelector('form')?.querySelector('button.rounded-3xl')
    );
  }

  insertMessage(input, message) {
    input.value = message;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}
