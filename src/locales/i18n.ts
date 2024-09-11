import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationUS from "./en_US.json";
import translationKR from "./ko_KR.json";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en_US: {
    translation: translationUS,
  },
  ko_KR: {
    translation: translationKR,
  },
};

i18n.use(I18nextBrowserLanguageDetector).use(initReactI18next).init({
  resources,
  lng: "ko_KR",
  fallbackLng: "en_US",
});

export default i18n;
