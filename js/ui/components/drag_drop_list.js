/**
 * ui/components/drag_drop_list.js — 共用拖放排序邏輯
 */

import { SCROLL_SPEED, SCROLL_THRESHOLD } from '../../config/constants.js';

/**
 * 設定拖放排序功能
 * @param {HTMLElement} dialogElement - 對話框元素 (作為事件委派容器)
 * @param {string} scrollContainerSelector - 捲動容器的選擇器
 * @param {function} recalculateIndexesFn - 排序完成後重算索引的回調
 * @param {function} controlTabindexFn - 排序完成後重算 tabindex 的回調
 * @returns {{ getDraggedElement: () => HTMLElement|null }}
 */
export function setupDragDrop(
  dialogElement,
  scrollContainerSelector,
  recalculateIndexesFn,
  controlTabindexFn
) {
  let draggedElement = null;
  let dragged = null;

  // ====== mousedown / mouseup on .drag-btn ======
  const handleMouseDown = (e) => {
    dragged = e.target.closest('tr');
    if (dragged) {
      dragged.classList.add('dragging');
      dragged.draggable = true;
    }
  };

  const handleMouseUp = (e) => {
    if (dragged) {
      dragged.classList.remove('dragging');
      dragged.draggable = false;
      dragged = null;
    }
  };

  /**
   * 重新綁定 .drag-btn 的 mousedown/mouseup 事件
   * 每次 dialog show 時應呼叫此函式
   */
  function bindDragHandles() {
    dialogElement.querySelectorAll('.drag-btn').forEach(btn => {
      btn.removeEventListener('mousedown', handleMouseDown);
      btn.removeEventListener('mouseup', handleMouseUp);
    });
    dialogElement.querySelectorAll('.drag-btn').forEach(btn => {
      btn.addEventListener('mousedown', handleMouseDown);
      btn.addEventListener('mouseup', handleMouseUp);
    });
  }

  // 初次綁定
  bindDragHandles();

  // dragstart
  dialogElement.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'TR' && e.target.classList.contains('dragging')) {
      draggedElement = e.target;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', '');
      setTimeout(() => e.target.classList.add('dragging-row'), 0);
    }
  });

  // dragover
  dialogElement.addEventListener('dragover', function (e) {
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

    // 自動捲動
    const scrollContainer = document.querySelector(scrollContainerSelector);
    if (scrollContainer) {
      const scrollContainerRect = scrollContainer.getBoundingClientRect();
      const scrollContainerTop = scrollContainerRect.top + window.scrollY;
      const scrollContainerBottom = scrollContainerRect.bottom + window.scrollY;

      if (e.clientY < scrollContainerTop + SCROLL_THRESHOLD) {
        scrollContainer.scrollTop -= SCROLL_SPEED;
      } else if (e.clientY > scrollContainerBottom - SCROLL_THRESHOLD) {
        scrollContainer.scrollTop += SCROLL_SPEED;
      }
    }
  });

  // dragleave
  dialogElement.addEventListener('dragleave', function (e) {
    const target = e.target.closest('tr.customDragItem');
    if (target) {
      target.classList.remove('drag-over', 'drag-over-bottom');
    }
  });

  // drop
  dialogElement.addEventListener('drop', function (e) {
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

      recalculateIndexesFn();
      setTimeout(() => {
        controlTabindexFn();
      });
    }
  });

  // dragend
  dialogElement.addEventListener('dragend', function (e) {
    const trElements = dialogElement.querySelectorAll('.customDragItem');
    trElements.forEach((tr) => {
      tr.classList.remove('dragging-row', 'drag-over', 'drag-over-bottom', 'dragging');
      tr.draggable = false;
    });
    draggedElement = null;
  });

  return {
    getDraggedElement: () => draggedElement,
    bindDragHandles,
  };
}
