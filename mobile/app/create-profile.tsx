import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CreateProfileScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [displayName, setDisplayName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [distancePreference, setDistancePreference] = useState(25);
  const [swapRadius, setSwapRadius] = useState(10);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const categories = [
    'Electronics', 'Clothing', 'Books', 'Sports', 'Home & Garden',
    'Collectibles', 'Music', 'Gaming', 'Fashion', 'Other'
  ];

  const distanceOptions = [5, 10, 25, 50];

  const handleNext = () => {
    if (currentStep === 1 && !displayName.trim()) {
      Alert.alert('Error', 'Please enter your display name');
      return;
    }
    if (currentStep === 2 && selectedCategories.length === 0) {
      Alert.alert('Error', 'Please select at least one category');
      return;
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete profile creation
      handleCompleteProfile();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteProfile = () => {
    // TODO: Save user profile data
    Alert.alert(
      'Profile Created! 🎉',
      'Welcome to Baddilha! You can now start swapping items.',
      [
        {
          text: 'Get Started',
          onPress: () => router.replace('/(tabs)')
        }
      ]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const renderStep1 = () => (
    <View className="flex-1 px-6">
      <View className="items-center mb-8">
        <Ionicons name="person-add" size={80} color="#FD297B" />
        <Text className="text-3xl font-bold text-gray-800 mt-4 text-center">
          Welcome to Baddilha!
        </Text>
        <Text className="text-gray-600 text-lg mt-2 text-center">
          Let&apos;s set up your profile to start swapping items
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-gray-700 font-semibold text-lg mb-2">
          What should we call you?
        </Text>
        <TextInput
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Enter your display name"
          className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-lg"
          autoFocus
        />
      </View>

      <Text className="text-gray-500 text-center text-sm">
        This is how other users will see you in the app
      </Text>
    </View>
  );

  const renderStep2 = () => (
    <View className="flex-1 px-6">
      <View className="items-center mb-8">
        <Ionicons name="grid" size={80} color="#FD297B" />
        <Text className="text-3xl font-bold text-gray-800 mt-4 text-center">
          What interests you?
        </Text>
        <Text className="text-gray-600 text-lg mt-2 text-center">
          Select categories you&apos;d like to see items from
        </Text>
      </View>

      <View className="flex-row flex-wrap justify-between">
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => toggleCategory(category)}
            className={`w-[48%] p-4 rounded-xl mb-3 border-2 ${
              selectedCategories.includes(category)
                ? 'border-pink-500 bg-pink-50'
                : 'border-gray-300 bg-white'
            }`}
          >
            <Text className={`text-center font-semibold ${
              selectedCategories.includes(category)
                ? 'text-pink-600'
                : 'text-gray-700'
            }`}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View className="flex-1 px-6">
      <View className="items-center mb-8">
        <Ionicons name="location" size={80} color="#FD297B" />
        <Text className="text-3xl font-bold text-gray-800 mt-4 text-center">
          Location & Discovery
        </Text>
        <Text className="text-gray-600 text-lg mt-2 text-center">
          Set your preferences for finding items
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-gray-700 font-semibold text-lg mb-3">
          How far should we show items?
        </Text>
        <View className="flex-row justify-between">
          {distanceOptions.map((distance) => (
            <TouchableOpacity
              key={distance}
              onPress={() => setDistancePreference(distance)}
              className={`px-4 py-3 rounded-lg border-2 ${
                distancePreference === distance
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-300 bg-white'
              }`}
            >
              <Text className={`font-semibold ${
                distancePreference === distance
                  ? 'text-pink-600'
                  : 'text-gray-700'
              }`}>
                {distance} km
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-gray-700 font-semibold text-lg mb-3">
          How far will you travel for swaps?
        </Text>
        <View className="flex-row justify-between">
          {[5, 10, 15, 20].map((radius) => (
            <TouchableOpacity
              key={radius}
              onPress={() => setSwapRadius(radius)}
              className={`px-4 py-3 rounded-lg border-2 ${
                swapRadius === radius
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-300 bg-white'
              }`}
            >
              <Text className={`font-semibold ${
                swapRadius === radius
                  ? 'text-pink-600'
                  : 'text-gray-700'
              }`}>
                {radius} km
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View className="flex-1 px-6">
      <View className="items-center mb-8">
        <Ionicons name="checkmark-circle" size={80} color="#FD297B" />
        <Text className="text-3xl font-bold text-gray-800 mt-4 text-center">
          Almost Done!
        </Text>
        <Text className="text-gray-600 text-lg mt-2 text-center">
          Review your preferences and complete setup
        </Text>
      </View>

      <View className="bg-gray-50 rounded-xl p-4 mb-6">
        <Text className="text-gray-700 font-semibold text-lg mb-3">
          Your Profile Summary
        </Text>
        <View className="space-y-2">
          <Text className="text-gray-600">
            <Text className="font-semibold">Name:</Text> {displayName}
          </Text>
          <Text className="text-gray-600">
            <Text className="font-semibold">Categories:</Text> {selectedCategories.join(', ')}
          </Text>
          <Text className="text-gray-600">
            <Text className="font-semibold">Discovery Range:</Text> {distancePreference} km
          </Text>
          <Text className="text-gray-600">
            <Text className="font-semibold">Swap Radius:</Text> {swapRadius} km
          </Text>
        </View>
      </View>

      <Text className="text-gray-500 text-center text-sm">
        You can change these settings later in your profile
      </Text>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="bg-white border-b border-gray-200 px-6 py-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={handleBack} disabled={currentStep === 1}>
            <Ionicons 
              name="arrow-back" 
              size={24} 
              color={currentStep === 1 ? '#D1D5DB' : '#374151'} 
            />
          </TouchableOpacity>
          
          <Text className="text-lg font-semibold text-gray-800">
            Step {currentStep} of 4
          </Text>
          
          <View className="w-6" />
        </View>
      </View>

      {/* Progress Bar */}
      <View className="bg-white px-6 py-3 border-b border-gray-200">
        <View className="flex-row space-x-2">
          {[1, 2, 3, 4].map((step) => (
            <View
              key={step}
              className={`flex-1 h-1 rounded-full ${
                step <= currentStep ? 'bg-pink-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {renderCurrentStep()}
      </ScrollView>

      {/* Bottom Button */}
      <View className="bg-white border-t border-gray-200 px-6 py-4">
        <TouchableOpacity
          onPress={handleNext}
          className="bg-pink-500 py-4 rounded-xl items-center"
        >
          <Text className="text-white font-semibold text-lg">
            {currentStep === 4 ? 'Complete Profile' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 