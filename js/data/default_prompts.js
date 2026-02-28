// default_prompts.js — ES Module
// Extracted default prompt lists for all supported locales.

export const defaultPromptListTW = [
  {
    key: "1",
    text: "自由提問",
    prefix: "",
    suffix: "，請使用繁體中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "2",
    text: "英文解釋",
    prefix: "你現在是一個英文教育專家，請解釋英文單字 [",
    suffix: "]，拼音、詞性，並給出 5 個中英文的範例。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "3",
    text: "多國語系翻譯",
    prefix: "你現在是一個翻譯專家，請幫我翻譯 [",
    suffix:
      "] 的繁體中文、簡體中文、英文、日語、韓語，\n並請使用表格顯示，表頭分別為 zh-tw、zh-cn、en、ja、ko，\n不需要其他解釋或說明。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "4",
    text: "程式問題",
    prefix: "你現在是一個 Angular、RxJs、Typescript、Javascript 專家，\n",
    suffix: "\n，請使用繁體中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "5",
    text: "CSS 範例",
    prefix: "你現在是一個 CSS 專家，請幫我做出以下敘述的樣式：\n",
    suffix: "\n，請使用繁體中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "整理重點",
    prefix:
      "你現在是個閱讀專家，請幫我整理下面文章的重點，使用條列方式，列出 10 點，最後給出一個總結：\n\n",
    suffix: "\n\n，請使用繁體中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "研究報告",
    prefix: "寫一篇有關",
    suffix:
      "的 300 字研究報告，報告中需引述最新的研究，並引用專家觀點，請使用繁體中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "文字修飾",
    prefix: "請幫我修飾以下敘述，符合台灣用語，且輕鬆活潑。\n\n",
    suffix: "",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "問題建議",
    prefix: "我遇到以下問題：\n",
    suffix: "\n請幫我想出解決方式或替代方案，並使用繁體中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "食譜建議",
    prefix: "你現在是一個食譜專家，我想煮",
    suffix:
      "，請使用繁體中文回答，回答需包括以下內容：\n1. 所需的食材清單，以及每種食材的建議分量\n2. 烹飪步驟，包括每個步驟的詳細說明和所需的時間\n3.注意事項。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
];

export const defaultPromptListJA = [
  {
    key: "1",
    text: "自由提問",
    prefix: "",
    suffix: "、回答に日本語を使用してください。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "2",
    text: "英語の説明",
    prefix: "あなたは現在、英語の教育専門家です。英語の単語 [",
    suffix: "] の発音、品詞を説明し、英日の例文5つを挙げてください。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "3",
    text: "多言語翻訳",
    prefix: "あなたは現在、翻訳専門家です。[",
    suffix:
      "] の繁体字中国語、簡体字中国語、英語、日本語、韓国語の表を使用して表示してください。各列のヘッダーは、zh-tw、zh-cn、en、ja、koです。他の説明や説明は必要ありません。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "4",
    text: "コード問題",
    prefix: "あなたはAngular、RxJs、TypeScript、JavaScriptの専門家です。\n",
    suffix: "\n、日本語で回答してください。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "5",
    text: "CSSの例",
    prefix:
      "あなたはCSSの専門家です。以下の説明に従ってスタイルを作成してください：\n",
    suffix: "\n、日本語で回答してください。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "ポイント整理",
    prefix:
      "あなたは読書の専門家です。以下の文章のポイントを整理して、リスト形式で10項目を列挙し、最後に総括を行ってください：\n\n",
    suffix: "\n\n、日本語で回答してください。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "研究報告",
    prefix: "300字の、",
    suffix:
      "に関する研究報告を書いてください。報告中には、最新の研究を引用し、専門家の意見を引用する必要があります。回答には日本語を使用してください。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "文字修飾",
    prefix: "以下の文章を、軽快で楽しげな日本語に修飾してください。\n\n",
    suffix: "",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "問題建議",
    prefix: "以下の問題が発生しています。\n",
    suffix: "\n解決策または代替案を考えて、回答には日本語を使用してください。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "食譜建議",
    prefix: "あなたは今、料理の専門家です。私は",
    suffix:
      "を作りたいと思っています。回答には日本語を使用し、以下の内容を含めてください：\n1.必要な食材のリスト、および各食材の推奨量\n2.調理手順、各ステップの詳細な説明と必要な時間\n3.注意事項。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
];

export const defaultPromptListEN = [
  {
    key: "1",
    text: "Free Question",
    prefix: "",
    suffix: ", please answer in English.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "2",
    text: "Explain English",
    prefix:
      "You are now an English education expert, please explain the English word [",
    suffix:
      "], including pronunciation, part of speech, and provide 5 examples.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "3",
    text: "Multi Translation",
    prefix: "You are now a translation expert, please translate [",
    suffix:
      "] in Traditional Chinese, Simplified Chinese, English, Japanese, and Korean, and display them in a table with headers respectively labeled as zh-tw, zh-cn, en, ja, and ko. No further explanation or clarification is needed.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "4",
    text: "Programming",
    prefix:
      "You are now an Angular, RxJs, Typescript, and Javascript expert,\n",
    suffix: "\n, please answer in English.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "5",
    text: "CSS Example",
    prefix:
      "You are now a CSS expert, please create a style for the following statement:\n",
    suffix: "\nPlease answer in English.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "Summarize",
    prefix:
      "You are a reading expert, please help me summarize the following article in bullet points. Please list 10 points and provide a conclusion:\n\n",
    suffix: "\n\nPlease answer in English.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "Research Report",
    prefix: "Write a 300-word research report on ",
    suffix:
      ", citing the latest research and expert opinions. Please answer in English.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "Text Modification",
    prefix:
      "Please help me modify the following statement to make it more lively and in American English:\n\n",
    suffix: "",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "Problem Suggestion",
    prefix: "I'm having the following problem:\n",
    suffix:
      "\nPlease help me come up with a solution or alternative, and answer in English.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "Recipe Suggestion",
    prefix: "You are a recipe expert and I want to cook ",
    suffix:
      ". Please answer in English and include:\n1. A list of ingredients and recommended amounts for each\n2. Cooking instructions, including detailed explanations and required time for each step\n3. Any important notes.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
];

export const defaultPromptListCN = [
  {
    key: "1",
    text: "自由提问",
    prefix: "",
    suffix: "，请使用简体中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "2",
    text: "英文解释",
    prefix: "你现在是一个英文教育专家，请解释英文单字 [",
    suffix: "]，拼音、词性，并给出 5 个中英文的例子。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "3",
    text: "多国语系翻译",
    prefix: "你现在是一个翻译专家，请帮我翻译 [",
    suffix:
      "] 的繁体中文、简体中文、英文、日语、韩语，\n并请使用表格显示，表头分别为 zh-tw、zh-cn、en、ja、ko，\n不需要其他解释或说明。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "4",
    text: "程式问题",
    prefix: "你现在是一个 Angular、RxJs、TypeScript、JavaScript 专家，\n",
    suffix: "\n，请使用简体中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "5",
    text: "CSS 范例",
    prefix: "你现在是一个 CSS 专家，请帮我做出以下叙述的样式：\n",
    suffix: "\n，请使用简体中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "整理重点",
    prefix:
      "你现在是个阅读专家，请帮我整理下面文章的重点，使用条列方式，列出10点，最后给出一个总结：\n\n",
    suffix: "\n\n，请使用简体中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "研究报告",
    prefix: "写一篇有关",
    suffix:
      "的300字研究报告，报告中需引述最新的研究，并引用专家观点，请使用简体中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "文字修饰",
    prefix: "请帮我修饰以下叙述，符合中文用语，且轻松活泼。\n\n",
    suffix: "",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "问题建议",
    prefix: "我遇到以下问题：\n",
    suffix: "\n请帮我想出解决方式或替代方案，并使用简体中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "食谱建议",
    prefix: "你现在是一个食谱专家，我想煮",
    suffix:
      "，请使用简体中文回答，回答需包括以下内容：\n1. 所需的食材清单，以及每种食材的建议分量\n2. 烹饪步骤，包括每个步骤的详细说明和所需的时间\n3. 注意事项。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
];

export const defaultPromptListKO = [
  {
    key: "1",
    text: "자유롭게 질문",
    prefix: "",
    suffix: " 답변은 한국어로 부탁드립니다.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "2",
    text: "영어 해설",
    prefix: "당신은 현재 영어 교육 전문가입니다. 영어 단어 [",
    suffix: "]에 대해 발음, 품사를 설명하고 5개의 한영 예문을 제시해주세요.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "3",
    text: "다국어 번역",
    prefix: "당신은 지금 번역 전문가입니다. [",
    suffix:
      "] 의 번체 중국어, 간체 중국어, 영어, 일본어, 한국어 번역을 테이블로 나열해주세요. 표 제목은 각각 zh-tw, zh-cn, en, ja, ko 입니다. 추가 설명이나 해석은 필요하지 않습니다.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "4",
    text: "프로그램 질문",
    prefix: "당신은 Angular, RxJs, Typescript, Javascript 전문가입니다.\n",
    suffix: "\n 답변은 한국어로 부탁드립니다.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "5",
    text: "CSS 예제",
    prefix:
      "당신은 CSS 전문가입니다. 다음 설명에 맞는 스타일을 만들어주세요. \n",
    suffix: "\n 답변은 한국어로 부탁드립니다.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "요약 정리",
    prefix:
      "당신은 지금 독서 전문가입니다. 다음 글의 요점을 정리하여 10개의 항목으로 나열하고 마지막에 요약을 제시해주세요.\n\n",
    suffix: "\n\n, 한국어로 답변해주세요.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "연구 보고서",
    prefix: "",
    suffix:
      "에 관한 300자 분량의 연구 보고서를 작성해주세요. 최신 연구를 인용하고 전문가의 의견을 인용해야 합니다. 한국어로 답변해주세요.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "글 수정",
    prefix:
      "다음 글을 한국식 표현으로 수정하여, 쉽고 재미있게 표현해주세요.\n\n",
    suffix: "",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "문제 제안",
    prefix: "다음과 같은 문제가 발생했습니다:\n",
    suffix:
      "\n문제를 해결하거나 대체할 수 있는 방법을 생각하여, 한국어로 답변해주세요.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "none",
    text: "레시피 제안",
    prefix: "당신은 지금 요리 전문가입니다. 저는 ",
    suffix:
      "을(를) 요리하고 싶습니다. 한국어로 답변해주세요. 답변에는 다음과 같은 내용이 포함되어야 합니다:\n1. 필요한 식재료 목록 및 각 식재료의 권장 분량\n2. 조리 단계, 각 단계의 상세한 설명 및 필요한 시간\n3. 유의 사항.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
];

/**
 * Returns the default prompt list for the given locale string.
 * @param {string} locale - e.g. 'zh-TW', 'ja', 'zh-CN', 'ko', 'en'
 * @returns {Array} The matching default prompt list (defaults to EN).
 */
export function getDefaultPromptList(locale) {
  switch (locale) {
    case "zh-TW":
      return defaultPromptListTW;
    case "ja":
      return defaultPromptListJA;
    case "zh-CN":
      return defaultPromptListCN;
    case "ko":
      return defaultPromptListKO;
    default:
      return defaultPromptListEN;
  }
}
