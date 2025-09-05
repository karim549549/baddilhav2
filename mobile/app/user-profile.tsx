import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mockItems } from '../data/mockDataNew';
import { ItemCategory, ItemCondition, MockItem } from '../types';
import { gradientColors } from '../utils/theme';

interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  rating: number;
  totalItems: number;
  totalSwaps: number;
  memberSince: Date;
  bio: string;
}

const { width: screenWidth } = Dimensions.get('window');

export default function UserProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userItems, setUserItems] = useState<MockItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | null>(null);


  // Mock user profile data
  useEffect(() => {
    const userId = params.userId || 'user1';
    
    setUserProfile({
      id: userId as string,
      username: 'gamer123',
      avatar: '',
      rating: 4.8,
      totalItems: 12,
      totalSwaps: 8,
      memberSince: new Date('2023-06-15'),
      bio: 'Gaming enthusiast with a passion for collecting and swapping games. Always looking for rare finds!'
    });

    // Filter items for this user
    const userItems = mockItems.filter(item => item.ownerId === userId);
    setUserItems(userItems);
  }, [params.userId]);

  // Filter items based on selected category
  const filteredItems = selectedCategory && userItems.length > 0
    ? userItems.filter(item => item.category === selectedCategory)
    : userItems || [];

  const handleLikeItem = (item: MockItem) => {
    Alert.alert(
      'Like Item',
      `Do you want to like ${item.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Like', 
          onPress: () => {
            Alert.alert('Liked!', 'Item added to your likes. You\'ll be notified if the owner likes one of your items too!');
          }
        }
      ]
    );
  };

  const handleSwapItem = (item: MockItem) => {
    Alert.alert(
      'Swap Item',
      `Do you want to propose a swap for ${item.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Propose Swap', 
          onPress: () => {
            Alert.alert('Swap Proposed!', 'Your swap proposal has been sent. The owner will review and respond soon!');
          }
        }
      ]
    );
  };

  const handleChat = (item: MockItem) => {
    router.push(`/chat-detail?chatId=chat_${item.id}`);
  };

  const getCategoryIcon = (category: ItemCategory) => {
    switch (category) {
      case ItemCategory.GAMING: return 'game-controller';
      case ItemCategory.ELECTRONICS: return 'phone-portrait';
      case ItemCategory.CLOTHING: return 'shirt';
      case ItemCategory.BOOKS: return 'book';
      case ItemCategory.SPORTS: return 'football';
      case ItemCategory.COLLECTIBLES: return 'star';
      case ItemCategory.ACCESSORIES: return 'watch';
      case ItemCategory.OTHER: return 'cube';
      default: return 'cube';
    }
  };

  const getConditionColor = (condition: ItemCondition) => {
    switch (condition) {
      case ItemCondition.NEW: return '#10B981';
      case ItemCondition.LIKE_NEW: return '#3B82F6';
      case ItemCondition.EXCELLENT: return '#3B82F6';
      case ItemCondition.GOOD: return '#F59E0B';
      case ItemCondition.FAIR: return '#EF4444';
      case ItemCondition.POOR: return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getConditionText = (condition: ItemCondition) => {
    switch (condition) {
      case ItemCondition.NEW: return 'New';
      case ItemCondition.LIKE_NEW: return 'Like New';
      case ItemCondition.EXCELLENT: return 'Excellent';
      case ItemCondition.GOOD: return 'Good';
      case ItemCondition.FAIR: return 'Fair';
      case ItemCondition.POOR: return 'Poor';
      default: return 'Unknown';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  if (!userProfile) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-500">Loading profile...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <LinearGradient
        colors={gradientColors}
        className="px-4 py-4"
      >
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View className="flex-1 mx-4">
            <Text className="text-white text-lg font-semibold text-center">
              User Profile
            </Text>
          </View>
          
          <View className="w-6" />
        </View>
      </LinearGradient>

      {/* User Info Section */}
      <View className="bg-white px-4 py-6 border-b border-gray-200">
        <View className="flex-row items-center mb-4">
          {/* Avatar */}
          <View className="w-20 h-20 rounded-full overflow-hidden mr-4 bg-pink-400 items-center justify-center">
            {userProfile.avatar ? (
              <Image 
                source={{ uri: userProfile.avatar }} 
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-white font-bold text-3xl">
                {userProfile.username.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
          
          {/* User Details */}
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-800 mb-1">
              {userProfile.username}
            </Text>
            <Text className="text-gray-600 text-sm mb-2">
              Member since {formatDate(userProfile.memberSince)}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text className="text-gray-700 font-semibold ml-1">
                {userProfile.rating} rating
              </Text>
            </View>
          </View>
        </View>
        
        {/* Bio */}
        <Text className="text-gray-700 text-base leading-5 mb-4">
          {userProfile.bio}
        </Text>
        
        {/* Stats */}
        <View className="flex-row justify-around bg-gray-50 rounded-xl p-4">
          <View className="items-center">
            <Text className="text-2xl font-bold text-gray-800">{userProfile.totalItems}</Text>
            <Text className="text-gray-600 text-sm">Items</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-gray-800">{userProfile.totalSwaps}</Text>
            <Text className="text-gray-600 text-sm">Swaps</Text>
          </View>
        </View>
      </View>

      {/* Category Filter */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full mr-2 ${
              selectedCategory === null ? 'bg-pink-500' : 'bg-gray-200'
            }`}
          >
            <Text className={`font-medium ${
              selectedCategory === null ? 'text-white' : 'text-gray-700'
            }`}>
              All
            </Text>
          </TouchableOpacity>
          
          {Object.values(ItemCategory).map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full mr-2 ${
                selectedCategory === category ? 'bg-pink-500' : 'bg-gray-200'
              }`}
            >
              <Text className={`font-medium ${
                selectedCategory === category ? 'text-white' : 'text-gray-700'
              }`}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Items Count */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-700 font-medium">
            {filteredItems?.length || 0} items found
          </Text>
        </View>
      </View>

      {/* Items Grid */}
      <ScrollView className="flex-1 px-4 py-4">
        {!filteredItems || filteredItems.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="cube-outline" size={64} color="#9CA3AF" />
            <Text className="text-gray-500 text-lg font-medium mt-4 text-center">
              No items found
            </Text>
            <Text className="text-gray-400 text-sm text-center mt-2">
              {selectedCategory ? `No ${selectedCategory.toLowerCase()} items available` : 'This user has no items yet'}
            </Text>
          </View>
        ) : (
          // Grid View Only
          <View className="flex-row flex-wrap justify-between">
            {filteredItems?.map((item) => (
              <View key={item.id} className="w-[48%] bg-white rounded-xl mb-4 overflow-hidden shadow-sm">
                <View className="h-32 bg-gray-200 items-center justify-center">
                  <Ionicons name="image" size={32} color="#9CA3AF" />
                </View>
                
                <View className="p-3">
                  <Text className="text-gray-800 font-semibold text-sm mb-1" numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text className="text-gray-600 text-xs mb-2" numberOfLines={2}>
                    {item.description}
                  </Text>
                  
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="bg-pink-100 rounded-full px-2 py-1">
                      <Text className="text-pink-600 text-xs font-medium">
                        {item.estimatedValue ? `$${item.estimatedValue}` : 'Free'}
                      </Text>
                    </View>
                    <View className="bg-gray-100 rounded-full px-2 py-1">
                      <Text className="text-gray-600 text-xs">
                        {item.distance} km
                      </Text>
                    </View>
                  </View>
                  
                  <View className="flex-row">
                    <TouchableOpacity
                      onPress={() => handleLikeItem(item)}
                      className="flex-1 bg-pink-500 py-2 rounded-lg items-center mr-1"
                    >
                      <Ionicons name="heart" size={16} color="white" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      onPress={() => handleSwapItem(item)}
                      className="flex-1 bg-blue-500 py-2 rounded-lg items-center ml-1"
                    >
                      <Ionicons name="swap-horizontal" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
} 