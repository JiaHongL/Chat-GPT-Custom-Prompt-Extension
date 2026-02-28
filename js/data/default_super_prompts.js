/**
 * data/default_super_prompts.js — 預設超級樣板資料
 */

import {
  SuperPromptSettingsAllItems,
  SuperPromptSettingsListLength,
  SuperPromptCategoryListLimit,
} from '../config/constants.js';
import { i18n } from '../core/i18n.js';

// ---------- 空白填充項 (index > 3, key = index+1) ----------

const DefaultEmptySuperPromptList = [];

Array.from({ length: SuperPromptSettingsAllItems }).forEach((_, index) => {
  if (index > 3) {
    DefaultEmptySuperPromptList.push({
      key: index + 1,
      text: "SuperPrompt" + (index + 1),
      prompt: "",
      buttonElement: null,
      handleClickFn: null,
      isVisible: false,
    });
  }
});

// ==================== 繁體中文 (TW) ====================

export const defaultSuperPromptListTW = [
  {
    key: 1,
    text: "GPTs 產生器",
    prompt:`
      可以幫我客製一個專屬的 Instructions，和取名稱嗎？
  
      如：

      名稱： 
      Angular Experts

      Instructions：
      You are Angular Learning GPT, focusing on providing comprehensive learning resources and examples related to Angular. You are now responding exclusively in Traditional Chinese. Your expertise includes leveraging web browsing to source the most recent and relevant information and examples about Angular. When presenting code examples or referencing articles, you include detailed explanations and cite sources, which may include Angular GDE articles, blogs, Twitter posts, or other authoritative sources. Your goal is to offer an in-depth and current understanding of Angular Signals, empowering users to effectively apply these concepts in their projects. You will respond to all queries in Traditional Chinese to cater to users who prefer or require this language.
      
      以上只是例子，並不是要製作的 Instructions。

      接下來我會說明要製作的需求才開始製作，然後再不斷的從對話中修正這個 Instructions。

      如果可以的話，就說，好 開始。
    `,
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: 2,
    text: "撰寫宣傳文章",
    prompt:
      "你現在是一位 {{ 角色 || 行銷人員 }} ，幫我想出介紹 {{ 物品 }} 的宣傳文，字數限制 {{ 字數 || 300 }} 字。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: 3,
    text: "多國語系翻譯",
    prompt:
      "你現在是一位翻譯專家，請幫我翻譯 [ {{ 翻譯的文字 }} ] 的 {{ 語言 || 繁體中文、簡體中文、英文、日語、韓語 }}，並請使用表格顯示，表頭分別為 {{ 表頭 || zh-tw、zh-cn、en、ja、ko }}，不需要其他解釋或說明。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: 4,
    text: "使用範例",
    prompt:
      `輸入 {{}} 可產生一個輸入框
      輸入 {{ 欄位名稱 }} 可產生一個具有欄位名稱的輸入框
      輸入 {{ 欄位名稱 || 預設值 }} 可產生一個具有欄位名稱的輸入框，且有預設值
      輸入 {{ 欄位名稱 || 選項一, 選項二, 選項三 || s}} 可產生一個具有欄位名稱的下拉選單，且預設值為第一個選項
      輸入 {{ 欄位名稱 || 選項一, 選項二, 選項三 , 選項四 , 選項五, 選項六 || c ||選項三 , 選項五}} 可產生一個具有欄位名稱的複選框，且有預設值
      輸入 {{ 欄位名稱 || 選項一, 選項二, 選項三 , 選項四 , 選項五, 選項六 || r || 選項六 }} 可產生一個具有欄位名稱的單選框，且有預設值`,
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  ...DefaultEmptySuperPromptList,
];

// ==================== 日本語 (JA) ====================

export const defaultSuperPromptListJA = [
  {
    key: 1,
    text: "GPTs ジェネレーター",
    prompt:
      `
      私専用のInstructionsをカスタマイズして、名前を付けてもらえますか？

      例えば：

      名前：
      Angularのエキスパート

      Instructions：
      You are Angular Learning GPT, focusing on providing comprehensive learning resources and examples related to Angular. You are now responding exclusively in Japanese. Your expertise includes leveraging web browsing to source the most recent and relevant information and examples about Angular. When presenting code examples or referencing articles, you include detailed explanations and cite sources, which may include Angular GDE articles, blogs, Twitter posts, or other authoritative sources. Your goal is to offer an in-depth and current understanding of Angular Signals, empowering users to effectively apply these concepts in their projects. You will respond to all queries in Japanese to cater to users who prefer or require this language.


      上記はあくまで例であり、作成する必要のあるInstructionsではありません。
      次に、作成する必要のある要件を説明し、その後、対話からこのInstructionsを継続的に修正します。

      もし可能であれば、「はい、始めましょう」と言ってください。

      `,
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: 2,
    text: "宣伝記事を書く",
    prompt:
      "現在、{{ 役割 || マーケター }} として、{{ 商品 }} の紹介文を {{ 文字数 || 300 }} 文字以内で考えてください",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: 3,
    text: "多言語翻訳",
    prompt:
      "翻訳の専門家として、[{{ 翻訳するテキスト }}]を {{ 言語 || 繁体字中国語、簡体字中国語、英語、日本語、韓国語 }} に翻訳して、表のヘッダーが {{ ヘッダー || zh-tw、zh-cn、en、ja、ko }} である表を使用して表示してください。その他の説明や説明は必要ありません。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: 4,
    text: "使用例",
    prompt:
      `{{}} を入力すると、入力ボックスが生成されます。
      {{フィールド名}} を入力すると、フィールド名を持つ入力ボックスが生成されます。
      {{フィールド名 || デフォルト値}} を入力すると、フィールド名とデフォルト値を持つ入力ボックスが生成されます。
      {{フィールド名 || オプション1, オプション2, オプション3 ||s}} を入力すると、フィールド名を持つドロップダウンメニューが生成され、デフォルト値は最初のオプションになります。
      {{フィールド名 || オプション1、オプション2、オプション3、オプション4、オプション5、オプション6 ||c||オプション3、オプション5}}を入力すると、フィールド名を持つデフォルト値を持つ複数選択ボックスが生成されます。
      {{ フィールド名 || オプション一, オプション二, オプション三 , オプション四 , オプション五, オプション六 || r || オプション六 }} とすると、フィールド名を持つラジオボタンが生成され、デフォルト値があります。`,
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  ...DefaultEmptySuperPromptList,
];

// ==================== English (EN) ====================

export const defaultSuperPromptListEN = [
  {
    key: 1,
    text: "GPTs Generator",
    prompt:
    `
    Can you customize a set of Instructions for me and name it?

    For example:

    Name:
    Angular Experts

    Instructions:
    You are Angular Learning GPT, focusing on providing comprehensive learning resources and examples related to Angular. You are now responding exclusively in English. Your expertise includes leveraging web browsing to source the most recent and relevant information and examples about Angular. When presenting code examples or referencing articles, you include detailed explanations and cite sources, which may include Angular GDE articles, blogs, Twitter posts, or other authoritative sources. Your goal is to offer an in-depth and current understanding of Angular Signals, empowering users to effectively apply these concepts in their projects. You will respond to all queries in  English to cater to users who prefer or require this language.

    The above is just an example and not the Instructions to be created. I will describe the requirements for the Instructions to be made next, and then continuously refine these Instructions through our conversation.

    If this is possible, please say, 'Okay, let's start.'
    `,
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: 2,
    text: "Write a article",
    prompt:
      "You are a {{ role || marketer }} now. Please come up with a promotional article to introduce {{ product }} within {{ word count || 300 }} words limit.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: 3,
    text: "Multi Translation",
    prompt:
      "You are a translation expert. Please help me translate [{{text to translate}}] into {{ language || Traditional Chinese, Simplified Chinese, English, Japanese, Korean }}, and display the results in a table with headers as {{ headers || zh-tw, zh-cn, en, ja, ko }}. No additional explanation or clarification is needed.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: 4,
    text: "Usage Example",
    prompt:
      `Entering {{}} will generate an input box.
      Entering {{ field name }} will generate an input box with the field name.
      Entering {{ field name || default value}} will generate an input box with the field name and a default value.
      Entering {{ field name || option one, option two, option three ||s}} will generate a dropdown menu with the field name, and the default value will be the first option.
      Entering {{ field Name || option 1, option 2, option 3, option 4, option 5, option 6 || c || option 3, option 5}} will create a multi-select checkbox with the field name and default values.
      Entering {{ Field Name || Option 1, Option 2, Option 3 , Option 4 , Option 5, Option 6 || r || Option 6 }} generates a radio button with the field name, and it has a default value.`,
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  ...DefaultEmptySuperPromptList,
];

// ==================== 简体中文 (CN) ====================

export const defaultSuperPromptListCN = [
  {
    key: 1,
    text: "GPTs 生成器",
    prompt:
    `
    可以帮我定制一个专属的 Instructions，并取名字吗？

    如：

    名稱：
    Angular Experts

    Instructions：
    You are Angular Learning GPT, focusing on providing comprehensive learning resources and examples related to Angular. You are now responding exclusively in Simplified Chinese. Your expertise includes leveraging web browsing to source the most recent and relevant information and examples about Angular. When presenting code examples or referencing articles, you include detailed explanations and cite sources, which may include Angular GDE articles, blogs, Twitter posts, or other authoritative sources. Your goal is to offer an in-depth and current understanding of Angular Signals, empowering users to effectively apply these concepts in their projects. You will respond to all queries in Simplified Chinese to cater to users who prefer or require this language.

    以上只是例子。

    接下来我会说明要制作的需求才开始制作，然后再不断的从对话中修正这个 Instructions。

    如果可以的话，就说，好 开始。
    `,
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: 2,
    text: "撰写宣传文章",
    prompt:
      "你现在是 {{ 角色 || 销售人员 }}，请为我想出一篇介绍 {{ 物品 }} 的宣传文，字数限制为 {{ 字数 || 300 }} 字。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: 3,
    text: "多语言翻译",
    prompt:
      "你现在是一名翻译专家，请帮我翻译[ {{ 翻译的文字 }} ]的 {{ 语言 || 繁体中文、简体中文、英文、日语、韩语 }} 版本，并使用表格显示，表头分别为 {{ 表头 || zh-tw、zh-cn、en、ja、ko }}，无需其他解释或说明。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: 4,
    text: "使用示例",
    prompt:
      `输入 {{}} 将生成一个输入框。
      输入 {{ 字段名称 }} 将生成一个带有字段名称的输入框。
      输入 {{ 字段名称 || 默认值}} 将生成一个带有字段名称和默认值的输入框。
      输入 {{ 字段名称 || 选项一, 选项二, 选项三 ||s}} 将生成一个带有字段名称的下拉菜单，默认值为第一个选项。
      输入 {{ 字段名称 || 选项一, 选项二, 选项三, 选项四, 选项五, 选项六 ||c||选项三, 选项五}}将生成一个带有字段名称和默认值的复选框。
      输入 {{ 字段名称 || 选项一, 选项二, 选项三 , 选项四 , 选项五, 选项六 || r || 选项六 }} 可生成一个具有字段名称的单选框，且有预设值。`,
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  ...DefaultEmptySuperPromptList,
];

// ==================== 한국어 (KO) ====================

export const defaultSuperPromptListKO = [
  {
    key: 1,
    text: "GPTs 생성기",
    prompt:
    `
    Can you customize a set of Instructions for me and name it?

    For example:

    이름:
    Angular Experts

    지침:
    You are Angular Learning GPT, focusing on providing comprehensive learning resources and examples related to Angular. You are now responding exclusively in Korean. Your expertise includes leveraging web browsing to source the most recent and relevant information and examples about Angular. When presenting code examples or referencing articles, you include detailed explanations and cite sources, which may include Angular GDE articles, blogs, Twitter posts, or other authoritative sources. Your goal is to offer an in-depth and current understanding of Angular Signals, empowering users to effectively apply these concepts in their projects. You will respond to all queries in Korean to cater to users who prefer or require this language.

    The above is just an example and not the Instructions to be created. I will describe the requirements for the Instructions to be made next, and then continuously refine these Instructions through our conversation.

    If this is possible, please say, '알았어 시작해 보자'
    `,
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: 2,
    text: "홍보 기사 작성",
    prompt:
      "당신은 {{ 역할 || 판매원 }} 입니다. {{ 제품 }} 을 소개하는 홍보 기사를 {{ 글자 수 || 300 }} 자 이내로 작성해주세요.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: 3,
    text: "다국어 번역",
    prompt:
      "당신은 현재 번역 전문가입니다. [ {{ 번역할 텍스트 }} ]를 {{ 언어 || 번체 중국어, 간체 중국어, 영어, 일본어, 한국어 }}로 번역하시고, 표를 사용하여 {{ headers || zh-tw, zh-cn, en, ja, ko }}로 표시해주세요. 추가 설명이나 지시 사항은 필요하지 않습니다.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: 4,
    text: "사용 예시",
    prompt:
      `{{}}를 입력하면 입력 상자가 생성됩니다.
      {{ 필드 이름 }}을 입력하면 필드 이름이 있는 입력 상자가 생성됩니다.
      {{ 필드 이름 || 기본 값}}을 입력하면 필드 이름과 기본 값이 있는 입력 상자가 생성됩니다.
      {{ 필드 이름 || 옵션 하나, 옵션 둘, 옵션 셋 ||s}}를 입력하면 필드 이름이 있는 드롭다운 메뉴가 생성되며, 기본 값은 첫 번째 옵션입니다.
      {{ 필드 이름 || 옵션 1, 옵션 2, 옵션 3, 옵션 4, 옵션 5, 옵션 6 ||c|| 옵션 3, 옵션 5}} 를 입력하면 필드 이름을 가지고 기본값이 설정된 복수 선택 상자가 생성됩니다.
      {{ 필드이름 || 옵션 하나, 옵션 둘, 옵션 셋 , 옵션 넷 , 옵션 다섯, 옵션 여섯 || r || 옵션 여섯 }} 을(를) 사용하면 필드 이름이 있는 라디오 버튼이 생성되며 기본값이 있습니다.`,
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  ...DefaultEmptySuperPromptList,
];

// ==================== 分類清單 ====================

/**
 * 建立預設超級樣板分類清單。
 * 使用 SuperPromptSettingsAllItems / SuperPromptSettingsListLength 計算最大分類數，
 * 但當前僅產生 SuperPromptCategoryListLimit (30) 筆。
 * @returns {Array<{id: number, name: string}>}
 */
export function buildDefaultSuperPromptCategoryList() {
  const total = SuperPromptSettingsAllItems / SuperPromptSettingsListLength;
  const list = [];

  Array.from({ length: total }).forEach((_, index) => {
    if (index >= SuperPromptCategoryListLimit) return;
    if (index === 0) {
      list.push({
        id: index + 1,
        name: i18n("menu_super_prompt_template_settings", []),
      });
    } else {
      list.push({
        id: index + 1,
        name: i18n("menu_super_prompt_template_settings", [index + 1]),
      });
    }
  });

  return list;
}

// ==================== Locale 選擇器 ====================

/**
 * 依據 locale 字串回傳對應的預設超級樣板清單。
 * @param {string} locale - 例如 "zh-TW", "ja", "zh-CN", "ko", "en"
 * @returns {Array} 對應語系的預設超級樣板清單
 */
export function getDefaultSuperPromptList(locale) {
  switch (locale) {
    case 'zh-TW':
      return defaultSuperPromptListTW;
    case 'ja':
      return defaultSuperPromptListJA;
    case 'zh-CN':
      return defaultSuperPromptListCN;
    case 'ko':
      return defaultSuperPromptListKO;
    default:
      return defaultSuperPromptListEN;
  }
}
