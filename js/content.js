const newPtLists = [
  {
    "id": "line-button",
    "url": "https://store.line.me/stickershop/product/30609835/zh-Hant",
    "label": "柴柴貼圖 - 實用篇"
  },
  {
    "id": "line-button",
    "url": "https://store.line.me/stickershop/product/30599810/zh-Hant",
    "label": "柴柴貼圖 - 失戀篇"
  },
  {
    "id": "line-button",
    "url": "https://store.line.me/stickershop/product/30598858/zh-Hant",
    "label": "柴柴貼圖 - 工程師"
  },
  {
    "id": "line-button",
    "url": "https://store.line.me/stickershop/product/30598985/zh-Hant",
    "label": "柴柴貼圖 - 暈船仔"
  },
  {
    "id": "line-button",
    "url": "https://store.line.me/stickershop/product/30599712/zh-Hant",
    "label": "柴柴貼圖 - 熱戀篇"
  },
  {
    "id": "line-button",
    "url": "https://store.line.me/stickershop/product/30599606/zh-Hant",
    "label": "柴柴貼圖 - 日常篇"
  },
  {
    "id": "line-button",
    "url": "https://store.line.me/stickershop/author/5375229/zh-Hant",
    "label": "非柴柴本人貼圖"
  },
  {
    "id": "line-button",
    "url": "https://store.line.me/stickershop/product/30672796/zh-Hant",
    "label": "柴柴貼圖 - 精選01"
  }
]

const defaultPtItem =  `
  <a href="https://www.buymeacoffee.com/Joe.lin" target="_blank">
    <img style="scale: 0.9;" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=Joe.lin&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff?${new Date().getTime()}" />
  </a>
`;

const promptPacksItem =  `
  <a 
    id="prompt-packs-button" 
    href="https://jiahongl.github.io/prompt-packs" 
    target="_blank"
  >
    📚 Prompt Packs
  </a>
`;

const supportOtherSite = !window.location.href.includes("chatgpt.com");
const supportGemini = window.location.href.includes("gemini.google.com");
const supportClaude = window.location.href.includes("claude.ai");
const supportGrok = window.location.href.includes("grok.com");
const supportFelo = window.location.href.includes("felo.ai");
const supportPerplexity = window.location.href.includes("perplexity.ai");

const userLanguage = navigator.language || chrome.i18n.getUILanguage();
const isTW = Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Taipei" || userLanguage?.includes("zh-TW");

const ptLinks = [
  defaultPtItem,
  promptPacksItem
];

if(isTW){
  newPtLists?.forEach((pt) => {
    ptLinks.push(`
      <a 
        id="${pt.id}" 
        href="${pt.url}" 
        target="_blank"
      >
      ${pt.label}
      </a>
    `);
  });
}

setTimeout(() => {
  getRandomPTLink();
  setInterval(() => {
    getRandomPTLink();
  }, 8000)
}, 200)

let preRandomIndex = null;

let currentLoopCount = 0; 

function getRandomPTLink() {
  currentLoopCount++;
  const bit = Math.random() < 0.5 ? 0 : 1;
  let randomIndex = isTW ? Math.floor(Math.random() * ptLinks.length) : bit;
  if(currentLoopCount ===1){
    randomIndex = 0;
  }
  if (preRandomIndex === randomIndex) {
    return getRandomPTLink();
  }
  document.querySelectorAll('.super-sun-o-pt').forEach((element) => {
    element.innerHTML = ptLinks[randomIndex];
  });
}

const supportChatGPT = !supportOtherSite && !supportClaude && !supportGrok;

if (supportOtherSite) {
  document.body.classList.add('supportOtherSite');
}

const i18n = (key, params = []) => {
  try {
    return chrome.i18n.getMessage(key, params);
  } catch (error) {
    console.log("i18n", error);
    return "";
  }
};

const getUILanguage = () => {
  try {
    return chrome.i18n.getUILanguage();
  } catch (error) {
    console.log("getUILanguage", error);
    return "en-US";
  }
};

let tabindexElements;

function disableMenuItemTabindex() {
  tabindexElements = Array.from(
    document.querySelector(".custom-menu").querySelectorAll("[tabindex]")
  );
  tabindexElements.forEach((element) => {
    element.setAttribute(
      "data-orig-tabindex",
      element.getAttribute("tabindex")
    );
    element.setAttribute("tabindex", "-1");
  });
}

function restoreMenuItemTabindex() {
  tabindexElements?.forEach((element) => {
    const originalTabindex = element.getAttribute("data-orig-tabindex");
    element.setAttribute("tabindex", originalTabindex);
    element.removeAttribute("data-orig-tabindex");
  });
}

// defaultPromptList 多國語系
const defaultPromptListTW = [
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

const defaultPromptListJA = [
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

const defaultPromptListEN = [
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

const defaultPromptListCN = [
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

const defaultPromptListKO = [
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

// defaultQuickReply 多國語系

const QuickReplyMessageAllItems = 100;

let DefaultEmptyQuickReplyMessageList = [];

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

let defaultQuickReplyMessageListTW = [
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
];
defaultQuickReplyMessageListTW = [
  ...defaultQuickReplyMessageListTW,
  ...DefaultEmptyQuickReplyMessageList,
];

let defaultQuickReplyMessageListJA = [
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
];
defaultQuickReplyMessageListJA = [
  ...defaultQuickReplyMessageListJA,
  ...DefaultEmptyQuickReplyMessageList,
];

let defaultQuickReplyMessageListEN = [
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
];
defaultQuickReplyMessageListEN = [
  ...defaultQuickReplyMessageListEN,
  ...DefaultEmptyQuickReplyMessageList,
];

let defaultQuickReplyMessageListCN = [
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
];
defaultQuickReplyMessageListCN = [
  ...defaultQuickReplyMessageListCN,
  ...DefaultEmptyQuickReplyMessageList,
];

let defaultQuickReplyMessageListKO = [
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
];
defaultQuickReplyMessageListKO = [
  ...defaultQuickReplyMessageListKO,
  ...DefaultEmptyQuickReplyMessageList,
];

// defaultSuperPromptList 多國語系

/** 每個 super prompt settings item 總數量 */
const SuperPromptSettingsAllItems = 1500;

/** 每個 super prompt settings list 的 item 數量 */
const SuperPromptSettingsListLength = 50;

let DefaultEmptySuperPromptList = [];

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

let defaultSuperPromptListTW = [
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
];
defaultSuperPromptListTW = [
  ...defaultSuperPromptListTW,
  ...DefaultEmptySuperPromptList,
];

let defaultSuperPromptListJA = [
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
];
defaultSuperPromptListJA = [
  ...defaultSuperPromptListJA,
  ...DefaultEmptySuperPromptList,
];

let defaultSuperPromptListEN = [
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
];
defaultSuperPromptListEN = [
  ...defaultSuperPromptListEN,
  ...DefaultEmptySuperPromptList,
];

let defaultSuperPromptListCN = [
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
];
defaultSuperPromptListCN = [
  ...defaultSuperPromptListCN,
  ...DefaultEmptySuperPromptList,
];

let defaultSuperPromptListKO = [
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
];
defaultSuperPromptListKO = [
  ...defaultSuperPromptListKO,
  ...DefaultEmptySuperPromptList,
];

// defaultSuperPromptCategoryList 預設分類

/** 最大多少分類 */
SuperPromptCategoryListEmptyArray = Array.from({
  length: SuperPromptSettingsAllItems / SuperPromptSettingsListLength,
});

/** 當前最大分類數量限制 */
SuperPromptCategoryListLimit = Array.from({ length: 30 });

let defaultSuperPromptCategoryList = [];

SuperPromptCategoryListEmptyArray.forEach((_, index) => {
  if (index === 0) {
    defaultSuperPromptCategoryList.push({
      id: index + 1,
      name: i18n("menu_super_prompt_template_settings", []),
    });
  } else {
    defaultSuperPromptCategoryList.push({
      id: index + 1,
      name: i18n("menu_super_prompt_template_settings", [index + 1]),
    });
  }
});

function findGroupAndIndex(promptId) {
  const groupSize = SuperPromptSettingsListLength;
  const group = Math.floor((promptId - 1) / groupSize) + 1;
  const order = ((promptId - 1) % groupSize) + 1;
  return { group, order };
}

const time = supportPerplexity ? 500 : 0;

setTimeout(()=>{

(() => {
  "use strict";

  // 系統判別 && 主按鍵 && 按鍵文字
  const userAgent = navigator.userAgent;

  const isMac = userAgent.indexOf("Mac") !== -1;

  const mainKey = isMac ? "ctrlKey" : "altKey";
  const mainKeyText = isMac ? "control" : "alt";

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  function setDefaultList() {
    const locale = getUILanguage();

    switch (locale) {
      case "zh-TW":
        defaultPromptList = defaultPromptListTW;
        defaultQuickReplyMessageList = defaultQuickReplyMessageListTW;
        defaultSuperPromptList = defaultSuperPromptListTW;
        break;

      case "ja":
        defaultPromptList = defaultPromptListJA;
        defaultQuickReplyMessageList = defaultQuickReplyMessageListJA;
        defaultSuperPromptList = defaultSuperPromptListJA;
        break;

      case "zh-CN":
        defaultPromptList = defaultPromptListCN;
        defaultQuickReplyMessageList = defaultQuickReplyMessageListCN;
        defaultSuperPromptList = defaultSuperPromptListCN;
        break;

      case "ko":
        defaultPromptList = defaultPromptListKO;
        defaultQuickReplyMessageList = defaultQuickReplyMessageListKO;
        defaultSuperPromptList = defaultSuperPromptListKO;
        break;

      default:
        defaultPromptList = defaultPromptListEN;
        defaultQuickReplyMessageList = defaultQuickReplyMessageListEN;
        defaultSuperPromptList = defaultSuperPromptListEN;
        break;
    }
  }

  // css style
  const styles = `
      .light .dialog-wrapper{
        color: black !important;
      }
      .dark .dialog-wrapper{
        color: white !important;
      }
      .custom-menu {
        ${ supportOtherSite ? 'z-index: 1;':'z-index: 0;' }
        position: fixed;
        top:65px;
        right:0;
        height:calc(90vh - 65px);
        overflow-y: hidden;
        overflow-x: hidden;
        box-sizing: content-box;
        width:155px !important;
        padding:5px;
        background:rgb(236,236,241);
        border-radius:10px;
        margin-right:8px;
        
        display:flex;
        flex-direction:column !important;

        ${ supportOtherSite ? '':'transition: transform 0.3s ease-in-out;' }
        ${ supportOtherSite ? '':'transform: translateX(0);' }
      }
      @media only screen and (max-width: 980px) {
        .custom-menu {
          top:100px;
          height:calc(85vh - 120px);
        }
      }
      .dark .custom-menu {
        background:gray;
      }
      .hidden-template-buttons .custom-menu{
        transform: translateX(200px);
      }
      .custom-menu .menu-collapse-button{
        display: flex;
        justify-content: center;
        align-items: center;
        height:30px;
      }
      .custom-menu .menu-collapse-button svg{
        width:18px;
        fill:white;
      }
      .dark .custom-menu .menu-collapse-button span{
        color: #ccc;
      }
      .dark .custom-menu .menu-collapse-button svg{
        fill: #ccc;
      }
      .collapse-button {
        position: fixed;
        bottom: 220px;
        right: 10px;
        display:none;
        padding:12px;
        cursor:pointer;
        z-index: 999999;
      }
      @media only screen and (max-width: 980px) {
        .collapse-button {
          right: 0px;
        }
      }
      .collapse-button svg{
        height:22px;
        width:22px;
        fill: #ccc;
      }
      .dark .collapse-button svg{
        fill: #ccc;
      }
      .hidden-template-buttons .collapse-button{
        display:inline-block;
      }
      
      .custom-menu .search-box{
        flex:0 0 30px;
        margin-bottom:5px;
      }
      .custom-menu .search-box .custom-keyword-input {
        display: block;
        width:100%;
        height: 30px;
        border-radius: 5px;
        background-color: white;
        box-shadow: 0 0 1px #f1f1f1;
        border: none;
        padding: 0 10px;
        font-size: 16px;
        color: black;
        outline: none;
        ${ supportOtherSite ? 'width:135px' : 'width:100%' }
      }
      .dark .custom-menu .search-box .custom-keyword-input {
        background-color: black;
        box-shadow: 0 0 1px black;
        color: #ccc;
        font-size:16px;
      }
      .custom-keyword-input::placeholder {
        font-size:14px;
      }
      .custom-menu .prompt-list-area{
        flex:1 1 auto;
        overflow-y: auto;
      }
      .custom-menu .prompt-list-area::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: transparent;
      }
      .custom-menu .quick-reply-area{
        margin-top:5px;
        flex: 0 0 auto;
        max-height: 380px;
        overflow-y: auto;
      }
      .custom-menu .other-area{
        margin-top:5px;
        flex:0 0 30px;
      }
      .custom-menu .quick-reply-area::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: transparent;
      }
      .custom-menu .quick-reply-area .custom-template-buttons:last-child {
        margin:0 !important;
      }
      .dialog-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 99999;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
      }
      .dialog {
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          padding: 20px 20px 0px 20px;
          width: 100%;
      }
      .dialog #questionPreviewArea {
        max-height:200px;
        overflow:auto;
        font-size: 18px;
      }
      .question-textarea {
          width: 100%;
          height: 427px;
          border: 1px solid #ccc;
          border-radius: 3px;
          padding: 5px;
          font-size: 18px !important;
          line-height: 1.5;
          resize: vertical;
          margin-top: 20px;
          color:black;
          box-sizing: border-box;
      }
      .quickReplyMessage{
        border-radius: 3px;
      }
      .dialog button {
          border: none;
          border-radius: 3px;
          padding: 10px 15px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-right: 10px;
      }
      .footer {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding:20px 0px;
      }
      .footer .super-sun-o-pt {
        position: absolute;
        right: 0;
      }
      .footer .fixed-left {
        position: absolute;
        left: 0;
      }
      .footer #dialog7-edit {
        position: absolute;
        left: 0;
      }
      .footer #dialog-edit {
        position: absolute;
        left: 0;
      }
      button.primary {
          background-color: #9a8e81;
          color: #fff;
      }
      button.secondary {
          background-color: #c3bda9;
          color: #fff;
      }
      button.success {
          background-color: #7f9a87;
          color: #fff;
      }
      button.info {
          background-color: #5A7DAB;
          color: #fff;
      }
      button.warning {
          background-color: hsl(267, 30%, 55%);
          color: #fff;
      }
      button.light{
        background-color: #9ca3af;
        color: white;
      }
      .dark button.light{
        background-color: rgba(64,65,79,1) !important;
        color: #d1d5db;
      }
      .dark button.primary {
        background-color: #5a5646;
        color: #d1d5db !important;
      }
      .dark button.secondary {
          background-color: #7a7363;
          color: #d1d5db !important;
      }
      .dark button.success {
          background-color: #4f6654;
          color: #d1d5db !important;
      }
      .dark button.info {
          background-color: #3A5276;
          color: #d1d5db !important;
      }
      .dark button.warning {
        background-color: hsl(267, 30%, 40%);
        color: #d1d5db !important;
      }
      .center {
          display: flex;
          justify-content: center;
          align-items: center;
      }
      .my-table {
          width: 100%;
          border-collapse: collapse;
      }
      .my-table th{
          border: 1px solid #ccc;
          padding: 8px 12px;
          color:black;
      }
      .my-table td {
          border: 1px solid #ccc;
          padding: 8px 12px;
          color:black;
      }
      .my-table th {
          background-color: #f2f2f2;
          font-weight: bold;
          text-align: center;
      }
      .my-table td {
          text-align: left;
      }
      .my-table input[type="text"] {
          width: 100%;
          padding: 6px 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          color:black;
      }
      .superPromptCategoryNameInput{
        width:100%;
        padding: 6px 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        color:black;
        margin:5px 0px;
      }
      .shortcut-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #333;
          border-radius: 4px;
          padding: 8px 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          margin:auto;
      }
      .shortcut-content {
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          line-height: 1;
      }
      #dialog3 .shortcut-wrapper{
          height:44px;
      }
      #dialog3 .shortcut-content {
          font-size: 18px;
      }
      #dialog3 .my-table th {
        font-size: 22px;
        font-weight: 500;
      }
      #dialog3 .my-table td {
        font-size: 22px;
        font-weight: 500;
      }    
      .dark .dialog{
          background-color: rgba(68,70,84,1);
      }
      .dark .dialog #questionPreviewArea{
          font-size: 18px;
          color: #d1d5db !important;
      }
      .dark .dialog textarea {
          padding: 10px;
          background-color: rgba(32,33,35,1);
          color: #d1d5db !important;
      }
      .dark .dialog select {
        background-color: rgba(32,33,35,1);
        color: #d1d5db !important;
    }
      .dark .my-table th{
          background-color: rgba(236,236,241,.2);
      }
      .dark .my-table td{
          background-color: rgba(68,70,84,1);
      }
      .dark .my-table input[type="text"] {
          background-color: rgba(32,33,35,1);
          color: #d1d5db !important;
      }
      .dark .superPromptCategoryNameInput {
        background-color: rgba(32,33,35,1);
        color: #d1d5db !important;
      }
      .dark .shortcut-content {
          color: #d1d5db !important;
      }
      .ellipsis {
          width: 240px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
      }
      .dark .ellipsis {
          color: #d1d5db !important;
      }
      #dialog2 .my-table textarea{
          width: 100%;
          height: 85px;
          border: 1px solid #ccc;
          border-radius: 3px;
          padding: 5px;
          line-height: 1.5;
          color:black;
      }
      
      .slide-checkbox {
        width: 80px;
        height: 26px;
        background: #333;
        margin: 20px auto;
        position: relative;
        border-radius: 50px;
        box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,0.2);
      }
      
      .slide-checkbox:after {
        content: 'OFF';
        color: #000;
        position: absolute;
        right: 10px;
        z-index: 0;
        font: 12px/26px Arial, sans-serif;
        font-weight: bold;
        text-shadow: 1px 1px 0px rgba(255,255,255,.15);
      }
      .slide-checkbox:before {
        content: 'ON';
        color: #27ae60;
        position: absolute;
        left: 10px;
        z-index: 0;
        font: 12px/26px Arial, sans-serif;
        font-weight: bold;
      }
      .slide-checkbox label {
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
      .slide-checkbox label span {
        display: block;
        width: 34px;
        height: 20px;
        position: absolute;
        top: 3px;
        left: 3px;
        background: #fcfff4;
        background: linear-gradient(to bottom, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
        border-radius: 50px;
        transition: all 0.4s ease;
        box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.3);
      }
      .slide-checkbox input[type=checkbox] {
        visibility: hidden;
      }
      .slide-checkbox input[type=checkbox]:checked + label span {
        left: 43px;
      }
      #dialog6 .my-table textarea{
        width: 100%;
        height: 85px;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 5px;
        line-height: 1.5;
        color:black;
      }
      .super-prompt-preview-area{
        max-height:165px;
        overflow:auto;
        font-size: 18px;
        margin-bottom:5px;
      }
      .super-prompt-table-wrapper{
        max-height:500px;
        overflow:auto;
        font-size: 18px;
        padding-right:5px;
      }
      .super-prompt-table-wrapper .fieldItem{
        padding-bottom:8px;
      }
      .super-prompt-table-wrapper .fieldItem .superPromptName{
        padding-bottom:2px;
      }
      .super-prompt-text {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 5px;
        font-size: 18px !important;
        line-height: 1.5;
        resize: vertical;
        color:black;
      }
      .super-prompt-text::-webkit-input-placeholder {
        opacity: 0.5;
      }

      .super-prompt-text:-ms-input-placeholder {
        opacity: 0.5;
      }

      .super-prompt-text::-ms-input-placeholder {
        opacity: 0.5;
      }
      .dialog-title {
        width: 100%;
        text-align: center;
        color: black;
        margin-top: -20px;
        font-size: 25px;
        padding: 10px;
        color:black;
        
        overflow: hidden; 
        text-overflow: ellipsis; 
        white-space: nowrap;
      }
      .dark .dialog-title{
        color: #d1d5db !important;
      }
      .chatgpt-dropdown {
        position: relative;
        display: inline-block;
      }

      .chatgpt-dropdown-btn {
        background-color: rgba(5,5,9,1);
        color: #333;
        border: none;
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
      }
      
      .chatgpt-dropdown-content {
        position: absolute;
        top: 100%;
        left: -10px;
        z-index: 1;
        display: none;
        min-width: 160px;
        background-color: rgba(5,5,9,1);
        border: 1px solid rgba(64,65,79,1);
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        z-index:999;
        width:240px;
      }
      .chatgpt-dropdown-content a {
        color: white;
        padding: 15px;
        text-decoration: none;
        display: block;
        cursor: pointer;
        font-size:15px;
      }
      .chatgpt-dropdown-content a:hover {
        background-color: rgba(64,65,79,1);
      }
      .chatgpt-dropdown-todo:hover .chatgpt-dropdown-content {
        display: block;
      }
      .chatgpt-dropdown-content.show {
        display: block;
      }
      .chatgpt-dropdown-up .chatgpt-dropdown-content {
        top: auto;
        bottom: 100%;
      }
      .chatgpt-dropdown-up .chatgpt-dropdown-btn {
        border-radius: 5px 5px 0 0;
      }
      .table-container {
        width: 100%;
        overflow-y: auto;
        max-height: 552px;
        border-bottom: 1px solid #ccc;
        padding-right:4px;
      }
      .scroll-table-form {
        width: 100%;
        border-collapse: collapse;
        margin:0px;
      }
      .scroll-table-form thead tr {
        position: sticky;
        top: 0;
        z-index:999;
      }
      .dark .scroll-table-form thead th {
        background-color: #757575;
      }
      .dark .super-prompt-id{
        color: #d1d5db !important;
        font-size:16px;
      }   
      .super-prompt-category-name-list{
        display: grid;
        grid-template-columns: repeat(5, 1fr); /* 每列 5 個欄位 */
        grid-gap: 10px; /* 欄位間的間距 */
        width:100%;
        margin-bottom:10px;
      }   
      .super-prompt-category-name-list input{ margin:0px;}
      .expand-edit-prompt{
        fill: black;
        width:20px;
        height:20px;
        margin-right:-10px;
        transform: rotate(90deg);
        cursor:pointer;
      }
      .dark .expand-edit-prompt{
        fill:#d1d5db;
      }
      .dark .drag-btn{
        color:#d1d5db;
      }
      .drag-over {
        border-top: 2px solid blue;
        padding-top: 10px;
      }
      .drag-over-bottom {
        border-bottom: 2px solid blue;
        padding-bottom: 10px;
      }
      .dragging-row {
        opacity: 0.5;
      }
      .custom-hover:hover{
        background-color: #cdcdcd;
        ;
      }
      .dark .custom-hover:hover{
        background-color: #202123;
      }
      .custom-icon{
        fill: black;
      }
      .dark .custom-icon{
        fill: white;
      }
      #pinkoi-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(45deg, #f8d7d9, #eec8cc); /* Pinkoi 粉色漸層 */
        color: #5c5c5c; /* 深灰色文字，與 Pinkoi 配色一致 */
        text-decoration: none;
        padding: 10px 10px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        gap: 10px;
        width: 150px;
      }
      #pinkoi-button:hover {
        background: linear-gradient(45deg, #eec8cc, #d9b6b9); /* 加深粉色漸層，符合 Pinkoi 點擊效果 */
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
      }
      #fb-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(45deg, #1877f2, #155bc1); /* Facebook 藍色漸層 */
        color: #ffffff; /* 白色文字，與 Facebook 配色一致 */
        text-decoration: none;
        padding: 10px 10px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        gap: 10px;
        width: 150px;
      }
      #fb-button:hover {
        background: linear-gradient(45deg, #155bc1, #0d3f91); /* 加深藍色漸層，符合 Facebook 點擊效果 */
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
      }
      #line-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(45deg, #4caf50, #43a047); /* 深綠到淺綠漸層 */
        color: #ffffff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        gap: 10px;
        width: 168px;
      }
      #line-button:hover {
        background: linear-gradient(45deg, #388e3c, #2e7d32); /* hover 時再深一點 */
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      }
      #prompt-packs-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045); /* IG 風格漸層 */
        color: #ffffff; /* 保持白色文字 */
        text-decoration: none;
        padding: 10px 10px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        gap: 10px;
        width: 165px;
      }
      #prompt-packs-button:hover {
        background: linear-gradient(45deg, #702f91, #e51414, #d89a37); /* 略微降低亮度的漸層 */
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      }
      #threads-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000000; /* Threads 主色調黑色 */
        color: #ffffff; /* 白色文字 */
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        gap: 10px;
        width: 150px;
      }
      #threads-button:hover {
        background: #333333; /* 提供更淺的黑色作為 hover 效果 */
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      }
      `;

  // 插入 style
  const styleEl = document.createElement("style");
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  // 提問視窗 HTML
  const dialogHTML = `
      <div id="dialog" class="dialog-wrapper" style="display;none">
          <div class="dialog" style="max-width: 1106px;">
              <div id="questionPreviewArea"></div>
              <textarea id="dialog-textarea" class="question-textarea" tabindex="1" placeholder="${i18n(
                "placeholder_prompt_textarea"
              )}"></textarea>
              <div class="footer center">
                  <button ${supportOtherSite ? 'hidden' : ''} id="dialog-edit" class="info" tabindex="2">${i18n(
                    "button_edit"
                  )}</button>
                  <button id="dialog-ok" class="primary" tabindex="3">${i18n(
                    "button_send"
                  )} ( ${mainKeyText} + s )</button>
                  <button id="dialog-insert" class="primary" tabindex="4">${i18n(
                    "button_insert"
                  )} </button>
                  <button id="dialog-cancel" class="secondary" tabindex="5">${i18n(
                    "button_cancel"
                  )} ( esc )</button>
                  <div class="super-sun-o-pt"></div>
              </div>
          </div>
      </div>
  `;

  // 設定模版的表單視窗 HTML
  const formDialogHTML = `
  <div id="dialog2" class="dialog-wrapper" style="display:none">

  <div class="dialog" style="max-width: 95%;">
      <div class="table-container" style="margin-bottom:0px;">
          <table id="table-form" class="my-table scroll-table-form">
              <thead>
                <tr>
                    <th style="width:118px">${i18n("table_title_shortcut")}</th>
                    <th style="width:160px">${i18n(
                      "table_title_button_name"
                    )}</th>
                    <th>${i18n("table_title_prefix_text")}</th>
                    <th>${i18n("table_title_suffix_text")}</th>
                    <th style="width:118px">${i18n("table_title_is_show")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>
                        <div class="shortcut-wrapper">
                            <span class="shortcut-content"> ${capitalizeFirstLetter(
                              mainKeyText
                            )} + 1 </span>
                        </div>
                    </td>
                    <td><input tabindex="1" class="btnTextInput" type="text" placeholder="${i18n(
                      "placeholder_please_input"
                    )}"></td>
                    <td>
                        <div class="center">
                            <textarea tabindex="2" class="prefixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="center">
                            <textarea tabindex="3" class="suffixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="slide-checkbox">
                            <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox" name="check" />
                            <label for="slideCheckbox"><span></span></label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div class="shortcut-wrapper">
                            <span class="shortcut-content"> ${capitalizeFirstLetter(
                              mainKeyText
                            )} + 2 </span>
                        </div>
                    </td>
                    <td><input tabindex="4" class="btnTextInput" type="text" placeholder="${i18n(
                      "placeholder_please_input"
                    )}"></td>
                    <td>
                        <div class="center">
                            <textarea tabindex="5" class="prefixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="center">
                            <textarea tabindex="6" class="suffixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="slide-checkbox">
                            <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox2" name="check" />
                            <label for="slideCheckbox2"><span></span></label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div class="shortcut-wrapper">
                            <span class="shortcut-content"> ${capitalizeFirstLetter(
                              mainKeyText
                            )} + 3 </span>
                        </div>
                    </td>
                    <td><input tabindex="7" class="btnTextInput" type="text" placeholder="${i18n(
                      "placeholder_please_input"
                    )}"></td>
                    <td>
                        <div class="center">
                            <textarea tabindex="8" class="prefixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="center">
                            <textarea tabindex="9" class="suffixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="slide-checkbox">
                            <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox3" name="check" />
                            <label for="slideCheckbox3"><span></span></label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div class="shortcut-wrapper">
                            <span class="shortcut-content"> ${capitalizeFirstLetter(
                              mainKeyText
                            )} + 4 </span>
                        </div>
                    </td>
                    <td><input tabindex="10" class="btnTextInput" type="text" placeholder="${i18n(
                      "placeholder_please_input"
                    )}"></td>
                    <td>
                        <div class="center">
                            <textarea tabindex="11" class="prefixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="center">
                            <textarea tabindex="12" class="suffixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="slide-checkbox">
                            <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox4" name="check" />
                            <label for="slideCheckbox4"><span></span></label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div class="shortcut-wrapper">
                            <span class="shortcut-content"> ${capitalizeFirstLetter(
                              mainKeyText
                            )} + 5 </span>
                        </div>
                    </td>
                    <td><input tabindex="13" class="btnTextInput" type="text" placeholder="${i18n(
                      "placeholder_please_input"
                    )}"></td>
                    <td>
                        <div class="center">
                            <textarea tabindex="14" class="prefixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="center">
                            <textarea tabindex="15" class="suffixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="slide-checkbox">
                            <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox5" name="check" />
                            <label for="slideCheckbox5"><span></span></label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div class="shortcut-wrapper">
                            <span class="shortcut-content"> none </span>
                        </div>
                    </td>
                    <td><input tabindex="16" class="btnTextInput" type="text" placeholder="${i18n(
                      "placeholder_please_input"
                    )}"></td>
                    <td>
                        <div class="center">
                            <textarea tabindex="17" class="prefixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="center">
                            <textarea tabindex="18" class="suffixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="slide-checkbox">
                            <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox6" name="check" />
                            <label for="slideCheckbox6"><span></span></label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div class="shortcut-wrapper">
                            <span class="shortcut-content"> none </span>
                        </div>
                    </td>
                    <td><input tabindex="19" class="btnTextInput" type="text" placeholder="${i18n(
                      "placeholder_please_input"
                    )}"></td>
                    <td>
                        <div class="center">
                            <textarea tabindex="20" class="prefixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="center">
                            <textarea tabindex="21" class="suffixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="slide-checkbox">
                            <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox7" name="check" />
                            <label for="slideCheckbox7"><span></span></label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div class="shortcut-wrapper">
                            <span class="shortcut-content"> none </span>
                        </div>
                    </td>
                    <td><input tabindex="22" class="btnTextInput" type="text" placeholder="${i18n(
                      "placeholder_please_input"
                    )}"></td>
                    <td>
                        <div class="center">
                            <textarea tabindex="23" class="prefixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="center">
                            <textarea tabindex="24" class="suffixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="slide-checkbox">
                            <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox8" name="check" />
                            <label for="slideCheckbox8"><span></span></label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div class="shortcut-wrapper">
                            <span class="shortcut-content"> none </span>
                        </div>
                    </td>
                    <td><input tabindex="25" class="btnTextInput" type="text" placeholder="${i18n(
                      "placeholder_please_input"
                    )}"></td>
                    <td>
                        <div class="center">
                            <textarea tabindex="26" class="prefixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="center">
                            <textarea tabindex="27" class="suffixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="slide-checkbox">
                            <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox9" name="check" />
                            <label for="slideCheckbox9"><span></span></label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div class="shortcut-wrapper">
                            <span class="shortcut-content"> none </span>
                        </div>
                    </td>
                    <td><input tabindex="28" class="btnTextInput" type="text" placeholder="${i18n(
                      "placeholder_please_input"
                    )}"></td>
                    <td>
                        <div class="center">
                            <textarea tabindex="29" class="prefixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="center">
                            <textarea tabindex="30" class="suffixInput" placeholder="${i18n(
                              "placeholder_please_input"
                            )}"></textarea>
                        </div>
                    </td>
                    <td>
                        <div class="slide-checkbox">
                            <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox10" name="check" />
                            <label for="slideCheckbox10"><span></span></label>
                        </div>
                    </td>
                </tr>
              </tbody>
          </table>
      </div>
      <div class="footer" class="center">
          <button tabindex="99" id="dialog2-ok" class="primary">${i18n(
            "button_save"
          )} ( ${mainKeyText} + s )</button>
          <button tabindex="100" id="dialog2-cancel" class="secondary">${i18n(
            "button_cancel"
          )} ( esc ) </button>
          <div class="super-sun-o-pt"></div>
      </div>

  </div>

</div>
    `;

  // 快捷鍵提示視窗 HTML
  const keyboardShortcutHTML = `
  <div id="dialog3" class="dialog-wrapper" style="display;none">
  <div class="dialog" style="max-width:1300px;padding-bottom:20px">
    <table style="width:100%">

      <tr>
        <td>
        <div class="shortcut-wrapper">
          <span class="shortcut-content"> ${capitalizeFirstLetter(
            mainKeyText
          )} + Z </span>
        </div>
        </td>
        <td>
          <div class="ellipsis">${i18n("shortcut_key_tips_Z")}</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ESC </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">${i18n("shortcut_key_tips_ESC")}</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + B  </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">${i18n("shortcut_key_tips_D")}</div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + A </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">${i18n("shortcut_key_tips_A")}</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + S </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">${i18n("shortcut_key_tips_S")}</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + G </span>
          </div>
        </td>
        <td>
          <div class="ellipsis"> none </div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + D </span>
          </div>
        </td>
        <td>
          <div class="ellipsis"> none </div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + W </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">none</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + S </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">none</div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + N </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">none</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 1 </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 6 </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">none</div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + M </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">none</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 2 </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 7 </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">none</div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + C </span>
          </div>
        </td>
        <td>
          <div class="ellipsis"> none </div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 3 </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 8 </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">none</div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + X </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">none</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 4 </span>
          </div>
        </td>
        <td>
          <duv class="templateButtonText ellipsis"></duv>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 9 </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">none</div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + R </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">none</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 5 </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 0 </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">none</div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + E </span>
          </div>
        </td>
        <td>
          <div class="ellipsis"> none </div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + Y </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">none</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + U </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">none</div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + I </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">none</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + O </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">none</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + P </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">none</div>
        </td>
      </tr>

    </table>
  </div>
</div>
  `;

  // 快速回覆 HTML
  const quickReplyHTML = `
  <div id="dialog4" class="dialog-wrapper" style="display:none">

    <div class="dialog" style="max-width: 85%;">
      <div id="quickReplyFormContainer" class="table-container">
        <table class="my-table scroll-table-form" style="width:100%">
          <thead>
            <tr>
              <th style="width:160px">${i18n("table_title_button_name")}</th>
              <th>${i18n("table_title_replay_message")}</th>
              <th style="width:118px">${i18n("table_title_is_show")}</th>
              <th style="width:40px;"></th>
            </tr>
          </thead>
          <tbody>
            ${Array.from({ length: QuickReplyMessageAllItems })
              .map((_, index) => {
                return `
              <tr class="customDragItem" draggable="false">
                <td><input tabindex="${
                  index * 2 + 1
                }" class="quickReplyButtonText" type="text" placeholder="${i18n(
                  "placeholder_please_input"
                )}"></td>
                <td>
                  <div class="center">
                    <textarea style="width:100%" tabindex="${
                      index * 2 + 2
                    }" class="quickReplyMessage" placeholder="${i18n(
                  "placeholder_please_input"
                )}"></textarea>
                  </div>
                </td>
                <td>
                  <div class="slide-checkbox">  
                    <input class="quickReplySlide" type="checkbox" value="true" id="slideCheckboxReplayMessage${index}" name="check"/>
                    <label for="slideCheckboxReplayMessage${index}"><span></span></label>
                  </div>
                </td>
                <td style="width:40px;">
                  <button class="drag-btn" style="margin:0px;padding:5px;font-size:1.5rem">☰</button>
                </td>
              </tr>
              `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
      <div class="footer" class="center">
        <button tabindex="999" id="dialog4-ok" class="primary">${i18n(
          "button_save"
        )} ( ${mainKeyText} + s )</button>
        <button tabindex="1000" id="dialog4-cancel" class="secondary">${i18n(
          "button_cancel"
        )} ( esc ) </button>
        <div class="super-sun-o-pt"></div>
      </div>
  </div>

</div>  
  `;

  // 匯出匯入視窗 HTML
  const exportAndImportHTML = `
    <div id="dialog5" class="dialog-wrapper" style="display:none">

      <div class="dialog" style="max-width:950px;">

        <table class="my-table" style="width:100%">
          <tr>
            <th colspan="3">${i18n("table_header_import_export")}</th>
          </tr>
          <tr>
            <td style="width:100px">
              <div class="center">
                <button id="export" style="margin-right:0px;flex:0 0 65px;" class="success">
                  ${i18n("button_export")}
                </button>
              </div>
            </td>
            <td> 
              <div class="center" style="justify-content: space-evenly;">
                <button id="importAll" class="warning">${i18n(
                  "button_import_all"
                )}</button>
                <button id="importPrompt" class="warning">${i18n(
                  "button_import_only_prompt"
                )}</button>
                <button id="importSuperPrompt" class="warning">${i18n(
                  "button_import_only_super_prompt"
                )}</button>
                <button id="importQuickReply" class="warning" style="margin-right:0px">${i18n(
                  "button_import_only_replay"
                )}</button>
              </div>
            </td>
            <td> 
              <div class="center">
                <button id="resetSetting" class="info" style="margin-right:0px">${i18n(
                  "button_reset"
                )}</button>
              </div>
            </td>
          </tr>        
        </table>

        <input style="display:none" type="file" id="importFileInput" name="file" accept="application/json">

        <div class="footer" class="center">
          <button id="dialog5-cancel" class="secondary">${i18n(
            "button_close"
          )} ( esc ) </button>
          <div class="super-sun-o-pt"></div>
        </div>
    </div>

  </div>    
  `;

  // 超級樣板 設定 HTML
  const superPromptSettingsHTML = `
  <div id="dialog6" class="dialog-wrapper" style="display:none">
    <div class="dialog" style="max-width:95%;">
        <div class="dialog-title"></div>
        <div id="superTableFormContainer" class="table-container">
          <table id="superTableForm" class="my-table scroll-table-form" style="width:100%;margin-top:0px;">
            <thead>
              <tr>
                  <th style="width:50px">#</th>
                  <th style="width:180px">${i18n(
                    "table_title_button_name"
                  )}</th>
                  <th style="width:auto">${i18n(
                    "table_title_super_prompt_text"
                  )}</th>
                  <th style="width:118px">${i18n("table_title_is_show")}</th>
                  <th style="width:40px;"></th>
              </tr>
            </thead>
            <tbody>
            ${Array.from({ length: SuperPromptSettingsListLength })
              .map((_, index) => {
                return `
                  <tr class="customDragItem" draggable="false">
                    <td style="text-align:center;width:50px">
                      <span class="superPromptId super-prompt-id"></span>
                    </td>
                    <td style="width:180px">
                      <input tabindex="${
                        index * 2 + 1
                      }" class="superPromptButtonText" type="text" placeholder="${i18n(
                  "placeholder_please_input"
                )}">
                    </td>
                    <td style="width:auto">
                        <div class="center">
                            <textarea style="width:100%;" tabindex="${
                              index * 2 + 2
                            }" class="superPromptText super-prompt-text" placeholder="${i18n(
                  "placeholder_supper_prompt_desc"
                )}"></textarea>
                          <svg class="expandEditPrompt expand-edit-prompt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M32 64c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32V96C0 78.3 14.3 64 32 64zm214.6 73.4c12.5 12.5 12.5 32.8 0 45.3L205.3 224l229.5 0-41.4-41.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 288l-229.5 0 41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0zM640 96V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V96c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>
                        </div>
                    </td>
                    <td style="width:118px">
                        <div class="slide-checkbox">
                            <input class="superPromptSlide" type="checkbox" value="true" id="superSlideCheckbox${index}"
                                name="check" />
                            <label for="superSlideCheckbox${index}"><span></span></label>
                        </div>
                    </td>
                    <td style="width:40px;">
                      <button class="drag-btn" style="margin:0px;padding:5px;font-size:1.5rem">☰</button>
                    </td>
                </tr>
                `;
              })
              .join("")}
            </tbody>
          </table>
        </div>
        <div class="footer" class="center">
            <div class="fixed-left">
              <button tabindex="996" id="dialog6-export" class="info">${i18n(
                "button_export_super_prompt_category"
              )}</button>
              <button tabindex="997" id="dialog6-import" class="success">${i18n(
                "button_import_super_prompt_category"
              )}</button>
              <input style="display:none" type="file" id="importCategoryFileInput" name="file" accept="application/json">
              <button tabindex="998" id="dialog6-all-show-or-hide" class="warning">${i18n(
                "button_show_all_or_hide_all"
              )}</button>
            </div>
            <button tabindex="999" id="dialog6-ok" class="primary">${i18n(
              "button_save"
            )} ( ${mainKeyText} + s )</button>
            <button tabindex="1000" id="dialog6-cancel" class="secondary">${i18n(
              "button_cancel"
            )} ( esc ) </button>
            <div class="super-sun-o-pt"></div>
        </div>
    </div>
</div>
  `;

  // 超級樣板 HTML
  const superPromptHTML = `
  <div id="dialog7" class="dialog-wrapper" style="display:none">
    <div class="dialog" style="max-width: 1106px;">
      <div class="super-prompt-preview-area" id="superPromptPreviewArea"></div>
      <div class="super-prompt-table-wrapper">
        <div id="superPromptTable" class="my-table super-prompt-table" style="width:100%">
        </div>
      </div>
      <div class="footer" class="center">
        <button ${supportOtherSite ? 'hidden' : ''} tabindex="97" id="dialog7-edit" class="info">${i18n(
          "button_edit"
        )}</button>
        <button tabindex="98" id="dialog7-ok" class="primary">${i18n(
          "button_send"
        )} ( ${mainKeyText} + s )</button>
        <button id="dialog7-insert" class="primary" tabindex="99">${i18n(
          "button_insert"
        )} </button>
        <button tabindex="100" id="dialog7-cancel" class="secondary">${i18n(
          "button_cancel"
        )} ( esc ) </button>
        <div class="super-sun-o-pt"></div>
      </div>
    </div>
  </div>  
  `;

  // 超級樣板分類名稱 設定 HTML
  const superPromptCategoryNameSettingHTML = `
  <div id="dialog8" class="dialog-wrapper" style="display:none">
    <div class="dialog" style="max-width: 1200px;">
      <div id="superPromptCategoryNameList" class="super-prompt-category-name-list"></div>
      <div class="footer" class="center">
        <button tabindex="99" id="dialog8-ok" class="primary">${i18n(
          "button_send"
        )} ( ${mainKeyText} + s )</button>
        <button tabindex="100" id="dialog8-cancel" class="secondary">${i18n(
          "button_cancel"
        )} ( esc ) </button>
        <div class="super-sun-o-pt"></div>
      </div>
    </div>
  </div>  
  `;

  // 插入 HTML 元素
  function appendAllElement(){

    const dialogEl = document.createElement("div");
    dialogEl.innerHTML = dialogHTML;
    document.body.appendChild(dialogEl);
  
    const formDialogEl = document.createElement("div");
    formDialogEl.innerHTML = formDialogHTML;
    document.body.appendChild(formDialogEl);
  
    const keyboardShortDialogEl = document.createElement("div");
    keyboardShortDialogEl.innerHTML = keyboardShortcutHTML;
    document.body.appendChild(keyboardShortDialogEl);
  
    const quickReplySettingsDialogEl = document.createElement("div");
    quickReplySettingsDialogEl.innerHTML = quickReplyHTML;
    document.body.appendChild(quickReplySettingsDialogEl);
  
    const exportAndImportDialogEl = document.createElement("div");
    exportAndImportDialogEl.innerHTML = exportAndImportHTML;
    document.body.appendChild(exportAndImportDialogEl);
  
    const superPromptSettingsDialogEl = document.createElement("div");
    superPromptSettingsDialogEl.innerHTML = superPromptSettingsHTML;
    document.body.appendChild(superPromptSettingsDialogEl);
  
    const superPromptDialogEl = document.createElement("div");
    superPromptDialogEl.innerHTML = superPromptHTML;
    document.body.appendChild(superPromptDialogEl);
  
    const superPromptCategoryNameSettingDialogEl = document.createElement("div");
    superPromptCategoryNameSettingDialogEl.innerHTML =
      superPromptCategoryNameSettingHTML;
    document.body.appendChild(superPromptCategoryNameSettingDialogEl);
  
    const collapseButtonEl = document.createElement("div");
    collapseButtonEl.classList.add("collapse-button");
    collapseButtonEl.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128v64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9V128c0-16.8-12.9-30.5-29.3-31.9zM336 144v16c0 53-43 96-96 96H208c-53 0-96-43-96-96V144c0-26.5 21.5-48 48-48H288c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512H128V448c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64l98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16v48h32V464c0-8.8-7.2-16-16-16zm96 32a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"></path></svg>';
    document.body.appendChild(collapseButtonEl);
    collapseButtonEl.addEventListener("click", () => {
      collapseToggle();
    });

    if(supportOtherSite){
      chrome.storage.local.get(['Custom.EnableGeminiSupport'], res=>{

        const enableGeminiSupport = res['Custom.EnableGeminiSupport'];
        if(enableGeminiSupport){
          setTimeout(() => {
            menuDivElement.style.visibility = null;
            const value = window.localStorage.getItem("Custom.Settings.Menu.Hidden");
            if (value === "Y") {
              document.body.classList.add("hidden-template-buttons");
            } else {
              document.body.classList.remove("hidden-template-buttons");
            }
          },500);
        }else{
          dialogEl.remove();
          formDialogEl.remove();
          keyboardShortDialogEl.remove();
          quickReplySettingsDialogEl.remove();
          exportAndImportDialogEl.remove();
          superPromptSettingsDialogEl.remove();
          superPromptDialogEl.remove();
          superPromptCategoryNameSettingDialogEl.remove();
          collapseButtonEl.remove();
          menuDivElement.remove();
        }
  
      });
    }

  }

  appendAllElement();

  let menuDivElement = null;

  // Question
  const questionDialog = document.getElementById("dialog");
  const questionPreviewAreaDiv = document.getElementById("questionPreviewArea");
  const questionDialogTextarea = document.querySelector("#dialog-textarea");
  const questionDialogOkBtn = document.querySelector("#dialog-ok");
  const questionDialogInsertBtn = document.querySelector("#dialog-insert");
  const questionDialogCancelBtn = document.querySelector("#dialog-cancel");
  const questionDialogEditBtn = document.querySelector("#dialog-edit");

  let questionId = "";
  let prefix = "";
  let suffix = "";

  // Settings
  const settingsDialog = document.getElementById("dialog2");
  const settingsDialogOkBtn = document.querySelector("#dialog2-ok");
  const settingsDialogCancelBtn = document.querySelector("#dialog2-cancel");
  const settingsTableForm = settingsDialog.querySelector("#table-form");

  // Shortcut Key Hint
  const shortcutKeyHintDialog = document.getElementById("dialog3");

  // quickReply
  const quickReplySettingsDialog = document.getElementById("dialog4");
  const quickReplySettingsDialogOkBtn = document.querySelector("#dialog4-ok");
  const quickReplySettingsDialogCancelBtn =
    document.querySelector("#dialog4-cancel");

  // exportAndImport
  const exportAndImportDialog = document.getElementById("dialog5");
  const exportSettingsBtn = document.getElementById("export");
  const importAllBtn = document.getElementById("importAll");
  const importOnlyPromptBtn = document.getElementById("importPrompt");
  const importOnlySuperPromptBtn = document.getElementById("importSuperPrompt");
  const importOnlyQuickReplyBtn = document.getElementById("importQuickReply");
  const resetSettingBtn = document.getElementById("resetSetting");
  const exportAndImportDialogCancelBtn =
    document.getElementById("dialog5-cancel");

  const importFileInput = document.getElementById("importFileInput");

  // superPromptSetting
  const superPromptSettingsDialog = document.getElementById("dialog6");
  const superPromptSettingsDialogOkBtn = document.querySelector("#dialog6-ok");
  const superPromptSettingsDialogCancelBtn =
    document.querySelector("#dialog6-cancel");
  const superPromptSettingsTableForm =
    superPromptSettingsDialog.querySelector("#superTableForm");
  const superPromptDialogExportBtn = document.querySelector("#dialog6-export");
  const superPromptDialogImportBtn = document.querySelector("#dialog6-import");
  const importCategoryFileInput = document.querySelector(
    "#importCategoryFileInput"
  );
  const superPromptDialogAllShowOrHideBtn = document.querySelector(
    "#dialog6-all-show-or-hide"
  );

  // superPrompt
  const superPromptDialog = document.getElementById("dialog7");
  const superPromptDialogOkBtn = document.querySelector("#dialog7-ok");
  const superPromptDialogInsertBtn = document.querySelector("#dialog7-insert");
  const superPromptDialogCancelBtn = document.querySelector("#dialog7-cancel");
  const superPromptPreviewAreaDiv = document.getElementById(
    "superPromptPreviewArea"
  );
  const editSuperPromptBtn = document.getElementById("dialog7-edit");

  let superPrompt = "";
  let superPromptId = "";
  let superPromptName = "";

  // superPromptCategoryNameSettings
  const superPromptCategoryNameSettingsDialog =
    document.getElementById("dialog8");
  const superPromptCategoryNameSettingsDialogOkBtn =
    document.querySelector("#dialog8-ok");
  const superPromptCategoryNameSettingsDialogCancelBtn =
    document.querySelector("#dialog8-cancel");

  let isComposing = false;

  /** 1:form or 2:form2 .... 6:form6 */
  let currentSuperSettingFormType;

  /** 0:all or 1:prompt or 2:quickReply or 3:superPrompt */
  let importType;

  // promptList
  let defaultPromptList = [];
  let promptList = [];

  // quickReply
  let defaultQuickReplyMessageList = [];
  let quickReplyMessageList = [];

  // Super prompt
  let defaultSuperPromptList = [];
  let superPromptList = [];

  // superPromptCategory
  let superPromptCategoryList = [];

  setDefaultList();
  init();

  setTimeout(() => {
    subscribeMutationObserver();
  }, 1000);

  // 開關選單的選項加在右側

  let mutationTimer = null;

  function resetCustomMenuItem() {
    const customMenuItemElements = document.querySelectorAll(".customMenuItem");
    customMenuItemElements.forEach((customMenuItem) => {
      customMenuItem.remove();
    });
  }

  function handleDocumentClick(event) {
    const chatgptDropdownContentElements = document.querySelectorAll(
      ".chatgpt-dropdown-content"
    );
    chatgptDropdownContentElements.forEach((chatgptDropdownContentElement) => {
      if (
        !chatgptDropdownContentElement.contains(event.target) &&
        !chatgptDropdownContentElement.contains(event.target) &&
        chatgptDropdownContentElement.classList.contains("show")
      ) {
        chatgptDropdownContentElement.classList.remove("show");
      }
    });
  }

  document.addEventListener("click", handleDocumentClick);

  function addCustomLeftMenuItem() {
    try {
      const customATagEl = document.createElement("a");
      customATagEl.classList.add(
        "customMenuItem",
        "flex",
        "py-3",
        "px-3",
        "items-center",
        "gap-3",
        "rounded-md",
        "custom-hover",
        "transition-colors",
        "duration-200",
        "text-black",
        "dark:text-white",
        "cursor-pointer",
        "text-sm"
      );
      const switchMenuDiv = document.createElement("div");
      switchMenuDiv.style = "width:100%";
      switchMenuDiv.innerHTML = `    
        <div class="flex items-center">
          <svg 
            class="custom-icon",
            style="height:16px;width:16px;margin-right: 12px;" 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128v64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9V128c0-16.8-12.9-30.5-29.3-31.9zM336 144v16c0 53-43 96-96 96H208c-53 0-96-43-96-96V144c0-26.5 21.5-48 48-48H288c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512H128V448c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64l98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16v48h32V464c0-8.8-7.2-16-16-16zm96 32a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></svg>
          <div class="flex-1" style="margin-right:5px">${i18n(
            "nav_menu_help_menu"
          )}</div>
          <div class="slide-checkbox" style="margin: 0 0 0 0">  
            <input type="checkbox" value="true" id="switchMenu" name="check"/>
            <label for="switchMenu"><span></span></label>
          </div>
        </div>
      `;

      const navItemCount = document.querySelector("nav.flex")?.childNodes?.length;

      customATagEl.appendChild(switchMenuDiv);
      const nav = document.querySelector("nav.flex").lastChild;
      nav.insertBefore(customATagEl, nav.children[navItemCount -1]);

      document.getElementById("switchMenu").checked =
        localStorage.getItem("Custom.Settings.Menu.Hidden") === "Y"
          ? false
          : true;

      document
        .getElementById("switchMenu")
        .addEventListener("change", function () {
          if (this.checked) {
            localStorage.setItem("Custom.Settings.Menu.Hidden", "N");
            document.body.classList.remove("hidden-template-buttons");
          } else {
            localStorage.setItem("Custom.Settings.Menu.Hidden", "Y");
            document.body.classList.add("hidden-template-buttons");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  function addCustomLeftMenuItem2() {
    try {
      const customATagEl = document.createElement("a");
      customATagEl.classList.add(
        "customMenuItem",
        "flex",
        "py-3",
        "px-3",
        "items-center",
        "gap-3",
        "rounded-md",
        "custom-hover",
        "transition-colors",
        "duration-200",
        "text-black",
        "dark:text-white",
        "cursor-pointer",
        "text-sm"
      );

      const supportOtherSiteDiv = document.createElement("div");
      supportOtherSiteDiv.style = "width:100%";
      supportOtherSiteDiv.innerHTML = `    
        <div class="flex items-center">
          <svg class="custom-icon" style="height:16px;width:16px;margin-right: 12px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"/></svg>
          <div class="flex-1" style="font-size:10px;margin-right:5px;white-space: normal;">${i18n(
            "nav_menu_enable_gemini_support"
          )}</div>
          <div class="slide-checkbox" style="margin: 0 0 0 0">  
            <input type="checkbox" value="true" id="supportOtherSiteCheckbox" name="check"/>
            <label for="supportOtherSiteCheckbox"><span></span></label>
          </div>
        </div>
      `;

      const navItemCount = document.querySelector("nav.flex")?.childNodes?.length;

      customATagEl.appendChild(supportOtherSiteDiv);
      const nav = document.querySelector("nav.flex").lastChild;
      nav.insertBefore(customATagEl, nav.children[navItemCount -1]);

      const enableGeminiSupport = window.localStorage.getItem("Custom.EnableGeminiSupport") === 'true' ? true : false; 
      document.getElementById("supportOtherSiteCheckbox").checked = enableGeminiSupport;
      document
      .getElementById("supportOtherSiteCheckbox")
      .addEventListener("change", function () {
        setSupportOtherSiteFlag(this.checked);
      });

    } catch (error) {
      console.log(error);
    }
  }

  function addCustomLeftMenuItem3() {
    try {
      const customATagEl = document.createElement("a");
      customATagEl.classList.add(
        "customMenuItem",
        "flex",
        "py-3",
        "px-3",
        "items-center",
        "gap-3",
        "rounded-md",
        "custom-hover",
        "transition-colors",
        "duration-200",
        "text-black",
        "dark:text-white",
        "cursor-pointer",
        "text-sm"
      );

      const menuItemDiv = document.createElement("div");
      menuItemDiv.style = "width:100%;";
      menuItemDiv.innerHTML = `    
        <div id="allSettings" class="chatgpt-dropdown chatgpt-dropdown-up" style="width:100%">
          <div class="flex items-center">
            <svg class="custom-icon" style="height:16px;width:16px;margin-right: 12px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>  
            <div>${i18n("nav_item_settings")}</div>
          </div>
          <div class="chatgpt-dropdown-content">
            <a class="custom-menu-item">${i18n(
              "menu_prompt_template_settings"
            )}</a>
            <a class="custom-menu-item">${i18n(
              "menu_reply_message_settings"
            )}</a>
            <a class="custom-menu-item">${i18n("menu_import_export")}</a>
          </div>
        </div>
      `;

      const navItemCount = document.querySelector("nav.flex")?.childNodes?.length;

      customATagEl.appendChild(menuItemDiv);
      const nav = document.querySelector("nav.flex").lastChild;
      nav.insertBefore(customATagEl, nav.children[navItemCount - 1]);

      const menuItems = customATagEl.querySelectorAll(".custom-menu-item");
      const chatgptDropdownContentEl = customATagEl.querySelector(
        ".chatgpt-dropdown-content"
      );

      customATagEl.addEventListener("click", (event) => {
        event.stopPropagation();
        chatgptDropdownContentEl.classList.add("show");
      });

      // 選項
      menuItems[0].addEventListener("click", (event) => {
        event.stopPropagation();
        chatgptDropdownContentEl.classList.remove("show");
        showSettingsDialog();
      });

      menuItems[1].addEventListener("click", (event) => {
        event.stopPropagation();
        chatgptDropdownContentEl.classList.remove("show");
        showQuickReplySettingsDialog();
      });

      menuItems[2].addEventListener("click", (event) => {
        event.stopPropagation();
        chatgptDropdownContentEl.classList.remove("show");
        openExportAndImportDialog();
      });
    } catch (error) {
      console.log(error);
    }
  }

  function addCustomLeftMenuItem4() {
    try {
      const customATagEl = document.createElement("a");
      customATagEl.classList.add(
        "customMenuItem",
        "flex",
        "py-3",
        "px-3",
        "items-center",
        "gap-3",
        "rounded-md",
        "custom-hover",
        "transition-colors",
        "duration-200",
        "text-black",
        "dark:text-white",
        "cursor-pointer",
        "text-sm"
      );

      const menuItemDiv = document.createElement("div");
      menuItemDiv.style = "width:100%;";
      menuItemDiv.innerHTML = `    
        <div id="allSettings" class="chatgpt-dropdown chatgpt-dropdown-up" style="width:100%">
          <div class="flex items-center">
          <svg class="custom-icon" style="height:16px;width:16px;margin-right: 12px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"/></svg>
            <div>${i18n("nav_item_super_prompt_template")}</div>
          </div>
          <div class="chatgpt-dropdown-content" style="max-height:400px;overflow:auto">
            <a class="custom-menu-item"> ✏️ ${i18n(
              "menu_custom_super_prompt_category"
            )}</a>
            ${SuperPromptCategoryListLimit.map(
              (_, index) => `
                <a class="custom-menu-item" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">${superPromptCategoryList[index].name}</a>
              `
            ).join("")}
          </div>
        </div>
      `;

      const navItemCount = document.querySelector("nav.flex")?.childNodes?.length;

      customATagEl.appendChild(menuItemDiv);
      const nav = document.querySelector("nav.flex").lastChild;
      nav.insertBefore(customATagEl, nav.children[navItemCount - 1]);

      const menuItems = customATagEl.querySelectorAll(".custom-menu-item");
      const chatgptDropdownContentEl = customATagEl.querySelector(
        ".chatgpt-dropdown-content"
      );

      customATagEl.addEventListener("click", (event) => {
        event.stopPropagation();
        chatgptDropdownContentEl.scrollIntoView();
        chatgptDropdownContentEl.classList.add("show");
      });

      menuItems[0].addEventListener("click", (event) => {
        event.stopPropagation();
        chatgptDropdownContentEl.classList.remove("show");
        showSuperPromptCategoryNameSettingsDialog();
      });

      SuperPromptCategoryListLimit.forEach((_, index) => {
        menuItems[index + 1].addEventListener("click", (event) => {
          event.stopPropagation();
          chatgptDropdownContentEl.classList.remove("show");
          showSuperPromptSettingDialog(index + 1);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  // 訂閱畫面變化
  function subscribeMutationObserver() {
    // 取得要監聽的 DOM 元素
    var targetNode = document.body;

    // 設定 MutationObserver
    var observer = new MutationObserver(function (mutations) {
      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(function () {

        if (
          !supportOtherSite &&
          document.querySelector("nav.flex") &&
          document.querySelector("nav.flex")?.childNodes?.length >= 2 &&
          !document.getElementById("switchMenu")
        ) {
          addCustomLeftMenuItem();
          addCustomLeftMenuItem2();
          addCustomLeftMenuItem3();
          addCustomLeftMenuItem4();
        }

        try {
          const modifyAttributeElement = mutations.filter(
            (mutations) => mutations.type === "attributes"
          );
          modifyAttributeElement.forEach((mutation) => {
            if (
              mutation.target &&
              mutation.target.classList.contains("dialog-wrapper")
            ) {
              mutation.target.style.display === "flex"
                ? disableMenuItemTabindex()
                : restoreMenuItemTabindex();
            }
          });
        } catch (error) {
          console.log("mutations error", error);
        }
      }, 0);
    });

    // 開始監聽 DOM 變動
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(targetNode, config);
  }

  // 定義一個函式來從 localStorage 或 chrome.storage.local 獲取資料
  function getData(key, defaultValue, callback) {
    let value = localStorage.getItem(key);
    if (value === null) {
      // 如果 localStorage 中沒有資料，則從 chrome.storage.local 中獲取
      chrome.storage.local.get([key], function(result) {
        if (result[key] !== undefined) {
          // 如果 chrome.storage.local 中有資料，則使用該資料
          value = result[key];
        } else {
          // 如果 chrome.storage.local 中也沒有資料，則使用預設值
          value = JSON.stringify(defaultValue);
        }
        // 將資料儲存到 localStorage 和 chrome.storage.local
        localStorage.setItem(key, value);
        let obj = {};
        obj[key] = value;
        chrome.storage.local.set(obj, function() {
          if (chrome.runtime.lastError) {
            console.log('Error while saving data to chrome.storage.local: ' + chrome.runtime.lastError.message);
          }else{
            console.log("save to chrome.storage.local success");
            if(key==="Custom.Settings.Menu.Hidden"){
              generateButtons();
            }
          }
        });
        // 使用回調函式返回資料
        let parsedValue;
        try {
          parsedValue = JSON.parse(value);  
        } catch (error) {
          parsedValue = value;
        }
        callback(parsedValue);
      });
    } else {
      // 如果 localStorage 中有資料，則使用該資料
      let parsedValue;
      try {
        parsedValue = JSON.parse(value);  
      } catch (error) {
        parsedValue = value;
      }
      callback(parsedValue);
      // 將資料儲存到 chrome.storage.local
      let obj = {};
      obj[key] = value;
      chrome.storage.local.set(obj, function() {
        if (chrome.runtime.lastError) {
          console.log('Error while saving data to chrome.storage.local: ' + chrome.runtime.lastError.message);
        }
      });
    }
  }

  function updateChromeStorage(key, value) {
    let obj = {};
    obj[key] = value;
    chrome.storage.local.set(obj, function() {
      if (chrome.runtime.lastError) {
        console.log('Error while saving data to chrome.storage.local: ' + chrome.runtime.lastError.message);
      }
    });
  }

  function getDataFromChromeStorage(key, defaultValue, callback) {
    let value;
    // 從 chrome.storage.local 中獲取
    chrome.storage.local.get([key], function(result) {
      if (result[key] !== undefined) {
        // 如果 chrome.storage.local 中有資料，則使用該資料
        value = result[key];
      } else {
        // 如果 chrome.storage.local 中也沒有資料，則使用預設值
        value = JSON.stringify(defaultValue);
      }
      if(key==="Custom.Settings.Menu.Hidden"){
        if(
          window.localStorage.getItem("Custom.Settings.Menu.Hidden")
        ){
          value = window.localStorage.getItem("Custom.Settings.Menu.Hidden");
        }
        generateButtons();
      }
      // 使用回調函式返回資料
      let parsedValue;
      try {
        parsedValue = JSON.parse(value);  
      } catch (error) {
        parsedValue = value;
      }
      callback(parsedValue);
    });
  }

  function setSupportOtherSiteFlag(flag){
    window.localStorage.setItem("Custom.EnableGeminiSupport", flag);
    chrome.storage.local.set({"Custom.EnableGeminiSupport": flag}, function() {});
  }

  // 初始化
  function init() {

    questionDialog.style.display = "none";
    settingsDialog.style.display = "none";
    shortcutKeyHintDialog.style.display = "none";
    exportAndImportDialog.style.display = "none";
    superPromptSettingsDialog.style.display = "none";
    superPromptDialog.style.display = "none";

    if(supportOtherSite){
      if(supportGemini){
        checkGeminiTheme();
      }
      if(
        supportClaude
      ){
        checkClaudeOrClaudeTheme();
      }
      if(
        supportPerplexity
      ){
        checkPerplexityTheme();
      }
      // 使用 getData 函式來獲取資料
      getDataFromChromeStorage("Custom.Settings.Prompt", defaultPromptList, function(value) {
        promptList = value;
      });
      getDataFromChromeStorage("Custom.Settings.QuickReply", defaultQuickReplyMessageList, function(value) {
        quickReplyMessageList = value;
      });
      getDataFromChromeStorage("Custom.Settings.SuperPrompt", defaultSuperPromptList, function(value) {
        superPromptList = value;
      });
      getDataFromChromeStorage("Custom.Settings.SuperPromptCategoryList", defaultSuperPromptCategoryList, function(value) {
        superPromptCategoryList = value;
      });
      // 處理 "Custom.Settings.Menu.Hidden"
      document.body.classList.add("hidden-template-buttons");
      getDataFromChromeStorage("Custom.Settings.Menu.Hidden", "N", function(value) {
        window.localStorage.setItem("Custom.Settings.Menu.Hidden", value);
        if (value === "Y") {
          document.body.classList.add("hidden-template-buttons");
        } else {
          document.body.classList.remove("hidden-template-buttons");
        }
      });
    }else{
      // 使用 getData 函式來獲取資料
      getData("Custom.Settings.Prompt", defaultPromptList, function(value) {
        promptList = value;
      });
      getData("Custom.Settings.QuickReply", defaultQuickReplyMessageList, function(value) {
        quickReplyMessageList = value;
      });
      getData("Custom.Settings.SuperPrompt", defaultSuperPromptList, function(value) {
        superPromptList = value;
      });
      getData("Custom.Settings.SuperPromptCategoryList", defaultSuperPromptCategoryList, function(value) {
        superPromptCategoryList = value;
      });

      // 處理 "Custom.Settings.Menu.Hidden"
      getData("Custom.Settings.Menu.Hidden", "N", function(value) {
        if (value === "Y") {
          document.body.classList.add("hidden-template-buttons");
        } else {
          document.body.classList.remove("hidden-template-buttons");
        }
      });

      // 避免 chrome.storage.local 儲存失敗
      if(
        window.localStorage.getItem("Custom.EnableGeminiSupport")
      ){
        const enableGeminiSupport = window.localStorage.getItem("Custom.EnableGeminiSupport") === 'true' ? true : false; 
        setSupportOtherSiteFlag(enableGeminiSupport);
      }
    }

  }

  function checkGeminiTheme(){
    if(
      document.body.classList.contains("dark-theme")
    ){
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }else{
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement.style.colorScheme = "light";
    }
  }

  function checkClaudeOrClaudeTheme(){
    const isDarkMode = document.documentElement.getAttribute('data-mode') === 'dark';
    if(
      isDarkMode
    ){
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }else{
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement.style.colorScheme = "light";
    }
  }

  function checkPerplexityTheme(){
    const isDarkMode = document.documentElement.dataset.colorScheme === 'dark';
    if(
      isDarkMode
    ){
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }else{
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement.style.colorScheme = "light";
    }
  }


  function darkModeToggle() {
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement.style.colorScheme = "light";
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }
  }

  function collapseToggle() {
    if (localStorage.getItem("Custom.Settings.Menu.Hidden") === "Y") {
      localStorage.setItem("Custom.Settings.Menu.Hidden", "N");
      document.body.classList.remove("hidden-template-buttons");
      try {
        document.getElementById("switchMenu").checked = true;
      } catch (error) {}
    } else {
      localStorage.setItem("Custom.Settings.Menu.Hidden", "Y");
      document.body.classList.add("hidden-template-buttons");
      try {
        document.getElementById("switchMenu").checked = false;
      } catch (error) {}
    }
  }

  // ------------ shortcutKey event handle ------------
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.code === "Escape") {
      const chatgptDropdownContentElements = document.querySelectorAll(
        ".chatgpt-dropdown-content"
      );
      chatgptDropdownContentElements.forEach(
        (chatgptDropdownContentElement) => {
          if (
            !chatgptDropdownContentElement.contains(event.target) &&
            !chatgptDropdownContentElement.contains(event.target) &&
            chatgptDropdownContentElement.classList.contains("show")
          ) {
            chatgptDropdownContentElement.classList.remove("show");
          }
        }
      );
    }

    // z + mainKey : 關閉 快捷鍵視窗
    if (
      (shortcutKeyHintDialog.style.display === "flex" &&
        event.key.toLocaleLowerCase() === "z") ||
      (shortcutKeyHintDialog.style.display === "flex" && event[mainKey])
    ) {
      shortcutKeyHintDialog.style.display = "none";
      return;
    }

    // esc : close questionDialog
    if (
      !isComposing &&
      questionDialog.style.display === "flex" &&
      event.key === "Escape"
    ) {
      event.preventDefault();
      questionDialog.style.display = "none";
      return;
    }

    // esc : close settingsDialog
    if (
      !isComposing &&
      settingsDialog.style.display === "flex" &&
      event.key === "Escape"
    ) {
      event.preventDefault();
      settingsDialog.style.display = "none";
      return;
    }

    // esc : close quickReplySettingsDialog
    if (
      !isComposing &&
      quickReplySettingsDialog.style.display === "flex" &&
      event.key === "Escape"
    ) {
      event.preventDefault();
      quickReplySettingsDialog.style.display = "none";
      return;
    }

    // esc : close exportAndImportDialog
    if (
      !isComposing &&
      exportAndImportDialog.style.display === "flex" &&
      event.key === "Escape"
    ) {
      event.preventDefault();
      exportAndImportDialog.style.display = "none";
      return;
    }

    // esc : close superPromptSettingsDialog
    if (
      !isComposing &&
      superPromptSettingsDialog.style.display === "flex" &&
      event.key === "Escape"
    ) {
      event.preventDefault();
      superPromptSettingsDialog.style.display = "none";
      return;
    }

    // esc : close superPromptDialog
    if (
      !isComposing &&
      superPromptDialog.style.display === "flex" &&
      event.key === "Escape"
    ) {
      event.preventDefault();
      superPromptDialog.style.display = "none";
      return;
    }

    // esc : close superPromptDialog
    if (
      !isComposing &&
      superPromptCategoryNameSettingsDialog.style.display === "flex" &&
      event.key === "Escape"
    ) {
      event.preventDefault();
      superPromptCategoryNameSettingsDialog.style.display = "none";
      return;
    }

    // mainKey + s : send message
    if (
      questionDialogTextarea.value.trim() &&
      questionDialog.style.display === "flex" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "s"
    ) {
      event.preventDefault();
      questionDialog.style.display = "none";
      sendQuestionForm();
      return;
    }

    // mainKey + s : save settings
    if (
      settingsDialog.style.display === "flex" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "s"
    ) {
      event.preventDefault();
      saveSittings();
      return;
    }

    // mainKey + s : save quickReplySettingsDialog
    if (
      quickReplySettingsDialog.style.display === "flex" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "s"
    ) {
      event.preventDefault();
      saveQuickReplySettings();
      return;
    }

    // mainKey + s : save superPromptSettingsDialog
    if (
      superPromptSettingsDialog.style.display === "flex" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "s"
    ) {
      event.preventDefault();
      saveSuperPromptSittings();
      return;
    }

    // mainKey + s : save superPromptDialog
    if (
      superPromptDialog.style.display === "flex" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "s"
    ) {
      event.preventDefault();
      sendSuperPrompt();
      return;
    }

    // mainKey + s : save superPromptDialog
    if (
      superPromptCategoryNameSettingsDialog.style.display === "flex" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "s"
    ) {
      event.preventDefault();
      saveSuperPromptCategoryNameSettings();
      return;
    }

    // mainKey + a : show / hidden right buttons
    if (event[mainKey] && event.key.toLocaleLowerCase() === "a") {
      event.preventDefault();
      collapseToggle();
      return;
    }

    // mainKey + b  : dark mode toggle
    if (event[mainKey] && event.key.toLocaleLowerCase() === "b") {
      event.preventDefault();
      darkModeToggle();
      return;
    }

    // mainKey + 1 ~ 5 number keyboard : open question dialog
    if (
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      superPromptSettingsDialog.style.display === "none" &&
      superPromptDialog.style.display === "none" &&
      superPromptCategoryNameSettingsDialog.style.display === "none" &&
      event[mainKey]
    ) {
      switch (event.key) {
        case "1":
          event.preventDefault();
          promptList[0].buttonElement.click();
          break;

        case "2":
          event.preventDefault();
          promptList[1].buttonElement.click();
          break;

        case "3":
          event.preventDefault();
          promptList[2].buttonElement.click();
          break;

        case "4":
          event.preventDefault();
          promptList[3].buttonElement.click();
          break;

        case "5":
          event.preventDefault();
          promptList[4].buttonElement.click();
          break;

        default:
          break;
      }
    }
  });

  
  function chatInput() {
    let chatInput = document.querySelector("#prompt-textarea");
    if(
      supportGemini
    ){
      chatInput = document.body.querySelector('rich-textarea');
    }
    if(
      supportClaude
    ){
      chatInput = document.querySelector('div[contenteditable="true"]');
    }
    if(supportGrok){
      chatInput = document.querySelector('form').querySelector('textarea') || document.querySelector('div[contenteditable="true"]');
    }
    if(supportFelo){
      chatInput = document.querySelector('form').querySelector('textarea');
    }
    if(
      supportPerplexity
    ){
      chatInput = document.querySelector('#ask-input');
    }
    return chatInput;
  }
  
  function sendButton(){
    let sendButton = document.querySelector('button[data-testid="send-button"]') ||
    document.querySelector("#prompt-textarea")?.parentElement?.parentElement?.querySelectorAll('button')[document.querySelector("#prompt-textarea")?.parentElement?.parentElement?.querySelectorAll('button')?.length-1] 
    if(
      supportGemini
    ){
      sendButton = document.querySelector('.send-button-container')?.querySelector('button');
    }
    if(
      supportClaude
    ){
      sendButton = document.querySelector('button[aria-label="Send message"]') || document.querySelector('button[aria-label="Send Message"]');
    }
    if(supportGrok){
      sendButton = document.querySelector('form').querySelector('button[type="submit"]');
    }
    if(supportFelo){
      sendButton = document.querySelector('form').querySelector('[type=submit]') ||
      document.querySelector('form').querySelectorAll('button')[document.querySelector('form').querySelectorAll('button').length-1] || 
      document.querySelector('form').querySelector('button.rounded-3xl') ;
    }
    if(
      supportPerplexity
    ){
      sendButton = document.querySelector('[data-testid="submit-button"]');
    }
    return sendButton;
  }

  // ------------ 提問視窗 相關程式碼 ------------
  function sendMessage(message, isInsert = false) {

    let isGenerating = false;

    // 看看是不是正在對話，若有則先停止
    document.querySelectorAll("button").forEach((button) => {
      if (button.textContent === "Stop generating") {
        isGenerating = true;
        button.click();
      }
    });

    if(
      supportChatGPT
    ){
      chatInput().textContent = "-";
    }

    setTimeout(() => {
      if (!chatInput()) {
        alert(i18n("alert_not_found_input"));
        return;
      }
      
      if(supportClaude){
        const messageArray = message.split("\n");
        messageArray?.forEach((msg) => {
          const paragraph = document.createElement('p');
          paragraph.textContent = msg;
          chatInput().appendChild(paragraph);
        });
      }else if(supportGemini){
        chatInput().children[0].textContent = message;
        chatInput().children[0].focus();
      }else if(supportGrok){
        if(chatInput() instanceof HTMLTextAreaElement){
          chatInput().value = message;
          chatInput().dispatchEvent(new Event('input', { bubbles: true }));
        }else{
          const messageArray = message.split("\n");
          messageArray?.forEach((msg) => {
            const paragraph = document.createElement('p');
            paragraph.textContent = msg;
            chatInput().appendChild(paragraph);
          });
        }
      }else if(supportFelo){
        chatInput().value = message;
        chatInput().dispatchEvent(new Event('input', { bubbles: true }));
      }else if(supportPerplexity){
        if(chatInput() instanceof HTMLTextAreaElement){
          chatInput().value = message;
          chatInput().dispatchEvent(new Event('input', { bubbles: true }));
        } else {
          const editable = chatInput();
          if (!editable) throw new Error('找不到可編輯區');
          editable.focus();
          // **把整個 editable 裡的文字全選起來**
          const sel = window.getSelection();
          sel.removeAllRanges();
          const range = document.createRange();
          range.selectNodeContents(editable);
          sel.addRange(range);
          setTimeout(() => {
            // 這行就會覆蓋掉被選取的內容
            document.execCommand('insertText', false, message); 
          });
        }
      }else{
        if(chatInput()?.children?.length){
          while (chatInput()?.firstChild) {
            chatInput().removeChild(chatInput()?.firstChild);
          }
        }
        const messageArray = message?.split("\n");
        messageArray?.forEach((msg) => {
          const paragraph = document.createElement('p');
          paragraph.textContent = msg;
          chatInput().appendChild(paragraph);
        });
      }
  
      if(isInsert){
        return;
      }

      if(!supportPerplexity){
        if (
          !sendButton()
        ) {
          alert(i18n("alert_not_found_send_button"));
          return;
        }
      }
  
      if (isGenerating) {
        setTimeout(() => {
          sendButton()?.click();
        }, 500);
      } else {
        setTimeout(() => {
          sendButton()?.click();
        }, 100);
      }
    });
  }

  function sendQuestionForm(isInsert = false) {
    const message = `${prefix}${questionDialogTextarea.value}${suffix}`;
    questionDialog.style.display = "none";
    sendMessage(message, isInsert);
  }

  questionDialogEditBtn.addEventListener("click", () => {
    if(supportOtherSite){return}
    questionDialog.style.display = "none";
    showSettingsDialog(questionId - 1);
  });

  questionDialogTextarea.addEventListener("keydown", (event) => {
    // prevent submitting blank on enter
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      questionDialogTextarea.value.trim() === ""
    ) {
      event.preventDefault();
      return;
    }

    // enter : send
    if (
      !isComposing &&
      !event.shiftKey &&
      document.activeElement === questionDialogTextarea &&
      event.key === "Enter"
    ) {
      sendQuestionForm();
      return;
    }

    // esc : close
    if (
      !isComposing &&
      event.target !== document.activeElement &&
      event.key === "Escape"
    ) {
      questionDialog.style.display = "none";
      return;
    }
  });

  questionDialogOkBtn.addEventListener("click", () => {
    if (questionDialogTextarea.value.trim() === "") {
      return;
    }
    questionDialog.style.display = "none";
    sendQuestionForm();
  });

  questionDialogInsertBtn.addEventListener("click", () => {
    if (questionDialogTextarea.value.trim() === "") {
      return;
    }
    questionDialog.style.display = "none";
    sendQuestionForm(true);
  });

  questionDialogCancelBtn.addEventListener("click", () => {
    questionDialog.style.display = "none";
  });

  // prompt 視窗
  function showQuestionDialog() {
    const innerHTML =
      prefix.replace(/\n/g, "<br>") +
      " {{ $input }} " +
      suffix.replace(/\n/g, "<br>");

    questionPreviewAreaDiv.innerHTML = innerHTML;

    questionDialog.style.display = "flex";
    questionDialogTextarea.value = "";

    questionDialogTextarea.focus();
  }

  // ------------ 設定視窗相關 程式碼 ------------
  function showSettingsDialog(focusElementIndex = null) {
    settingsDialog.style.display = "flex";

    const btnTextInputElements = document.querySelectorAll(".btnTextInput");
    const prefixInputElements = document.querySelectorAll(".prefixInput");
    const suffixInputElements = document.querySelectorAll(".suffixInput");
    const promptSlideElements = document.querySelectorAll(".promptSlide");

    let startIndex = 0;
    let endIndex = 10;

    for (let index = startIndex; index < endIndex; index++) {
      btnTextInputElements[index].value = promptList[index].text;
      prefixInputElements[index].value = promptList[index].prefix;
      suffixInputElements[index].value = promptList[index].suffix;
      promptSlideElements[index].checked = promptList[index].isVisible;

      prefixInputElements[index].style.height = "85px";
      suffixInputElements[index].style.height = "85px";
    }

    if (focusElementIndex) {
      btnTextInputElements[focusElementIndex].focus();
    } else {
      btnTextInputElements[0].focus();
    }
  }

  function saveSittings() {
    const btnTextInputElements = document.querySelectorAll(".btnTextInput");
    const prefixInputElements = document.querySelectorAll(".prefixInput");
    const suffixInputElements = document.querySelectorAll(".suffixInput");
    const promptSlideElements = document.querySelectorAll(".promptSlide");

    let startIndex = 0;
    let endIndex = 10;

    const previousPromptList = JSON.parse(JSON.stringify(promptList));

    for (let index = startIndex; index < endIndex; index++) {
      promptList[index].text = btnTextInputElements[index].value;
      promptList[index].prefix = prefixInputElements[index].value;
      promptList[index].suffix = suffixInputElements[index].value;
      promptList[index].isVisible = promptSlideElements[index].checked;

      if (previousPromptList.isVisible) {
        promptList[index].buttonElement.removeEventListener(
          "click",
          promptList[index].handleClickFn
        );
        promptList[index].buttonElement.remove();

        delete promptList[index].buttonElement;
        delete promptList[index].handleClickFn;
      }
    }

    localStorage.setItem("Custom.Settings.Prompt", JSON.stringify(promptList));

    updateChromeStorage("Custom.Settings.Prompt",promptList);

    generateButtons();

    settingsDialog.style.display = "none";
  }

  settingsDialogOkBtn.addEventListener("click", () => {
    saveSittings();
  });

  settingsDialogCancelBtn.addEventListener("click", () => {
    settingsDialog.style.display = "none";
  });

  // ------------ super 設定視窗相關 程式碼 ------------

  let isAllShow = false;

  let isShowSuperPromptSettingDialogInit = true;

  let dragged;

  const handleMouseDown = (e) => {
    dragged = e.target.closest('tr');
    dragged.classList.add('dragging');
    dragged.draggable = true;
  };

  const handleMouseUp = (e) => {
    if (dragged) {
      dragged.classList.remove('dragging');
      dragged.draggable = false;
      dragged = null;
    }
  };

  function showSuperPromptSettingDialog(
    superFormType,
    focusElementIndex = null
  ) {
    currentSuperSettingFormType = superFormType;

    superPromptSettingsDialog.style.display = "flex";

    const superPromptButtonTextElements = document.querySelectorAll(
      ".superPromptButtonText"
    );
    const superPromptTextElements =
      document.querySelectorAll(".superPromptText");

    const superPromptSlideElements =
      document.querySelectorAll(".superPromptSlide");

    const expandEditPromptElements =
      document.querySelectorAll(".expandEditPrompt");

    const superPromptIdElements = document.querySelectorAll(".superPromptId");

    const dialogTitleElement =
      superPromptSettingsDialog.querySelector(".dialog-title");

    dialogTitleElement.innerHTML =
      superPromptCategoryList[currentSuperSettingFormType - 1].name;

    const nowSuperPromptList = superPromptList.slice(
      (currentSuperSettingFormType - 1) * SuperPromptSettingsListLength,
      currentSuperSettingFormType * SuperPromptSettingsListLength
    );

    for (let index = 0; index < SuperPromptSettingsListLength; index++) {
      superPromptButtonTextElements[index].value =
        nowSuperPromptList[index].text;
      superPromptTextElements[index].value = nowSuperPromptList[index].prompt;
      superPromptSlideElements[index].checked =
        nowSuperPromptList[index].isVisible;
      superPromptIdElements[index].innerHTML = nowSuperPromptList[index].key;
      superPromptTextElements[index].style.height = "132px";
    }

    if (focusElementIndex) {
      superPromptButtonTextElements[focusElementIndex].focus();
    } else {
      superPromptButtonTextElements[0].focus();
    }

    if (isShowSuperPromptSettingDialogInit) {
      expandEditPromptElements.forEach((expandEditPromptElement, index) => {
        expandEditPromptElement.addEventListener("click", () => {
          if (superPromptTextElements[index].offsetHeight < 485) {
            superPromptTextElements[index].style.height = "485px";
          } else {
            superPromptTextElements[index].style.height = "132px";
          }
        });
      });
    }

    const draggingRow = superPromptSettingsDialog.querySelector('.dragging-row');

    if(draggingRow){
      draggingRow.classList.remove('dragging-row');
    }
    
    superPromptSettingsDialog.querySelectorAll('.drag-btn').forEach(btn => {
      btn.removeEventListener('mousedown', handleMouseDown);
      btn.removeEventListener('mouseup', handleMouseUp);
    });

    superPromptSettingsDialog.querySelectorAll('.drag-btn').forEach(btn => {
      btn.addEventListener('mousedown', handleMouseDown);
      btn.addEventListener('mouseup', handleMouseUp);
    });

    controlSuperPromptSettingsDialogTabindex();

    isAllShow = superPromptSlideElements[0].checked;

    isShowSuperPromptSettingDialogInit = false;

  }

  function saveSuperPromptSittings() {
    const btnTextInputElements = document.querySelectorAll(
      ".superPromptButtonText"
    );
    const textInputElements = document.querySelectorAll(".superPromptText");
    const promptSlideElements = document.querySelectorAll(".superPromptSlide");

    const nowSuperPromptList = superPromptList.slice(
      (currentSuperSettingFormType - 1) * SuperPromptSettingsListLength,
      currentSuperSettingFormType * SuperPromptSettingsListLength
    );

    const previousSuperPromptList = JSON.parse(
      JSON.stringify(nowSuperPromptList)
    );

    for (let index = 0; index < SuperPromptSettingsListLength; index++) {
      nowSuperPromptList[index].text = btnTextInputElements[index].value;
      nowSuperPromptList[index].prompt = textInputElements[index].value;
      nowSuperPromptList[index].isVisible = promptSlideElements[index].checked;

      if (previousSuperPromptList.isVisible) {
        nowSuperPromptList[index].buttonElement.removeEventListener(
          "click",
          nowSuperPromptList[index].handleClickFn
        );
        nowSuperPromptList[index].buttonElement.remove();

        delete nowSuperPromptList[index].buttonElement;
        delete nowSuperPromptList[index].handleClickFn;
      }
    }

    localStorage.setItem(
      "Custom.Settings.SuperPrompt",
      JSON.stringify(superPromptList)
    );

    updateChromeStorage("Custom.Settings.SuperPrompt",superPromptList);

    generateButtons();

    superPromptSettingsDialog.style.display = "none";
  }

  superPromptSettingsDialogOkBtn.addEventListener("click", () => {
    saveSuperPromptSittings();
  });

  superPromptSettingsDialogCancelBtn.addEventListener("click", () => {
    superPromptSettingsDialog.style.display = "none";
  });

  superPromptDialogExportBtn.addEventListener("click", () => {
    const superPromptButtonTextElements = document.querySelectorAll(
      ".superPromptButtonText"
    );
    const superPromptTextElements =
      document.querySelectorAll(".superPromptText");
    const superPromptSlideElements =
      document.querySelectorAll(".superPromptSlide");

    let exportData = [];
    const title =
      superPromptSettingsDialog.querySelector(".dialog-title").innerHTML;

    Array.from({ length: SuperPromptSettingsListLength }).forEach(
      (_, index) => {
        exportData.push({
          text: superPromptButtonTextElements[index].value,
          prompt: superPromptTextElements[index].value,
          isVisible: superPromptSlideElements[index].checked,
        });
      }
    );

    const jsonData = JSON.stringify(
      {
        superPrompt: exportData,
      },
      null,
      2
    );

    downloadFile(jsonData, `${title}.json`, "application/json;charset=utf-8;");
  });

  superPromptDialogImportBtn.addEventListener("click", () => {
    importCategoryFileInput.click();
  });

  importCategoryFileInput.addEventListener("change", () => {
    const file = importCategoryFileInput.files[0];
    const reader = new FileReader();
    reader.onload = handleCategoryFileLoad;
    reader.readAsText(file);
  });

  function checkCategoryFileContent(obj) {
    let isValidated = true;

    try {
      if (!obj.hasOwnProperty("superPrompt")) {
        isValidated = false;
      } else {
        if (obj.superPrompt.length !== 50) {
          isValidated = false;
        }

        obj.superPrompt.forEach((setting) => {
          if (
            !setting.hasOwnProperty("isVisible") ||
            typeof setting.isVisible !== "boolean"
          ) {
            isValidated = false;
          }
          if (
            !setting.hasOwnProperty("text") ||
            typeof setting.text !== "string"
          ) {
            isValidated = false;
          }
          if (
            !setting.hasOwnProperty("prompt") ||
            typeof setting.prompt !== "string"
          ) {
            isValidated = false;
          }
        });
      }
    } catch (error) {
      isValidated = false;
      console.log("error", error);
    }

    return isValidated;
  }

  function handleCategoryFileLoad(event) {
    try {
      const json = JSON.parse(event.target.result);

      if (!checkCategoryFileContent(json)) {
        importCategoryFileInput.value = "";
        alert(i18n("alert_import_error"));
        return;
      }

      const superPromptButtonTextElements = document.querySelectorAll(
        ".superPromptButtonText"
      );
      const superPromptTextElements =
        document.querySelectorAll(".superPromptText");
      const superPromptSlideElements =
        document.querySelectorAll(".superPromptSlide");

      Array.from({ length: SuperPromptSettingsListLength }).forEach(
        (_, index) => {
          superPromptButtonTextElements[index].value =
            json.superPrompt[index].text;
          superPromptTextElements[index].value = json.superPrompt[index].prompt;
          superPromptSlideElements[index].checked =
            json.superPrompt[index].isVisible;
        }
      );

      alert(i18n("alert_import_super_prompt_success"));

      importCategoryFileInput.value = "";
    } catch (error) {
      console.log(error);
    }
  }

  superPromptDialogAllShowOrHideBtn.addEventListener("click", () => {
    isAllShow = !isAllShow;

    const superPromptSlideElements =
      document.querySelectorAll(".superPromptSlide");

    Array.from({ length: SuperPromptSettingsListLength }).forEach(
      (_, index) => {
        superPromptSlideElements[index].checked = isAllShow;
      }
    );
  });

  // ------------ super 樣板視窗 程式碼 ------------

  const PlaceholderPromptInputTips = i18n("placeholder_prompt_input_tips");
  const PlaceholderPromptTextarea = i18n("placeholder_prompt_textarea");

  function showSuperPromptDialog() {

    superPromptDialog.style.display = "flex";

    const table = document.querySelector("#superPromptTable");
    const fieldItemList = table.querySelectorAll(".fieldItem");

    // 使用迴圈移除每個 <tr> 元素
    for (let i = 0; i < fieldItemList.length; i++) {
      const tr = fieldItemList[i];
      tr.parentNode.removeChild(tr);
    }

    // 清空預覽區域
    superPromptPreviewAreaDiv.textContent = '';

    // 創建標題元素
    const titleBold = document.createElement('b');
    titleBold.textContent = `#${superPromptId} ${superPromptName}`;
    superPromptPreviewAreaDiv.appendChild(titleBold);

    // 添加換行
    superPromptPreviewAreaDiv.appendChild(document.createElement('br'));

    // 處理 superPrompt 內容，將換行符轉換為 <br> 元素
    const lines = superPrompt.split('\n');
    lines?.forEach((line, index) => {
      const textNode = document.createTextNode(line);
      superPromptPreviewAreaDiv.appendChild(textNode);
      if (index < lines.length - 1) {
        superPromptPreviewAreaDiv.appendChild(document.createElement('br'));
      }
    });

    // 使用正規表達式搜尋 {{ 和 }} 之間的內容
    const matches = superPrompt.match(/{{\s*([^}]*)\s*}}/g) || [];

    // 移除重複的，但將 {{}} 是為獨立的一個
    const uniqueMatches = [];
    const countMap = {};

    for (const match of matches) {
      if (match === "{{}}") {
        uniqueMatches.push(match);
      } else {
        if (!countMap[match]) {
          countMap[match] = true;
          uniqueMatches.push(match);
        }
      }
    }

    if (!uniqueMatches) {
      return;
    }

    let htmlStr = "";
    let tabIndex = 1;

    uniqueMatches.forEach((string, i) => {

      let [fieldName = "", fieldValue = "", fieldType = "t" , defaultValue = ""] = string
        ?.slice(2, -2)
        ?.split("||")
        ?.map((s) => s?.trim());

      if (!fieldValue) {
        fieldValue = "";
      }

      if(!defaultValue){
        defaultValue = "";
      }

      fieldType = fieldType?.trim()?.toLocaleLowerCase();

      switch (fieldType) {
        case "s":
          htmlStr += `
                <div class="fieldItem">
                  <div class="superPromptName" style="width:100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-weight: bold;">${fieldName}</div>
                  <div class="center">
                    <select style="width:100%;cursor: pointer;" tabindex="${tabIndex}" class="super-prompt-text superPromptText">
                      ${fieldValue
                        .split(",")
                        .map((option, index) => {
                          if (index === 0) {
                            return `<option value="${option}" selected>${option}</option>`;
                          }
                          return `<option value="${option}">${option}</option>`;
                        })
                        .join("")}
                    </select>
                  </div>
                </div>
              `;
              tabIndex++;
          break;

        // 根據預設值產生多個 checkbox
        case "c":
          htmlStr += `
                <div class="fieldItem">
                  <div class="superPromptName" style="width:100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-weight: bold;">${fieldName}</div>
                  <div style="display:flex;flex-wrap:wrap;">  
                    ${fieldValue
                      .split(",") 
                      .map((option, index) => {
                        let defaultValueList = defaultValue?.split(",") || [];
                        defaultValueList = defaultValueList.map((s) => s.trim());
                        const checkboxStr = `
                          <div style="display: flex;align-items: center;height: 30px;margin-right:10px">
                            <input
                              type="checkbox"
                              class="super-prompt-text superPromptText" 
                              id="${fieldName+'___custom___checkbox___'+i+''+index}" 
                              name="${fieldName+'___custom___checkbox___'+i}" 
                              ${
                                defaultValueList.includes(option.trim()) ? "checked" : ""
                              }
                              value="${option}" 
                              tabindex="${tabIndex}"
                              style="width:20px;height:20px;margin:0 4px 0 4px;cursor: pointer;"
                            />
                            <label
                              style="cursor: pointer;"
                              for="${fieldName+'___custom___checkbox___'+i+''+index}"
                              >${option}</label>
                          </div>
                        `;
                        tabIndex++;
                        return checkboxStr;
                      })
                      .join("")}
                  </div>
                </div>
              `;
          break;

        // 根據預設值產生多個 radio
        case "r":
          htmlStr += `
                <div class="fieldItem">
                  <div class="superPromptName" style="width:100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-weight: bold;">${fieldName}</div>
                  <div style="display:flex;flex-wrap:wrap;">
                    ${fieldValue
                      .split(",")
                      .map((option, index) => {
                        let radioDefaultValue = defaultValue || "";
                        const radioStr = `
                          <div style="display: flex;align-items: center;height: 30px;margin-right:10px">
                            <input
                              type="radio"
                              class="super-prompt-text superPromptText"
                              id="${fieldName+'___custom___radio___'+i+''+index}"
                              name="${fieldName+'___custom___radio___'+i}"
                              ${
                                radioDefaultValue === option.trim() ? "checked" : ""
                              }
                              value="${option}"
                              tabindex="${tabIndex}"
                              style="width:20px;height:20px;margin:0 4px 0 4px;border-radius: 10px;cursor: pointer;"
                            />
                            <label
                              style="cursor: pointer;"
                              for="${fieldName+'___custom___radio___'+i+''+index}"
                            >${option}</label>
                          </div>
                        `;
                        tabIndex++;
                        return radioStr;
                      })
                      .join("")}
                  </div>
                </div>
              `;
          break;

        default:
        case "t":
          htmlStr += `
                <div class="fieldItem">
                  <div class="superPromptName" style="width:100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-weight: bold;">${fieldName}</div>
                  <div class="center">
                    <textarea rows="3" style="width:100%" tabindex="${tabIndex}" class="super-prompt-text superPromptText" placeholder="${PlaceholderPromptInputTips}">${fieldValue}</textarea>
                  </div>
                </div>
              `;
              tabIndex++;
          break;
      }
    });

    table.innerHTML += htmlStr;

    // 只有一個的時候，行為模式跟一般 prompt 一樣
    if (table.querySelectorAll(".superPromptText").length === 1) {
      const textarea = table.querySelectorAll(".superPromptText")[0];

      if (table.querySelectorAll("textarea.superPromptText").length === 1) {
        textarea.style = "width:100%;height:380px;";
        textarea.placeholder = PlaceholderPromptTextarea;
      }

      textarea.addEventListener("keydown", (event) => {
        // prevent submitting blank on enter
        if (
          event.key === "Enter" &&
          !event.shiftKey &&
          textarea.value.trim() === ""
        ) {
          event.preventDefault();
          return;
        }

        // enter : send
        if (
          !isComposing &&
          !event.shiftKey &&
          document.activeElement === textarea &&
          event.key === "Enter"
        ) {
          sendSuperPrompt();
          return;
        }

        // esc : close
        if (
          !isComposing &&
          event.target !== document.activeElement &&
          event.key === "Escape"
        ) {
          superPromptDialog.style.display = "none";
          return;
        }
      });
    }

    // 如果只有兩個 class="fieldItem"，而且都是 textarea，高度再加大一些
    if (
      table.querySelectorAll(".fieldItem").length === 2 &&
      table.querySelectorAll("textarea.superPromptText").length === 2
    ) {
      const textareaElements = table.querySelectorAll(
        "textarea.superPromptText"
      );
      textareaElements.forEach((textarea) => {
        textarea.style = "width:100%;height:165px;";
      });
    }

    // 如果只有兩個 class="fieldItem"，其中一個是 textarea，高度再加兩倍
    if (
      table.querySelectorAll(".fieldItem").length === 2 &&
      table.querySelectorAll("textarea.superPromptText").length === 1
    ) {
      const textareaElements = table.querySelectorAll(
        "textarea.superPromptText"
      );
      textareaElements.forEach((textarea) => {
        textarea.style = "width:100%;height:380px;";
      });
    }

    // 如果 table 底下沒有任何元素，則將 superPromptPreviewArea max-height 設為 550px
    if (table.querySelectorAll(".fieldItem").length === 0) {
      superPromptPreviewArea.style.maxHeight = "570px";
    }else{ // 如果 table 底下有任何元素，則將 superPromptPreviewArea max-height 設為 165px
      superPromptPreviewArea.style.maxHeight = "165px"
    }

    addCompositionEventListener(".superPromptText");

    controlSuperDialogTabindex();

    if(table.querySelector(".superPromptText")){
      table.querySelector(".superPromptText").focus();
    }

  }

  function sendSuperPrompt(isInsert = false) {
    const table = document.querySelector("#superPromptTable");
    const superPromptTextList = table.querySelectorAll(".superPromptText");

    // 使用正規表達式搜尋 {{ 和 }} 之間的內容
    const matches = superPrompt.match(/{{\s*([^}]*)\s*}}/g) || [];

    // 移除重複的，但將 {{}} 是為獨立的一個
    const uniqueMatches = [];
    const countMap = {};

    for (const match of matches) {
      if (match === "{{}}") {
        uniqueMatches.push(match);
      } else {
        if (!countMap[match]) {
          countMap[match] = true;
          uniqueMatches.push(match);
        }
      }
    }

    let message = superPrompt;

    if (!message) {
      return;
    }

    if (!uniqueMatches) {
      superPromptDialog.style.display = "none";
      sendMessage(message, isInsert);
      return;
    }

    function escapeRegExp(string) {
      return string?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    let checkboxSet = new Set();
    let radioSet = new Set();

    let uniqueMatchesIndex = 0;

    for (let i = 0; i < superPromptTextList.length; i++) {
      const uniqueMatch = escapeRegExp(uniqueMatches[uniqueMatchesIndex]);
      const flag = uniqueMatch == escapeRegExp("{{}}") ? "" : "g";
      const regex = new RegExp(uniqueMatch, flag);
      let checkboxValue = "";
      // 如果是 checkbox
      if(superPromptTextList[i].type === "checkbox") {
        // 如果已經取得過，則跳過
        if(checkboxSet.has(superPromptTextList[i].name)) {
          continue;
        }
        // 取得所有的 checkbox value
        document.querySelectorAll(`[name="${superPromptTextList[i].name}"]`).forEach((checkbox,index) => {
          if(checkbox.checked) {
            checkboxValue += checkbox.value + ",";
          }
        });
        // 移除最後一個逗號
        checkboxValue = checkboxValue.slice(0, -1);
        message = message?.replace(regex, checkboxValue);
        // 加入已經取得過的 checkbox name
        checkboxSet.add(superPromptTextList[i].name);
        uniqueMatchesIndex++;
      }else if(superPromptTextList[i].type === "radio") { // 如果是 radio
        // 如果已經取得過，則跳過
        if(radioSet.has(superPromptTextList[i].name)) {
          continue;
        }
        // 取得 radio value
        let radioValue = "";
        document.querySelectorAll(`[name="${superPromptTextList[i].name}"]`).forEach((radio,index) => {
          if(radio.checked) {
            radioValue = radio.value;
          }
        });
        message = message?.replace(regex, radioValue);
        // 加入已經取得過的 radio name
        radioSet.add(superPromptTextList[i].name);
        uniqueMatchesIndex++;
      }else{ // 如果是 select 或 textarea，則取得 value
        message = message.replace(regex, superPromptTextList[i].value);
        uniqueMatchesIndex++;
      }
    }

    superPromptDialog.style.display = "none";
    sendMessage(message, isInsert);
  }

  superPromptDialogOkBtn.addEventListener("click", () => {
    sendSuperPrompt();
  });

  superPromptDialogInsertBtn.addEventListener("click", () => {
    sendSuperPrompt(true);
  });

  superPromptDialogCancelBtn.addEventListener("click", () => {
    superPromptDialog.style.display = "none";
  });

  editSuperPromptBtn.addEventListener("click", () => {
    if(supportOtherSite){return}
    superPromptDialog.style.display = "none";
    const { group, order } = findGroupAndIndex(superPromptId);
    showSuperPromptSettingDialog(group, order - 1);
  });

  // ------------ 超級樣板分類名稱 設定 ------------

  const placeholderPleaseInput = i18n("placeholder_please_input");

  function showSuperPromptCategoryNameSettingsDialog() {
    superPromptCategoryNameSettingsDialog.style.display = "flex";
    const superPromptCategoryNameListElement = document.getElementById(
      "superPromptCategoryNameList"
    );

    const superPromptCategoryNameInputs =
      superPromptCategoryNameListElement.querySelectorAll(
        ".superPromptCategoryNameInput"
      );

    superPromptCategoryNameInputs.forEach((input) => {
      input.remove();
    });

    let htmlStr = "";

    SuperPromptCategoryListLimit.forEach((_, index) => {
      htmlStr += `
      <input class="superPromptCategoryNameInput" tabindex="${
        index + 1
      }" class="btnTextInput" type="text" placeholder="${placeholderPleaseInput}" value="${
        superPromptCategoryList[index].name
      }">
    `;
    });

    superPromptCategoryNameListElement.innerHTML += htmlStr;

    superPromptCategoryNameSettingsDialog
      .querySelector(".superPromptCategoryNameInput")
      .focus();

    controlSuperPromptCategoryNameSettingsDialogTabindex();
  }

  function saveSuperPromptCategoryNameSettings() {
    const superPromptCategoryNameInputs =
      superPromptCategoryNameSettingsDialog.querySelectorAll(
        ".superPromptCategoryNameInput"
      );

    SuperPromptCategoryListLimit.forEach((_, index) => {
      superPromptCategoryList[index].name =
        superPromptCategoryNameInputs[index].value;
    });

    localStorage.setItem(
      "Custom.Settings.SuperPromptCategoryList",
      JSON.stringify(superPromptCategoryList)
    );

    resetCustomMenuItem();

    superPromptCategoryNameSettingsDialog.style.display = "none";
  }

  superPromptCategoryNameSettingsDialogOkBtn.addEventListener("click", () => {
    saveSuperPromptCategoryNameSettings();
  });

  superPromptCategoryNameSettingsDialogCancelBtn.addEventListener(
    "click",
    () => {
      superPromptCategoryNameSettingsDialog.style.display = "none";
    }
  );

  // ------------ 快速回覆設定視窗 ------------
  function showQuickReplySettingsDialog() {
    quickReplySettingsDialog.style.display = "flex";

    const quickReplyButtonTextElements = document.querySelectorAll(
      ".quickReplyButtonText"
    );
    const quickReplyMessageElements =
      document.querySelectorAll(".quickReplyMessage");

    const quickReplySlideElements =
      document.querySelectorAll(".quickReplySlide");

    quickReplyMessageList.forEach((settings, index) => {
      quickReplyButtonTextElements[index].value = settings.text;
      quickReplyMessageElements[index].value = settings.quickReplyMessage;
      quickReplySlideElements[index].checked = settings.isVisible;
      quickReplyMessageElements[index].style.height = "85px";
    });

    quickReplyButtonTextElements[0].focus();

    const draggingRow = quickReplySettingsDialog.querySelector('.dragging-row');

    if(draggingRow){
      draggingRow.classList.remove('dragging-row');
    }
    
    quickReplySettingsDialog.querySelectorAll('.drag-btn').forEach(btn => {
      btn.removeEventListener('mousedown', handleMouseDown);
      btn.removeEventListener('mouseup', handleMouseUp);
    });

    quickReplySettingsDialog.querySelectorAll('.drag-btn').forEach(btn => {
      btn.addEventListener('mousedown', handleMouseDown);
      btn.addEventListener('mouseup', handleMouseUp);
    });

  }

  function saveQuickReplySettings() {
    const quickReplyButtonTextElements = document.querySelectorAll(
      ".quickReplyButtonText"
    );
    const quickReplyMessageElements =
      document.querySelectorAll(".quickReplyMessage");

    const quickReplySlideElements =
      document.querySelectorAll(".quickReplySlide");

    const previousQuickReplyMessageList = JSON.parse(
      JSON.stringify(quickReplyMessageList)
    );

    quickReplyMessageList.forEach((settings, index) => {
      settings.text = quickReplyButtonTextElements[index].value;
      settings.quickReplyMessage = quickReplyMessageElements[index].value;
      settings.isVisible = quickReplySlideElements[index].checked;

      if (previousQuickReplyMessageList.isVisible) {
        settings.buttonElement.removeEventListener(
          "click",
          settings.handleClickFn
        );
        settings.buttonElement.remove();

        delete settings.buttonElement;
        delete settings.handleClickFn;
      }
    });

    localStorage.setItem(
      "Custom.Settings.QuickReply",
      JSON.stringify(quickReplyMessageList)
    );

    updateChromeStorage("Custom.Settings.QuickReply",quickReplyMessageList);

    generateButtons();

    quickReplySettingsDialog.style.display = "none";
    
  }

  quickReplySettingsDialogOkBtn.addEventListener("click", () => {
    saveQuickReplySettings();
  });

  quickReplySettingsDialogCancelBtn.addEventListener("click", () => {
    quickReplySettingsDialog.style.display = "none";
  });

  // ------------ 提示窗相關 ------------
  document.addEventListener("keydown", (event) => {
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "z"
    ) {
      shortcutKeyHintDialog.style.display = "flex";
      const templateButtonTextList = document.querySelectorAll(
        ".templateButtonText"
      );
      templateButtonTextList[0].textContent = promptList[0].text;
      templateButtonTextList[1].textContent = promptList[5].text;
      templateButtonTextList[2].textContent = promptList[1].text;
      templateButtonTextList[3].textContent = promptList[6].text;
      templateButtonTextList[4].textContent = promptList[2].text;
      templateButtonTextList[5].textContent = promptList[7].text;
      templateButtonTextList[6].textContent = promptList[3].text;
      templateButtonTextList[7].textContent = promptList[8].text;
      templateButtonTextList[8].textContent = promptList[4].text;
      templateButtonTextList[9].textContent = promptList[9].text;
      templateButtonTextList[10].textContent = quickReplyMessageList[0].text;
      templateButtonTextList[11].textContent = quickReplyMessageList[1].text;
      templateButtonTextList[12].textContent = quickReplyMessageList[2].text;
      templateButtonTextList[13].textContent = quickReplyMessageList[3].text;
      templateButtonTextList[14].textContent = quickReplyMessageList[4].text;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (
      (shortcutKeyHintDialog.style.display === "flex" &&
        event.key.toLocaleLowerCase() === "z") ||
      (shortcutKeyHintDialog.style.display === "flex" && event[mainKey])
    ) {
      shortcutKeyHintDialog.style.display = "none";
    }
  });

  // ------------ 匯出/匯入視窗相關 ------------
  function openExportAndImportDialog() {
    exportAndImportDialog.style.display = "flex";
  }

  exportAndImportDialogCancelBtn.addEventListener("click", () => {
    exportAndImportDialog.style.display = "none";
  });

  function downloadFile(data, filename, mimeType) {
    const blob = new Blob([data], { type: mimeType });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportSettingsBtn.addEventListener("click", () => {
    let now = new Date();
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let date = now.getDate().toString().padStart(2, "0");
    let hour = now.getHours().toString().padStart(2, "0");
    let minute = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");

    const fileName = i18n("export_file_name", [
      year,
      month,
      date,
      hour,
      minute,
      seconds,
    ]);

    const currentPromptSetting = JSON.parse(JSON.stringify(promptList));
    const currentSuperPromptSetting = JSON.parse(
      JSON.stringify(superPromptList)
    );
    const currentQuickReplyMessageList = JSON.parse(
      JSON.stringify(quickReplyMessageList)
    );

    currentPromptSetting.forEach((setting) => {
      delete setting.buttonElement;
      delete setting.handleClickFn;
    });

    currentSuperPromptSetting.forEach((setting) => {
      delete setting.buttonElement;
      delete setting.handleClickFn;
    });

    currentQuickReplyMessageList.forEach((setting) => {
      delete setting.buttonElement;
      delete setting.handleClickFn;
    });

    const jsonData = JSON.stringify(
      {
        settings: {
          prompt: currentPromptSetting,
          quickReply: currentQuickReplyMessageList,
          isHiddenMenu: localStorage.getItem("Custom.Settings.Menu.Hidden"),
          superPrompt: currentSuperPromptSetting,
          superPromptCategoryList: superPromptCategoryList,
        },
      },
      null,
      2
    );

    downloadFile(
      jsonData,
      `${fileName}.json`,
      "application/json;charset=utf-8;"
    );
  });

  importAllBtn.addEventListener("click", () => {
    importType = 0;
    importFileInput.click();
  });

  importOnlyPromptBtn.addEventListener("click", () => {
    importType = 1;
    importFileInput.click();
  });

  importOnlySuperPromptBtn.addEventListener("click", () => {
    importType = 3;
    importFileInput.click();
  });

  importOnlyQuickReplyBtn.addEventListener("click", () => {
    importType = 2;
    importFileInput.click();
  });

  resetSettingBtn.addEventListener("click", () => {
    const result = confirm(i18n("confirm_is_reset_system_settings"));

    if (result) {
      localStorage.setItem(
        "Custom.Settings.Prompt",
        JSON.stringify(defaultPromptList)
      );

      localStorage.setItem(
        "Custom.Settings.QuickReply",
        JSON.stringify(defaultQuickReplyMessageList)
      );

      localStorage.setItem(
        "Custom.Settings.SuperPrompt",
        JSON.stringify(defaultSuperPromptList)
      );

      localStorage.setItem(
        "Custom.Settings.SuperPromptCategoryList",
        JSON.stringify(defaultSuperPromptCategoryList)
      );

      promptList = JSON.parse(JSON.stringify(defaultPromptList));
      superPromptList = JSON.parse(JSON.stringify(defaultSuperPromptList));
      quickReplyMessageList = JSON.parse(
        JSON.stringify(defaultQuickReplyMessageList)
      );
      superPromptCategoryList = JSON.parse(
        JSON.stringify(defaultSuperPromptCategoryList)
      );

      resetCustomMenuItem();

      document.querySelector("#customKeywordInput").value = "";
      document.querySelector(".prompt-list-area").scrollTop = 0;

      generateButtons();

      alert(i18n("alert_reset_success"));
    }
  });

  function checkFileContent(obj) {
    let isValidated = true;

    try {
      if (!obj.hasOwnProperty("settings")) {
        isValidated = false;
      }

      if (!obj.settings.hasOwnProperty("isHiddenMenu")) {
        isValidated = false;
      }

      if (!obj.settings.hasOwnProperty("prompt")) {
        isValidated = false;
      } else {
        obj.settings.prompt.forEach((setting) => {
          if (
            !setting.hasOwnProperty("isVisible") ||
            typeof setting.isVisible !== "boolean"
          ) {
            isValidated = false;
          }
          if (
            !setting.hasOwnProperty("key") ||
            typeof setting.key !== "string"
          ) {
            isValidated = false;
          }
          if (
            !setting.hasOwnProperty("text") ||
            typeof setting.text !== "string"
          ) {
            isValidated = false;
          }
          if (
            !setting.hasOwnProperty("prefix") ||
            typeof setting.prefix !== "string"
          ) {
            isValidated = false;
          }
          if (
            !setting.hasOwnProperty("suffix") ||
            typeof setting.suffix !== "string"
          ) {
            isValidated = false;
          }
        });
      }

      if (!obj.settings.hasOwnProperty("quickReply")) {
        isValidated = false;
      } else {
        obj.settings.quickReply.forEach((setting) => {
          if (
            !setting.hasOwnProperty("isVisible") ||
            typeof setting.isVisible !== "boolean"
          ) {
            isValidated = false;
          }
          if (
            !setting.hasOwnProperty("key") ||
            typeof setting.key !== "string"
          ) {
            isValidated = false;
          }
          if (
            !setting.hasOwnProperty("text") ||
            typeof setting.text !== "string"
          ) {
            isValidated = false;
          }
          if (
            !setting.hasOwnProperty("quickReplyMessage") ||
            typeof setting.quickReplyMessage !== "string"
          ) {
            isValidated = false;
          }
        });
      }
      // ps: superPrompt 先不檢查
    } catch (error) {
      isValidated = false;
      console.log("error", error);
    }

    return isValidated;
  }

  function handleFileLoad(event) {
    try {
      const json = JSON.parse(event.target.result);

      if (!checkFileContent(json)) {
        importFileInput.value = "";
        alert(i18n("alert_import_error"));
        return;
      }

      let confirmMessage = "";

      switch (importType) {
        case 1:
          confirmMessage = i18n("confirm_is_import_only_prompt_template", [
            importFileInput.files[0].name,
          ]);
          break;

        case 2:
          confirmMessage = i18n("confirm_is_import_only_reply_message", [
            importFileInput.files[0].name,
          ]);
          break;

        case 3:
          confirmMessage = i18n(
            "confirm_is_import_only_super_prompt_template",
            [importFileInput.files[0].name]
          );
          break;

        default:
          confirmMessage = i18n("confirm_is_import_all", [
            importFileInput.files[0].name,
          ]);
          break;
      }

      const result = confirm(confirmMessage);

      if (result) {
        // 暫時不覆蓋 isHiddenMenu ，避免使用者誤會選單消失。
        // json.settings.isHiddenMenu === "Y"
        //   ? document.body.classList.add("hidden-template-buttons")
        //   : document.body.classList.remove("hidden-template-buttons");

        // 覆蓋問題樣板
        if (importType === 0 || importType === 1) {
          const previousPromptList = JSON.parse(JSON.stringify(promptList));

          promptList.forEach((setting, index) => {
            if (json.settings.prompt[index]) {
              setting.text = json.settings.prompt[index].text;
              setting.prefix = json.settings.prompt[index].prefix;
              setting.suffix = json.settings.prompt[index].suffix;
              setting.isVisible = json.settings.prompt[index].isVisible;

              if (previousPromptList.isVisible) {
                setting.buttonElement.removeEventListener(
                  "click",
                  setting.handleClickFn
                );
                setting.buttonElement.remove();

                delete setting.buttonElement;
                delete setting.handleClickFn;
              }
            }
          });

          localStorage.setItem(
            "Custom.Settings.Prompt",
            JSON.stringify(promptList)
          );
        }

        // 覆蓋快速回覆
        if (importType === 0 || importType === 2) {
          const previousQuickReplyMessageList = JSON.parse(
            JSON.stringify(quickReplyMessageList)
          );

          quickReplyMessageList.forEach((settings, index) => {
            if (json.settings.quickReply[index]) {
              settings.text = json.settings.quickReply[index].text;
              settings.quickReplyMessage =
                json.settings.quickReply[index].quickReplyMessage;
              settings.isVisible = json.settings.quickReply[index].isVisible;

              if (previousQuickReplyMessageList.isVisible) {
                settings.buttonElement.removeEventListener(
                  "click",
                  settings.handleClickFn
                );
                settings.buttonElement.remove();

                delete settings.buttonElement;
                delete settings.handleClickFn;
              }
            }
          });

          localStorage.setItem(
            "Custom.Settings.QuickReply",
            JSON.stringify(quickReplyMessageList)
          );
        }

        // 覆蓋超級樣板
        if (
          (importType === 0 &&
            json.settings.hasOwnProperty("superPrompt") &&
            json.settings.hasOwnProperty("superPromptCategoryList")) ||
          (importType === 3 &&
            json.settings.hasOwnProperty("superPrompt") &&
            json.settings.hasOwnProperty("superPromptCategoryList"))
        ) {
          const previousSuperPromptList = JSON.parse(
            JSON.stringify(superPromptList)
          );

          superPromptList.forEach((setting, index) => {
            if (json.settings.superPrompt[index]) {
              setting.text = json.settings.superPrompt[index].text;
              setting.prompt = json.settings.superPrompt[index].prompt;
              setting.isVisible = json.settings.superPrompt[index].isVisible;

              if (previousSuperPromptList.isVisible) {
                setting.buttonElement.removeEventListener(
                  "click",
                  setting.handleClickFn
                );
                setting.buttonElement.remove();

                delete setting.buttonElement;
                delete setting.handleClickFn;
              }
            }
          });

          localStorage.setItem(
            "Custom.Settings.SuperPrompt",
            JSON.stringify(superPromptList)
          );

          superPromptCategoryList.forEach((item, index) => {
            if (json.settings.superPromptCategoryList[index]) {
              item.name = json.settings.superPromptCategoryList[index].name;
            }
          });

          localStorage.setItem(
            "Custom.Settings.SuperPromptCategoryList",
            JSON.stringify(superPromptCategoryList)
          );

          resetCustomMenuItem();
        }

        document.querySelector("#customKeywordInput").value = "";
        document.querySelector(".prompt-list-area").scrollTop = 0;

        generateButtons();

        alert(i18n("alert_import_success"));

        importFileInput.value = "";
      } else {
        importFileInput.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  }

  importFileInput.addEventListener("change", () => {
    const file = importFileInput.files[0];
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(file);
  });

  // ------------ 建立右側按鈕 相關程式碼 ------------
  function createButton(
    textContent,
    btnColorClass = "success",
    title = "",
    isCollapseButton = false
  ) {
    let fontSize = "1rem";
    let width = "100%";
    let padding = "3px 5px 3px 10px";

    const button = document.createElement("button");
    button.classList.add(btnColorClass, "custom-template-buttons");
    button.textContent = textContent;
    button.title = title ? title : textContent;
    button.style.width = width;
    button.style.margin = "0 0 5px 0";
    button.style.color = "white";
    button.style.border = "none";
    button.style.padding = padding;
    button.style.fontSize = fontSize;
    button.style.cursor = "pointer";
    button.style.borderRadius = "5px";
    button.style.textAlign = "left";
    button.style.whiteSpace = "nowrap";
    button.style.overflow = "hidden";
    button.style.textOverflow = "ellipsis";

    if (isCollapseButton) {
      button.style.margin = "0 0 0 0";
      button.classList.add("menu-collapse-button");
      button.innerHTML = `
        <span style="margin-right:15px">${capitalizeFirstLetter(
          mainKeyText
        )} + A </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M32 96l320 0V32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32zM480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32H160v64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 64H480z"/></svg>
        `;
    }

    return button;
  }

  const PlaceholderKeywordInput = i18n("placeholder_keyword_input");
  const MENU_ITEM_DOWNLOAD_HTML = i18n("menu_item_download_html");

  let keywordInputValueTemp = "";
  let lastScrollPosition = 0;

  function generateButtons() {
    const findCustomMenu = document.querySelector(".custom-menu");

    if (
      document.querySelector("#customKeywordInput") &&
      document.querySelector("#customKeywordInput").value
    ) {
      keywordInputValueTemp = document.querySelector(
        "#customKeywordInput"
      ).value;
    } else {
      keywordInputValueTemp = "";
    }

    if (
      document.querySelector(".prompt-list-area") &&
      document.querySelector(".prompt-list-area").scrollTop
    ) {
      lastScrollPosition =
        document.querySelector(".prompt-list-area").scrollTop;
    } else {
      lastScrollPosition = 0;
    }

    if (findCustomMenu) {
      findCustomMenu.remove();
    }

    const menuDiv = document.createElement("div");
    menuDiv.classList.add("custom-menu");

    // search
    const searchBoxDiv = document.createElement("div");
    searchBoxDiv.classList.add("search-box");
    searchBoxDiv.innerHTML = `<input style="width:100%" tabindex="1" type="text" id="customKeywordInput" class="custom-keyword-input" placeholder="${PlaceholderKeywordInput}">`;

    let timerId;
    const inputBox = searchBoxDiv.querySelector("#customKeywordInput");

    inputBox.addEventListener("input", (event) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        const customTemplateButtons =
          document.querySelector(".prompt-list-area");

        customTemplateButtons.childNodes.forEach((customTemplateButton) => {
          if (event.target.value === "") {
            customTemplateButton.style.display = "block";
            return;
          }
          if (
            customTemplateButton.title
              .toLowerCase()
              .includes(event.target.value?.toLowerCase())
          ) {
            customTemplateButton.style.display = "block";
          } else {
            customTemplateButton.style.display = "none";
          }
        });
        controlCustomMenuTabindex();
      }, 300);
    });

    inputBox.addEventListener("focus", (event) => {
      restoreMenuItemTabindex();
    });

    const promptListDiv = document.createElement("div");
    promptListDiv.classList.add("prompt-list-area");

    const quickReplyDiv = document.createElement("div");
    quickReplyDiv.classList.add("quick-reply-area");

    const otherDiv = document.createElement("div");
    otherDiv.classList.add("other-area");

    menuDiv.appendChild(searchBoxDiv);
    menuDiv.appendChild(promptListDiv);
    menuDiv.appendChild(quickReplyDiv);
    menuDiv.appendChild(otherDiv);

    // 模版
    promptList.forEach((settings, index) => {
      if (!settings.isVisible) {
        return;
      }

      const button = createButton(`${settings.text}`);

      button.tabIndex = index + 2;

      const handleClick = () => {
        prefix = settings.prefix;
        suffix = settings.suffix;
        questionId = settings.key;
        showQuestionDialog();
      };

      button.addEventListener("click", handleClick);

      settings.buttonElement = button;
      settings.handleClickFn = handleClick;

      promptListDiv.appendChild(button);
    });

    // super 模版
    superPromptList.forEach((settings, index) => {
      if (!settings.isVisible || !settings.text || !settings.prompt) {
        return;
      }

      const { group } = findGroupAndIndex(settings.key);

      const button = createButton(
        `${settings.text}`,
        "warning",
        `${superPromptCategoryList[group - 1].name} \n #${settings.key} ${
          settings.text
        }`
      );

      button.tabIndex = index + 13;

      const handleClick = () => {
        superPromptId = settings.key;
        superPromptName = settings.text;
        superPrompt = settings.prompt;
        showSuperPromptDialog();
      };

      button.addEventListener("click", handleClick);

      settings.buttonElement = button;
      settings.handleClickFn = handleClick;

      promptListDiv.appendChild(button);
    });

    // 快速回覆按鈕
    quickReplyMessageList.forEach((settings) => {
      if (!settings.isVisible) {
        return;
      }

      const button = createButton(`${settings.text}`, "info");

      const handleClick = () => {
        if (settings.quickReplyMessage.trim()) {
          sendMessage(settings.quickReplyMessage);
        }
      };

      button.addEventListener("click", handleClick);

      settings.buttonElement = button;
      settings.handleClickFn = handleClick;

      quickReplyDiv.appendChild(button);
    });

    // 收合按鈕
    const menuCollapseButton = createButton("", "light", "", true);
    menuCollapseButton.addEventListener("click", () => {
      collapseToggle();
    });
    otherDiv.appendChild(menuCollapseButton);

    menuDiv.addEventListener("transitionend", function (event) {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      if (isMobile) {
        return;
      }
      if (localStorage.getItem("Custom.Settings.Menu.Hidden") === "N") {
        document.querySelector("#customKeywordInput").focus();
      }
    });

    if(supportOtherSite){
      menuDiv.style.visibility = "hidden";
    }

    menuDivElement = menuDiv;

    document.body.appendChild(menuDiv);

    controlCustomMenuTabindex();

    if (keywordInputValueTemp) {
      document.querySelector("#customKeywordInput").value =
        keywordInputValueTemp;
      document
        .querySelector("#customKeywordInput")
        .dispatchEvent(new Event("input", { bubbles: true }));
      keywordInputValueTemp = "";
    }

    if (lastScrollPosition) {
      document
        .querySelector(".prompt-list-area")
        .scrollTo(0, lastScrollPosition);
      lastScrollPosition = 0;
    }
  }

  generateButtons();

  // ------------ 監聽各式 composition 事件 ------------

  questionDialogTextarea.addEventListener("compositionstart", () => {
    isComposing = true;
  });

  questionDialogTextarea.addEventListener("compositionend", () => {
    isComposing = false;
  });

  [
    ".btnTextInput",
    ".prefixInput",
    ".suffixInput",
    ".quickReplyButtonText",
    ".quickReplyMessage",
    ".superPromptButtonText",
    ".superPromptText",
  ].forEach((queryName) => {
    addCompositionEventListener(queryName);
  });

  function addCompositionEventListener(queryName) {
    document.querySelectorAll(queryName).forEach((input) => {
      input.addEventListener("compositionstart", () => {
        isComposing = true;
      });
      input.addEventListener("compositionend", () => {
        isComposing = false;
      });
    });
  }

  // ------------ 控制視窗的焦點切換 ------------

  function handleTabindex(firstTabindexElement, lastTabindexElement, e) {
    if (e.key === "Tab" && !e.shiftKey) {
      if (document.activeElement === lastTabindexElement) {
        e.preventDefault();
        firstTabindexElement.focus();
      }
    } else if (e.key === "Tab" && e.shiftKey) {
      if (document.activeElement === firstTabindexElement) {
        e.preventDefault();
        lastTabindexElement.focus();
      }
    }
  }

  function controlQuestionDialogTabindex() {
    const questionDialogAllTabindexElements =
      questionDialog.querySelectorAll("textarea, button");
    const firstTabindexElement = questionDialogAllTabindexElements[0];
    const lastTabindexElement =
      questionDialogAllTabindexElements[
        questionDialogAllTabindexElements.length - 1
      ];

    questionDialog.addEventListener("keydown", function (e) {
      if (e.key === "Tab" && !e.shiftKey) {
        if (document.activeElement === lastTabindexElement) {
          e.preventDefault();
          firstTabindexElement.focus();
        }
      } else if (e.key === "Tab" && e.shiftKey) {
        if (document.activeElement === firstTabindexElement) {
          e.preventDefault();
          lastTabindexElement.focus();
        }
      }
    });
  }
  controlQuestionDialogTabindex();

  function controlSettingsDialogTabindex() {
    // tableForm tabindexElements
    let tableFormTabindexElements = settingsTableForm.querySelectorAll(
      "input, textarea, button"
    );

    tableFormTabindexElements = [
      ...tableFormTabindexElements,
      settingsDialogOkBtn,
      settingsDialogCancelBtn,
    ];

    const tableFormFirstTabindexElement = tableFormTabindexElements[0];
    const tableFormLastTabindexElement =
      tableFormTabindexElements[tableFormTabindexElements.length - 1];

    // settingsDialog keydown event
    settingsDialog.addEventListener("keydown", function (e) {
      if (e.key === "Tab" && !e.shiftKey) {
        if (document.activeElement === tableFormLastTabindexElement) {
          e.preventDefault();
          tableFormFirstTabindexElement.focus();
        }
      } else if (e.key === "Tab" && e.shiftKey) {
        if (document.activeElement === tableFormFirstTabindexElement) {
          e.preventDefault();
          tableFormLastTabindexElement.focus();
        }
      }
    });
  }
  controlSettingsDialogTabindex();

  function controlQuickReplySettingsDialogTabindex() {
    const quickReplySettingsDialogAllTabindexElements =
      quickReplySettingsDialog.querySelectorAll("input,textarea, button");
    const firstTabindexElement = quickReplySettingsDialogAllTabindexElements[0];
    const lastTabindexElement =
      quickReplySettingsDialogAllTabindexElements[
        quickReplySettingsDialogAllTabindexElements.length - 1
      ];

    quickReplySettingsDialog.addEventListener("keydown", function (e) {
      if (e.key === "Tab" && !e.shiftKey) {
        if (document.activeElement === lastTabindexElement) {
          e.preventDefault();
          firstTabindexElement.focus();
        }
      } else if (e.key === "Tab" && e.shiftKey) {
        if (document.activeElement === firstTabindexElement) {
          e.preventDefault();
          lastTabindexElement.focus();
        }
      }
    });
  }
  controlQuickReplySettingsDialogTabindex();

  let superPromptSettingsDialogBindTabindexHandler = null;

  function controlSuperPromptSettingsDialogTabindex() {
    let currentSuperPromptSettingsTableForm = superPromptSettingsTableForm;

    // tableForm tabindexElements
    let tableFormTabindexElements =
      currentSuperPromptSettingsTableForm.querySelectorAll(
        "input, textarea, button"
      );

    tableFormTabindexElements = [
      ...tableFormTabindexElements,
      superPromptSettingsDialogOkBtn,
      superPromptSettingsDialogCancelBtn,
    ];

    const firstTabindexElement = tableFormTabindexElements[0];
    const lastTabindexElement =
      tableFormTabindexElements[tableFormTabindexElements.length - 1];

    if (superPromptSettingsDialogBindTabindexHandler) {
      superPromptSettingsDialog.removeEventListener(
        "keydown",
        superPromptSettingsDialogBindTabindexHandler
      );
    }

    superPromptSettingsDialogBindTabindexHandler = handleTabindex.bind(
      null,
      firstTabindexElement,
      lastTabindexElement
    );

    superPromptSettingsDialog.addEventListener(
      "keydown",
      superPromptSettingsDialogBindTabindexHandler
    );
  }

  let superDialogTabindexBindTabindexHandler = null;

  function controlSuperDialogTabindex() {
    let superPromptDialogTabindexElements = superPromptDialog.querySelectorAll(
      "input, select ,textarea, button"
    );

    const allTabindexElements = [...superPromptDialogTabindexElements];

    const firstTabindexElement = allTabindexElements[0];
    const lastTabindexElement =
      allTabindexElements[allTabindexElements.length - 1];

    if (superDialogTabindexBindTabindexHandler) {
      superPromptDialog.removeEventListener(
        "keydown",
        superDialogTabindexBindTabindexHandler
      );
    }

    superDialogTabindexBindTabindexHandler = handleTabindex.bind(
      null,
      firstTabindexElement,
      lastTabindexElement
    );

    superPromptDialog.addEventListener(
      "keydown",
      superDialogTabindexBindTabindexHandler
    );
  }

  let superPromptCategoryNameSettingsDialogBindTabindexHandler = null;

  function controlSuperPromptCategoryNameSettingsDialogTabindex() {
    let superPromptCategoryNameSettingsDialogTabindexElements =
      superPromptCategoryNameSettingsDialog.querySelectorAll("input, button");

    const allTabindexElements = [
      ...superPromptCategoryNameSettingsDialogTabindexElements,
    ];

    const firstTabindexElement = allTabindexElements[0];
    const lastTabindexElement =
      allTabindexElements[allTabindexElements.length - 1];

    if (superPromptCategoryNameSettingsDialogBindTabindexHandler) {
      superPromptCategoryNameSettingsDialog.removeEventListener(
        "keydown",
        superPromptCategoryNameSettingsDialogBindTabindexHandler
      );
    }

    superPromptCategoryNameSettingsDialogBindTabindexHandler =
      handleTabindex.bind(null, firstTabindexElement, lastTabindexElement);

    superPromptCategoryNameSettingsDialog.addEventListener(
      "keydown",
      superPromptCategoryNameSettingsDialogBindTabindexHandler
    );
  }

  var controlCustomMenuTabindexHandler = null;

  function controlCustomMenuTabindex() {
    let allTabindexElements = [
      document.querySelector("#customKeywordInput"),
      ...document.querySelector(".prompt-list-area").querySelectorAll("button"),
    ];

    allTabindexElements = allTabindexElements.filter(
      (element) => element.style.display !== "none"
    );

    const firstTabindexElement = allTabindexElements[0];
    const lastTabindexElement =
      allTabindexElements[allTabindexElements.length - 1];

    if (controlCustomMenuTabindexHandler) {
      document
        .querySelector(".custom-menu")
        .removeEventListener("keydown", controlCustomMenuTabindexHandler);
    }

    controlCustomMenuTabindexHandler = handleTabindex.bind(
      null,
      firstTabindexElement,
      lastTabindexElement
    );

    document
      .querySelector(".custom-menu")
      .addEventListener("keydown", controlCustomMenuTabindexHandler);
  }

  // ------- 超級樣板拖拉排序 -------

  let draggedElement = null;

  superPromptSettingsDialog.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'TR' && e.target.classList.contains('dragging')) {
      draggedElement = e.target;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', '');
      setTimeout(() => e.target.classList.add('dragging-row'), 0);
    }
  });

  superPromptSettingsDialog.addEventListener('dragover', function(e) {
    e.preventDefault(); 
    e.dataTransfer.dropEffect = 'move';

    const target = e.target.closest('tr.customDragItem');

    if (target) {
      const rect = target.getBoundingClientRect();
      const relY = e.clientY - rect.top;
      if (relY < rect.height / 2) {
        target.classList.add('drag-over');
        target.classList.remove('drag-over-bottom');
      } else {
        target.classList.add('drag-over-bottom');
        target.classList.remove('drag-over');
      }
    }
    
    // 定義滾動速度和閾值
    const SCROLL_SPEED = 2;
    const SCROLL_THRESHOLD = 50;
    
    // 獲取滾動容器
    const scrollContainer = document.querySelector('#superTableFormContainer');
    
    // 獲取滾動容器的矩形信息
    const scrollContainerRect = scrollContainer.getBoundingClientRect();
    // 計算相對於文檔的絕對位置
    const scrollContainerTop = scrollContainerRect.top + window.scrollY;
    const scrollContainerBottom = scrollContainerRect.bottom + window.scrollY;
  
    // 檢查是否應該向上或向下滾動
    if (e.clientY < (scrollContainerTop + SCROLL_THRESHOLD)) {
      // 向上滾動
      scrollContainer.scrollTop -= SCROLL_SPEED;
    } else if (e.clientY > (scrollContainerBottom - SCROLL_THRESHOLD)) {
      // 向下滾動
      scrollContainer.scrollTop += SCROLL_SPEED;
    }
  });
  
  superPromptSettingsDialog.addEventListener('dragleave', function(e) {
    const target = e.target.closest('tr.customDragItem');
    if (target) {
      target.classList.remove('drag-over', 'drag-over-bottom');
    }
  });

  superPromptSettingsDialog.addEventListener('drop', function(e) {
    e.preventDefault();
    if (draggedElement) {
      const target = e.target.closest('tr.customDragItem');
      if (target) {
        target.classList.remove('drag-over', 'drag-over-bottom');
        const tbody = target.parentNode;
        const rects = target.getClientRects()[0];
        const isDropAbove = e.clientY < rects.top + rects.height / 2;
        if (isDropAbove) {
          tbody.insertBefore(draggedElement, target);
        } else {
          tbody.insertBefore(draggedElement, target.nextSibling);
        }
      }
      draggedElement.classList.remove('dragging-row');
      draggedElement = null;
      recalculateSupperSettingIndexes();
      setTimeout(() => {
        controlSuperPromptSettingsDialogTabindex();
      });
    }
  });

  function recalculateSupperSettingIndexes(){

    const allCustomDragItem = superPromptSettingsDialog.querySelectorAll('.customDragItem');

    const nowSuperPromptList = superPromptList.slice(
      (currentSuperSettingFormType - 1) * SuperPromptSettingsListLength,
      currentSuperSettingFormType * SuperPromptSettingsListLength
    );

    allCustomDragItem.forEach((item, index) => {
      const superPromptIdElement = item.querySelector('.superPromptId');
      superPromptIdElement.textContent = nowSuperPromptList[index].key;
      const inputElement = item.querySelector('.superPromptButtonText');
      inputElement.tabIndex = index * 2 + 1;
      const textareaElement = item.querySelector('.superPromptText');
      textareaElement.tabIndex = index * 2 + 2;
    });

  }

  superPromptSettingsDialog.addEventListener('dragend', function(e) {
    const trElements = superPromptSettingsDialog.querySelectorAll('.customDragItem');
    trElements.forEach((tr) => {
      tr.classList.remove('dragging-row', 'drag-over', 'drag-over-bottom' , 'dragging');
      tr.draggable = false;
    });
    draggedElement = null;
  });

  // -------- 快速回覆拖拉排序 --------

  let draggedQuickReplyElement = null;

  quickReplySettingsDialog.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'TR' && e.target.classList.contains('dragging')) {
      draggedQuickReplyElement = e.target;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', '');
      setTimeout(() => e.target.classList.add('dragging-row'), 0);
    }
  });

  quickReplySettingsDialog.addEventListener('dragover', function(e) {
    e.preventDefault(); 
    e.dataTransfer.dropEffect = 'move';

    const target = e.target.closest('tr.customDragItem');

    if (target) {
      const rect = target.getBoundingClientRect();
      const relY = e.clientY - rect.top;
      if (relY < rect.height / 2) {
        target.classList.add('drag-over');
        target.classList.remove('drag-over-bottom');
      } else {
        target.classList.add('drag-over-bottom');
        target.classList.remove('drag-over');
      }
    }
    
    // 定義滾動速度和閾值
    const SCROLL_SPEED = 2;
    const SCROLL_THRESHOLD = 50;
    
    // 獲取滾動容器
    const scrollContainer = document.querySelector('#quickReplyFormContainer');
    
    // 獲取滾動容器的矩形信息
    const scrollContainerRect = scrollContainer.getBoundingClientRect();
    // 計算相對於文檔的絕對位置
    const scrollContainerTop = scrollContainerRect.top + window.scrollY;
    const scrollContainerBottom = scrollContainerRect.bottom + window.scrollY;
  
    // 檢查是否應該向上或向下滾動
    if (e.clientY < (scrollContainerTop + SCROLL_THRESHOLD)) {
      // 向上滾動
      scrollContainer.scrollTop -= SCROLL_SPEED;
    } else if (e.clientY > (scrollContainerBottom - SCROLL_THRESHOLD)) {
      // 向下滾動
      scrollContainer.scrollTop += SCROLL_SPEED;
    }
  });

  quickReplySettingsDialog.addEventListener('dragleave', function(e) {
    const target = e.target.closest('tr.customDragItem');
    if (target) {
      target.classList.remove('drag-over', 'drag-over-bottom');
    }
  });

  quickReplySettingsDialog.addEventListener('drop', function(e) {
    e.preventDefault();
    if (draggedQuickReplyElement) {
      const target = e.target.closest('tr.customDragItem');
      if (target) {
        target.classList.remove('drag-over', 'drag-over-bottom');
        const tbody = target.parentNode;
        const rects = target.getClientRects()[0];
        const isDropAbove = e.clientY < rects.top + rects.height / 2;
        if (isDropAbove) {
          tbody.insertBefore(draggedQuickReplyElement, target);
        } else {
          tbody.insertBefore(draggedQuickReplyElement, target.nextSibling);
        }
      }
      draggedQuickReplyElement.classList.remove('dragging-row');
      draggedQuickReplyElement = null;
      recalculateQuickReplyIndexes();
      setTimeout(() => {
        controlQuickReplySettingsDialogTabindex();
      });
    }
  });

  function recalculateQuickReplyIndexes(){

    const allCustomDragItem = quickReplySettingsDialog.querySelectorAll('.customDragItem');

    allCustomDragItem.forEach((item, index) => {
      const inputElement = item.querySelector('.quickReplyButtonText');
      inputElement.tabIndex = index * 2 + 1;
      const textareaElement = item.querySelector('.quickReplyMessage');
      textareaElement.tabIndex = index * 2 + 2;
    });

  }

  quickReplySettingsDialog.addEventListener('dragend', function(e) {
    const trElements = quickReplySettingsDialog.querySelectorAll('.customDragItem');
    trElements.forEach((tr) => {
      tr.classList.remove('dragging-row', 'drag-over', 'drag-over-bottom' , 'dragging');
      tr.draggable = false;
    });
    draggedQuickReplyElement = null;
  });

})();

},time);
