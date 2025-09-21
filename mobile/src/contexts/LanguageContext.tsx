import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import "../i18n"; // Ensure i18n is initialized
import { AsyncStorage } from "../utils/AsyncStorageMock";

export type Language = "en" | "ar" | "es" | "fr" | "de" | "pt";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string, options?: any) => string;
  refreshKey: number;
  isLanguageLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const LANGUAGE_STORAGE_KEY = "@baddilha_language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const [language, setLanguageState] = useState<Language>("en");
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

  // Check if current language is RTL
  const isRTL = language === "ar";

  // Load saved language on app start
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        // Wait for i18n to be ready
        if (!i18n.isInitialized) {
          // Wait a bit for i18n to initialize
          setTimeout(loadLanguage, 100);
          return;
        }

        const savedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (
          savedLang &&
          ["en", "ar", "es", "fr", "de", "pt"].includes(savedLang)
        ) {
          console.log("Loaded saved language:", savedLang);
          setLanguageState(savedLang as Language);
          await i18n.changeLanguage(savedLang);
        } else {
          // Set current i18n language to state
          const currentLang = i18n.language as Language;
          if (["en", "ar", "es", "fr", "de", "pt"].includes(currentLang)) {
            console.log("Using i18n language:", currentLang);
            setLanguageState(currentLang);
          } else {
            console.log("No valid language found, using English");
            setLanguageState("en");
          }
        }

        // Mark language as loaded
        setIsLanguageLoaded(true);
      } catch (error) {
        console.log("Error loading language:", error);
        setLanguageState("en");
        setIsLanguageLoaded(true);
      }
    };

    loadLanguage();
  }, []);

  // Listen for language changes from i18n
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      if (["en", "ar", "es", "fr", "de", "pt"].includes(lng)) {
        setLanguageState(lng as Language);
      }
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  const setLanguage = async (lang: Language) => {
    try {
      // Change the language
      await i18n.changeLanguage(lang);

      setLanguageState(lang);
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      console.log("Saved language:", lang);

      // Force re-render to update translations
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.log("Error saving language:", error);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isRTL,
        t,
        refreshKey, // Add this to force re-renders
        isLanguageLoaded,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
