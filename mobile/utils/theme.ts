import { ColorValue } from "react-native";

export const gradientColors: readonly [ColorValue, ColorValue, ColorValue] = [
  "#FD297B",
  "#FF5864",
  "#FF655B",
];

// Theme colors
export const lightTheme = {
  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#F3F4F6',
  
  // Text colors
  text: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  
  // Border colors
  border: '#E5E7EB',
  borderSecondary: '#D1D5DB',
  
  // Card colors
  card: '#FFFFFF',
  cardSecondary: '#F9FAFB',
  
  // Tab bar
  tabBar: 'rgba(255, 255, 255, 0.95)',
  tabBarBorder: '#E5E7EB',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Swipe action colors
  like: '#10B981',
  nope: '#EF4444',
  superLike: '#3B82F6',
  dislike: '#6B7280',
};

export const darkTheme = {
  // Background colors
  background: '#000000',
  backgroundSecondary: '#111827',
  backgroundTertiary: '#1F2937',
  
  // Text colors
  text: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textTertiary: '#9CA3AF',
  
  // Border colors
  border: '#374151',
  borderSecondary: '#4B5563',
  
  // Card colors
  card: '#111827',
  cardSecondary: '#1F2937',
  
  // Tab bar
  tabBar: 'rgba(0, 0, 0, 0.95)',
  tabBarBorder: '#374151',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Swipe action colors
  like: '#10B981',
  nope: '#EF4444',
  superLike: '#3B82F6',
  dislike: '#6B7280',
};

export type Theme = typeof lightTheme;

// Helper function to get theme colors
export const getThemeColors = (isDark: boolean): Theme => {
  return isDark ? darkTheme : lightTheme;
};
