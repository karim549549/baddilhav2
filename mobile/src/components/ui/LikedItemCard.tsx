import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { MockItem } from "../../../types";
import { getThemeColors } from "../../../utils/theme";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

interface LikedItem extends MockItem {
  likedAt: Date;
  isMatched: boolean;
  matchStatus?: "pending" | "matched" | "rejected";
}

interface LikedItemCardProps {
  item: LikedItem;
  onPress: () => void;
  onMessagePress?: () => void;
}

export default function LikedItemCard({
  item,
  onPress,
  onMessagePress,
}: LikedItemCardProps) {
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);

  const getMatchStatusColor = (status: string) => {
    switch (status) {
      case "matched":
        return "#10B981";
      case "pending":
        return "#F59E0B";
      case "rejected":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const getMatchStatusText = (status: string) => {
    switch (status) {
      case "matched":
        return t("likes.matchStatus.matched");
      case "pending":
        return t("likes.matchStatus.pending");
      case "rejected":
        return t("likes.matchStatus.rejected");
      default:
        return "Unknown";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return t("likes.timeAgo.justNow");
    if (diffInHours < 24)
      return t("likes.timeAgo.hoursAgo", { count: diffInHours });

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7)
      return t("likes.timeAgo.daysAgo", { count: diffInDays });

    const diffInWeeks = Math.floor(diffInDays / 7);
    return t("likes.timeAgo.weeksAgo", { count: diffInWeeks });
  };

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
      <Image
        source={{ uri: item.photos[0] }}
        className="w-16 h-16 rounded-lg"
        resizeMode="cover"
      />

      {/* Item Info */}
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
            {item.name}
          </Text>
          <Text
            className="text-xs"
            style={{
              color: colors.textTertiary,
              textAlign: isRTL ? "left" : "right",
            }}
          >
            {formatTimeAgo(item.likedAt)}
          </Text>
        </View>

        <Text
          className="text-sm mb-2"
          style={{
            color: colors.textSecondary,
            textAlign: isRTL ? "right" : "left",
          }}
          numberOfLines={2}
        >
          {item.description}
        </Text>

        {/* Match Status */}
        {item.matchStatus && (
          <View
            className="flex-row items-center"
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          >
            <View
              className="w-2 h-2 rounded-full mr-2"
              style={{
                backgroundColor: getMatchStatusColor(item.matchStatus),
                marginRight: isRTL ? 0 : 8,
                marginLeft: isRTL ? 8 : 0,
              }}
            />
            <Text
              className="text-xs font-medium"
              style={{
                color: getMatchStatusColor(item.matchStatus),
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {getMatchStatusText(item.matchStatus)}
            </Text>
          </View>
        )}
      </View>

      {/* Action Button */}
      {item.isMatched && onMessagePress && (
        <TouchableOpacity
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: "#FD297B" }}
          onPress={onMessagePress}
        >
          <Ionicons name="chatbubble" size={20} color="white" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}
