import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide header for all tabs
        tabBarActiveTintColor: "#FD297B", // Tinder pink
        tabBarInactiveTintColor: "#9CA3AF", // Better gray
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0, // Remove default border
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10, // Android shadow
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        // Smooth tab transitions
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Swap",
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`p-2 rounded-full ${focused ? 'bg-pink-50' : ''}`}>
              <Ionicons 
                name={focused ? "swap-horizontal" : "swap-horizontal-outline"} 
                size={size} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`p-2 rounded-full ${focused ? 'bg-pink-50' : ''}`}>
              <Ionicons 
                name={focused ? "search" : "search-outline"} 
                size={size} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          title: "Likes",
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`p-2 rounded-full ${focused ? 'bg-pink-50' : ''}`}>
              <Ionicons 
                name={focused ? "heart" : "heart-outline"} 
                size={size} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`p-2 rounded-full ${focused ? 'bg-pink-50' : ''}`}>
              <Ionicons 
                name={focused ? "chatbubbles" : "chatbubbles-outline"} 
                size={size} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`p-2 rounded-full ${focused ? 'bg-pink-50' : ''}`}>
              <Ionicons 
                name={focused ? "person" : "person-outline"} 
                size={size} 
                color={color} 
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
