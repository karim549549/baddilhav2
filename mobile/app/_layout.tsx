import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { I18nManager } from "react-native";
import ThemedStatusBar from "../components/ThemedStatusBar";
import { LanguageProvider, useLanguage } from "../src/contexts/LanguageContext";
import { ThemeProvider } from "../src/contexts/ThemeContext";
import "../src/i18n";
import "./globals.css";

// Allow RTL support but don't force it globally
I18nManager.allowRTL(true);

function RTLHandler() {
  const { isRTL, language, isLanguageLoaded } = useLanguage();

  useEffect(() => {
    // Only apply RTL changes after language is loaded
    if (!isLanguageLoaded) {
      console.log("RTLHandler - waiting for language to load");
      return;
    }

    console.log("RTLHandler - language:", language, "isRTL:", isRTL);

    // Force RTL for Arabic language only
    if (language === "ar") {
      I18nManager.forceRTL(true);
      console.log("RTL enabled for Arabic");
    } else {
      I18nManager.forceRTL(false);
      console.log("RTL disabled for", language);
    }

    // Note: I18nManager.forceRTL() requires app restart to take full effect
    // For development, you may need to reload the app manually
  }, [isRTL, language, isLanguageLoaded]);

  return null;
}

function RootLayoutContent() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <RTLHandler />
        <ThemedStatusBar />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="add-item" options={{ headerShown: false }} />
          <Stack.Screen
            name="create-profile"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="chat-detail" options={{ headerShown: false }} />
          <Stack.Screen name="user-profile" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default function RootLayout() {
  return <RootLayoutContent />;
}
