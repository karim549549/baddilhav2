import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "../../src/contexts/LanguageContext";

export default function OTPVerificationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, isRTL } = useLanguage();
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-send when all 6 digits are entered
    const updatedOtp = [...newOtp];
    if (updatedOtp.every((digit) => digit !== "") && updatedOtp.length === 6) {
      setTimeout(() => {
        handleVerifyOTP();
      }, 500); // Small delay for better UX
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      Alert.alert("Error", "Please enter the complete 6-digit code");
      return;
    }

    console.log("Verifying OTP:", otpCode, "for phone:", phoneNumber);

    // TODO: Call API to verify OTP
    // For now, simulate success and redirect to profile
    Alert.alert("Success! 🎉", "Phone number verified successfully", [
      {
        text: "Continue",
        onPress: () => router.replace("/create-profile"),
      },
    ]);
  };

  const handleResendOTP = async () => {
    if (isResending || resendCooldown > 0) return;

    setIsResending(true);
    console.log("Resending OTP to:", phoneNumber);

    // TODO: Call API to resend OTP
    setTimeout(() => {
      setTimeLeft(60);
      setResendCooldown(30); // 30 seconds cooldown between resends
      setIsResending(false);
      Alert.alert("Code Sent", "A new verification code has been sent");
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
            Verify Phone
          </Text>
          <View className="w-6" />
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 py-8">
        {/* Logo */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mb-4">
            <Ionicons name="checkmark" size={40} color="white" />
          </View>
          <Text className="text-gray-800 text-3xl font-bold">BADDILHA</Text>
        </View>

        {/* Title */}
        <Text className="text-gray-800 text-2xl font-bold text-center mb-2">
          Enter verification code
        </Text>
        <Text className="text-gray-600 text-base text-center mb-8">
          We sent a 6-digit code to{"\n"}
          <Text className="font-semibold text-gray-800">{phoneNumber}</Text>
        </Text>

        {/* OTP Input Card */}
        <TouchableOpacity
          className="p-8 mb-8"
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View className="flex-row justify-center" style={{ gap: 16 }}>
            {otp.map((digit, index) => (
              <View key={index} className="relative">
                <TextInput
                  ref={(ref) => {
                    if (ref) inputRefs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  className="w-12 h-16 text-center text-3xl font-bold text-gray-800 bg-transparent"
                  placeholder="0"
                  placeholderTextColor="#D1D5DB"
                />
                {/* Bottom line */}
                <View
                  className={`absolute bottom-0 left-0 right-0 h-1 rounded-full ${
                    digit ? "bg-blue-500" : "bg-gray-400"
                  }`}
                />
              </View>
            ))}
          </View>
        </TouchableOpacity>

        {/* Timer */}
        <View className="bg-white rounded-xl p-4 mb-6 border border-gray-100">
          <Text className="text-gray-600 text-center">
            {timeLeft > 0 ? (
              <>
                Code expires in{" "}
                <Text className="font-semibold text-orange-500">
                  {formatTime(timeLeft)}
                </Text>
              </>
            ) : (
              <Text className="text-red-500 font-semibold">Code expired</Text>
            )}
          </Text>
        </View>

        {/* Resend Button */}
        <TouchableOpacity
          onPress={handleResendOTP}
          disabled={timeLeft > 0 || isResending || resendCooldown > 0}
          className={`py-3 ${timeLeft > 0 || isResending || resendCooldown > 0 ? "opacity-50" : ""}`}
        >
          <Text className="text-blue-500 text-center text-base font-medium">
            {isResending
              ? "Sending..."
              : resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : "Resend Code"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
