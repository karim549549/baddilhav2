import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { AsyncStorage } from "../utils/AsyncStorageMock";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: "light" | "dark";
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@baddilha_theme_mode";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [systemTheme, setSystemTheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  // Get the actual theme based on mode
  const theme = themeMode === "system" ? systemTheme || "light" : themeMode;
  const isDark = theme === "dark";

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  // Load saved theme mode on app start
  useEffect(() => {
    const loadThemeMode = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedMode && ["light", "dark", "system"].includes(savedMode)) {
          console.log("Loaded saved theme mode:", savedMode);
          setThemeModeState(savedMode as ThemeMode);
        } else {
          console.log("No saved theme mode found, using system default");
        }
      } catch (error) {
        console.log("Error loading theme mode:", error);
      }
    };

    loadThemeMode();
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      setThemeModeState(mode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      console.log("Saved theme mode:", mode);
    } catch (error) {
      console.log("Error saving theme mode:", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        setThemeMode,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
