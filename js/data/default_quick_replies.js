/**
 * data/default_quick_replies.js — 各語系預設快速回覆資料
 */

import { QuickReplyMessageAllItems } from '../config/constants.js';

// 產生空白填充項目 (index 5 ~ QuickReplyMessageAllItems-1)
const DefaultEmptyQuickReplyMessageList = [];
Array.from({ length: QuickReplyMessageAllItems }).forEach((_, index) => {
  if (index > 4) {
    DefaultEmptyQuickReplyMessageList.push({
      key: "none",
      text: "quickReply" + (index + 1),
      quickReplyMessage: "",
      buttonElement: null,
      handleClickFn: null,
      isVisible: false,
    });
  }
});

// --- 繁體中文 (TW) ---
export const defaultQuickReplyMessageListTW = [
  {
    key: "Y",
    text: "提供其它範例",
    quickReplyMessage: "請提供其它範例",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "U",
    text: "更詳細的說明",
    quickReplyMessage: "請提供更細節的說明",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "I",
    text: "提供程式範例",
    quickReplyMessage: "請提供程式範例",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "O",
    text: "翻譯成繁體中文",
    quickReplyMessage: "請翻譯成繁體中文",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "P",
    text: "翻譯成英文",
    quickReplyMessage: "請翻譯成英文",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  ...DefaultEmptyQuickReplyMessageList,
];

// --- 日本語 (JA) ---
export const defaultQuickReplyMessageListJA = [
  {
    key: "Y",
    text: "他の例",
    quickReplyMessage: "他の例を提供してください",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "U",
    text: "より詳細な説明",
    quickReplyMessage: "詳しい説明を提供してください",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "I",
    text: "コード例",
    quickReplyMessage: "プログラム例を提供してください",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "O",
    text: "日本語に翻訳する",
    quickReplyMessage: "日本語に翻訳してください",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "P",
    text: "英語に翻訳する",
    quickReplyMessage: "英語に翻訳してください",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  ...DefaultEmptyQuickReplyMessageList,
];

// --- English (EN) ---
export const defaultQuickReplyMessageListEN = [
  {
    key: "Y",
    text: "Other examples",
    quickReplyMessage: "Please provide other examples",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "U",
    text: "More detailed",
    quickReplyMessage: "Please provide a more detailed explanation",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "I",
    text: "Code examples",
    quickReplyMessage: "Please provide code examples",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "O",
    text: "Trans into English",
    quickReplyMessage: "Please translate into English",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "P",
    text: "Trans into Chinese",
    quickReplyMessage: "Please translate into Traditional Chinese",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  ...DefaultEmptyQuickReplyMessageList,
];

// --- 简体中文 (CN) ---
export const defaultQuickReplyMessageListCN = [
  {
    key: "Y",
    text: "提供其他示例",
    quickReplyMessage: "请提供其他示例",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "U",
    text: "更详细的说明",
    quickReplyMessage: "请提供更详细的说明",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "I",
    text: "提供编程示例",
    quickReplyMessage: "请提供编程示例",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "O",
    text: "翻译成简体中文",
    quickReplyMessage: "请翻译成简体中文",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "P",
    text: "翻译成英文",
    quickReplyMessage: "请翻译成英文",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  ...DefaultEmptyQuickReplyMessageList,
];

// --- 한국어 (KO) ---
export const defaultQuickReplyMessageListKO = [
  {
    key: "Y",
    text: "다른 예시 제공",
    quickReplyMessage: "다른 예시를 제공해주세요",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "U",
    text: "자세한 설명",
    quickReplyMessage: "좀 더 자세한 설명을 제공해주세요",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "I",
    text: "코드 예시 제공",
    quickReplyMessage: "코드 예시를 제공해주세요",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "O",
    text: "한국어로 번역",
    quickReplyMessage: "한국어로 번역해주세요",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "P",
    text: "영어로 번역",
    quickReplyMessage: "영어로 번역해주세요",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  ...DefaultEmptyQuickReplyMessageList,
];

/**
 * 根據語系字串回傳對應的預設快速回覆清單
 * @param {string} locale - 語系代碼，例如 "zh_TW", "ja", "en", "zh_CN", "ko"
 * @returns {Array} 預設快速回覆清單
 */
export function getDefaultQuickReplyList(locale) {
  switch (locale) {
    case 'zh_TW':
      return defaultQuickReplyMessageListTW;
    case 'ja':
      return defaultQuickReplyMessageListJA;
    case 'en':
      return defaultQuickReplyMessageListEN;
    case 'zh_CN':
      return defaultQuickReplyMessageListCN;
    case 'ko':
      return defaultQuickReplyMessageListKO;
    default:
      return defaultQuickReplyMessageListEN;
  }
}
