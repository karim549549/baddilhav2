import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PhoneInputScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+1",
    flag: "🇺🇸",
    name: "United States",
    minLength: 10,
    maxLength: 10,
  });
  const [showCountryModal, setShowCountryModal] = useState(false);

  const countries = [
    {
      code: "+1",
      flag: "🇺🇸",
      name: "United States",
      minLength: 10,
      maxLength: 10,
    },
    { code: "+1", flag: "🇨🇦", name: "Canada", minLength: 10, maxLength: 10 },
    {
      code: "+44",
      flag: "🇬🇧",
      name: "United Kingdom",
      minLength: 10,
      maxLength: 11,
    },
    { code: "+33", flag: "🇫🇷", name: "France", minLength: 10, maxLength: 10 },
    { code: "+49", flag: "🇩🇪", name: "Germany", minLength: 10, maxLength: 12 },
    { code: "+39", flag: "🇮🇹", name: "Italy", minLength: 10, maxLength: 11 },
    { code: "+34", flag: "🇪🇸", name: "Spain", minLength: 9, maxLength: 9 },
    { code: "+7", flag: "🇷🇺", name: "Russia", minLength: 10, maxLength: 10 },
    { code: "+86", flag: "🇨🇳", name: "China", minLength: 11, maxLength: 11 },
    { code: "+81", flag: "🇯🇵", name: "Japan", minLength: 10, maxLength: 11 },
    {
      code: "+82",
      flag: "🇰🇷",
      name: "South Korea",
      minLength: 10,
      maxLength: 11,
    },
    { code: "+91", flag: "🇮🇳", name: "India", minLength: 10, maxLength: 10 },
    { code: "+55", flag: "🇧🇷", name: "Brazil", minLength: 10, maxLength: 11 },
    { code: "+52", flag: "🇲🇽", name: "Mexico", minLength: 10, maxLength: 10 },
    { code: "+61", flag: "🇦🇺", name: "Australia", minLength: 9, maxLength: 9 },
    { code: "+20", flag: "🇪🇬", name: "Egypt", minLength: 11, maxLength: 11 },
  ];

  const handleSendOTP = () => {
    // Dismiss keyboard first
    Keyboard.dismiss();

    if (!phoneNumber.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }

    const phoneLength = phoneNumber.length;
    if (
      phoneLength < selectedCountry.minLength ||
      phoneLength > selectedCountry.maxLength
    ) {
      Alert.alert(
        "Invalid Phone Number",
        `Phone number for ${selectedCountry.name} must be ${selectedCountry.minLength}-${selectedCountry.maxLength} digits`
      );
      return;
    }

    const fullPhoneNumber = `${selectedCountry.code}${phoneNumber}`;
    console.log("Sending OTP to:", fullPhoneNumber);

    // TODO: Call API to send OTP
    // For now, navigate to OTP screen
    router.push({
      pathname: "/(auth)/otp-verification",
      params: { phoneNumber: fullPhoneNumber },
    });
  };

  const selectCountry = (country: any) => {
    setSelectedCountry(country);
    setShowCountryModal(false);
    setPhoneNumber(""); // Clear phone number when country changes
  };

  return (
    <TouchableOpacity
      className="flex-1 bg-gray-50"
      style={{ paddingTop: insets.top }}
      activeOpacity={1}
      onPress={Keyboard.dismiss}
    >
      {/* Header */}
      <View className="bg-white border-b border-gray-200 px-6 py-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-gray-800 text-lg font-semibold">
            Phone Number
          </Text>
          <View className="w-6" />
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 py-8">
        {/* Logo */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-pink-500 rounded-full items-center justify-center mb-4">
            <Ionicons name="swap-horizontal" size={40} color="white" />
          </View>
          <Text className="text-gray-800 text-3xl font-bold">BADDILHA</Text>
        </View>

        {/* Title */}
        <Text className="text-gray-800 text-2xl font-bold text-center mb-2">
          Enter your phone number
        </Text>
        <Text className="text-gray-600 text-base text-center mb-8">
          We'll send you a verification code via SMS
        </Text>

        {/* Phone Input Card */}
        <TouchableOpacity
          className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100"
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <Text className="text-gray-700 font-semibold text-base mb-4">
            Phone Number
          </Text>

          <View className="flex-row items-center">
            {/* Country Picker */}
            <TouchableOpacity
              onPress={() => setShowCountryModal(true)}
              className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 mr-3 border border-gray-200"
            >
              <Text className="text-2xl mr-2">{selectedCountry.flag}</Text>
              <Text className="text-gray-700 font-semibold">
                {selectedCountry.code}
              </Text>
              <Ionicons
                name="chevron-down"
                size={16}
                color="#666"
                className="ml-2"
              />
            </TouchableOpacity>

            {/* Phone Input */}
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder={`Enter ${selectedCountry.minLength}-${selectedCountry.maxLength} digit number`}
              keyboardType="phone-pad"
              maxLength={selectedCountry.maxLength}
              className="flex-1 bg-gray-50 rounded-xl px-4 py-4 text-gray-700 text-base border border-gray-200"
              placeholderTextColor="#999"
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <Text className="text-gray-500 text-sm mt-2">
            {selectedCountry.name} numbers are {selectedCountry.minLength}-
            {selectedCountry.maxLength} digits
          </Text>
        </TouchableOpacity>

        {/* Send OTP Button */}
        <TouchableOpacity
          onPress={handleSendOTP}
          className="bg-blue-500 rounded-full py-4 px-6 flex-row items-center justify-center shadow-lg"
          style={{
            shadowColor: "#3B82F6",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Ionicons name="send" size={20} color="white" className="mr-2" />
          <Text className="text-white text-base font-semibold">Send Code</Text>
        </TouchableOpacity>
      </View>

      {/* Country Selection Modal */}
      <Modal
        visible={showCountryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCountryModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl max-h-96">
            <View className="px-6 py-4 border-b border-gray-200">
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-800 text-lg font-semibold">
                  Select Country
                </Text>
                <TouchableOpacity onPress={() => setShowCountryModal(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView className="max-h-80">
              {countries.map((country, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectCountry(country)}
                  className="flex-row items-center px-6 py-4 border-b border-gray-100"
                >
                  <Text className="text-2xl mr-4">{country.flag}</Text>
                  <View className="flex-1">
                    <Text className="text-gray-800 font-medium">
                      {country.name}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      {country.code}
                    </Text>
                  </View>
                  {selectedCountry.code === country.code && (
                    <Ionicons name="checkmark" size={20} color="#3B82F6" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}
