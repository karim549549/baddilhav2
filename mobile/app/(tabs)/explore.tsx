import { Ionicons } from "@expo/vector-icons";
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
import { getItemsByCategory, mockItems } from "../../data/mockDataNew";
import ScreenHeader from "../../src/components/layout/ScreenHeader";
import CategoryFilter from "../../src/components/ui/CategoryFilter";
import SearchBar from "../../src/components/ui/SearchBar";
import { useLanguage } from "../../src/contexts/LanguageContext";
import { useTheme } from "../../src/contexts/ThemeContext";
import { ItemCategory, MockItem } from "../../types";
import { getThemeColors } from "../../utils/theme";

function ExploreScreenContent() {
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();
  const { t, isRTL } = useLanguage();
  const colors = getThemeColors(isDark);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | null>(
    null
  );
  const [filteredItems, setFilteredItems] = useState<MockItem[]>(mockItems);

  const categories = [
    {
      key: ItemCategory.GAMING,
      label: t("explore.categories.gaming"),
      icon: "game-controller",
      color: "#FF6B6B",
    },
    {
      key: ItemCategory.ELECTRONICS,
      label: t("explore.categories.electronics"),
      icon: "phone-portrait",
      color: "#4ECDC4",
    },
    {
      key: ItemCategory.COLLECTIBLES,
      label: t("explore.categories.collectibles"),
      icon: "star",
      color: "#45B7D1",
    },
    {
      key: ItemCategory.ACCESSORIES,
      label: t("explore.categories.accessories"),
      icon: "headset",
      color: "#96CEB4",
    },
    {
      key: ItemCategory.CLOTHING,
      label: t("explore.categories.clothing"),
      icon: "shirt",
      color: "#FFEAA7",
    },
    {
      key: ItemCategory.BOOKS,
      label: t("explore.categories.books"),
      icon: "book",
      color: "#DDA0DD",
    },
    {
      key: ItemCategory.SPORTS,
      label: t("explore.categories.sports"),
      icon: "football",
      color: "#98D8C8",
    },
    {
      key: ItemCategory.OTHER,
      label: t("explore.categories.other"),
      icon: "cube",
      color: "#F7DC6F",
    },
  ];

  const handleCategoryPress = (category: ItemCategory) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setFilteredItems(mockItems);
    } else {
      setSelectedCategory(category);
      setFilteredItems(getItemsByCategory(category));
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredItems(
        selectedCategory ? getItemsByCategory(selectedCategory) : mockItems
      );
    } else {
      const filtered = (
        selectedCategory ? getItemsByCategory(selectedCategory) : mockItems
      ).filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
      );
      setFilteredItems(filtered);
    }
  };

  const handleItemPress = (item: MockItem) => {
    Alert.alert(
      t("explore.viewItem"),
      t("explore.viewItemDesc", { itemName: item.name })
    );
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery("");
    setFilteredItems(mockItems);
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
      <ScreenHeader
        title={t("explore.title")}
        subtitle={t("explore.subtitle")}
      />

      {/* Search Bar */}
      <SearchBar
        placeholder={t("explore.searchPlaceholder")}
        value={searchQuery}
        onChangeText={handleSearch}
        onClear={() => handleSearch("")}
      />

      {/* Category Filters */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryPress={handleCategoryPress}
      />

      {/* Clear Filters */}
      {(selectedCategory || searchQuery) && (
        <View
          className="px-4 py-2"
          style={{ backgroundColor: colors.backgroundTertiary }}
        >
          <TouchableOpacity onPress={clearFilters}>
            <Text className="text-pink-500 font-semibold text-center">
              {t("explore.clearFilters")}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Results Count */}
      <View
        className="px-4 py-3 border-b"
        style={{
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
        }}
      >
        <Text className="text-sm" style={{ color: colors.textSecondary }}>
          {t("explore.itemsFound", { count: filteredItems.length })}
          {selectedCategory &&
            ` ${t("explore.itemsFoundIn", {
              count: filteredItems.length,
              category: categories.find((c) => c.key === selectedCategory)
                ?.label,
            })}`}
          {searchQuery &&
            ` ${t("explore.itemsFoundFor", {
              count: filteredItems.length,
              query: searchQuery,
            })}`}
        </Text>
      </View>

      {/* Items Grid */}
      <ScrollView className="flex-1 px-4 py-4">
        {filteredItems.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons
              name="search-outline"
              size={64}
              color={colors.textTertiary}
            />
            <Text
              className="text-lg font-medium mt-4 text-center"
              style={{ color: colors.textSecondary }}
            >
              {t("explore.noItemsFound")}
            </Text>
            <Text
              className="text-sm text-center mt-2"
              style={{ color: colors.textTertiary }}
            >
              {t("explore.noItemsFoundDesc")}
            </Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {filteredItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="w-[48%] rounded-xl mb-4 overflow-hidden shadow-sm"
                style={{ backgroundColor: colors.card }}
                onPress={() => handleItemPress(item)}
              >
                <Image
                  source={{ uri: item.photos[0] }}
                  className="w-full h-32"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text
                    className="font-semibold text-sm mb-1"
                    style={{ color: colors.text }}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text
                    className="text-xs mb-2"
                    style={{ color: colors.textSecondary }}
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-pink-500 font-bold text-xs">
                      ~${item.estimatedValue}
                    </Text>
                    <Text
                      className="text-xs"
                      style={{ color: colors.textTertiary }}
                    >
                      📍 {item.distance}km
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Spacing */}
      <View className="h-20" />
    </View>
  );
}

export default function ExploreScreen() {
  return <ExploreScreenContent />;
}
