import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useTheme } from "../../src/contexts/ThemeContext";
import { useLanguage } from "../../src/contexts/LanguageContext";
import { getThemeColors } from "../../utils/theme";

function TabLayoutContent() {
  const { isDark } = useTheme();
  const { t, isRTL } = useLanguage();
  const colors = getThemeColors(isDark);

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide header for all tabs
        tabBarShowLabel: false, // Hide tab labels
        tabBarActiveTintColor: "#FD297B", // Tinder pink
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopWidth: 0, // Remove default border
          borderTopColor: colors.tabBarBorder,
          shadowColor: isDark ? "#000" : "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: isDark ? 0.3 : 0.1,
          shadowRadius: 8,
          elevation: 10, // Android shadow
          paddingBottom: 4,
          paddingTop: 4,
          height: 50,
          flexDirection: isRTL ? "row-reverse" : "row",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 2,
          paddingHorizontal: 8,
        },
        // Smooth tab transitions
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("navigation.home"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "swap-horizontal" : "swap-horizontal-outline"}
              size={18}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t("navigation.explore"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={18}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          title: t("navigation.likes"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={18}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: t("navigation.chat"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              size={18}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("navigation.profile"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={18}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return <TabLayoutContent />;
}
