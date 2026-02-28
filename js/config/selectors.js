/**
 * config/selectors.js — 集中管理各平台 DOM Selectors
 */

export const PLATFORM_SELECTORS = {
  chatgpt: {
    input: '#prompt-textarea',
    sendButton: 'button[data-testid="send-button"]',
    stopButton: null, // 由 sendMessage 內部處理
    nav: 'nav.flex',
  },
  gemini: {
    input: 'rich-textarea',
    sendButton: '.send-button-container button',
    stopButton: null,
    nav: null,
  },
  claude: {
    input: 'div[contenteditable="true"]',
    sendButton: 'button[aria-label="Send Message"]',
    stopButton: null,
    nav: null,
  },
  grok: {
    input: 'form textarea',
    inputAlt: 'div[contenteditable="true"]',
    sendButton: 'form button[type="submit"]',
    stopButton: null,
    nav: null,
  },
  felo: {
    input: 'form textarea',
    sendButton: 'form [type=submit]',
    sendButtonAlt: 'button.rounded-3xl',
    stopButton: null,
    nav: null,
  },
  perplexity: {
    input: '#ask-input',
    sendButton: '[data-testid="submit-button"]',
    stopButton: null,
    nav: null,
  },
};
