import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getThemeColors } from "../../../utils/theme";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

interface SettingItem {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  iconColor: string;
  iconBgColor: string;
  onPress: () => void;
  isDestructive?: boolean;
}

interface SettingsSectionProps {
  title: string;
  items: SettingItem[];
}

export default function SettingsSection({
  title,
  items,
}: SettingsSectionProps) {
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);

  return (
    <View className="px-4 py-4">
      <Text
        className="text-lg font-bold mb-4"
        style={{
          color: colors.text,
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {title}
      </Text>

      <View
        className="rounded-xl overflow-hidden"
        style={{ backgroundColor: colors.card }}
      >
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center justify-between p-4"
            style={{
              borderBottomWidth: index < items.length - 1 ? 1 : 0,
              borderBottomColor: colors.border,
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
            onPress={item.onPress}
          >
            <View
              className="flex-row items-center"
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{
                  backgroundColor: item.iconBgColor,
                  marginRight: isRTL ? 0 : 16,
                  marginLeft: isRTL ? 16 : 0,
                }}
              >
                <Ionicons name={item.icon} size={20} color={item.iconColor} />
              </View>
              <View>
                <Text
                  className="font-medium text-base"
                  style={{
                    color: item.isDestructive ? "#EF4444" : colors.text,
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {item.title}
                </Text>
                {item.subtitle && (
                  <Text
                    className="text-sm"
                    style={{
                      color: colors.textSecondary,
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {item.subtitle}
                  </Text>
                )}
              </View>
            </View>
            <Ionicons
              name={isRTL ? "chevron-back" : "chevron-forward"}
              size={20}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

