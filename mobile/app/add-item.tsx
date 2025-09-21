import { Ionicons } from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "../src/contexts/LanguageContext";
import { ItemCategory, ItemCondition } from "../types";
import { gradientColors } from "../utils/theme";

const { width } = Dimensions.get("window");

interface FormData {
  photos: string[];
  itemName: string;
  description: string;
  category: ItemCategory | null;
  condition: ItemCondition | null;
  estimatedValue: string;
  brand: string;
  year: string;
  tags: string;
}

export default function AddItemScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    photos: [],
    itemName: "",
    description: "",
    category: null,
    condition: null,
    estimatedValue: "",
    brand: "",
    year: "",
    tags: "",
  });

  const totalSteps = 4;
  const stepTitles = [
    "Add Photos",
    "Category & Condition",
    "Additional Details",
    "Review & Save",
  ];

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveItem = () => {
    // Validate required fields
    if (formData.photos.length === 0) {
      Alert.alert(
        "Missing Photos",
        "Please add at least one photo of your item"
      );
      return;
    }
    if (
      !formData.itemName.trim() ||
      !formData.description.trim() ||
      !formData.category ||
      !formData.condition
    ) {
      Alert.alert("Missing Information", "Please fill in all required fields");
      return;
    }

    Alert.alert("Success!", "Item added successfully!", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const renderStepIndicator = () => (
    <View className="bg-white px-4 py-2 border-b border-gray-200">
      {/* Minimal Progress Bar */}
      <View className="w-full bg-gray-200 rounded-full h-1">
        <View
          className="bg-pink-500 h-1 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </View>
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PhotosStep formData={formData} updateFormData={updateFormData} />
        );
      case 2:
        return (
          <CategoryAndConditionStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <AdditionalDetailsStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return <ReviewAndSaveStep formData={formData} />;
      default:
        return null;
    }
  };

  const renderNavigationButtons = () => (
    <View className="bg-white px-4 py-4 border-t border-gray-200">
      <View className="flex-row justify-between">
        {currentStep > 1 ? (
          <TouchableOpacity
            onPress={prevStep}
            className="flex-1 bg-gray-200 rounded-xl py-4 mr-2"
          >
            <Text className="text-gray-700 text-center font-semibold">
              Previous
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-1 mr-2" />
        )}

        {currentStep < totalSteps ? (
          <TouchableOpacity
            onPress={nextStep}
            className="flex-1 bg-pink-500 rounded-xl py-4 ml-2"
          >
            <Text className="text-white text-center font-semibold">Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleSaveItem}
            className="flex-1 bg-pink-500 rounded-xl py-4 ml-2"
          >
            <Text className="text-white text-center font-semibold">
              Save Item
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <LinearGradient colors={gradientColors} className="px-4 py-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Add New Item</Text>
          <View className="w-6" />
        </View>
      </LinearGradient>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Step Content */}
      <ScrollView className="flex-1">{renderStepContent()}</ScrollView>

      {/* Navigation Buttons */}
      {renderNavigationButtons()}
    </View>
  );
}

// Step 1: Photos Only
const PhotosStep: React.FC<{
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}> = ({ formData, updateFormData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleImagePicker = async () => {
    try {
      console.log("Image picker button pressed!");
      setIsLoading(true);

      // Show action sheet for camera vs gallery
      Alert.alert("Add Photo", "Choose how you want to add a photo", [
        {
          text: "Camera",
          onPress: () => {
            console.log("Camera option selected");
            pickImage("camera");
          },
        },
        {
          text: "Gallery",
          onPress: () => {
            console.log("Gallery option selected");
            pickImage("gallery");
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    } catch (error) {
      console.error("Error in image picker:", error);
      Alert.alert("Error", "Failed to open image picker. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async (source: "camera" | "gallery") => {
    try {
      let result;

      if (source === "camera") {
        // Request camera permission first
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
        // Request media library permission first
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

        // Process and resize image to our required dimensions
        const processedImage = await ImageManipulator.manipulateAsync(
          imageUri,
          [
            { resize: { width: 800, height: 600 } }, // Standard 4:3 ratio, optimized size
          ],
          {
            compress: 0.8,
            format: ImageManipulator.SaveFormat.JPEG,
          }
        );

        // Add to photos array
        const newPhotos = [...formData.photos, processedImage.uri];
        updateFormData("photos", newPhotos);

        console.log("Photo added successfully:", processedImage.uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to add photo. Please try again.");
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    updateFormData("photos", newPhotos);
  };

  const renderPhotoSlot = (index: number) => {
    const hasPhoto = formData.photos[index];

    if (hasPhoto) {
      return (
        <View key={index} className="relative">
          <Image
            source={{ uri: hasPhoto }}
            className="w-full h-24 rounded-lg"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => removePhoto(index)}
            className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center"
          >
            <Ionicons name="close" size={12} color="white" />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          console.log(`Photo slot ${index} pressed!`);
          Alert.alert("Test", `Photo slot ${index} pressed!`);
          handleImagePicker();
        }}
        disabled={isLoading}
        className={`w-full h-24 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 items-center justify-center ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        <Ionicons name="add" size={24} color="#9CA3AF" />
        <Text className="text-gray-500 text-xs mt-1">Add Photo</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="p-4">
      {/* Photo Grid - 2 rows × 3 columns */}
      <View className="bg-white rounded-xl p-6 mb-6">
        {/* First Row */}
        <View className="flex-row space-x-3 mb-3">
          {Array.from({ length: 3 }, (_, index) => (
            <View key={index} className="flex-1">
              {renderPhotoSlot(index)}
            </View>
          ))}
        </View>

        {/* Second Row */}
        <View className="flex-row space-x-3">
          {Array.from({ length: 3 }, (_, index) => (
            <View key={index + 3} className="flex-1">
              {renderPhotoSlot(index + 3)}
            </View>
          ))}
        </View>

        {formData.photos.length === 0 && (
          <View className="items-center py-6">
            <Ionicons name="images-outline" size={32} color="#9CA3AF" />
            <Text className="text-gray-500 text-sm mt-2">No photos yet</Text>
            <Text className="text-gray-400 text-xs text-center mt-1">
              Tap any slot to add photos
            </Text>
          </View>
        )}
      </View>

      {/* Tips */}
      <View className="bg-blue-50 rounded-xl p-4 mt-6">
        <View className="flex-row items-start">
          <Ionicons name="bulb" size={20} color="#3B82F6" />
          <View className="ml-3 flex-1">
            <Text className="text-blue-800 font-semibold text-sm mb-1">
              Photo Tips:
            </Text>
            <Text className="text-blue-700 text-xs leading-4">
              • Take photos in good lighting{"\n"}• Show the item from different
              angles{"\n"}• Include any defects or wear clearly{"\n"}• First
              photo should be the best view
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// Step 2: Category & Condition
const CategoryAndConditionStep: React.FC<{
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}> = ({ formData, updateFormData }) => {
  const categories = [
    {
      key: ItemCategory.GAMING,
      label: "Gaming",
      icon: "game-controller",
      color: "#FF6B6B",
    },
    {
      key: ItemCategory.ELECTRONICS,
      label: "Electronics",
      icon: "phone-portrait",
      color: "#4ECDC4",
    },
    {
      key: ItemCategory.COLLECTIBLES,
      label: "Collectibles",
      icon: "star",
      color: "#45B7D1",
    },
    {
      key: ItemCategory.ACCESSORIES,
      label: "Accessories",
      icon: "headset",
      color: "#96CEB4",
    },
    {
      key: ItemCategory.CLOTHING,
      label: "Clothing",
      icon: "shirt",
      color: "#FFEAA7",
    },
    { key: ItemCategory.BOOKS, label: "Books", icon: "book", color: "#DDA0DD" },
    {
      key: ItemCategory.SPORTS,
      label: "Sports",
      icon: "football",
      color: "#98D8C8",
    },
    { key: ItemCategory.OTHER, label: "Other", icon: "cube", color: "#F7DC6F" },
  ];

  const conditions = [
    { key: ItemCondition.NEW, label: "New", color: "#10B981" },
    { key: ItemCondition.LIKE_NEW, label: "Like New", color: "#059669" },
    { key: ItemCondition.EXCELLENT, label: "Excellent", color: "#3B82F6" },
    { key: ItemCondition.GOOD, label: "Good", color: "#8B5CF6" },
    { key: ItemCondition.FAIR, label: "Fair", color: "#F59E0B" },
    { key: ItemCondition.POOR, label: "Poor", color: "#EF4444" },
  ];

  return (
    <View className="p-4">
      {/* Category Selection */}
      <View className="bg-white rounded-xl p-6 mb-6">
        <Text className="text-gray-800 font-bold text-lg mb-4">Category *</Text>
        <View className="flex-row flex-wrap">
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              className={`mr-3 mb-3 px-4 py-3 rounded-full border-2 ${
                formData.category === cat.key
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 bg-white"
              }`}
              onPress={() => updateFormData("category", cat.key)}
            >
              <View className="flex-row items-center">
                <Ionicons
                  name={cat.icon as any}
                  size={16}
                  color={formData.category === cat.key ? "#FD297B" : cat.color}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    formData.category === cat.key
                      ? "text-pink-500"
                      : "text-gray-700"
                  }`}
                >
                  {cat.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Condition Selection */}
      <View className="bg-white rounded-xl p-6 mb-6">
        <Text className="text-gray-800 font-bold text-lg mb-4">
          Condition *
        </Text>
        <View className="flex-row flex-wrap">
          {conditions.map((cond) => (
            <TouchableOpacity
              key={cond.key}
              className={`mr-3 mb-3 px-4 py-3 rounded-full border-2 ${
                formData.condition === cond.key
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 bg-white"
              }`}
              onPress={() => updateFormData("condition", cond.key)}
            >
              <Text
                className={`font-semibold text-sm ${
                  formData.condition === cond.key
                    ? "text-pink-500"
                    : "text-gray-700"
                }`}
              >
                {cond.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

// Step 3: Additional Details
const AdditionalDetailsStep: React.FC<{
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}> = ({ formData, updateFormData }) => {
  return (
    <View className="p-4">
      <View className="bg-white rounded-xl p-6 mb-6">
        <Text className="text-gray-800 font-bold text-lg mb-4">
          Additional Details
        </Text>

        {/* Brand */}
        <View className="mb-4">
          <Text className="text-gray-600 font-medium mb-2">Brand</Text>
          <TextInput
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
            placeholder="e.g., Apple, Sony, Nike"
            value={formData.brand}
            onChangeText={(value) => updateFormData("brand", value)}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Year */}
        <View className="mb-4">
          <Text className="text-gray-600 font-medium mb-2">Year</Text>
          <TextInput
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
            placeholder="e.g., 2024"
            value={formData.year}
            onChangeText={(value) => updateFormData("year", value)}
            keyboardType="numeric"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Tags */}
        <View className="mb-4">
          <Text className="text-gray-600 font-medium mb-2">Tags</Text>
          <TextInput
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
            placeholder="e.g., gaming, ps5, football (separate with commas)"
            value={formData.tags}
            onChangeText={(value) => updateFormData("tags", value)}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
    </View>
  );
};

// Step 4: Review & Save
const ReviewAndSaveStep: React.FC<{ formData: FormData }> = ({ formData }) => {
  const getCategoryLabel = (category: ItemCategory | null) => {
    if (!category) return "Not selected";
    return Object.values(ItemCategory)[
      Object.values(ItemCategory).indexOf(category)
    ];
  };

  const getConditionLabel = (condition: ItemCondition | null) => {
    if (!condition) return "Not selected";
    return Object.values(ItemCondition)[
      Object.values(ItemCondition).indexOf(condition)
    ];
  };

  return (
    <View className="p-4">
      <View className="bg-white rounded-xl p-6 mb-6">
        <Text className="text-gray-800 font-bold text-lg mb-4">
          Review Your Item
        </Text>

        <View className="space-y-4">
          <View className="border-b border-gray-200 pb-3">
            <Text className="text-gray-600 text-sm">Photos</Text>
            <Text className="text-gray-800 font-semibold">
              {formData.photos.length} photo
              {formData.photos.length !== 1 ? "s" : ""} added
            </Text>
          </View>

          <View className="border-b border-gray-200 pb-3">
            <Text className="text-gray-600 text-sm">Item Name</Text>
            <Text className="text-gray-800 font-semibold">
              {formData.itemName || "Not provided"}
            </Text>
          </View>

          <View className="border-b border-gray-200 pb-3">
            <Text className="text-gray-600 text-sm">Description</Text>
            <Text className="text-gray-800 font-semibold">
              {formData.description || "Not provided"}
            </Text>
          </View>

          <View className="border-b border-gray-200 pb-3">
            <Text className="text-gray-600 text-sm">Category</Text>
            <Text className="text-gray-800 font-semibold">
              {getCategoryLabel(formData.category)}
            </Text>
          </View>

          <View className="border-b border-gray-200 pb-3">
            <Text className="text-gray-600 text-sm">Condition</Text>
            <Text className="text-gray-800 font-semibold">
              {getConditionLabel(formData.condition)}
            </Text>
          </View>

          <View className="border-b border-gray-200 pb-3">
            <Text className="text-gray-600 text-sm">Estimated Value</Text>
            <Text className="text-gray-800 font-semibold">
              {formData.estimatedValue
                ? `$${formData.estimatedValue}`
                : "Not provided"}
            </Text>
          </View>

          <View className="border-b border-gray-200 pb-3">
            <Text className="text-gray-600 text-sm">Brand</Text>
            <Text className="text-gray-800 font-semibold">
              {formData.brand || "Not provided"}
            </Text>
          </View>

          <View className="border-b border-gray-200 pb-3">
            <Text className="text-gray-600 text-sm">Year</Text>
            <Text className="text-gray-800 font-semibold">
              {formData.year || "Not provided"}
            </Text>
          </View>

          <View className="pb-3">
            <Text className="text-gray-600 text-sm">Tags</Text>
            <Text className="text-gray-800 font-semibold">
              {formData.tags || "Not provided"}
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-blue-50 rounded-xl p-4 mb-6">
        <View className="flex-row items-start">
          <Ionicons name="information-circle" size={20} color="#3B82F6" />
          <Text className="text-blue-800 text-sm ml-2 flex-1">
            Review all the information above. Once you save, your item will be
            available for other users to see and potentially match with.
          </Text>
        </View>
      </View>
    </View>
  );
};
