
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mockItems } from '../../data/mockDataNew';
import { MockItem } from '../../types';
import { gradientColors } from '../../utils/theme';

interface LikedItem extends MockItem {
  likedAt: Date;
  isMatched: boolean;
  matchStatus?: 'pending' | 'matched' | 'rejected';
}

export default function LikesScreen() {
  const insets = useSafeAreaInsets();
  const [likedItems] = useState<LikedItem[]>([
    {
      ...mockItems[0], // FIFA 26 PS5
      likedAt: new Date('2024-01-16T10:30:00'),
      isMatched: true,
      matchStatus: 'matched'
    },
    {
      ...mockItems[1], // GTA 6 Xbox
      likedAt: new Date('2024-01-16T09:15:00'),
      isMatched: false,
      matchStatus: 'pending'
    },
    {
      ...mockItems[2], // iPhone 15 Pro
      likedAt: new Date('2024-01-15T16:45:00'),
      isMatched: true,
      matchStatus: 'matched'
    },
    {
      ...mockItems[4], // Nike Air Jordan
      likedAt: new Date('2024-01-15T14:20:00'),
      isMatched: false,
      matchStatus: 'rejected'
    }
  ]);

  const handleItemPress = (item: LikedItem) => {
    Alert.alert('Item Details', `This will show details for ${item.name}`);
  };

  const handleChatPress = (item: LikedItem) => {
    if (item.isMatched) {
      Alert.alert('Open Chat', `Start chatting about ${item.name}`);
    } else {
      Alert.alert('No Match Yet', `Wait for the owner to like one of your items`);
    }
  };

  const handleRemoveLike = (item: LikedItem) => {
    Alert.alert('Remove Like', `Remove ${item.name} from your likes?`);
  };

  const getMatchStatusColor = (status: string) => {
    switch (status) {
      case 'matched':
        return '#10B981'; // Green
      case 'pending':
        return '#F59E0B'; // Yellow
      case 'rejected':
        return '#EF4444'; // Red
      default:
        return '#6B7280'; // Gray
    }
  };

  const getMatchStatusText = (status: string) => {
    switch (status) {
      case 'matched':
        return 'Matched! 💚';
      case 'pending':
        return 'Waiting... ⏳';
      case 'rejected':
        return 'No Match ❌';
      default:
        return 'Unknown';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <LinearGradient
        colors={gradientColors}
        className="px-4 py-4"
      >
        <Text className="text-white text-2xl font-bold mb-2">My Likes</Text>
        <Text className="text-white/80 text-sm">
          Items you&apos;ve liked and potential matches
        </Text>
      </LinearGradient>

      {/* Stats */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row justify-around">
          <View className="items-center">
            <Text className="text-2xl font-bold text-pink-500">{likedItems.length}</Text>
            <Text className="text-gray-600 text-sm">Total Likes</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-green-500">
              {likedItems.filter(item => item.isMatched).length}
            </Text>
            <Text className="text-gray-600 text-sm">Matches</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-yellow-500">
              {likedItems.filter(item => item.matchStatus === 'pending').length}
            </Text>
            <Text className="text-gray-600 text-sm">Pending</Text>
          </View>
        </View>
      </View>

      {/* Liked Items List */}
      <ScrollView className="flex-1 px-4 py-4">
        {likedItems.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="heart-outline" size={64} color="#9CA3AF" />
            <Text className="text-gray-500 text-lg font-medium mt-4 text-center">
              No likes yet
            </Text>
            <Text className="text-gray-400 text-sm text-center mt-2">
              Start swiping to like items and get matched!
            </Text>
          </View>
        ) : (
          likedItems.map((item) => (
            <View key={item.id} className="bg-white rounded-xl mb-4 overflow-hidden shadow-sm">
              {/* Item Image and Status */}
              <View className="relative">
                <Image
                  source={{ uri: item.photos[0] }}
                  className="w-full h-48"
                  resizeMode="cover"
                />
                
                {/* Match Status Badge */}
                <View 
                  className="absolute top-3 right-3 px-3 py-1 rounded-full"
                  style={{ backgroundColor: getMatchStatusColor(item.matchStatus || '') + 'E6' }}
                >
                  <Text className="text-white text-xs font-bold">
                    {getMatchStatusText(item.matchStatus || '')}
                  </Text>
                </View>

                {/* Liked Time */}
                <View className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 rounded-full">
                  <Text className="text-white text-xs">
                    ❤️ {formatTimeAgo(item.likedAt)}
                  </Text>
                </View>
              </View>

              {/* Item Info */}
              <View className="p-4">
                <Text className="text-gray-800 font-semibold text-lg mb-2">
                  {item.name}
                </Text>
                <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>
                  {item.description}
                </Text>
                
                {/* Item Details */}
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center">
                    <Ionicons name="location" size={16} color="#9CA3AF" />
                    <Text className="text-gray-500 text-sm ml-1">
                      {item.distance} km away
                    </Text>
                  </View>
                  <Text className="text-pink-500 font-bold">
                    ~${item.estimatedValue}
                  </Text>
                </View>

                {/* Owner Info */}
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center">
                    <View className="w-8 h-8 rounded-full bg-gray-300 mr-3 overflow-hidden">
                      <Image
                        source={{ uri: item.mockOwner.avatar }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>
                    <View>
                      <Text className="text-gray-800 font-medium text-sm">
                        {item.mockOwner.username}
                      </Text>
                      <View className="flex-row items-center">
                        <Ionicons name="star" size={12} color="#FFD700" />
                        <Text className="text-gray-500 text-xs ml-1">
                          {item.mockOwner.rating}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row space-x-3">
                  <TouchableOpacity
                    className={`flex-1 py-3 rounded-full ${
                      item.isMatched ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    onPress={() => handleChatPress(item)}
                    disabled={!item.isMatched}
                  >
                    <Text className={`text-center font-semibold ${
                      item.isMatched ? 'text-white' : 'text-gray-500'
                    }`}>
                      {item.isMatched ? 'Chat Now' : 'Waiting for Match'}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    className="bg-red-100 py-3 px-4 rounded-full"
                    onPress={() => handleRemoveLike(item)}
                  >
                    <Ionicons name="heart-dislike" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Bottom Spacing */}
      <View className="h-20" />
    </View>
  );
}
