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
import LanguageSelector from "../../components/LanguageSelector";
import PersistenceTest from "../../components/PersistenceTest";
import ThemeToggle from "../../components/ThemeToggle";
import { useLanguage } from "../../src/contexts/LanguageContext";
import { useTheme } from "../../src/contexts/ThemeContext";
import { getThemeColors, gradientColors } from "../../utils/theme";

function ProfileScreenContent() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isDark } = useTheme();
  const { t, isRTL } = useLanguage();
  const colors = getThemeColors(isDark);
  const [user] = useState({
    username: "swap_master",
    displayName: "Alex",
    avatar: "https://via.placeholder.com/100x100/FD297B/FFFFFF?text=A",
    rating: 4.8,
    totalSwaps: 15,
    itemsCount: 8,
    location: "Dubai, UAE",
    memberSince: "2024",
  });

  const handleAddItem = () => {
    Alert.alert(t("profile.addNewItem"), t("profile.addNewItemDesc"));
  };

  const handleEditProfile = () => {
    Alert.alert(t("profile.editProfile"), t("profile.editProfileDesc"));
  };

  const handleSettings = () => {
    Alert.alert(t("settings.title"), t("settings.title"));
  };

  const handleLogout = () => {
    Alert.alert(t("profile.logout"), t("profile.logoutConfirm"), [
      {
        text: t("common.cancel"),
        style: "cancel",
      },
      {
        text: t("profile.logout"),
        style: "destructive",
        onPress: () => {
          console.log("User logged out");
          // TODO: Clear user session/tokens
          router.replace("/(auth)");
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(t("profile.deleteAccount"), t("profile.deleteAccountConfirm"), [
      {
        text: t("common.cancel"),
        style: "cancel",
      },
      {
        text: t("profile.deleteAccount"),
        style: "destructive",
        onPress: () => {
          Alert.alert(
            t("profile.deleteAccount"),
            t("profile.deleteAccountType"),
            [
              {
                text: t("common.cancel"),
                style: "cancel",
              },
              {
                text: t("profile.deleteAccount"),
                style: "destructive",
                onPress: () => {
                  console.log("Account deleted");
                  // TODO: Call API to delete account
                  router.replace("/(auth)");
                },
              },
            ]
          );
        },
      },
    ]);
  };

  return (
    <ScrollView
      className="flex-1"
      style={{
        paddingTop: insets.top,
        backgroundColor: colors.backgroundSecondary,
      }}
    >
      {/* Header */}
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
          <TouchableOpacity onPress={handleSettings}>
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
          <View className="flex-row space-x-6 mt-4">
            <View className="items-center">
              <Text className="text-white text-xl font-bold">
                {user.rating}
              </Text>
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
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View className="px-4 py-4">
        <TouchableOpacity
          className="rounded-xl p-4 mb-3 flex-row items-center justify-between"
          style={{ backgroundColor: colors.card }}
          onPress={handleAddItem}
        >
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="add-circle" size={24} color="#10B981" />
            </View>
            <View>
              <Text
                className="font-semibold text-lg"
                style={{ color: colors.text }}
              >
                {t("profile.addNewItem")}
              </Text>
              <Text className="text-sm" style={{ color: colors.textSecondary }}>
                {t("profile.addNewItemDesc")}
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.textTertiary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="rounded-xl p-4 mb-3 flex-row items-center justify-between"
          style={{ backgroundColor: colors.card }}
          onPress={handleEditProfile}
        >
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="person-circle" size={24} color="#3B82F6" />
            </View>
            <View>
              <Text
                className="font-semibold text-lg"
                style={{ color: colors.text }}
              >
                {t("profile.editProfile")}
              </Text>
              <Text className="text-sm" style={{ color: colors.textSecondary }}>
                {t("profile.editProfileDesc")}
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.textTertiary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="rounded-xl p-4 mb-3 flex-row items-center justify-between"
          style={{ backgroundColor: colors.card }}
          onPress={() => router.push("/create-profile")}
        >
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="settings" size={24} color="#8B5CF6" />
            </View>
            <View>
              <Text
                className="font-semibold text-lg"
                style={{ color: colors.text }}
              >
                {t("profile.createProfile")}
              </Text>
              <Text className="text-sm" style={{ color: colors.textSecondary }}>
                {t("profile.createProfileDesc")}
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.textTertiary}
          />
        </TouchableOpacity>
      </View>

      {/* My Items Section */}
      <View className="px-4 py-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="font-bold text-lg" style={{ color: colors.text }}>
            {t("profile.myItems")}
          </Text>
          <TouchableOpacity>
            <Text className="text-pink-500 font-semibold">
              {t("profile.viewAll")}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          className="rounded-xl p-4"
          style={{ backgroundColor: colors.card }}
        >
          <Text
            className="text-center py-8"
            style={{ color: colors.textSecondary }}
          >
            {t("profile.noItemsYet")}
            {"\n"}
            <Text
              className="text-pink-500 font-semibold"
              onPress={handleAddItem}
            >
              {t("profile.addFirstItem")}
            </Text>
          </Text>
        </View>
      </View>

      {/* Account Info */}
      <View className="px-4 py-4">
        <Text className="font-bold text-lg mb-4" style={{ color: colors.text }}>
          {t("profile.accountInfo")}
        </Text>

        <View
          className="rounded-xl overflow-hidden"
          style={{ backgroundColor: colors.card }}
        >
          <View
            className="flex-row items-center justify-between p-4 border-b"
            style={{ borderBottomColor: colors.border }}
          >
            <Text style={{ color: colors.textSecondary }}>
              {t("profile.location")}
            </Text>
            <Text className="font-medium" style={{ color: colors.text }}>
              {user.location}
            </Text>
          </View>
          <View
            className="flex-row items-center justify-between p-4 border-b"
            style={{ borderBottomColor: colors.border }}
          >
            <Text style={{ color: colors.textSecondary }}>
              {t("profile.memberSince")}
            </Text>
            <Text className="font-medium" style={{ color: colors.text }}>
              {user.memberSince}
            </Text>
          </View>
          <View className="flex-row items-center justify-between p-4">
            <Text style={{ color: colors.textSecondary }}>
              {t("profile.accountStatus")}
            </Text>
            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              <Text className="text-green-600 font-medium">
                {t("profile.verified")}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Account Actions */}
      <View className="px-4 py-4">
        <Text className="font-bold text-lg mb-4" style={{ color: colors.text }}>
          {t("profile.accountActions")}
        </Text>

        <View
          className="rounded-xl overflow-hidden"
          style={{ backgroundColor: colors.card }}
        >
          <LanguageSelector />
          <ThemeToggle />

          <TouchableOpacity
            className="flex-row items-center justify-between p-4 border-b"
            style={{
              borderBottomColor: colors.border,
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
            onPress={handleLogout}
          >
            <View
              className="flex-row items-center"
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            >
              <View
                className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center"
                style={{
                  marginRight: isRTL ? 0 : 16,
                  marginLeft: isRTL ? 16 : 0,
                }}
              >
                <Ionicons name="log-out-outline" size={20} color="#F97316" />
              </View>
              <Text
                className="font-medium text-base"
                style={{
                  color: colors.text,
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                {t("profile.logout")}
              </Text>
            </View>
            <Ionicons
              name={isRTL ? "chevron-back" : "chevron-forward"}
              size={20}
              color={colors.textTertiary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between p-4"
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            onPress={handleDeleteAccount}
          >
            <View
              className="flex-row items-center"
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            >
              <View
                className="w-10 h-10 bg-red-100 rounded-full items-center justify-center"
                style={{
                  marginRight: isRTL ? 0 : 16,
                  marginLeft: isRTL ? 16 : 0,
                }}
              >
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </View>
              <Text
                className="text-red-600 font-medium text-base"
                style={{ textAlign: isRTL ? "right" : "left" }}
              >
                {t("profile.deleteAccount")}
              </Text>
            </View>
            <Ionicons
              name={isRTL ? "chevron-back" : "chevron-forward"}
              size={20}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Persistence Test - Remove this after testing */}
      <View className="px-4 py-4">
        <PersistenceTest />
      </View>

      {/* Bottom Spacing */}
      <View className="h-20" />
    </ScrollView>
  );
}

export default function ProfileScreen() {
  return <ProfileScreenContent />;
}
