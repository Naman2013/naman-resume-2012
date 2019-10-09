import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import { projectLocale } from 'app/config/project-config';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'cn'];

i18n
  .use(Backend) // load translation using xhr -> see /public/locales.
  .use(initReactI18next) // pass the i18n instance to react-i18next.

  .init({
    react: {
      useSuspense: false,
    },
    fallbackLng,
    debug: true,
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false,
    },
    lng: projectLocale,
  });

export default i18n;
