/**
 * features/chat_downloader.js — ChatGPT 對話下載
 */

export async function downloadChatGPTConversationAsHtml() {
  /* ========= helpers ========= */

  function expandAllCollapsedContent(root = document) {
    root.querySelectorAll("button, a").forEach((el) => {
      const text = el.textContent?.trim();
      if (!text) return;

      if (
        text.includes("顯示更多") ||
        text.includes("展開") ||
        text.includes("Show more") ||
        text.includes("More")
      ) {
        el.click();
      }
    });
  }

  async function inlineImages(root) {
    const imgs = root.querySelectorAll("img");

    for (const img of imgs) {
      const src = img.getAttribute("src");
      if (!src || src.startsWith("data:")) continue;

      try {
        if (src.startsWith("blob:")) {
          img.remove();
          continue;
        }

        const res = await fetch(src, { credentials: "include" });
        if (!res.ok) throw new Error(res.status);

        const blob = await res.blob();

        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });

        img.src = base64;
      } catch (err) {
        console.warn("圖片轉 base64 失敗，已移除：", src, err);
        img.remove();
      }
    }
  }

  /* ========= main ========= */

  // 0️⃣ 展開群組 / 折疊內容
  expandAllCollapsedContent(document);

  // 1️⃣ 找對話容器
  const conversationRoot =
    document.querySelector('main [role="presentation"]') ||
    document.querySelector("main");

  if (!conversationRoot) {
    alert("找不到 ChatGPT 對話內容");
    return;
  }

  // 2️⃣ clone
  const clonedRoot = conversationRoot.cloneNode(true);

  // 3️⃣ 移除互動 UI (包含保護警語的邏輯)
  clonedRoot
    .querySelectorAll(
      "button, textarea, input, form, nav, header, aside"
    )
    .forEach((el) => {
       // 保護機制：保留警語
       if (el.innerText && el.innerText.includes("ChatGPT 可能會出錯")) {
         return; 
       }
       el.remove();
    });

  // 移除新版輸入框容器
  clonedRoot.querySelectorAll('[contenteditable="true"]').forEach((el) => {
      const wrapper = el.closest('.bg-token-bg-elevated-primary') || el.parentElement;
      if (wrapper) wrapper.remove();
  });
  
  // 移除殘留的輸入框背景
  clonedRoot.querySelectorAll('.bg-token-bg-elevated-primary').forEach((el) => el.remove());

  // 4️⃣ avatar → 純 div
  clonedRoot.querySelectorAll("img").forEach((img) => {
    const alt = img.getAttribute("alt") || "";
    let label = null;
    let bg = "#999";

    if (/user/i.test(alt)) {
      label = "U";
      bg = "#5A7DAB";
    } else if (/chatgpt|assistant/i.test(alt)) {
      label = "A";
      bg = "#10a37f";
    }

    if (!label) return;

    const parent = img.parentElement;
    if (!parent) return;

    const avatar = document.createElement("div");
    avatar.textContent = label;
    avatar.style.cssText = `
      width:32px;
      height:32px;
      border-radius:50%;
      background:${bg};
      color:#fff;
      font-weight:700;
      display:flex;
      align-items:center;
      justify-content:center;
      font-family:system-ui;
      flex-shrink:0;
    `;

    parent.replaceChildren(avatar);
  });

  // 5️⃣ 對話圖片 → base64
  await inlineImages(clonedRoot);

  // 6️⃣ Clean Styles
  const codeSelectors = new Set();
  clonedRoot.querySelectorAll('.cm-editor, .cm-editor *, pre, pre *, code, code *').forEach(el => codeSelectors.add(el));

  clonedRoot.querySelectorAll("*").forEach((el) => {
    const style = getComputedStyle(el);
    // 程式碼元素：以 inline !important 保留語法高亮色彩
    if (codeSelectors.has(el)) {
      if (style.color?.startsWith("rgb")) {
        el.style.setProperty('color', style.color, 'important');
      }
    }
    // 非程式碼元素不 bake color，交由 CSS * { color:#111 !important } 處理
    if (style.backgroundColor && style.backgroundColor !== "rgba(0, 0, 0, 0)") {
      el.style.backgroundColor = style.backgroundColor;
    }
    el.style.maxHeight = "none";
    // 程式碼相關元素保留 overflow 限制
    if (!codeSelectors.has(el)) {
      el.style.overflow = "visible";
    }
    el.style.webkitLineClamp = "unset";
    el.style.lineClamp = "unset";
    el.style.maskImage = "none";
    el.style.webkitMaskImage = "none";
    el.style.backdropFilter = "none";
    el.style.webkitBackdropFilter = "none";
    el.style.filter = "none";
    el.style.opacity = "1";
  });

  // 7️⃣ 同源 CSS
  const styles = Array.from(document.styleSheets)
    .filter((sheet) => !sheet.href || sheet.href.startsWith(window.location.origin))
    .map((sheet) => {
      try {
        return Array.from(sheet.cssRules).map((r) => r.cssText).join("\n");
      } catch {
        return "";
      }
    })
    .join("\n");

  // 8️⃣ 強制寬版樣式 (這裡修改了寬度設定)
  const forceStyle = `
:root { color-scheme: light; }

body {
  background:#fff !important;
  color:#111 !important;
  margin:0;
  padding: 20px;
  font-family:system-ui,-apple-system,BlinkMacSystemFont,sans-serif;
  overflow-wrap: break-word;
}

/* 全域文字顏色（程式碼區塊透過 inline !important 保留語法高亮）*/
* { color:#111 !important; }

/* 主要修改：改用 98% 寬度，幾乎填滿螢幕 */
main {
  max-width: 98% !important; 
  width: 98% !important;
  margin: auto;
}

/* 讓 footer 警語置中 */
.text-token-text-secondary {
    text-align: center;
    font-size: 0.75rem;
    color: #666 !important;
    margin-top: 20px;
    padding: 10px;
}

pre {
  display:block;
  font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  white-space:pre-wrap;
  word-break:break-word;
  background:#f6f8fa !important;
  color:#111 !important;
  padding:12px;
  border-radius:6px;
  margin:12px 0;
  overflow-x:auto;
  line-height:1.5;
  max-width:100%;
  box-sizing:border-box;
  font-size:13px;
}

pre code {
  all:unset;
  display:block;
  font-family:inherit;
  white-space:inherit;
  word-break:inherit;
  background:transparent !important;
  color:inherit !important;
  padding:0;
  margin:0;
  border-radius:0;
  font-size:inherit;
  line-height:inherit;
}

code {
  font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  font-size:13px;
}

p code, li code, span code, td code, a code {
  display:inline;
  padding:2px 6px;
  background:#f0f0f0 !important;
  border-radius:4px;
  font-size:0.9em;
}

/* CodeMirror 程式碼區塊 */
.cm-editor {
  max-width:100% !important;
  box-sizing:border-box !important;
  border-radius:6px !important;
  margin:12px 0 !important;
  overflow:hidden !important;
  font-size:13px !important;
}
.cm-scroller {
  overflow-x:auto !important;
  overflow-y:auto !important;
  max-height:none !important;
}
.cm-content {
  white-space:pre-wrap !important;
  word-break:break-word !important;
  max-width:100% !important;
  box-sizing:border-box !important;
}
.cm-line {
  white-space:pre-wrap !important;
  word-break:break-word !important;
}
.cm-editor, .cm-editor * {
  mask-image:none !important;
  -webkit-mask-image:none !important;
}
.cm-gutters {
  display:none !important;
}

pre *, code * {
  background:transparent !important;
  box-shadow:none !important;
}

pre::before, pre::after,
code::before, code::after {
  content:none !important;
  display:none !important;
}

blockquote {
  border-left:4px solid #ddd;
  padding-left:12px;
  margin:12px 0;
  color:#333;
}

*, *::before, *::after {
  mask-image:none !important;
  -webkit-mask-image:none !important;
  backdrop-filter:none !important;
  -webkit-backdrop-filter:none !important;
  filter:none !important;
  opacity:1 !important;
}
`;

  // 9️⃣ 組 HTML
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="utf-8" />
<title>${document.title}</title>
<style>
${styles}
${forceStyle}
</style>
</head>
<body>
${clonedRoot.outerHTML}
</body>
</html>`;

  // 🔟 下載
  const blob = new Blob([html], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download =
    document.title.replace(/[\\/:*?"<>|]/g, "_") + ".html";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
