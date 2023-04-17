import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEnglish from "../translation/en/lang.json";

const resources = {
  en: {
    translation: translationEnglish,
  },
};
i18next.use(LanguageDetector).use(initReactI18next).init({
  resources,
  lng: "en",
});

export default i18next;
