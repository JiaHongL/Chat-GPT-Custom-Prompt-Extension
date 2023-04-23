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
    key: "6",
    text: "整理重點",
    prefix:
      "你現在是個閱讀專家，請幫我整理下面文章的重點，使用條列方式，列出 10 點，最後給出一個總結：\n\n",
    suffix: "\n\n，請使用繁體中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "7",
    text: "研究報告",
    prefix: "寫一篇有關",
    suffix:
      "的 300 字研究報告，報告中需引述最新的研究，並引用專家觀點，請使用繁體中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "8",
    text: "文字修飾",
    prefix: "請幫我修飾以下敘述，符合台灣用語，且輕鬆活潑。\n\n",
    suffix: "",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "9",
    text: "問題建議",
    prefix: "我遇到以下問題：\n",
    suffix: "\n請幫我想出解決方式或替代方案，並使用繁體中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "10",
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
    key: "6",
    text: "ポイント整理",
    prefix:
      "あなたは読書の専門家です。以下の文章のポイントを整理して、リスト形式で10項目を列挙し、最後に総括を行ってください：\n\n",
    suffix: "\n\n、日本語で回答してください。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "7",
    text: "研究報告",
    prefix: "300字の、",
    suffix:
      "に関する研究報告を書いてください。報告中には、最新の研究を引用し、専門家の意見を引用する必要があります。回答には日本語を使用してください。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "8",
    text: "文字修飾",
    prefix: "以下の文章を、軽快で楽しげな日本語に修飾してください。\n\n",
    suffix: "",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "9",
    text: "問題建議",
    prefix: "以下の問題が発生しています。\n",
    suffix: "\n解決策または代替案を考えて、回答には日本語を使用してください。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "10",
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
    key: "6",
    text: "Summarize",
    prefix:
      "You are a reading expert, please help me summarize the following article in bullet points. Please list 10 points and provide a conclusion:\n\n",
    suffix: "\n\nPlease answer in English.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "7",
    text: "Research Report",
    prefix: "Write a 300-word research report on ",
    suffix:
      ", citing the latest research and expert opinions. Please answer in English.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "8",
    text: "Text Modification",
    prefix:
      "Please help me modify the following statement to make it more lively and in American English:\n\n",
    suffix: "",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "9",
    text: "Problem Suggestion",
    prefix: "I'm having the following problem:\n",
    suffix:
      "\nPlease help me come up with a solution or alternative, and answer in English.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "10",
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
    key: "6",
    text: "整理重点",
    prefix:
      "你现在是个阅读专家，请帮我整理下面文章的重点，使用条列方式，列出10点，最后给出一个总结：\n\n",
    suffix: "\n\n，请使用简体中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "7",
    text: "研究报告",
    prefix: "写一篇有关",
    suffix:
      "的300字研究报告，报告中需引述最新的研究，并引用专家观点，请使用简体中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "8",
    text: "文字修饰",
    prefix: "请帮我修饰以下叙述，符合中文用语，且轻松活泼。\n\n",
    suffix: "",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "9",
    text: "问题建议",
    prefix: "我遇到以下问题：\n",
    suffix: "\n请帮我想出解决方式或替代方案，并使用简体中文回答。",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "10",
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
    key: "6",
    text: "요약 정리",
    prefix:
      "당신은 지금 독서 전문가입니다. 다음 글의 요점을 정리하여 10개의 항목으로 나열하고 마지막에 요약을 제시해주세요.\n\n",
    suffix: "\n\n, 한국어로 답변해주세요.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "7",
    text: "연구 보고서",
    prefix: "",
    suffix:
      "에 관한 300자 분량의 연구 보고서를 작성해주세요. 최신 연구를 인용하고 전문가의 의견을 인용해야 합니다. 한국어로 답변해주세요.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "8",
    text: "글 수정",
    prefix:
      "다음 글을 한국식 표현으로 수정하여, 쉽고 재미있게 표현해주세요.\n\n",
    suffix: "",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "9",
    text: "문제 제안",
    prefix: "다음과 같은 문제가 발생했습니다:\n",
    suffix:
      "\n문제를 해결하거나 대체할 수 있는 방법을 생각하여, 한국어로 답변해주세요.",
    buttonElement: null,
    handleClickFn: null,
    isVisible: true,
  },
  {
    key: "10",
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
const defaultQuickReplyMessageListTW = [
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

const defaultQuickReplyMessageListJA = [
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

const defaultQuickReplyMessageListEN = [
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

const defaultQuickReplyMessageListCN = [
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

const defaultQuickReplyMessageListKO = [
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

(() => {
  "use strict";

  // 系統判別 && 主按鍵 && 按鍵文字
  const userAgent = navigator.userAgent;

  const isMac = userAgent.indexOf("Mac") !== -1;

  const mainKey = isMac ? "ctrlKey" : "altKey";
  const mainKeyText = isMac ? "control" : "alt";

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function i18n(key, params = []) {
    return chrome.i18n.getMessage(key, params);
  }

  function setDefaultList() {
    const locale = chrome.i18n.getUILanguage();

    switch (locale) {

      case "zh-TW":
        defaultPromptList = defaultPromptListTW;
        defaultQuickReplyMessageList = defaultQuickReplyMessageListTW;
        break;

      case "ja":
        defaultPromptList = defaultPromptListJA;
        defaultQuickReplyMessageList = defaultQuickReplyMessageListJA;
        break;

      case "zh-CN":
        defaultPromptList = defaultPromptListCN;
        defaultQuickReplyMessageList = defaultQuickReplyMessageListCN;
        break;

      case "ko":
        defaultPromptList = defaultPromptListKO;
        defaultQuickReplyMessageList = defaultQuickReplyMessageListKO;
        break;

      default:
        defaultPromptList = defaultPromptListEN;
        defaultQuickReplyMessageList = defaultQuickReplyMessageListEN;
        break;

    }

  }

  // css style
  const styles = `
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
          padding: 20px;
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
          margin-bottom: 20px;
          color:black;
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
      }
      .footer .buy-me-a-coffee {
        position: absolute;
        right: 0;
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
      .center {
          display: flex;
          justify-content: center;
          align-items: center;
      }
      .my-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
      }
      .my-table th, td {
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
      #dialog3 .my-table th, td {
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
      .dark .shortcut-content {
          color: #d1d5db !important;
      }
      .hidden-template-buttons .custom-menu{
          display: none;
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
      .custom-menu {
        position: fixed;
        top:50px;
        right:2px;
        padding-right:4px;
        z-index: 1000;
        height:90vh;
        max-height:700px;
        overflow-y: auto;
        overflow-x: hidden;

        display:flex;
        flex-direction: column;
        min-width:160px;

      }
      .slide-checkbox {
        width: 80px;
        height: 26px;
        background: #333;
        margin: 20px auto;
        position: relative;
        border-radius: 50px;
        box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
      }
      .slide-checkbox:after {
        content: 'OFF';
        color: #000;
        position: absolute;
        right: 10px;
        z-index: 0;
        font: 12px/26px Arial, sans-serif;
        font-weight: bold;
        text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.15);
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
        width: 34px;
        height: 20px;
        cursor: pointer;
        position: absolute;
        top: 3px;
        left: 3px;
        z-index: 1;
        background: #fcfff4;
        background: linear-gradient(to bottom, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
        border-radius: 50px;
        transition: all 0.4s ease;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
      }
      .slide-checkbox input[type=checkbox] {
        visibility: hidden !important;
      }
      .slide-checkbox input[type=checkbox]:checked + label {
        left: 43px !important;
      }
      `;

  // 插入 style
  const styleEl = document.createElement("style");
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  // 提問視窗 HTML
  const dialogHTML = `
      <div id="dialog" class="dialog-wrapper" style="display;none">
          <div class="dialog" style="max-width: 965px;">
              <div id="questionPreviewArea"></div>
              <textarea id="dialog-textarea" class="question-textarea" tabindex="1" placeholder="${i18n(
                "placeholder_prompt_textarea"
              )}"></textarea>
              <div class="center">
                  <button id="dialog-ok" class="primary" tabindex="2">${i18n(
                    "button_send"
                  )} ( ${mainKeyText} + s )</button>
                  <button id="dialog-cancel" class="secondary" tabindex="3">${i18n(
                    "button_cancel"
                  )} ( esc )</button>
              </div>
          </div>
      </div>
  `;

  // 設定模版的表單視窗 HTML
  const formDialogHTML = `
    <div id="dialog2" class="dialog-wrapper" style="display:none">

      <div class="dialog" style="max-width: 95%;">

        <table id="table-form" class="my-table">
          <tr>
            <th style="width:118px">${i18n("table_title_shortcut")}</th>
            <th style="width:160px">${i18n("table_title_button_name")}</th>
            <th>${i18n("table_title_prefix_text")}</th>
            <th>${i18n("table_title_suffix_text")}</th>
            <th style="width:118px">${i18n("table_title_is_show")}</th>
          </tr>

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
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox" name="check"  />
                <label for="slideCheckbox"></label>
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
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox2" name="check"  />
                <label for="slideCheckbox2"></label>
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
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox3" name="check"  />
                <label for="slideCheckbox3"></label>
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
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox4" name="check"  />
                <label for="slideCheckbox4"></label>
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
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox5" name="check"  />
                <label for="slideCheckbox5"></label>
              </div>
            </td>
          </tr>

        </table>

        <table id="table-form2" class="my-table" style="width:100%">
          <tr>
            <th style="width:118px">${i18n("table_title_shortcut")}</th>
            <th style="width:160px">${i18n("table_title_button_name")}</th>
            <th>${i18n("table_title_prefix_text")}</th>
            <th>${i18n("table_title_suffix_text")}</th>
            <th style="width:118px">${i18n("table_title_is_show")}</th>
          </tr>

          <tr>
            <td>
              <div class="shortcut-wrapper">
                <span class="shortcut-content"> ${capitalizeFirstLetter(
                  mainKeyText
                )} + 6 </span>
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
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox6" name="check"  />
                <label for="slideCheckbox6"></label>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div class="shortcut-wrapper">
                <span class="shortcut-content"> ${capitalizeFirstLetter(
                  mainKeyText
                )} + 7 </span>
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
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox7" name="check"  />
                <label for="slideCheckbox7"></label>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div class="shortcut-wrapper">
                <span class="shortcut-content"> ${capitalizeFirstLetter(
                  mainKeyText
                )} + 8 </span>
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
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox8" name="check"  />
                <label for="slideCheckbox8"></label>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div class="shortcut-wrapper">
                <span class="shortcut-content"> ${capitalizeFirstLetter(
                  mainKeyText
                )} + 9 </span>
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
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox9" name="check"/>
                <label for="slideCheckbox9"></label>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div class="shortcut-wrapper">
                <span class="shortcut-content"> ${capitalizeFirstLetter(
                  mainKeyText
                )} + 0 </span>
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
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox10" name="check"/>
                <label for="slideCheckbox10"></label>
              </div>
            </td>
          </tr>
          
        </table>

        <div class="footer" class="center">
          <button tabindex="16" id="dialog2-ok" class="primary">${i18n(
            "button_save"
          )} ( ${mainKeyText} + s )</button>
          <button tabindex="17" id="dialog2-cancel" class="secondary">${i18n(
            "button_cancel"
          )} ( esc ) </button>
          <div class="buy-me-a-coffee">
            <a href="https://www.buymeacoffee.com/Joe.lin" target="_blank">
              <img style="scale: 0.9;" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee !!&emoji=&slug=Joe.lin&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff?${new Date().getTime()}" />
            </a>
          </div>
        </div>

      </div>

    </div>
    `;

  // 快捷鍵提示視窗 HTML
  const keyboardShortcutHTML = `
  <div id="dialog3" class="dialog-wrapper" style="display;none">
  <div class="dialog" style="max-width:1300px">
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
          <div class="ellipsis">${i18n("shortcut_key_tips_B")}</div>
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
          <div class="ellipsis">${i18n("shortcut_key_tips_G")}</div>
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
          <div class="ellipsis">${i18n("shortcut_key_tips_D")}</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + W </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">${i18n("shortcut_key_tips_W")}</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + S </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">${i18n("shortcut_key_tips_S2")}</div>
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
          <div class="ellipsis">${i18n("shortcut_key_tips_N")}</div>
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
          <div class="templateButtonText ellipsis"></div>
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
          <div class="ellipsis">${i18n("shortcut_key_tips_M")}</div>
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
          <div class="templateButtonText ellipsis"></div>
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
          <div class="ellipsis">${i18n("shortcut_key_tips_C")}</div>
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
          <div class="templateButtonText ellipsis"></div>
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
          <div class="ellipsis">${i18n("shortcut_key_tips_X")}</div>
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
          <div class="templateButtonText ellipsis"></div>
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
          <div class="ellipsis">${i18n("shortcut_key_tips_R")}</div>
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
          <div class="templateButtonText ellipsis"></div>
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
          <div class="ellipsis">${i18n("shortcut_key_tips_E")}</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + Y </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + U </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
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
          <div class="templateButtonText ellipsis"></div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + O </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + P </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
      </tr>

    </table>
  </div>
</div>
  `;

  // 快速回覆 HTML
  const quickReplyHTML = `
  <div id="dialog4" class="dialog-wrapper" style="display:none">

    <div class="dialog" style="max-width: 60%;">

      <table class="my-table" style="width:100%">

        <tr>
          <th style="width:118px">${i18n("table_title_shortcut")}</th>
          <th style="width:160px">${i18n("table_title_button_name")}</th>
          <th>${i18n("table_title_replay_message")}</th>
          <th style="width:118px">${i18n("table_title_is_show")}</th>
        </tr>

        <tr>
          <td>
            <div class="shortcut-wrapper">
              <span class="shortcut-content"> ${capitalizeFirstLetter(
                mainKeyText
              )} + Y </span>
            </div>
          </td>
          <td><input tabindex="1" class="quickReplyButtonText" type="text" placeholder="${i18n(
            "placeholder_please_input"
          )}"></td>
          <td>
            <div class="center">
              <textarea style="width:100%" tabindex="2" class="quickReplyMessage" placeholder="${i18n(
                "placeholder_please_input"
              )}"></textarea>
            </div>
          </td>
          <td>
            <div class="slide-checkbox">  
              <input class="quickReplySlide" type="checkbox" value="true" id="slideCheckbox11" name="check"/>
              <label for="slideCheckbox11"></label>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="shortcut-wrapper">
              <span class="shortcut-content"> ${capitalizeFirstLetter(
                mainKeyText
              )} + U </span>
            </div>
          </td>
          <td><input tabindex="3" class="quickReplyButtonText" type="text" placeholder="${i18n(
            "placeholder_please_input"
          )}"></td>
          <td>
            <div class="center">
              <textarea style="width:100%" tabindex="4" class="quickReplyMessage" placeholder="${i18n(
                "placeholder_please_input"
              )}"></textarea>
            </div>
          </td>
          <td>
            <div class="slide-checkbox">  
              <input class="quickReplySlide" type="checkbox" value="true" id="slideCheckbox12" name="check"/>
              <label for="slideCheckbox12"></label>
            </div>
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
          <td><input tabindex="5" class="quickReplyButtonText" type="text" placeholder="${i18n(
            "placeholder_please_input"
          )}"></td>
          <td>
            <div class="center">
              <textarea style="width:100%" tabindex="6" class="quickReplyMessage" placeholder="${i18n(
                "placeholder_please_input"
              )}"></textarea>
            </div>
          </td>
          <td>
            <div class="slide-checkbox">  
              <input class="quickReplySlide" type="checkbox" value="true" id="slideCheckbox13" name="check"/>
              <label for="slideCheckbox13"></label>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="shortcut-wrapper">
              <span class="shortcut-content"> ${capitalizeFirstLetter(
                mainKeyText
              )} + O </span>
            </div>
          </td>
          <td><input tabindex="7" class="quickReplyButtonText" type="text" placeholder="${i18n(
            "placeholder_please_input"
          )}"></td>
          <td>
            <div class="center">
              <textarea style="width:100%" tabindex="8" class="quickReplyMessage" placeholder="${i18n(
                "placeholder_please_input"
              )}"></textarea>
            </div>
          </td>
          <td>
            <div class="slide-checkbox">  
              <input class="quickReplySlide" type="checkbox" value="true" id="slideCheckbox14" name="check"/>
              <label for="slideCheckbox14"></label>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="shortcut-wrapper">
              <span class="shortcut-content"> ${capitalizeFirstLetter(
                mainKeyText
              )} + P </span>
            </div>
          </td>
          <td><input tabindex="9" class="quickReplyButtonText" type="text" placeholder="${i18n(
            "placeholder_please_input"
          )}"></td>
          <td>
            <div class="center">
              <textarea style="width:100%" tabindex="10" class="quickReplyMessage" placeholder="${i18n(
                "placeholder_please_input"
              )}"></textarea>
            </div>
          </td>
          <td>
            <div class="slide-checkbox">  
              <input class="quickReplySlide" type="checkbox" value="true" id="slideCheckbox15" name="check"/>
              <label for="slideCheckbox15"></label>
            </div>
          </td>
        </tr>
      
      </table>

      <div class="footer" class="center">
        <button tabindex="11" id="dialog4-ok" class="primary">${i18n(
          "button_save"
        )} ( ${mainKeyText} + s )</button>
        <button tabindex="12" id="dialog4-cancel" class="secondary">${i18n(
          "button_cancel"
        )} ( esc ) </button>
        <div class="buy-me-a-coffee">
          <a href="https://www.buymeacoffee.com/Joe.lin" target="_blank">
            <img style="scale: 0.9;" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee !!&emoji=&slug=Joe.lin&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff?${new Date().getTime()}" />
          </a>
        </div>
      </div>
  </div>

</div>  
  `;

  // 匯出匯入視窗 HTML
  const exportAndImportHTML = `
    <div id="dialog5" class="dialog-wrapper" style="display:none">

      <div class="dialog" style="max-width:750px;">

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
                <button id="importAll" class="primary">${i18n(
                  "button_import_all"
                )}</button>
                <button id="importPrompt" class="primary">${i18n(
                  "button_import_only_prompt"
                )}</button>
                <button id="importQuickReply" class="primary" style="margin-right:0px">${i18n(
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
          <div class="buy-me-a-coffee">
            <a href="https://www.buymeacoffee.com/Joe.lin" target="_blank">
              <img style="scale: 0.9;" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee !!&emoji=&slug=Joe.lin&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff?${new Date().getTime()}" />
            </a>
          </div>
        </div>
    </div>

  </div>    
  `;

  // 插入 HTML 元素
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

  // Question
  const questionDialog = document.getElementById("dialog");
  const questionPreviewAreaDiv = document.getElementById("questionPreviewArea");
  const questionDialogTextarea = document.querySelector("#dialog-textarea");
  const questionDialogOkBtn = document.querySelector("#dialog-ok");
  const questionDialogCancelBtn = document.querySelector("#dialog-cancel");

  let prefix = "";
  let suffix = "";

  // Settings
  const settingsDialog = document.getElementById("dialog2");
  const settingsDialogOkBtn = document.querySelector("#dialog2-ok");
  const settingsDialogCancelBtn = document.querySelector("#dialog2-cancel");
  const settingsTableForm = settingsDialog.querySelector("#table-form");
  const settingsTableForm2 = settingsDialog.querySelector("#table-form2");

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
  const importOnlyQuickReplyBtn = document.getElementById("importQuickReply");
  const resetSettingBtn = document.getElementById("resetSetting");
  const exportAndImportDialogCancelBtn =
    document.getElementById("dialog5-cancel");

  const importFileInput = document.getElementById("importFileInput");

  // other
  let intervalID = null;
  let modeBtn = null;

  let isComposing = false;

  /** 1:form or 2:form2 */
  let currentSettingFormType;

  /** 0:all or 1:prompt or 2:quickReply */
  let importType;

  // promptList / quickReply
  let defaultPromptList = [];

  let promptList = [];

  let defaultQuickReplyMessageList = [];

  let quickReplyMessageList = [];

  setDefaultList();

  // 開關選單的選項加在右側

  let mutationTimer = null;

  function addCustomLeftMenuItem() {
    try {
      const customATagEl = document.createElement("a");
      customATagEl.classList.add(
        "flex",
        "py-3",
        "px-3",
        "items-center",
        "gap-3",
        "rounded-md",
        "hover:bg-gray-500/10",
        "transition-colors",
        "duration-200",
        "text-white",
        "cursor-pointer",
        "text-sm"
      );

      const switchMenuDiv = document.createElement("div");
      switchMenuDiv.style = "width:100%";
      switchMenuDiv.innerHTML = `    
        <div class="flex items-center">
          <svg style="height:16px;width:16px;margin-right: 12px;fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128v64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9V128c0-16.8-12.9-30.5-29.3-31.9zM336 144v16c0 53-43 96-96 96H208c-53 0-96-43-96-96V144c0-26.5 21.5-48 48-48H288c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512H128V448c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64l98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16v48h32V464c0-8.8-7.2-16-16-16zm96 32a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></svg>
          <div class="flex-1" style="margin-right:5px">${i18n("nav_menu_help_menu")}</div>
          <div class="slide-checkbox" style="margin: 0 0 0 0">  
            <input type="checkbox" value="true" id="switchMenu" name="check"/>
            <label for="switchMenu"></label>
          </div>
        </div>
      `;

      customATagEl.appendChild(switchMenuDiv);
      const nav = document.querySelector("nav.flex");
      nav.insertBefore(customATagEl, nav.children[2]);

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
        "flex",
        "py-3",
        "px-3",
        "items-center",
        "gap-3",
        "rounded-md",
        "hover:bg-gray-500/10",
        "transition-colors",
        "duration-200",
        "text-white",
        "cursor-pointer",
        "text-sm"
      );

      const menuItemDiv = document.createElement("div");
      menuItemDiv.innerHTML = `    
        <div id="downloadChatPDF" class="flex items-center justify-between">
          <svg style="height:16px;width:16px;margin-right: 12px;fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z"/></svg>
          <div>${i18n("nav_item_download_message_html")}</div>
        </div>
      `;

      customATagEl.appendChild(menuItemDiv);
      const nav = document.querySelector("nav.flex");
      nav.insertBefore(customATagEl, nav.children[3]);

      downloadChatPDF.addEventListener("click", () => {
        const container =
          document.querySelector("main")?.children[0].children[0].children[0];
        const clonedContainer = container.cloneNode(true);
        const avatarList = clonedContainer.querySelectorAll("img.rounded-sm");
        const buttons = clonedContainer.querySelectorAll("button");

        avatarList.forEach((avatar) => {
          const originalElement = avatar;
          const newElement = document.createElement("div");
          newElement.innerHTML =
            '<svg style="height:30px;width:30px;fill: #5A7DAB;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128v64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9V128c0-16.8-12.9-30.5-29.3-31.9zM336 144v16c0 53-43 96-96 96H208c-53 0-96-43-96-96V144c0-26.5 21.5-48 48-48H288c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512H128V448c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64l98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16v48h32V464c0-8.8-7.2-16-16-16zm96 32a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></svg>';
          const parentElement = originalElement.parentNode;
          while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
          }
          parentElement.appendChild(newElement);
        });

        buttons.forEach((button) => {
          button.remove();
        });

        const html = clonedContainer.outerHTML;
        const styles = Array.from(document.styleSheets)
          .filter(
            (styleSheet) =>
              !styleSheet.href ||
              styleSheet.href.startsWith(window.location.origin)
          )
          .map((styleSheet) =>
            Array.from(styleSheet.cssRules)
              .map((rule) => rule.cssText)
              .join("\n")
          )
          .join("\n");
        const blob = new Blob(
          [
            `<!DOCTYPE html>\n<html>\n<head>\n<style>\n${styles}\n</style>\n</head>\n<body>\n${html}\n</body>\n</html>`,
          ],
          { type: "text/html" }
        );
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = document.title + ".html";
        document.body.appendChild(a);
        a.click();
      });
    } catch (error) {
      console.log(error);
    }
  }

  function subscribeMutationObserver() {
    // 取得要監聽的 DOM 元素
    var targetNode = document.body;

    // 設定 MutationObserver
    var observer = new MutationObserver(function (mutations) {
      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(function () {
        if (
          document.querySelector("nav.flex") &&
          !document.getElementById("switchMenu")
        ) {
          addCustomLeftMenuItem();
          addCustomLeftMenuItem2();
        }
      }, 0);
    });

    // 開始監聽 DOM 變動
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(targetNode, config);
  }
  subscribeMutationObserver();

  // 初始化
  function init() {
    questionDialog.style.display = "none";
    settingsDialog.style.display = "none";
    shortcutKeyHintDialog.style.display = "none";
    exportAndImportDialog.style.display = "none";

    if (!localStorage.getItem("Custom.Settings.Prompt")) {
      localStorage.setItem(
        "Custom.Settings.Prompt",
        JSON.stringify(defaultPromptList)
      );
    }

    if (!localStorage.getItem("Custom.Settings.QuickReply")) {
      localStorage.setItem(
        "Custom.Settings.QuickReply",
        JSON.stringify(defaultQuickReplyMessageList)
      );
    }

    if (localStorage.getItem("Custom.Settings.Menu.Hidden") === null) {
      localStorage.setItem("Custom.Settings.Menu.Hidden", "N");
    }

    localStorage.getItem("Custom.Settings.Menu.Hidden") === "Y"
      ? document.body.classList.add("hidden-template-buttons")
      : document.body.classList.remove("hidden-template-buttons");

    promptList = JSON.parse(localStorage.getItem("Custom.Settings.Prompt"));

    quickReplyMessageList = JSON.parse(
      localStorage.getItem("Custom.Settings.QuickReply")
    );
  }
  init();

  function findModeBtn() {
    intervalID = setInterval(function () {
      if (document.querySelector("[data-headlessui-state]")) {
        modeBtn = document.querySelector("[data-headlessui-state]");
        clearInterval(intervalID);
      }
    }, 200);
  }

  findModeBtn();

  function findModeOptionAndClick(textContent) {
    clearInterval(intervalID);
    intervalID = setInterval(function () {
      const option = Array.from(
        document.querySelectorAll('[role="option"]')
      ).find((element) => element.textContent.includes(textContent));
      if (option) {
        option?.click();
        clearInterval(intervalID);
      }
    }, 250);
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

  // ------------ shortcutKey event handle ------------
  document.addEventListener("keydown", function (event) {
    // z 或 mainKey : 關閉 快捷鍵視窗
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

    // mainKey + w : open settingsDialog
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "w"
    ) {
      event.preventDefault();
      showSettingsDialog(1);
      return;
    }

    // mainKey + s : open settingsDialog
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "s"
    ) {
      event.preventDefault();
      showSettingsDialog(2);
      return;
    }

    // mainKey + e : open quickReplySettingsDialog
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "e"
    ) {
      event.preventDefault();
      showQuickReplySettingsDialog();
      return;
    }

    // mainKey + g : open exportAndImportDialog
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "g"
    ) {
      event.preventDefault();
      openExportAndImportDialog();
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

    // mainKey + r : regenerate response
    if (
      settingsDialog.style.display === "none" &&
      questionDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "r"
    ) {
      event.preventDefault();
      document.querySelectorAll("button").forEach((button) => {
        if (button.textContent === "Regenerate response") {
          button.click();
        }
      });
      return;
    }

    // mainKey + x : stop
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "x"
    ) {
      event.preventDefault();
      document.querySelectorAll("button").forEach((button) => {
        if (button.textContent === "Stop generating") {
          button.click();
        }
      });
      return;
    }

    // mainKey + c : continue
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "c"
    ) {
      event.preventDefault();
      sendMessage(i18n("menu_item_continue"));
      return;
    }

    // mainKey + y : custom quick reply
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "y"
    ) {
      event.preventDefault();
      if (quickReplyMessageList[0].quickReplyMessage) {
        sendMessage(quickReplyMessageList[0].quickReplyMessage);
      }
      return;
    }

    // mainKey + u : custom quick reply 2
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "u"
    ) {
      event.preventDefault();
      if (quickReplyMessageList[1].quickReplyMessage) {
        sendMessage(quickReplyMessageList[1].quickReplyMessage);
      }
      return;
    }

    // mainKey + i : custom quick reply 3
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "i"
    ) {
      event.preventDefault();
      if (quickReplyMessageList[2].quickReplyMessage) {
        sendMessage(quickReplyMessageList[2].quickReplyMessage);
      }
      return;
    }

    // mainKey + o : custom quick reply 4
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "o"
    ) {
      event.preventDefault();
      if (quickReplyMessageList[3].quickReplyMessage) {
        sendMessage(quickReplyMessageList[3].quickReplyMessage);
      }
      return;
    }

    // mainKey + p : custom quick  5
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "p"
    ) {
      event.preventDefault();
      if (quickReplyMessageList[4].quickReplyMessage) {
        sendMessage(quickReplyMessageList[4].quickReplyMessage);
      }
      return;
    }

    // mainKey + d : dark mode toggle
    if (event[mainKey] && event.key.toLocaleLowerCase() === "d") {
      event.preventDefault();
      darkModeToggle();
      return;
    }

    // mainKey + a : show / hidden right buttons
    if (event[mainKey] && event.key.toLocaleLowerCase() === "a") {
      event.preventDefault();

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

      return;
    }

    // main + b : change to gpt-4 or gpt-3.5 (url)
    if (event[mainKey] && event.key.toLocaleLowerCase() === "b") {
      event.preventDefault();
      const url = new URL(window.location.href);
      const urlSearchParams = new URLSearchParams(url.search);
      const model = urlSearchParams.get("model")
        ? urlSearchParams.get("model")
        : "text-davinci-002-render-sha";
      if (model === "text-davinci-002-render-sha") {
        window.location.href = "https://chat.openai.com/chat?model=gpt-4";
      } else {
        window.location.href =
          "https://chat.openai.com/chat?model=text-davinci-002-render-sha";
      }
      return;
    }

    // mainKey + n： new chat
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "n"
    ) {
      event.preventDefault();

      const newChatBtn = document.querySelector("nav").children[0];

      newChatBtn.click();
      findModeBtn();
      return;
    }

    // mainKey + m : change to gpt-4 or gpt-3.5 toggle button
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "m"
    ) {
      event.preventDefault();

      const url = new URL(window.location.href);

      const urlSearchParams = new URLSearchParams(url.search);

      const model = urlSearchParams.get("model")
        ? urlSearchParams.get("model")
        : "text-davinci-002-render-sha";

      if (!modeBtn) {
        return;
      }

      modeBtn.click();

      if (model === "text-davinci-002-render-sha") {
        findModeOptionAndClick("GPT-4");
      } else {
        findModeOptionAndClick("Default (GPT-3.5)");
      }

      return;
    }

    // mainKey + 1 ~ 0 number keyboard : open question dialog
    if (
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
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

        case "6":
          event.preventDefault();
          promptList[5].buttonElement.click();
          break;

        case "7":
          event.preventDefault();
          promptList[6].buttonElement.click();
          break;

        case "8":
          event.preventDefault();
          promptList[7].buttonElement.click();
          break;

        case "9":
          event.preventDefault();
          promptList[8].buttonElement.click();
          break;

        case "0":
          event.preventDefault();
          promptList[9].buttonElement.click();
          break;

        default:
          break;
      }
    }
  });

  // ------------ 提問視窗 相關程式碼 ------------
  function sendMessage(message) {
    modeBtn = null;
    let isGenerating = false;

    // 看看是不是正在對話，若有則先停止
    document.querySelectorAll("button").forEach((button) => {
      if (button.textContent === "Stop generating") {
        isGenerating = true;
        button.click();
      }
    });

    const chatInput = document.querySelector("form").querySelector("textarea");
    const sendButton = document
      .querySelector("form")
      .querySelector(".absolute.p-1.rounded-md.text-gray-500.right-1");

    if (!chatInput) {
      alert(i18n("alert_not_found_input"));
      return;
    }

    if (!sendButton) {
      alert(i18n("alert_not_found_send_button"));
      return;
    }

    chatInput.value = message;
    chatInput.dispatchEvent(new Event("input", { bubbles: true }));
    chatInput.focus();

    if (isGenerating) {
      setTimeout(() => {
        sendButton.click();
      }, 500);
    } else {
      setTimeout(() => {
        sendButton.click();
      }, 100);
    }
  }

  function sendQuestionForm() {
    const message = `${prefix}${questionDialogTextarea.value}${suffix}`;
    questionDialog.style.display = "none";
    sendMessage(message);
  }

  questionDialogTextarea.addEventListener("keydown", function (event) {
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

  questionDialogCancelBtn.addEventListener("click", () => {
    questionDialog.style.display = "none";
  });

  // prompt 視窗
  function showQuestionDialog() {
    const innerHTML =
      prefix.replace(/\n/g, "<br>") +
      " { $input } " +
      suffix.replace(/\n/g, "<br>");

    questionPreviewAreaDiv.innerHTML = innerHTML;

    questionDialog.style.display = "flex";
    questionDialogTextarea.value = "";

    questionDialogTextarea.focus();
  }

  // ------------ 設定視窗相關 程式碼 ------------
  function showSettingsDialog(formType) {
    currentSettingFormType = formType;

    settingsDialog.style.display = "flex";

    settingsTableForm.style.display = "none";
    settingsTableForm2.style.display = "none";

    if (currentSettingFormType === 1) {
      settingsTableForm.style.display = "table";
      settingsTableForm.style.width = "100%";
    } else {
      settingsTableForm2.style.display = "table";
      settingsTableForm2.style.width = "100%";
    }

    const btnTextInputElements = document.querySelectorAll(".btnTextInput");
    const prefixInputElements = document.querySelectorAll(".prefixInput");
    const suffixInputElements = document.querySelectorAll(".suffixInput");
    const promptSlideElements = document.querySelectorAll(".promptSlide");

    let startIndex = 0;
    let endIndex = 5;

    if (formType == 2) {
      startIndex = 5;
      endIndex = 10;
    }

    for (let index = startIndex; index < endIndex; index++) {
      btnTextInputElements[index].value = promptList[index].text;
      prefixInputElements[index].value = promptList[index].prefix;
      suffixInputElements[index].value = promptList[index].suffix;
      promptSlideElements[index].checked = promptList[index].isVisible;
    }

    currentSettingFormType === 1
      ? btnTextInputElements[0].focus()
      : btnTextInputElements[5].focus();
  }

  function saveSittings() {
    const btnTextInputElements = document.querySelectorAll(".btnTextInput");
    const prefixInputElements = document.querySelectorAll(".prefixInput");
    const suffixInputElements = document.querySelectorAll(".suffixInput");
    const promptSlideElements = document.querySelectorAll(".promptSlide");

    let startIndex = 0;
    let endIndex = 5;

    if (currentSettingFormType == 2) {
      startIndex = 5;
      endIndex = 10;
    }

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

    generateButtons();

    settingsDialog.style.display = "none";
  }

  settingsDialogOkBtn.addEventListener("click", () => {
    saveSittings();
  });

  settingsDialogCancelBtn.addEventListener("click", () => {
    settingsDialog.style.display = "none";
  });

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
    });

    quickReplyButtonTextElements[0].focus();
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
    const currentQuickReplyMessageList = JSON.parse(
      JSON.stringify(quickReplyMessageList)
    );

    currentPromptSetting.forEach((setting) => {
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

      promptList = defaultPromptList;
      quickReplyMessageList = defaultQuickReplyMessageList;

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
    } catch (error) {
      isValidated = false;
      console.log("error", error);
    }

    return isValidated;
  }

  function handleFileLoad(event) {
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

          localStorage.setItem(
            "Custom.Settings.Prompt",
            JSON.stringify(promptList)
          );
        });
      }

      // 覆蓋快速回覆
      if (importType === 0 || importType === 2) {
        const previousQuickReplyMessageList = JSON.parse(
          JSON.stringify(quickReplyMessageList)
        );

        quickReplyMessageList.forEach((settings, index) => {
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
        });

        localStorage.setItem(
          "Custom.Settings.QuickReply",
          JSON.stringify(quickReplyMessageList)
        );
      }

      generateButtons();

      alert(i18n("alert_import_success"));

      importFileInput.value = "";
    } else {
      importFileInput.value = "";
    }
  }

  importFileInput.addEventListener("change", () => {
    const file = importFileInput.files[0];
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(file);
  });

  // ------------ 建立右側按鈕 相關程式碼 ------------
  function createButton(textContent, btnColorClass = "success") {

    let fontSize = "1rem";
    let width = "152px";
    let padding = "3px 10px";

    if(chrome.i18n.getUILanguage()==='en-US'){
      fontSize = "0.92rem";
      width = "160px";
      padding = "3px 6px";
    }

    if(chrome.i18n.getUILanguage()==='ja'){
      fontSize = "0.95rem";
      width = "156px";
      padding = "3px 6px";
    }

    const button = document.createElement("button");
    button.classList.add(btnColorClass, "custom-template-buttons");
    button.textContent = textContent;
    button.title = textContent;
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
    return button;
  }

  function generateButtons() {
    const findCustomMenu = document.querySelector(".custom-menu");

    if (findCustomMenu) {
      findCustomMenu.remove();
    }

    const menuDiv = document.createElement("div");
    menuDiv.classList.add("custom-menu");

    // 模版
    promptList.forEach((settings) => {
      if (!settings.isVisible) {
        return;
      }

      const button = createButton(`${settings.key}. ${settings.text}`);

      const handleClick = () => {
        prefix = settings.prefix;
        suffix = settings.suffix;
        showQuestionDialog();
      };

      button.addEventListener("click", handleClick);

      settings.buttonElement = button;
      settings.handleClickFn = handleClick;

      menuDiv.appendChild(button);
    });

    // 繼續 按鈕

    const filteredContinueButton = Array.from(
      document.querySelectorAll(".custom-template-buttons")
    ).filter((element) => {
      return element.textContent === `C. ${i18n("menu_item_continue")}`;
    });

    if (filteredContinueButton.length) {
      filteredContinueButton[0].remove();
    }

    const continueButton = createButton(
      `C. ${i18n("menu_item_continue")}`,
      "info"
    );

    continueButton.addEventListener("click", () => {
      sendMessage(i18n("menu_item_continue"));
    });

    menuDiv.appendChild(continueButton);

    // 快速回覆按鈕
    quickReplyMessageList.forEach((settings) => {
      if (!settings.isVisible) {
        return;
      }

      const button = createButton(`${settings.key}. ${settings.text}`, "info");

      const handleClick = () => {
        if (settings.quickReplyMessage.trim()) {
          sendMessage(settings.quickReplyMessage);
        }
      };

      button.addEventListener("click", handleClick);

      settings.buttonElement = button;
      settings.handleClickFn = handleClick;

      menuDiv.appendChild(button);
    });

    // prompt settings
    const promptSettingsButton = createButton(
      `W. ${i18n("menu_prompt_template_settings")}`,
      "primary"
    );
    promptSettingsButton.addEventListener("click", () => {
      showSettingsDialog(1);
    });
    menuDiv.appendChild(promptSettingsButton);

    // prompt settings2
    const promptSettingsButton2 = createButton(
      `S. ${i18n("menu_prompt_template2_settings")}`,
      "primary"
    );
    promptSettingsButton2.addEventListener("click", () => {
      showSettingsDialog(2);
    });
    menuDiv.appendChild(promptSettingsButton2);

    // quickReply Settings
    const quickReplySettingsButton2 = createButton(
      `E. ${i18n("menu_reply_message_settings")}`,
      "primary"
    );
    quickReplySettingsButton2.addEventListener("click", () => {
      showQuickReplySettingsDialog();
    });
    menuDiv.appendChild(quickReplySettingsButton2);

    // 匯出匯入設定擋
    const exportAndImportConfigButton = createButton(
      `G. ${i18n("menu_import_export")}`,
      "primary"
    );
    exportAndImportConfigButton.addEventListener("click", () => {
      openExportAndImportDialog();
    });
    menuDiv.appendChild(exportAndImportConfigButton);

    // 重新設定高度
    menuDiv.style.maxHeight = `${menuDiv.children.length * 35}px`;

    document.body.appendChild(menuDiv);
  }

  generateButtons();

  // ------------ 監聽各式 composition 事件 ------------
  document.querySelectorAll(".btnTextInput").forEach((input) => {
    input.addEventListener("compositionstart", () => {
      isComposing = true;
    });
    input.addEventListener("compositionend", () => {
      isComposing = false;
    });
  });

  document.querySelectorAll(".prefixInput").forEach((input) => {
    input.addEventListener("compositionstart", () => {
      isComposing = true;
    });
    input.addEventListener("compositionend", () => {
      isComposing = false;
    });
  });

  document.querySelectorAll(".suffixInput").forEach((input) => {
    input.addEventListener("compositionstart", () => {
      isComposing = true;
    });
    input.addEventListener("compositionend", () => {
      isComposing = false;
    });
  });

  questionDialogTextarea.addEventListener("compositionstart", () => {
    isComposing = true;
  });

  questionDialogTextarea.addEventListener("compositionend", () => {
    isComposing = false;
  });

  document.querySelectorAll(".quickReplyButtonText").forEach((input) => {
    input.addEventListener("compositionstart", () => {
      isComposing = true;
    });
    input.addEventListener("compositionend", () => {
      isComposing = false;
    });
  });

  document.querySelectorAll(".quickReplyMessage").forEach((input) => {
    input.addEventListener("compositionstart", () => {
      isComposing = true;
    });
    input.addEventListener("compositionend", () => {
      isComposing = false;
    });
  });

  // ------------ 控制視窗的焦點切換 ------------
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

    // tableForm2 tabindexElements
    let tableForm2TabindexElements = settingsTableForm2.querySelectorAll(
      "input, textarea, button"
    );

    tableForm2TabindexElements = [
      ...tableForm2TabindexElements,
      settingsDialogOkBtn,
      settingsDialogCancelBtn,
    ];

    const tableForm2FirstTabindexElement = tableForm2TabindexElements[0];
    const tableForm2LastTabindexElement =
      tableForm2TabindexElements[tableForm2TabindexElements.length - 1];

    // settingsDialog keydown event
    settingsDialog.addEventListener("keydown", function (e) {
      if (settingsTableForm.style.display === "table") {
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
      }

      if (settingsTableForm2.style.display === "table") {
        if (e.key === "Tab" && !e.shiftKey) {
          if (document.activeElement === tableForm2LastTabindexElement) {
            e.preventDefault();
            tableForm2FirstTabindexElement.focus();
          }
        } else if (e.key === "Tab" && e.shiftKey) {
          if (document.activeElement === tableForm2FirstTabindexElement) {
            e.preventDefault();
            tableForm2LastTabindexElement.focus();
          }
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
})();
