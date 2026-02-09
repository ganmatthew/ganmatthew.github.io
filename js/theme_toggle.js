try {
  const storageKey = 'site-theme';
  const savedTheme = localStorage.getItem(storageKey);
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  const theme = savedTheme || systemTheme;

  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.setAttribute('data-bs-theme', theme);
} catch (e) {}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img, svg').forEach(element => {
    element.addEventListener('contextmenu', e => e.preventDefault());
    element.addEventListener('dragstart', e => e.preventDefault());
  });

  const storageKey = 'site-theme';
  const button = document.getElementById('theme-toggle-btn');
  const body = document.body;

  function setButtonIcon(theme) {
    if (!button) return;
    button.innerHTML = `
      <img src="images/icons/${theme === 'dark' ? 'moon' : 'sun'}.svg"
      alt="${theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}"
      draggable="false">
    `;
    button.setAttribute('aria-pressed', theme === 'dark');
  }

  function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('data-bs-theme', theme);
    body.classList.toggle('dark', theme === 'dark');
    setButtonIcon(theme);
  }

  const initial = document.documentElement.getAttribute('data-bs-theme');
  applyTheme(initial);

  if (!button) return;

  button.addEventListener('click', () => {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';

    applyTheme(next);
    try { localStorage.setItem(storageKey, next); } catch (e) {}
  });
});
