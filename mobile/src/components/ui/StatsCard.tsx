import React from "react";
import { Text, View } from "react-native";
import { getThemeColors } from "../../../utils/theme";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

interface StatItem {
  value: string | number;
  label: string;
  color?: string;
}

interface StatsCardProps {
  stats: StatItem[];
}

export default function StatsCard({ stats }: StatsCardProps) {
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);

  return (
    <View
      className="px-4 py-4 border-b"
      style={{
        backgroundColor: colors.card,
        borderBottomColor: colors.border,
      }}
    >
      <View
        className="flex-row justify-around"
        style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
      >
        {stats.map((stat, index) => (
          <View key={index} className="items-center">
            <Text
              className="text-2xl font-bold"
              style={{ color: stat.color || colors.text }}
            >
              {stat.value}
            </Text>
            <Text
              className="text-sm"
              style={{
                color: colors.textSecondary,
                textAlign: isRTL ? "right" : "center",
              }}
            >
              {stat.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

