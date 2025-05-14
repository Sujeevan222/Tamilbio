document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('languageSelect');

  // Get current language from URL path
  const currentPath = window.location.pathname;
  const currentLang = currentPath.includes('/da/') ? 'da' : 'en';

  // Set initial language in dropdown
  languageSelect.value = currentLang;

  // Handle language changes
  languageSelect.addEventListener('change', (e) => {
    const newLang = e.target.value;
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace(`/${currentLang}/`, `/${newLang}/`);
    window.location.href = newUrl;
  });
});

function updateContent(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const keys = key.split('.');
    let translation = translations[lang];

    for (const k of keys) {
      translation = translation[k];
    }

    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.placeholder = translation;
    } else {
      element.textContent = translation;
    }
  });
}