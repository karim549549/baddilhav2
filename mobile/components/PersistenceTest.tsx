import React from "react";
import { Text, View } from "react-native";
import { useLanguage } from "../src/contexts/LanguageContext";
import { useTheme } from "../src/contexts/ThemeContext";

export default function PersistenceTest() {
  const { language, isRTL, isLanguageLoaded } = useLanguage();
  const { themeMode, isDark } = useTheme();

  return (
    <View style={{ padding: 16, backgroundColor: isDark ? "#333" : "#fff" }}>
      <Text
        style={{
          color: isDark ? "#fff" : "#000",
          fontSize: 16,
          marginBottom: 8,
        }}
      >
        Persistence Test:
      </Text>
      <Text style={{ color: isDark ? "#fff" : "#000", fontSize: 14 }}>
        Language: {language} {isRTL ? "(RTL)" : "(LTR)"}{" "}
        {isLanguageLoaded ? "✅" : "⏳"}
      </Text>
      <Text style={{ color: isDark ? "#fff" : "#000", fontSize: 14 }}>
        Theme: {themeMode} {isDark ? "(Dark)" : "(Light)"}
      </Text>
      <Text
        style={{ color: isDark ? "#fff" : "#000", fontSize: 12, marginTop: 8 }}
      >
        Debug: isRTL={isRTL.toString()}, language={language}
      </Text>
    </View>
  );
}
