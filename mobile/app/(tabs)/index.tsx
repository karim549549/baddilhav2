import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ItemCard from "../../components/ItemCard";
import { mockItems } from "../../data/mockDataNew";
import { useLanguage } from "../../src/contexts/LanguageContext";
import { useTheme } from "../../src/contexts/ThemeContext";
import { MockItem, SwipeDirection } from "../../types";
import { getThemeColors } from "../../utils/theme";

const { width, height } = Dimensions.get("window");

function HomeScreenContent() {
  const [cards, setCards] = useState<MockItem[]>(mockItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [superLikesRemaining, setSuperLikesRemaining] = useState(5);
  const swiperRef = useRef(null);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isDark } = useTheme();
  const { t, isRTL } = useLanguage();
  const colors = getThemeColors(isDark);

  const handleSwipe = useCallback(
    (direction: SwipeDirection, swipedItem: MockItem) => {
      console.log(`Swiped ${direction} on item: ${swipedItem.name}`);

      // Handle different swipe directions
      switch (direction) {
        case SwipeDirection.RIGHT:
          // Like - want to swap
          Alert.alert(
            t("home.itemLiked"),
            t("home.itemLikedDesc", { itemName: swipedItem.name }),
            [{ text: t("common.ok") }]
          );
          break;

        case SwipeDirection.LEFT:
          // Pass - not interested
          console.log(t("home.itemPassed"));
          break;

        case SwipeDirection.UP:
          // Super Like
          if (superLikesRemaining > 0) {
            setSuperLikesRemaining((prev) => prev - 1);
            Alert.alert(
              t("home.superLike"),
              t("home.superLikeDesc", { itemName: swipedItem.name }),
              [{ text: t("common.ok") }]
            );
          } else {
            Alert.alert(t("home.noSuperLikes"), t("home.noSuperLikesDesc"), [
              { text: t("common.ok") },
            ]);
          }
          break;

        case SwipeDirection.DOWN:
          // Dislike/Block
          Alert.alert(
            t("home.itemDisliked"),
            t("home.itemDislikedDesc", { itemName: swipedItem.name }),
            [{ text: t("common.ok") }]
          );
          break;
      }

      // Move to next card
      setCurrentIndex((prev) => prev + 1);
    },
    [superLikesRemaining]
  );

  const handleCardIndexChange = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleSwipedAll = useCallback(() => {
    Alert.alert(t("home.noMoreItems"), t("home.noMoreItemsDesc"), [
      {
        text: t("common.refresh"),
        onPress: () => {
          setCards([...mockItems]);
          setCurrentIndex(0);
        },
      },
      { text: t("common.ok") },
    ]);
  }, [t]);

  const renderCard = useCallback(
    (item: MockItem) => {
      return <ItemCard item={item} isFirst={currentIndex === 0} />;
    },
    [currentIndex]
  );

  const handleAddItem = () => {
    router.push("/add-item");
  };

  return (
    <View
      className="flex-1"
      style={{
        paddingBottom: insets.bottom,
        backgroundColor: colors.backgroundSecondary,
      }}
    >
      {/* Top Bar */}
      <View
        style={{
          backgroundColor: colors.card,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          paddingTop: insets.top + 10,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <View
            style={{
              flexDirection: isRTL ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="swap-horizontal" size={24} color="#FD297B" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: colors.text,
                marginLeft: isRTL ? 0 : 12,
                marginRight: isRTL ? 12 : 0,
              }}
            >
              {t("home.title")}
            </Text>
          </View>

          {/* Add Item Button */}
          <TouchableOpacity
            onPress={handleAddItem}
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#FD297B",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Swiper */}
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
        <Swiper
          ref={swiperRef}
          cards={cards}
          renderCard={renderCard}
          cardIndex={currentIndex}
          backgroundColor="transparent"
          cardHorizontalMargin={0}
          cardVerticalMargin={0}
          onSwipedLeft={(cardIndex) =>
            handleSwipe(SwipeDirection.LEFT, cards[cardIndex])
          }
          onSwipedRight={(cardIndex) =>
            handleSwipe(SwipeDirection.RIGHT, cards[cardIndex])
          }
          onSwipedTop={(cardIndex) =>
            handleSwipe(SwipeDirection.UP, cards[cardIndex])
          }
          onSwipedBottom={(cardIndex) =>
            handleSwipe(SwipeDirection.DOWN, cards[cardIndex])
          }
          onSwipedAll={handleSwipedAll}
          onSwiped={handleCardIndexChange}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: "#EF4444",
                  borderColor: "#EF4444",
                  color: "white",
                  borderWidth: 2,
                  fontSize: 24,
                  fontWeight: "bold",
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  backgroundColor: "#10B981",
                  borderColor: "#10B981",
                  color: "white",
                  borderWidth: 2,
                  fontSize: 24,
                  fontWeight: "bold",
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
            top: {
              title: "SUPER LIKE!",
              style: {
                label: {
                  backgroundColor: "#3B82F6",
                  borderColor: "#3B82F6",
                  color: "white",
                  borderWidth: 2,
                  fontSize: 20,
                  fontWeight: "bold",
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: 20,
                },
              },
            },
            bottom: {
              title: "DISLIKE",
              style: {
                label: {
                  backgroundColor: "#F59E0B",
                  borderColor: "#F59E0B",
                  color: "white",
                  borderWidth: 2,
                  fontSize: 20,
                  fontWeight: "bold",
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  marginBottom: 20,
                },
              },
            },
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          disableTopSwipe={superLikesRemaining === 0}
        />
      </View>

      {/* Swipe Instructions */}
      <View
        style={{
          backgroundColor: colors.card,
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}
      >
        <Text
          style={{
            textAlign: isRTL ? "right" : "center",
            color: colors.textSecondary,
            fontSize: 14,
            writingDirection: isRTL ? "rtl" : "ltr",
          }}
        >
          {t("home.swipeInstructions")}
        </Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return <HomeScreenContent />;
}
