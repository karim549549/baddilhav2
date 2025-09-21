import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { getThemeColors } from "../../../utils/theme";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

interface ChatPreview {
  id: string;
  itemName: string;
  itemImage: string;
  username: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

interface ChatPreviewCardProps {
  chat: ChatPreview;
  onPress: () => void;
}

export default function ChatPreviewCard({
  chat,
  onPress,
}: ChatPreviewCardProps) {
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);

  return (
    <TouchableOpacity
      className="flex-row items-center p-4 border-b"
      style={{
        backgroundColor: colors.card,
        borderBottomColor: colors.border,
        flexDirection: isRTL ? "row-reverse" : "row",
      }}
      onPress={onPress}
    >
      {/* Item Image */}
      <View className="relative">
        <Image
          source={{ uri: chat.itemImage }}
          className="w-12 h-12 rounded-lg"
          resizeMode="cover"
        />
        {chat.isOnline && (
          <View
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2"
            style={{
              backgroundColor: "#10B981",
              borderColor: colors.card,
            }}
          />
        )}
      </View>

      {/* Chat Info */}
      <View
        className="flex-1 mx-3"
        style={{ marginLeft: isRTL ? 0 : 12, marginRight: isRTL ? 12 : 0 }}
      >
        <View
          className="flex-row items-center justify-between mb-1"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <Text
            className="font-semibold text-base"
            style={{
              color: colors.text,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {chat.username}
          </Text>
          <Text
            className="text-xs"
            style={{
              color: colors.textTertiary,
              textAlign: isRTL ? "left" : "right",
            }}
          >
            {chat.timestamp}
          </Text>
        </View>

        <Text
          className="text-sm mb-1"
          style={{
            color: colors.textSecondary,
            textAlign: isRTL ? "right" : "left",
          }}
          numberOfLines={1}
        >
          {chat.itemName}
        </Text>

        <Text
          className="text-sm"
          style={{
            color: colors.textTertiary,
            textAlign: isRTL ? "right" : "left",
          }}
          numberOfLines={1}
        >
          {chat.lastMessage}
        </Text>
      </View>

      {/* Unread Badge */}
      {chat.unreadCount > 0 && (
        <View
          className="w-6 h-6 rounded-full items-center justify-center"
          style={{ backgroundColor: "#FD297B" }}
        >
          <Text className="text-white text-xs font-bold">
            {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

