document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img, svg').forEach(element => {
    element.addEventListener('contextmenu', (e) => e.preventDefault());
    element.addEventListener('dragstart', (e) => e.preventDefault());
  });

  const button = document.getElementById('theme-toggle-btn');
  const body = document.body;
  const storageKey = 'site-theme';

  function setButtonIcon(theme) {
    if (!button) return;
    button.innerHTML = `
      <img src="images/icons/${theme === 'dark' ? 'moon' : 'sun'}.svg"} alt="${theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}" draggable="false">
    `;
    button.setAttribute('aria-pressed', theme === 'dark');
  }

  function applyTheme(theme) {
    body.classList.toggle('dark', theme === 'dark');
    body.setAttribute('data-bs-theme', theme);
    setButtonIcon(theme);
  }

  const saved = localStorage.getItem(storageKey);
  const initial = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(initial);

  if (!button) return;

  button.addEventListener('click', () => {
    const next = body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(storageKey, next); } catch (e) {}
  });
});
