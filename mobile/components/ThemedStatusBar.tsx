import React from "react";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../src/contexts/ThemeContext";

export default function ThemedStatusBar() {
  const { isDark } = useTheme();

  return <StatusBar style={isDark ? "light" : "dark"} />;
}
