import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import zh from './lang/zh';
import en from './lang/en';

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      // 英文
      en: {
        translation: en,
      },
      // 中文
      zh: {
        translation: zh,
      },
    },
    lng: 'zh',
    fallbackLng: 'zh',

    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
  });

export default i18n;
