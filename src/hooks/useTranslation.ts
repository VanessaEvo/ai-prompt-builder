import { useState, useEffect } from 'react';
import { translations, Translation } from '../i18n/translations';

export function useTranslation() {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = translations[language] || translations.en;

  const changeLanguage = (lang: string) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return { t, language, changeLanguage };
}

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
];
