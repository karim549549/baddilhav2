import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { gradientColors } from "../../../utils/theme";
import { useLanguage } from "../../contexts/LanguageContext";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export default function ScreenHeader({
  title,
  subtitle,
  rightIcon,
  onRightIconPress,
  showBackButton = false,
  onBackPress,
}: ScreenHeaderProps) {
  const { isRTL } = useLanguage();

  return (
    <LinearGradient colors={gradientColors} className="px-4 py-4">
      <View
        className="flex-row items-center justify-between mb-2"
        style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
      >
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress}>
            <Ionicons
              name={isRTL ? "arrow-forward" : "arrow-back"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        )}

        <Text
          className="text-white text-2xl font-bold flex-1"
          style={{
            textAlign: isRTL ? "right" : "left",
            marginHorizontal: showBackButton ? 12 : 0,
          }}
        >
          {title}
        </Text>

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Ionicons name={rightIcon} size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {subtitle && (
        <Text
          className="text-white/80 text-sm"
          style={{ textAlign: isRTL ? "right" : "left" }}
        >
          {subtitle}
        </Text>
      )}
    </LinearGradient>
  );
}

