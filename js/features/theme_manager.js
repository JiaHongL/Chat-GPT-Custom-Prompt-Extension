/**
 * features/theme_manager.js — 主題管理
 */

let chatGPTThemeObserver = null;

export function checkChatGPTTheme() {
  const applyTheme = () => {
    const isDarkMode = document.documentElement.dataset.theme === 'dark';
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.classList.toggle('light', !isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
  };

  applyTheme();

  if (!chatGPTThemeObserver) {
    chatGPTThemeObserver = new MutationObserver(applyTheme);
    chatGPTThemeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  }
}

export function checkGeminiTheme() {
  if (document.body.classList.contains("dark-theme")) {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    document.documentElement.style.colorScheme = "light";
  }
}

export function checkClaudeOrClaudeTheme() {
  const isDarkMode = document.documentElement.getAttribute('data-mode') === 'dark';
  if (isDarkMode) {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    document.documentElement.style.colorScheme = "light";
  }
}

export function checkPerplexityTheme() {
  const isDarkMode = document.documentElement.dataset.colorScheme === 'dark';
  if (isDarkMode) {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    document.documentElement.style.colorScheme = "light";
  }
}

export function darkModeToggle() {
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
