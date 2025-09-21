import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useLanguage } from "../src/contexts/LanguageContext";
import { useTheme } from "../src/contexts/ThemeContext";
import { getThemeColors } from "../utils/theme";

interface ThemeToggleProps {
  onPress?: () => void;
}

export default function ThemeToggle({ onPress }: ThemeToggleProps) {
  const { isDark, themeMode, setThemeMode } = useTheme();
  const { t, isRTL } = useLanguage();
  const colors = getThemeColors(isDark);

  const handleThemeToggle = () => {
    if (themeMode === "light") {
      setThemeMode("dark");
    } else if (themeMode === "dark") {
      setThemeMode("system");
    } else {
      setThemeMode("light");
    }
    onPress?.();
  };

  const getThemeIcon = () => {
    if (themeMode === "light") return "sunny";
    if (themeMode === "dark") return "moon";
    return "phone-portrait";
  };

  const getThemeText = () => {
    if (themeMode === "light") return t("settings.theme.light");
    if (themeMode === "dark") return t("settings.theme.dark");
    return t("settings.theme.system");
  };

  return (
    <TouchableOpacity
      className="flex-row items-center justify-between p-4 border-b"
      style={{
        backgroundColor: colors.card,
        borderBottomColor: colors.border,
        flexDirection: isRTL ? "row-reverse" : "row",
      }}
      onPress={handleThemeToggle}
    >
      <View
        className="flex-row items-center"
        style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
      >
        <View
          className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center"
          style={{
            marginRight: isRTL ? 0 : 16,
            marginLeft: isRTL ? 16 : 0,
          }}
        >
          <Ionicons name={getThemeIcon()} size={20} color="#3B82F6" />
        </View>
        <View>
          <Text
            className="font-medium text-base"
            style={{
              color: colors.text,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {t("settings.theme.title")}
          </Text>
          <Text
            className="text-sm"
            style={{
              color: colors.textSecondary,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {t("settings.theme.mode", { mode: getThemeText() })}
          </Text>
        </View>
      </View>
      <View
        className="flex-row items-center"
        style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
      >
        <Text
          className="text-sm"
          style={{
            color: colors.textSecondary,
            marginRight: isRTL ? 0 : 8,
            marginLeft: isRTL ? 8 : 0,
          }}
        >
          {getThemeText()}
        </Text>
        <Ionicons
          name={isRTL ? "chevron-back" : "chevron-forward"}
          size={20}
          color={colors.textTertiary}
        />
      </View>
    </TouchableOpacity>
  );
}
