import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "../src/contexts/LanguageContext";
import { gradientColors } from "../utils/theme";

interface ChatMessage {
  id: string;
  text?: string;
  senderId: string;
  timestamp: Date;
  status: "sending" | "sent" | "delivered" | "seen";
  type: "text" | "image" | "file" | "location";
  imageUri?: string;
  fileName?: string;
  fileSize?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

interface ChatDetail {
  id: string;
  otherUser: {
    id: string;
    username: string;
    avatar: string;
    rating: number;
  };
  itemName: string;
  itemImage: string;
}

const { width: screenWidth } = Dimensions.get("window");

export default function ChatDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t, isRTL } = useLanguage();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatDetail, setChatDetail] = useState<ChatDetail | null>(null);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Animation values
  const attachmentMenuHeight = useRef(new Animated.Value(0)).current;
  const attachmentMenuOpacity = useRef(new Animated.Value(0)).current;
  const attachmentButtonScale = useRef(new Animated.Value(1)).current;
  const messageInputScale = useRef(new Animated.Value(1)).current;
  const menuOpacity = useRef(new Animated.Value(0)).current;
  const menuScale = useRef(new Animated.Value(0.8)).current;

  // Mock chat data - in real app this would come from params or API
  useEffect(() => {
    const chatId = params.chatId || "chat1";

    setChatDetail({
      id: chatId as string,
      otherUser: {
        id: "user1",
        username: "gamer123",
        avatar: "", // Empty avatar to show fallback
        rating: 4.8,
      },
      itemName: "FIFA 26 PS5",
      itemImage: "../assets/images/placeholder.jpg",
    });

    // Mock messages with WhatsApp-style status
    setMessages([
      {
        id: "1",
        text: "Hey! I'm interested in your FIFA 26. What would you like to swap it for?",
        senderId: "other",
        timestamp: new Date(Date.now() - 300000),
        status: "seen",
        type: "text",
      },
      {
        id: "2",
        text: "Hi! I'm looking for GTA 6 or Call of Duty MW3. Do you have either of those?",
        senderId: "me",
        timestamp: new Date(Date.now() - 240000),
        status: "seen",
        type: "text",
      },
      {
        id: "3",
        text: "I have GTA 6 for Xbox! Would you be interested in swapping FIFA 26 for GTA 6?",
        senderId: "other",
        timestamp: new Date(Date.now() - 180000),
        status: "seen",
        type: "text",
      },
      {
        id: "4",
        text: "That sounds perfect! GTA 6 for FIFA 26. When can we meet to swap?",
        senderId: "me",
        timestamp: new Date(Date.now() - 120000),
        status: "delivered",
        type: "text",
      },
    ]);
  }, [params.chatId]);

  const animateAttachmentMenu = (show: boolean) => {
    if (show) {
      setShowAttachments(true);
      Animated.parallel([
        Animated.timing(attachmentMenuHeight, {
          toValue: 120,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(attachmentMenuOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.spring(attachmentButtonScale, {
          toValue: 1.1,
          useNativeDriver: true,
        }),
        Animated.spring(messageInputScale, {
          toValue: 0.95,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(attachmentMenuHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(attachmentMenuOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.spring(attachmentButtonScale, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(messageInputScale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start(() => setShowAttachments(false));
    }
  };

  const animateMenu = (show: boolean) => {
    if (show) {
      setShowMenu(true);
      Animated.parallel([
        Animated.timing(menuOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.spring(menuScale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(menuOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.spring(menuScale, {
          toValue: 0.8,
          useNativeDriver: true,
        }),
      ]).start(() => setShowMenu(false));
    }
  };

  const handleReport = () => {
    setShowMenu(false);
    Alert.alert("Report User", "Are you sure you want to report this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Report",
        style: "destructive",
        onPress: () => {
          Alert.alert(
            "Reported",
            "User has been reported. We will review this case."
          );
        },
      },
    ]);
  };

  const handleBlock = () => {
    setShowMenu(false);
    Alert.alert(
      "Block User",
      "Are you sure you want to block this user? You won't be able to chat with them anymore.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Block",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Blocked",
              "User has been blocked. You can unblock them in your settings."
            );
            router.back(); // Go back to chat list
          },
        },
      ]
    );
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: message.trim(),
        senderId: "me",
        timestamp: new Date(),
        status: "sending",
        type: "text",
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessage("");

      // Simulate message status progression
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
          )
        );
      }, 1000);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
          )
        );
      }, 2000);

      // Auto-scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleImagePicker = async (source: "camera" | "gallery") => {
    try {
      setIsLoading(true);
      let result;

      if (source === "camera") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Camera permission is required to take photos"
          );
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });
      } else {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Gallery permission is required to select photos"
          );
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });
      }

      if (!result.canceled && result.assets && result.assets[0]) {
        const imageUri = result.assets[0].uri;

        // Process image for better performance
        const processedImage = await ImageManipulator.manipulateAsync(
          imageUri,
          [{ resize: { width: 800, height: 600 } }],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );

        // Add image message
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          senderId: "me",
          timestamp: new Date(),
          status: "sending",
          type: "image",
          imageUri: processedImage.uri,
        };

        setMessages((prev) => [...prev, newMessage]);
        animateAttachmentMenu(false);

        // Simulate status progression
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
            )
          );
        }, 1000);

        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
            )
          );
        }, 2000);

        // Auto-scroll
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to add photo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilePicker = async () => {
    try {
      setIsLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const file = result.assets[0];
        const fileSize = file.size
          ? `${(file.size / 1024 / 1024).toFixed(1)} MB`
          : "Unknown size";

        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          senderId: "me",
          timestamp: new Date(),
          status: "sending",
          type: "file",
          fileName: file.name,
          fileSize: fileSize,
        };

        setMessages((prev) => [...prev, newMessage]);
        animateAttachmentMenu(false);

        // Simulate status progression
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
            )
          );
        }, 1000);

        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
            )
          );
        }, 2000);

        // Auto-scroll
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    } catch (error) {
      console.error("Error picking file:", error);
      Alert.alert("Error", "Failed to add file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationPicker = async () => {
    try {
      setIsLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to share location"
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // Get address from coordinates (simplified)
      const address = `Lat: ${location.coords.latitude.toFixed(6)}, Lng: ${location.coords.longitude.toFixed(6)}`;

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: "me",
        timestamp: new Date(),
        status: "sending",
        type: "location",
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: address,
        },
      };

      setMessages((prev) => [...prev, newMessage]);
      animateAttachmentMenu(false);

      // Simulate status progression
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
          )
        );
      }, 1000);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
          )
        );
      }, 2000);

      // Auto-scroll
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Failed to get location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttachment = (type: "photo" | "file" | "location") => {
    switch (type) {
      case "photo":
        Alert.alert("Share Photo", "Choose how you want to add a photo", [
          { text: "Camera", onPress: () => handleImagePicker("camera") },
          { text: "Gallery", onPress: () => handleImagePicker("gallery") },
          { text: "Cancel", style: "cancel" },
        ]);
        break;
      case "file":
        handleFilePicker();
        break;
      case "location":
        handleLocationPicker();
        break;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sending":
        return <Ionicons name="time" size={12} color="#9CA3AF" />;
      case "sent":
        return <Ionicons name="checkmark" size={12} color="#9CA3AF" />;
      case "delivered":
        return <Ionicons name="checkmark-done" size={12} color="#9CA3AF" />;
      case "seen":
        return <Ionicons name="checkmark-done" size={12} color="#3B82F6" />;
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const renderMessage = (msg: ChatMessage) => {
    return (
      <View
        key={msg.id}
        className={`mb-4 ${msg.senderId === "me" ? "items-end" : "items-start"}`}
      >
        <View
          className={`max-w-[80%] px-4 py-3 rounded-2xl ${
            msg.senderId === "me"
              ? "bg-pink-500 rounded-br-md"
              : "bg-white rounded-bl-md border border-gray-200"
          }`}
        >
          {msg.type === "text" && (
            <Text
              className={`text-sm ${
                msg.senderId === "me" ? "text-white" : "text-gray-800"
              }`}
            >
              {msg.text}
            </Text>
          )}

          {msg.type === "image" && msg.imageUri && (
            <View className="overflow-hidden rounded-lg">
              <Image
                source={{ uri: msg.imageUri }}
                className="w-48 h-36"
                resizeMode="cover"
              />
            </View>
          )}

          {msg.type === "file" && (
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-gray-200 rounded-lg items-center justify-center mr-3">
                <Ionicons name="document" size={20} color="#6B7280" />
              </View>
              <View className="flex-1">
                <Text
                  className={`text-sm font-medium ${
                    msg.senderId === "me" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {msg.fileName}
                </Text>
                <Text
                  className={`text-xs ${
                    msg.senderId === "me" ? "text-white/80" : "text-gray-600"
                  }`}
                >
                  {msg.fileSize}
                </Text>
              </View>
            </View>
          )}

          {msg.type === "location" && msg.location && (
            <View className="items-center">
              <View className="w-48 h-32 bg-gray-200 rounded-lg items-center justify-center mb-2">
                <Ionicons name="location" size={32} color="#EF4444" />
              </View>
              <Text
                className={`text-xs text-center ${
                  msg.senderId === "me" ? "text-white/90" : "text-gray-600"
                }`}
              >
                {msg.location.address}
              </Text>
            </View>
          )}
        </View>

        {/* Message Status and Time */}
        <View
          className={`flex-row items-center mt-1 mx-2 ${
            msg.senderId === "me" ? "justify-end" : "justify-start"
          }`}
        >
          <Text className="text-gray-400 text-xs mr-2">
            {formatTime(msg.timestamp)}
          </Text>
          {msg.senderId === "me" && (
            <View className="flex-row items-center">
              {getStatusIcon(msg.status)}
            </View>
          )}
        </View>
      </View>
    );
  };

  if (!chatDetail) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-500">Loading chat...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      {/* Header - User Info (WhatsApp Style) */}
      <LinearGradient colors={gradientColors} className="px-4 py-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          {/* User Avatar and Info */}
          <TouchableOpacity
            className="flex-row items-center flex-1 ml-3"
            onPress={() =>
              router.push(
                `/user-profile?userId=${chatDetail.otherUser.id || "user1"}`
              )
            }
          >
            <View className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-pink-400 items-center justify-center">
              {chatDetail.otherUser.avatar ? (
                <Image
                  source={{ uri: chatDetail.otherUser.avatar }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <Text className="text-white font-bold text-lg">
                  {chatDetail.otherUser.username.charAt(0).toUpperCase()}
                </Text>
              )}
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">
                {chatDetail.otherUser.username}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Menu Button */}
          <View className="relative">
            <TouchableOpacity onPress={() => animateMenu(!showMenu)}>
              <Ionicons name="ellipsis-vertical" size={20} color="white" />
            </TouchableOpacity>

            {/* Dropdown Menu */}
            {showMenu && (
              <Animated.View
                style={{
                  opacity: menuOpacity,
                  transform: [{ scale: menuScale }],
                }}
                className="absolute top-8 right-0 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[140px] z-50"
              >
                <TouchableOpacity
                  onPress={handleReport}
                  className="flex-row items-center px-4 py-3 border-b border-gray-100"
                >
                  <Ionicons name="flag" size={18} color="#EF4444" />
                  <Text className="text-red-500 font-medium ml-2">Report</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleBlock}
                  className="flex-row items-center px-4 py-3"
                >
                  <Ionicons name="ban" size={18} color="#EF4444" />
                  <Text className="text-red-500 font-medium ml-2">Block</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        </View>
      </LinearGradient>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-4 py-4"
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}
      </ScrollView>

      {/* Attachment Menu with Animation */}
      {showAttachments && (
        <Animated.View
          style={{
            height: attachmentMenuHeight,
            opacity: attachmentMenuOpacity,
          }}
          className="bg-white border-t border-gray-200 px-4 py-3"
        >
          <View className="flex-row justify-around">
            <TouchableOpacity
              onPress={() => handleAttachment("photo")}
              className="items-center"
              disabled={isLoading}
            >
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                <Ionicons name="camera" size={24} color="#3B82F6" />
              </View>
              <Text className="text-gray-600 text-xs">Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleAttachment("file")}
              className="items-center"
              disabled={isLoading}
            >
              <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                <Ionicons name="document" size={24} color="#10B981" />
              </View>
              <Text className="text-gray-600 text-xs">File</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleAttachment("location")}
              className="items-center"
              disabled={isLoading}
            >
              <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mb-2">
                <Ionicons name="location" size={24} color="#EF4444" />
              </View>
              <Text className="text-gray-600 text-xs">Location</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="bg-white border-t border-gray-200 px-4 py-3"
      >
        <View className="flex-row items-center space-x-3">
          {/* Attachment Button with Animation */}
          <Animated.View
            style={{ transform: [{ scale: attachmentButtonScale }] }}
          >
            <TouchableOpacity
              onPress={() => animateAttachmentMenu(!showAttachments)}
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
              disabled={isLoading}
            >
              <Ionicons name="add" size={20} color="#6B7280" />
            </TouchableOpacity>
          </Animated.View>

          {/* Text Input with Animation */}
          <Animated.View
            style={{ flex: 1, transform: [{ scale: messageInputScale }] }}
          >
            <View className="bg-gray-100 rounded-full px-4 py-2">
              <TextInput
                className="text-gray-800 text-base"
                placeholder="Type a message..."
                placeholderTextColor="#9CA3AF"
                value={message}
                onChangeText={setMessage}
                multiline
                maxLength={500}
              />
            </View>
          </Animated.View>

          {/* Send Button */}
          <TouchableOpacity
            onPress={sendMessage}
            disabled={!message.trim() || isLoading}
            className={`w-10 h-10 rounded-full items-center justify-center ${
              message.trim() && !isLoading ? "bg-pink-500" : "bg-gray-300"
            }`}
          >
            <Ionicons
              name="send"
              size={20}
              color={message.trim() && !isLoading ? "white" : "#9CA3AF"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
