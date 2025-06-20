// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import viTranslation from './vi.json';
import enTranslation from './en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      vi: { translation: viTranslation },
      en: { translation: enTranslation },
    },
    lng: localStorage.getItem('lang') || 'vi', // Ngôn ngữ mặc định
    fallbackLng: 'vi',
    interpolation: { escapeValue: false },
  });

export default i18n;
