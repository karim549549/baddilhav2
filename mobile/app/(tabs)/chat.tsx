import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "../../src/contexts/LanguageContext";
import { useTheme } from "../../src/contexts/ThemeContext";
import { getThemeColors, gradientColors } from "../../utils/theme";

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

function ChatScreenContent() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isDark } = useTheme();
  const { t, isRTL } = useLanguage();
  const colors = getThemeColors(isDark);
  const [chats] = useState<ChatPreview[]>([
    {
      id: "1",
      itemName: "FIFA 26 PS5",
      itemImage: "https://via.placeholder.com/60x60/FF6B6B/FFFFFF?text=FIFA",
      username: "gamer123",
      lastMessage: "Hey! I have GTA 6 for Xbox, want to swap?",
      timestamp: "2m ago",
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: "2",
      itemName: "iPhone 15 Pro",
      itemImage: "https://via.placeholder.com/60x60/45B7D1/FFFFFF?text=iPhone",
      username: "tech_geek",
      lastMessage: "Perfect! When can we meet?",
      timestamp: "1h ago",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "3",
      itemName: "Nike Air Jordan 1",
      itemImage: "https://via.placeholder.com/60x60/FFEAA7/FFFFFF?text=Jordan",
      username: "sneaker_head",
      lastMessage: "Size 10 fits perfectly!",
      timestamp: "3h ago",
      unreadCount: 2,
      isOnline: true,
    },
  ]);

  const handleChatPress = (chat: ChatPreview) => {
    router.push(`/chat-detail?chatId=${chat.id}`);
  };

  const handleNewChat = () => {
    Alert.alert(t("chat.newChat"), t("chat.newChatDesc"));
  };

  return (
    <View
      className="flex-1"
      style={{
        paddingTop: insets.top,
        backgroundColor: colors.backgroundSecondary,
      }}
    >
      {/* Header */}
      <LinearGradient colors={gradientColors} className="px-4 py-4">
        <View
          className="flex-row items-center justify-between"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <Text
            className="text-white text-2xl font-bold"
            style={{ textAlign: isRTL ? "right" : "left" }}
          >
            {t("chat.title")}
          </Text>
          <TouchableOpacity onPress={handleNewChat}>
            <Ionicons name="add-circle" size={28} color="white" />
          </TouchableOpacity>
        </View>
        <Text
          className="text-white/80 text-sm mt-1"
          style={{ textAlign: isRTL ? "right" : "left" }}
        >
          {t("chat.subtitle")}
        </Text>
      </LinearGradient>

      {/* Chat List */}
      <ScrollView className="flex-1 px-4 py-4">
        {chats.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons
              name="chatbubbles-outline"
              size={64}
              color={colors.textTertiary}
            />
            <Text
              className="text-lg font-medium mt-4 text-center"
              style={{ color: colors.textSecondary }}
            >
              {t("chat.noChatsYet")}
            </Text>
            <Text
              className="text-sm text-center mt-2"
              style={{ color: colors.textTertiary }}
            >
              {t("chat.noChatsYetDesc")}
            </Text>
          </View>
        ) : (
          chats.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              className="rounded-xl p-4 mb-3 flex-row items-center"
              style={{ backgroundColor: colors.card }}
              onPress={() => handleChatPress(chat)}
            >
              {/* Item Image */}
              <View className="w-16 h-16 rounded-lg overflow-hidden mr-4">
                <Image
                  source={{ uri: chat.itemImage }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Chat Info */}
              <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                  <Text
                    className="font-semibold text-lg"
                    style={{ color: colors.text }}
                  >
                    {chat.username}
                  </Text>
                  <Text
                    className="text-xs"
                    style={{ color: colors.textTertiary }}
                  >
                    {chat.timestamp}
                  </Text>
                </View>

                <Text
                  className="text-sm mb-1"
                  style={{ color: colors.textSecondary }}
                  numberOfLines={1}
                >
                  {chat.itemName}
                </Text>

                <Text
                  className="text-sm"
                  style={{ color: colors.textSecondary }}
                  numberOfLines={1}
                >
                  {chat.lastMessage}
                </Text>
              </View>

              {/* Status Indicators */}
              <View className="items-end ml-3">
                {/* Online Status */}
                <View
                  className={`w-3 h-3 rounded-full mb-2 ${chat.isOnline ? "bg-green-500" : "bg-gray-300"}`}
                />

                {/* Unread Count */}
                {chat.unreadCount > 0 && (
                  <View className="bg-pink-500 rounded-full w-6 h-6 items-center justify-center">
                    <Text className="text-white text-xs font-bold">
                      {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Bottom Spacing */}
      <View className="h-20" />
    </View>
  );
}

export default function ChatScreen() {
  return <ChatScreenContent />;
}
