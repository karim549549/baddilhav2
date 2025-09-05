
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getItemsByCategory, mockItems } from '../../data/mockDataNew';
import { ItemCategory, MockItem } from '../../types';
import { gradientColors } from '../../utils/theme';

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | null>(null);
  const [filteredItems, setFilteredItems] = useState<MockItem[]>(mockItems);

  const categories = [
    { key: ItemCategory.GAMING, label: 'Gaming', icon: 'game-controller', color: '#FF6B6B' },
    { key: ItemCategory.ELECTRONICS, label: 'Electronics', icon: 'phone-portrait', color: '#4ECDC4' },
    { key: ItemCategory.COLLECTIBLES, label: 'Collectibles', icon: 'star', color: '#45B7D1' },
    { key: ItemCategory.ACCESSORIES, label: 'Accessories', icon: 'headset', color: '#96CEB4' },
    { key: ItemCategory.CLOTHING, label: 'Clothing', icon: 'shirt', color: '#FFEAA7' },
    { key: ItemCategory.BOOKS, label: 'Books', icon: 'book', color: '#DDA0DD' },
    { key: ItemCategory.SPORTS, label: 'Sports', icon: 'football', color: '#98D8C8' },
    { key: ItemCategory.OTHER, label: 'Other', icon: 'cube', color: '#F7DC6F' }
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
    if (query.trim() === '') {
      setFilteredItems(selectedCategory ? getItemsByCategory(selectedCategory) : mockItems);
    } else {
      const filtered = (selectedCategory ? getItemsByCategory(selectedCategory) : mockItems).filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredItems(filtered);
    }
  };

  const handleItemPress = (item: MockItem) => {
    Alert.alert('View Item', `This will show details for ${item.name}`);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setFilteredItems(mockItems);
  };

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <LinearGradient
        colors={gradientColors}
        className="px-4 py-4"
      >
        <Text className="text-white text-2xl font-bold mb-2">Explore</Text>
        <Text className="text-white/80 text-sm">
          Discover items to swap in your area
        </Text>
      </LinearGradient>

      {/* Search Bar */}
      <View className="px-4 py-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-3 text-gray-800"
            placeholder="Search items, brands, categories..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#9CA3AF"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="bg-white px-4 py-4 border-b border-gray-200"
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            className={`mr-3 px-4 py-2 rounded-full border-2 ${
              selectedCategory === category.key
                ? 'border-pink-500 bg-pink-50'
                : 'border-gray-200 bg-white'
            }`}
            onPress={() => handleCategoryPress(category.key)}
          >
            <View className="flex-row items-center">
              <Ionicons 
                name={category.icon as any} 
                size={16} 
                color={selectedCategory === category.key ? '#FD297B' : category.color} 
              />
              <Text 
                className={`ml-2 font-semibold text-sm ${
                  selectedCategory === category.key ? 'text-pink-500' : 'text-gray-700'
                }`}
              >
                {category.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Clear Filters */}
      {(selectedCategory || searchQuery) && (
        <View className="px-4 py-2 bg-gray-100">
          <TouchableOpacity onPress={clearFilters}>
            <Text className="text-pink-500 font-semibold text-center">
              Clear all filters
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Results Count */}
      <View className="px-4 py-3 bg-white border-b border-gray-200">
        <Text className="text-gray-600 text-sm">
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
          {selectedCategory && ` in ${categories.find(c => c.key === selectedCategory)?.label}`}
          {searchQuery && ` for "${searchQuery}"`}
        </Text>
      </View>

      {/* Items Grid */}
      <ScrollView className="flex-1 px-4 py-4">
        {filteredItems.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="search-outline" size={64} color="#9CA3AF" />
            <Text className="text-gray-500 text-lg font-medium mt-4 text-center">
              No items found
            </Text>
            <Text className="text-gray-400 text-sm text-center mt-2">
              Try adjusting your search or filters
            </Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {filteredItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="w-[48%] bg-white rounded-xl mb-4 overflow-hidden shadow-sm"
                onPress={() => handleItemPress(item)}
              >
                <Image
                  source={{ uri: item.photos[0] }}
                  className="w-full h-32"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text className="text-gray-800 font-semibold text-sm mb-1" numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text className="text-gray-500 text-xs mb-2" numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-pink-500 font-bold text-xs">
                      ~${item.estimatedValue}
                    </Text>
                    <Text className="text-gray-400 text-xs">
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
