/**
 * utils/helpers.js — 通用工具函式
 */

/**
 * 首字母大寫
 * @param {string} str
 * @returns {string}
 */
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 跳脫 RegExp 特殊字元
 * @param {string} string
 * @returns {string}
 */
export function escapeRegExp(string) {
  return string?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 計算分類群組與群組內序號
 * @param {number} promptId - 流水號 1-1500
 * @param {number} groupSize - 每組筆數 (預設 50)
 * @returns {{ group: number, order: number }}
 */
export function findGroupAndIndex(promptId, groupSize = 50) {
  const group = Math.floor((promptId - 1) / groupSize) + 1;
  const order = ((promptId - 1) % groupSize) + 1;
  return { group, order };
}
