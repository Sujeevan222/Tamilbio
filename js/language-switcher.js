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
    // Get current URL and replace language part
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace(
      `/${currentLang}/`,
      `/${newLang}/`
    );
    console.log('Redirecting to:', newUrl); // Debug log
    window.location.href = newUrl;
  });

  // Apply initial translations
  updateContent(currentLang);
});

function updateContent(lang) {
  if (!translations || !translations[lang]) {
    console.error('Translations not found for:', lang);
    return;
  }

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const keys = key.split('.');
    let translation = translations[lang];

    try {
      for (const k of keys) {
        translation = translation[k];
      }

      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error);
    }
  });
}