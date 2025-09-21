import React from "react";
import { Text, View } from "react-native";
import { getThemeColors } from "../../../utils/theme";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

interface SwipeInstructionsProps {
  instructions: string;
}

export default function SwipeInstructions({
  instructions,
}: SwipeInstructionsProps) {
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);

  return (
    <View
      style={{
        backgroundColor: colors.card,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
      }}
    >
      <Text
        style={{
          textAlign: isRTL ? "right" : "center",
          color: colors.textSecondary,
          fontSize: 14,
          writingDirection: isRTL ? "rtl" : "ltr",
        }}
      >
        {instructions}
      </Text>
    </View>
  );
}

