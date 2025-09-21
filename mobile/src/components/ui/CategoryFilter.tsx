import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ItemCategory } from "../../../types";
import { getThemeColors } from "../../../utils/theme";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

interface Category {
  key: ItemCategory;
  label: string;
  icon: string;
  color: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: ItemCategory | null;
  onCategoryPress: (category: ItemCategory) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryPress,
}: CategoryFilterProps) {
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);

  return (
    <View
      className="px-4 py-4 border-b"
      style={{
        backgroundColor: colors.card,
        borderBottomColor: colors.border,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: isRTL ? 0 : 0,
          flexDirection: isRTL ? "row-reverse" : "row",
        }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            onPress={() => onCategoryPress(category.key)}
            className="mr-3"
            style={{
              backgroundColor:
                selectedCategory === category.key
                  ? category.color
                  : colors.backgroundTertiary,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              flexDirection: isRTL ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name={category.icon as keyof typeof Ionicons.glyphMap}
              size={16}
              color={
                selectedCategory === category.key
                  ? "white"
                  : colors.textSecondary
              }
              style={{
                marginRight: isRTL ? 0 : 6,
                marginLeft: isRTL ? 6 : 0,
              }}
            />
            <Text
              className="text-sm font-medium"
              style={{
                color:
                  selectedCategory === category.key
                    ? "white"
                    : colors.textSecondary,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
