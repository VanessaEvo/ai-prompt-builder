import { useState, useEffect } from 'react';
import { translations, Translation } from '../i18n/translations';

export function useTranslation() {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      const saved = localStorage.getItem('language');
      return saved || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
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
