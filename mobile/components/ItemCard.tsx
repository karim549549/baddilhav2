import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { ItemCategory, ItemCondition, MockItem } from '../types';

const { width, height } = Dimensions.get('window');

interface ItemCardProps {
  item: MockItem;
  isFirst?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, isFirst = false }) => {
  const getCategoryIcon = (category: ItemCategory) => {
    switch (category) {
      case ItemCategory.GAMING:
        return 'game-controller';
      case ItemCategory.ELECTRONICS:
        return 'phone-portrait';
      case ItemCategory.COLLECTIBLES:
        return 'star';
      case ItemCategory.ACCESSORIES:
        return 'headset';
      case ItemCategory.CLOTHING:
        return 'shirt';
      case ItemCategory.BOOKS:
        return 'book';
      case ItemCategory.SPORTS:
        return 'football';
      default:
        return 'cube';
    }
  };

  const getConditionColor = (condition: ItemCondition) => {
    switch (condition) {
      case ItemCondition.NEW:
        return '#10B981'; // Green
      case ItemCondition.LIKE_NEW:
        return '#059669'; // Dark green
      case ItemCondition.EXCELLENT:
        return '#3B82F6'; // Blue
      case ItemCondition.GOOD:
        return '#8B5CF6'; // Purple
      case ItemCondition.FAIR:
        return '#F59E0B'; // Yellow
      case ItemCondition.POOR:
        return '#EF4444'; // Red
      default:
        return '#6B7280'; // Gray
    }
  };

  const getConditionText = (condition: ItemCondition) => {
    switch (condition) {
      case ItemCondition.NEW:
        return 'New';
      case ItemCondition.LIKE_NEW:
        return 'Like New';
      case ItemCondition.EXCELLENT:
        return 'Excellent';
      case ItemCondition.GOOD:
        return 'Good';
      case ItemCondition.FAIR:
        return 'Fair';
      case ItemCondition.POOR:
        return 'Poor';
      default:
        return 'Unknown';
    }
  };

  return (
    <View className="flex-1 rounded-2xl overflow-hidden w-full h-full bg-white shadow-lg">
      {/* Item Image - Full Screen */}
      <View className="flex-1 relative">
        <Image
          source={require('../assets/images/placeholder.jpg')}
          className="w-full h-full"
          resizeMode="cover"
        />
        
        {/* Top Badges - Minimal */}
        <View className="absolute top-4 left-4 right-4 flex-row justify-between">
          {/* Category Badge */}
          <View className="bg-white/95 rounded-full px-3 py-2 flex-row items-center shadow-sm">
            <Ionicons 
              name={getCategoryIcon(item.category) as any} 
              size={16} 
              color="#FD297B" 
            />
            <Text className="text-gray-800 font-semibold text-sm ml-2 capitalize">
              {item.category}
            </Text>
          </View>

          {/* Condition Badge */}
          <View 
            className="rounded-full px-3 py-2 shadow-sm"
            style={{ backgroundColor: getConditionColor(item.condition) + 'F0' }}
          >
            <Text className="text-white text-sm font-bold">
              {getConditionText(item.condition)}
            </Text>
          </View>
        </View>

        {/* Bottom Content - All Item Data */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
          className="absolute bottom-0 left-0 right-0 p-6"
        >
          {/* Item Name - Large and Prominent */}
          <Text className="text-white text-3xl font-bold mb-3">
            {item.name}
          </Text>
          
          {/* Item Description */}
          <Text className="text-white/90 text-base mb-4 leading-5">
            {item.description}
          </Text>
          
          {/* Item Details Grid */}
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-3">
              {/* Brand & Year */}
              <View className="flex-row items-center">
                {item.brand && (
                  <View className="bg-white/20 rounded-full px-3 py-1 mr-3">
                    <Text className="text-white font-semibold text-sm">
                      {item.brand}
                    </Text>
                  </View>
                )}
                {item.year && (
                  <View className="bg-white/20 rounded-full px-3 py-1">
                    <Text className="text-white font-semibold text-sm">
                      {item.year}
                    </Text>
                  </View>
                )}
              </View>
              
              {/* Estimated Value */}
              {item.estimatedValue && (
                <View className="bg-pink-500 rounded-full px-4 py-2">
                  <Text className="text-white font-bold text-lg">
                    ~${item.estimatedValue}
                  </Text>
                </View>
              )}
            </View>
            
            {/* Tags */}
            <View className="flex-row flex-wrap mb-3">
              {item.tags.slice(0, 4).map((tag, index) => (
                <View key={index} className="bg-white/20 rounded-full px-3 py-1 mr-2 mb-1">
                  <Text className="text-white/90 text-xs font-medium">
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Owner Info & Distance */}
          <View className="flex-row items-center justify-between">
            {/* Owner Info */}
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-full bg-white/20 mr-3 overflow-hidden border-2 border-white/30">
                <Image
                  source={{ uri: item.mockOwner.avatar }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <View>
                <Text className="text-white font-bold text-lg">
                  {item.mockOwner.username}
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text className="text-white/90 text-sm ml-1 font-medium">
                    {item.mockOwner.rating} rating
                  </Text>
                </View>
              </View>
            </View>
            
            {/* Distance */}
            <View className="bg-white/20 rounded-full px-4 py-2">
              <View className="flex-row items-center">
                <Ionicons name="location" size={16} color="white" />
                <Text className="text-white font-bold text-sm ml-1">
                  {item.distance} km
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default ItemCard; 