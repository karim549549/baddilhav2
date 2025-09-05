import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { gradientColors } from "../../utils/theme";

export default function AuthScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleProviderAuth = (provider: string) => {
    console.log(`Auth with ${provider}`);

    if (provider === "phone") {
      router.push("/(auth)/phone-input");
    } else {
      // TODO: Implement Google/Apple auth logic
      // For now, redirect to create-profile
      router.replace("/create-profile");
    }
  };

  return (
    <LinearGradient
      colors={gradientColors}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      {/* Logo and App Name - Centered */}
      <View className="flex-row items-center justify-center mb-8">
        <Ionicons name="swap-horizontal" size={48} color="white" />
        <Text className="text-white text-5xl font-bold ml-2">BADDILHA</Text>
      </View>

      {/* Tagline */}
      <Text className="text-white text-lg text-center px-8 mb-16">
        Discover amazing items in your area and swap with people who share your
        interests
      </Text>

      {/* Bottom Section - Aligned to bottom */}
      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 20,
          left: 0,
          right: 0,
          paddingHorizontal: 24,
        }}
      >
        {/* Auth Providers */}
        <View className="w-full mb-6">
          <TouchableOpacity
            className="w-full py-4 px-6 bg-white rounded-full flex-row items-center justify-center shadow-lg my-1"
            onPress={() => handleProviderAuth("google")}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <AntDesign name="google" size={20} color="#DB4437" />
            <Text className="text-gray-800 text-base font-semibold ml-3">
              Continue with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full py-4 px-6 bg-white rounded-full flex-row items-center justify-center shadow-lg my-1"
            onPress={() => handleProviderAuth("apple")}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <FontAwesome name="apple" size={20} color="#000" />
            <Text className="text-gray-800 text-base font-semibold ml-3">
              Continue with Apple
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full py-4 px-6 bg-white rounded-full flex-row items-center justify-center shadow-lg my-1"
            onPress={() => handleProviderAuth("phone")}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Ionicons name="call" size={20} color="#007AFF" />
            <Text className="text-gray-800 text-base font-semibold ml-3">
              Continue with Phone
            </Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <View className="w-full px-4">
          <Text className="text-white text-xs text-center leading-5">
            By continuing, you agree to our{" "}
            <Text className="underline font-semibold">Terms of Service</Text>
            {" and "}
            <Text className="underline font-semibold">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}
