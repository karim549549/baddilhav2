import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { getThemeColors, gradientColors } from "../../../utils/theme";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

interface User {
  displayName: string;
  username: string;
  avatar: string;
  rating: number;
  totalSwaps: number;
  itemsCount: number;
  location: string;
  memberSince: string;
}

interface UserProfileCardProps {
  user: User;
  onEditPress?: () => void;
  onAddItemPress?: () => void;
}

export default function UserProfileCard({
  user,
  onEditPress,
  onAddItemPress,
}: UserProfileCardProps) {
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);

  return (
    <LinearGradient colors={gradientColors} className="px-4 py-6">
      <View
        className="flex-row items-center justify-between mb-6"
        style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
      >
        <Text
          className="text-white text-2xl font-bold"
          style={{ textAlign: isRTL ? "right" : "left" }}
        >
          {t("profile.title")}
        </Text>
        <TouchableOpacity onPress={onEditPress}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View className="items-center">
        <View className="w-24 h-24 rounded-full bg-white/20 mb-4 overflow-hidden">
          <Image
            source={{ uri: user.avatar }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <Text className="text-white text-xl font-bold mb-1">
          {user.displayName}
        </Text>
        <Text className="text-white/80 text-sm mb-2">@{user.username}</Text>

        {/* Stats */}
        <View
          className="flex-row space-x-6 mt-4"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <View className="items-center">
            <Text className="text-white text-xl font-bold">{user.rating}</Text>
            <Text className="text-white/80 text-xs">
              {t("profile.stats.rating")}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-xl font-bold">
              {user.totalSwaps}
            </Text>
            <Text className="text-white/80 text-xs">
              {t("profile.stats.swaps")}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-xl font-bold">
              {user.itemsCount}
            </Text>
            <Text className="text-white/80 text-xs">
              {t("profile.stats.items")}
            </Text>
          </View>
        </View>

        {/* Location */}
        <View
          className="flex-row items-center mt-3"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <Ionicons
            name="location-outline"
            size={14}
            color="rgba(255,255,255,0.8)"
            style={{
              marginRight: isRTL ? 0 : 4,
              marginLeft: isRTL ? 4 : 0,
            }}
          />
          <Text className="text-white/80 text-xs">{user.location}</Text>
        </View>

        {/* Member Since */}
        <Text className="text-white/60 text-xs mt-1">
          {t("profile.memberSince", { year: user.memberSince })}
        </Text>
      </View>

      {/* Action Buttons */}
      <View
        className="flex-row space-x-3 mt-6"
        style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
      >
        <TouchableOpacity
          className="flex-1 bg-white/20 rounded-full py-3"
          onPress={onEditPress}
        >
          <Text className="text-white text-center font-medium">
            {t("profile.editProfile")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-white/20 rounded-full py-3"
          onPress={onAddItemPress}
        >
          <Text className="text-white text-center font-medium">
            {t("profile.addNewItem")}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

