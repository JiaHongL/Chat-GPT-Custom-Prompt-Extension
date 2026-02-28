import { isTW } from '../core/state.js';
import { PROMO_INTERVAL, PROMO_INITIAL_DELAY } from '../config/constants.js';

const newPtLists = [
  {"id": "line-button", "url": "https://store.line.me/stickershop/product/30609835/zh-Hant", "label": "柴柴貼圖 - 實用篇"},
  {"id": "line-button", "url": "https://store.line.me/stickershop/product/30599810/zh-Hant", "label": "柴柴貼圖 - 失戀篇"},
  {"id": "line-button", "url": "https://store.line.me/stickershop/product/30598858/zh-Hant", "label": "柴柴貼圖 - 工程師"},
  {"id": "line-button", "url": "https://store.line.me/stickershop/product/30598985/zh-Hant", "label": "柴柴貼圖 - 暈船仔"},
  {"id": "line-button", "url": "https://store.line.me/stickershop/product/30599712/zh-Hant", "label": "柴柴貼圖 - 熱戀篇"},
  {"id": "line-button", "url": "https://store.line.me/stickershop/product/30599606/zh-Hant", "label": "柴柴貼圖 - 日常篇"},
  {"id": "line-button", "url": "https://store.line.me/stickershop/author/5375229/zh-Hant", "label": "非柴柴本人貼圖"},
  {"id": "line-button", "url": "https://store.line.me/stickershop/product/30672796/zh-Hant", "label": "柴柴貼圖 - 精選01"}
];

const defaultPtItem = `
  <a href="https://www.buymeacoffee.com/Joe.lin" target="_blank">
    <img style="scale: 0.9;" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=Joe.lin&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff?${new Date().getTime()}" />
  </a>
`;

const promptPacksItem = `
  <a id="prompt-packs-button" href="https://jiahongl.github.io/prompt-packs" target="_blank">
    📚 Prompt Packs
  </a>
`;

const ptLinks = [defaultPtItem, promptPacksItem];

if (isTW) {
  newPtLists.forEach((pt) => {
    ptLinks.push(`<a id="${pt.id}" href="${pt.url}" target="_blank">${pt.label}</a>`);
  });
}

let preRandomIndex = null;
let currentLoopCount = 0;

function getRandomPTLink() {
  currentLoopCount++;
  const bit = Math.random() < 0.5 ? 0 : 1;
  let randomIndex = isTW ? Math.floor(Math.random() * ptLinks.length) : bit;
  if (currentLoopCount === 1) randomIndex = 0;
  if (preRandomIndex === randomIndex) return getRandomPTLink();
  document.querySelectorAll('.super-sun-o-pt').forEach((element) => {
    element.innerHTML = ptLinks[randomIndex];
  });
  preRandomIndex = randomIndex;
}

export function startAdsRotation() {
  setTimeout(() => {
    getRandomPTLink();
    setInterval(() => {
      getRandomPTLink();
    }, PROMO_INTERVAL);
  }, PROMO_INITIAL_DELAY);
}
