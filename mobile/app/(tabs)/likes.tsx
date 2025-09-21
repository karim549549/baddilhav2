import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mockItems } from "../../data/mockDataNew";
import ScreenHeader from "../../src/components/layout/ScreenHeader";
import LikedItemCard from "../../src/components/ui/LikedItemCard";
import StatsCard from "../../src/components/ui/StatsCard";
import { useLanguage } from "../../src/contexts/LanguageContext";
import { useTheme } from "../../src/contexts/ThemeContext";
import { MockItem } from "../../types";
import { getThemeColors } from "../../utils/theme";

interface LikedItem extends MockItem {
  likedAt: Date;
  isMatched: boolean;
  matchStatus?: "pending" | "matched" | "rejected";
}

function LikesScreenContent() {
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();
  const { t, isRTL } = useLanguage();
  const colors = getThemeColors(isDark);
  const [likedItems] = useState<LikedItem[]>([
    {
      ...mockItems[0], // FIFA 26 PS5
      likedAt: new Date("2024-01-16T10:30:00"),
      isMatched: true,
      matchStatus: "matched",
    },
    {
      ...mockItems[1], // GTA 6 Xbox
      likedAt: new Date("2024-01-16T09:15:00"),
      isMatched: false,
      matchStatus: "pending",
    },
    {
      ...mockItems[2], // iPhone 15 Pro
      likedAt: new Date("2024-01-15T16:45:00"),
      isMatched: true,
      matchStatus: "matched",
    },
    {
      ...mockItems[4], // Nike Air Jordan
      likedAt: new Date("2024-01-15T14:20:00"),
      isMatched: false,
      matchStatus: "rejected",
    },
  ]);

  const handleItemPress = (item: LikedItem) => {
    Alert.alert(
      t("likes.itemDetails"),
      t("likes.itemDetailsDesc", { itemName: item.name })
    );
  };

  const handleChatPress = (item: LikedItem) => {
    if (item.isMatched) {
      Alert.alert(
        t("likes.openChat"),
        t("likes.openChatDesc", { itemName: item.name })
      );
    } else {
      Alert.alert(t("likes.noMatchYet"), t("likes.noMatchYetDesc"));
    }
  };

  const handleRemoveLike = (item: LikedItem) => {
    Alert.alert(
      t("likes.removeLike"),
      t("likes.removeLikeDesc", { itemName: item.name })
    );
  };

  const getMatchStatusColor = (status: string) => {
    switch (status) {
      case "matched":
        return "#10B981"; // Green
      case "pending":
        return "#F59E0B"; // Yellow
      case "rejected":
        return "#EF4444"; // Red
      default:
        return "#6B7280"; // Gray
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
      return t("likes.timeAgo.hoursAgo", { hours: diffInHours });
    return t("likes.timeAgo.daysAgo", { days: Math.floor(diffInHours / 24) });
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
      <ScreenHeader title={t("likes.title")} subtitle={t("likes.subtitle")} />

      {/* Stats */}
      <StatsCard
        stats={[
          {
            value: likedItems.length,
            label: t("likes.totalLikes"),
            color: "#FD297B",
          },
          {
            value: likedItems.filter((item) => item.isMatched).length,
            label: t("likes.matches"),
            color: "#10B981",
          },
          {
            value: likedItems.filter((item) => item.matchStatus === "pending")
              .length,
            label: t("likes.pending"),
            color: "#F59E0B",
          },
        ]}
      />

      {/* Liked Items List */}
      <ScrollView className="flex-1 px-4 py-4">
        {likedItems.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons
              name="heart-outline"
              size={64}
              color={colors.textTertiary}
            />
            <Text
              className="text-lg font-medium mt-4 text-center"
              style={{ color: colors.textSecondary }}
            >
              {t("likes.noLikesYet")}
            </Text>
            <Text
              className="text-sm text-center mt-2"
              style={{ color: colors.textTertiary }}
            >
              {t("likes.noLikesYetDesc")}
            </Text>
          </View>
        ) : (
          likedItems.map((item) => (
            <LikedItemCard
              key={item.id}
              item={item}
              onPress={() => handleItemPress(item)}
              onMessagePress={() => handleChatPress(item)}
            />
          ))
        )}
      </ScrollView>

      {/* Bottom Spacing */}
      <View className="h-20" />
    </View>
  );
}

export default function LikesScreen() {
  return <LikesScreenContent />;
}
