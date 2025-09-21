import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { getThemeColors } from "../../../utils/theme";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
}

export default function SearchBar({
  placeholder,
  value,
  onChangeText,
  onClear,
}: SearchBarProps) {
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
        className="flex-row items-center rounded-full px-4 py-3"
        style={{
          backgroundColor: colors.backgroundTertiary,
          flexDirection: isRTL ? "row-reverse" : "row",
        }}
      >
        <Ionicons name="search" size={20} color={colors.textTertiary} />
        <TextInput
          className="flex-1"
          style={{
            color: colors.text,
            marginLeft: isRTL ? 0 : 12,
            marginRight: isRTL ? 12 : 0,
            textAlign: isRTL ? "right" : "left",
            writingDirection: isRTL ? "rtl" : "ltr",
          }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.textTertiary}
        />
        {value.length > 0 && onClear && (
          <TouchableOpacity onPress={onClear}>
            <Ionicons
              name="close-circle"
              size={20}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

