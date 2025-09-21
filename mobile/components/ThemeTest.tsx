import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../src/contexts/ThemeContext";
import { getThemeColors } from "../utils/theme";

export default function ThemeTest() {
  const { theme, themeMode, isDark, setThemeMode } = useTheme();
  const colors = getThemeColors(isDark);

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        margin: 10,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Theme Test
      </Text>

      <Text style={{ color: colors.textSecondary, marginBottom: 5 }}>
        Current Theme: {theme}
      </Text>
      <Text style={{ color: colors.textSecondary, marginBottom: 5 }}>
        Theme Mode: {themeMode}
      </Text>
      <Text style={{ color: colors.textSecondary, marginBottom: 15 }}>
        Is Dark: {isDark ? "Yes" : "No"}
      </Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity
          style={{
            backgroundColor:
              themeMode === "light" ? colors.info : colors.border,
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => setThemeMode("light")}
        >
          <Text
            style={{ color: themeMode === "light" ? "white" : colors.text }}
          >
            Light
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: themeMode === "dark" ? colors.info : colors.border,
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => setThemeMode("dark")}
        >
          <Text style={{ color: themeMode === "dark" ? "white" : colors.text }}>
            Dark
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor:
              themeMode === "system" ? colors.info : colors.border,
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => setThemeMode("system")}
        >
          <Text
            style={{ color: themeMode === "system" ? "white" : colors.text }}
          >
            System
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
