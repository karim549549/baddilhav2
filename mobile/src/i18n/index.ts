import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { AsyncStorage } from "../utils/AsyncStorageMock";
import * as RNLocalize from "../utils/RNLocalizeMock";

// Import translation files
import ar from "./locales/ar.json";
import de from "./locales/de.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import pt from "./locales/pt.json";

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
  es: {
    translation: es,
  },
  fr: {
    translation: fr,
  },
  de: {
    translation: de,
  },
  pt: {
    translation: pt,
  },
};

// Get device language
const getDeviceLanguage = (): string => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    const language = locales[0].languageCode;
    // Check if we support this language
    if (language === "ar") return "ar";
    if (language === "en") return "en";
    if (language === "es") return "es";
    if (language === "fr") return "fr";
    if (language === "de") return "de";
    if (language === "pt") return "pt";
  }
  // Default to English
  return "en";
};

// Get initial language (saved preference or device language)
const getInitialLanguage = async (): Promise<string> => {
  try {
    const savedLang = await AsyncStorage.getItem("@baddilha_language");
    console.log("i18n - savedLang from storage:", savedLang);
    if (savedLang && ["en", "ar", "es", "fr", "de", "pt"].includes(savedLang)) {
      console.log("i18n - using saved language:", savedLang);
      return savedLang;
    }
  } catch (error) {
    console.log("Error loading saved language:", error);
  }
  const deviceLang = getDeviceLanguage();
  console.log("i18n - using device language:", deviceLang);
  return deviceLang;
};

// Initialize i18n with saved language preference
const initializeI18n = async () => {
  if (!i18n.isInitialized) {
    const initialLanguage = await getInitialLanguage();
    console.log("i18n - initializing with language:", initialLanguage);

    i18n.use(initReactI18next).init({
      resources,
      lng: initialLanguage,
      fallbackLng: "en",
      debug: __DEV__,
      supportedLngs: ["en", "ar", "es", "fr", "de", "pt"],
      load: "languageOnly", // Only load language, not region
      interpolation: {
        escapeValue: false, // React already does escaping
      },
      react: {
        useSuspense: false, // Disable suspense for React Native
      },
    });
  }
};

// Initialize i18n
initializeI18n();

export default i18n;
