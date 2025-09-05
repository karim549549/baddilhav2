
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { gradientColors } from '../../utils/theme';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [user] = useState({
    username: 'swap_master',
    displayName: 'Alex',
    avatar: 'https://via.placeholder.com/100x100/FD297B/FFFFFF?text=A',
    rating: 4.8,
    totalSwaps: 15,
    itemsCount: 8,
    location: 'Dubai, UAE',
    memberSince: '2024'
  });

  const handleAddItem = () => {
    Alert.alert('Add Item', 'This feature will be implemented in the next phase');
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'This feature will be implemented in the next phase');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'This feature will be implemented in the next phase');
  };

  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      style={{ paddingTop: insets.top }}
    >
      {/* Header */}
      <LinearGradient
        colors={gradientColors}
        className="px-4 py-6"
      >
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-white text-2xl font-bold">Profile</Text>
          <TouchableOpacity onPress={handleSettings}>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View className="items-center">
          <View className="w-24 h-24 rounded-full bg-white/20 mb-4 overflow-hidden">
            <Image
              source={{ uri: user.avatar }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-white text-xl font-bold mb-1">{user.displayName}</Text>
          <Text className="text-white/80 text-sm mb-2">@{user.username}</Text>
          
          {/* Stats */}
          <View className="flex-row space-x-6 mt-4">
            <View className="items-center">
              <Text className="text-white text-xl font-bold">{user.rating}</Text>
              <Text className="text-white/80 text-xs">Rating</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-xl font-bold">{user.totalSwaps}</Text>
              <Text className="text-white/80 text-xs">Swaps</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-xl font-bold">{user.itemsCount}</Text>
              <Text className="text-white/80 text-xs">Items</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View className="px-4 py-4">
        <TouchableOpacity 
          className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between"
          onPress={handleAddItem}
        >
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="add-circle" size={24} color="#10B981" />
            </View>
            <View>
              <Text className="text-gray-800 font-semibold text-lg">Add New Item</Text>
              <Text className="text-gray-500 text-sm">List an item for swapping</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between"
          onPress={handleEditProfile}
        >
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="person-circle" size={24} color="#3B82F6" />
            </View>
            <View>
              <Text className="text-gray-800 font-semibold text-lg">Edit Profile</Text>
              <Text className="text-gray-500 text-sm">Update your information</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between"
          onPress={() => router.push('/create-profile')}
        >
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="settings" size={24} color="#8B5CF6" />
            </View>
            <View>
              <Text className="text-gray-800 font-semibold text-lg">Create Profile</Text>
              <Text className="text-gray-500 text-sm">Set up your preferences</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* My Items Section */}
      <View className="px-4 py-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-gray-800 font-bold text-lg">My Items</Text>
          <TouchableOpacity>
            <Text className="text-pink-500 font-semibold">View All</Text>
          </TouchableOpacity>
        </View>
        
        <View className="bg-white rounded-xl p-4">
          <Text className="text-gray-600 text-center py-8">
            You haven&apos;t added any items yet.{'\n'}
            <Text className="text-pink-500 font-semibold" onPress={handleAddItem}>
              Add your first item
            </Text>
          </Text>
        </View>
      </View>

      {/* Account Info */}
      <View className="px-4 py-4">
        <Text className="text-gray-800 font-bold text-lg mb-4">Account Info</Text>
        
        <View className="bg-white rounded-xl overflow-hidden">
          <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <Text className="text-gray-600">Location</Text>
            <Text className="text-gray-800 font-medium">{user.location}</Text>
          </View>
          <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <Text className="text-gray-600">Member Since</Text>
            <Text className="text-gray-800 font-medium">{user.memberSince}</Text>
          </View>
          <View className="flex-row items-center justify-between p-4">
            <Text className="text-gray-600">Account Status</Text>
            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              <Text className="text-green-600 font-medium">Verified</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Spacing */}
      <View className="h-20" />
    </ScrollView>
  );
}
