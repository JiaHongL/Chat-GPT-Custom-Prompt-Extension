/**
 * ui/components/button.js — 按鈕建立元件
 */

import { capitalizeFirstLetter } from '../../utils/helpers.js';
import { mainKeyText } from '../../core/state.js';

/**
 * 建立右側選單按鈕
 * @param {string} textContent - 按鈕顯示文字
 * @param {string} btnColorClass - 按鈕色彩 class (success, info, warning, primary, secondary, light)
 * @param {string} title - title 屬性 (hover 提示)
 * @param {boolean} isCollapseButton - 是否為收合按鈕
 * @returns {HTMLButtonElement}
 */
export function createButton(
  textContent,
  btnColorClass = 'success',
  title = '',
  isCollapseButton = false
) {
  const fontSize = '1rem';
  const width = '100%';
  const padding = '3px 5px 3px 10px';

  const button = document.createElement('button');
  button.classList.add(btnColorClass, 'custom-template-buttons');
  button.textContent = textContent;
  button.title = title ? title : textContent;
  button.style.width = width;
  button.style.margin = '0 0 5px 0';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.padding = padding;
  button.style.fontSize = fontSize;
  button.style.cursor = 'pointer';
  button.style.borderRadius = '5px';
  button.style.textAlign = 'left';
  button.style.whiteSpace = 'nowrap';
  button.style.overflow = 'hidden';
  button.style.textOverflow = 'ellipsis';

  if (isCollapseButton) {
    button.style.margin = '0 0 0 0';
    button.classList.add('menu-collapse-button');
    button.innerHTML = `
      <span style="margin-right:15px">${capitalizeFirstLetter(mainKeyText)} + A </span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M32 96l320 0V32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32zM480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32H160v64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 64H480z"/></svg>
    `;
  }

  return button;
}
