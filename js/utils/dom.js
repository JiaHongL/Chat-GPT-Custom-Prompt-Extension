/**
 * utils/dom.js — DOM 工具函式
 */

/** 
 * 暫存的 tabindex 元素列表
 * @type {HTMLElement[]|null}
 */
let tabindexElements = null;

/**
 * 禁用右側選單的 tabindex（在 Dialog 開啟時呼叫）
 */
export function disableMenuItemTabindex() {
  const menu = document.querySelector('.custom-menu');
  if (!menu) return;

  tabindexElements = Array.from(menu.querySelectorAll('[tabindex]'));
  tabindexElements.forEach((element) => {
    element.setAttribute('data-orig-tabindex', element.getAttribute('tabindex'));
    element.setAttribute('tabindex', '-1');
  });
}

/**
 * 恢復右側選單的 tabindex（在 Dialog 關閉時呼叫）
 */
export function restoreMenuItemTabindex() {
  tabindexElements?.forEach((element) => {
    const originalTabindex = element.getAttribute('data-orig-tabindex');
    element.setAttribute('tabindex', originalTabindex);
    element.removeAttribute('data-orig-tabindex');
  });
}

/**
 * Dialog 內 Tab/Shift+Tab 循環焦點 handler
 * @param {HTMLElement} firstTabindexElement
 * @param {HTMLElement} lastTabindexElement
 * @param {KeyboardEvent} e
 */
export function handleTabindex(firstTabindexElement, lastTabindexElement, e) {
  if (e.key === 'Tab' && !e.shiftKey) {
    if (document.activeElement === lastTabindexElement) {
      e.preventDefault();
      firstTabindexElement.focus();
    }
  } else if (e.key === 'Tab' && e.shiftKey) {
    if (document.activeElement === firstTabindexElement) {
      e.preventDefault();
      lastTabindexElement.focus();
    }
  }
}
