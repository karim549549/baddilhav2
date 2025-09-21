import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useLanguage } from "../../src/contexts/LanguageContext";
import { gradientColors } from "../../utils/theme";

function AuthScreenContent() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const [loading, setLoading] = useState<boolean>(false);

  const HandleGoogleAuth = () => {
    setLoading(true);
    // Simulate auth process
    setTimeout(() => {
      setLoading(false);
      console.log("Google auth clicked - redirecting to home");
      // Redirect to home page
      router.replace("/(tabs)");
    }, 1000);
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
      <View
        className={`flex-row items-center justify-center mb-8 ${isRTL ? "flex-row-reverse" : ""}`}
      >
        <Ionicons name="swap-horizontal" size={48} color="white" />
        <Text
          className={`text-white text-5xl font-bold ${isRTL ? "mr-2" : "ml-2"}`}
        >
          {t("home.title")}
        </Text>
      </View>

      {/* Tagline */}
      <Text className="text-white text-lg text-center px-8 mb-16">
        {t("auth.tagline")}
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
        {/* Google Button Only */}
        <View className="w-full mb-6">
          <TouchableOpacity
            onPress={HandleGoogleAuth}
            disabled={loading}
            className="w-full py-4 px-6 bg-white rounded-full flex-row items-center justify-center shadow-lg my-1"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              opacity: loading ? 0.7 : 1,
            }}
          >
            <AntDesign name="google" size={20} color="#DB4437" />
            <Text
              className={`text-gray-800 text-base font-semibold ${isRTL ? "mr-3" : "ml-3"}`}
            >
              {loading ? t("auth.signingIn") : t("auth.continueWithGoogle")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <View className="w-full px-4">
          <Text className="text-white text-xs text-center leading-5">
            {t("auth.agreeTerms", {
              terms: t("auth.termsOfService"),
              privacy: t("auth.privacyPolicy"),
            })}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

export default function AuthScreen() {
  return <AuthScreenContent />;
}
