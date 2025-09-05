import React from "react";
import { ImageBackground, Text, View } from "react-native";
import PlaceholderImage from "../assets/images/placeholder.jpg"; // Import the image directly

interface SwiperCardProps {
  card: {
    id: string;
    text: string;
  };
}

const SwiperCard: React.FC<SwiperCardProps> = ({ card }) => {
  return (
    <View className="flex-1 rounded-lg overflow-hidden w-full h-full">
      {" "}
      {/* Removed border-2 and border-gray-200 */}
      <ImageBackground
        source={PlaceholderImage}
        className="flex-1 justify-end "
        imageStyle={{ width: "100%", height: "100%" }}
      >
        <View className="p-2 mb-20">
          <Text className="text-white text-3xl font-bold">{card.text}</Text>
          <Text className="text-white text-base">
            Some description about the item.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SwiperCard;
