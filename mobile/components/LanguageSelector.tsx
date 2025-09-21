import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Language, useLanguage } from "../src/contexts/LanguageContext";
import { useTheme } from "../src/contexts/ThemeContext";
import { getThemeColors } from "../utils/theme";

interface LanguageSelectorProps {
  onPress?: () => void;
}

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
];

export default function LanguageSelector({ onPress }: LanguageSelectorProps) {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const handleLanguageSelect = (languageCode: string) => {
    setLanguage(languageCode as Language);
    setShowLanguageModal(false);
    onPress?.();
  };

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === language) || languages[0];
  };

  const currentLanguage = getCurrentLanguage();

  return (
    <>
      <TouchableOpacity
        className="flex-row items-center justify-between p-4 border-b"
        style={{
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
          flexDirection: isRTL ? "row-reverse" : "row",
        }}
        onPress={() => setShowLanguageModal(true)}
      >
        <View
          className="flex-row items-center"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <View
            className="w-10 h-10 bg-green-100 rounded-full items-center justify-center"
            style={{
              marginRight: isRTL ? 0 : 16,
              marginLeft: isRTL ? 16 : 0,
            }}
          >
            <Ionicons name="globe" size={20} color="#10B981" />
          </View>
          <View>
            <Text
              className="font-medium text-base"
              style={{
                color: colors.text,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {t("settings.language")}
            </Text>
            <Text
              className="text-sm"
              style={{
                color: colors.textSecondary,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {currentLanguage.nativeName}
            </Text>
          </View>
        </View>
        <View
          className="flex-row items-center"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <Text
            className="text-sm"
            style={{
              color: colors.textSecondary,
              marginRight: isRTL ? 0 : 8,
              marginLeft: isRTL ? 8 : 0,
            }}
          >
            {currentLanguage.nativeName}
          </Text>
          <Ionicons
            name={isRTL ? "chevron-back" : "chevron-forward"}
            size={20}
            color={colors.textTertiary}
          />
        </View>
      </TouchableOpacity>

      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View className="flex-1 justify-end">
          <TouchableOpacity
            className="flex-1"
            activeOpacity={1}
            onPress={() => setShowLanguageModal(false)}
          />
          <View
            className="rounded-t-3xl"
            style={{ backgroundColor: colors.card }}
          >
            <View
              className="p-6 border-b"
              style={{ borderBottomColor: colors.border }}
            >
              <Text
                className="text-xl font-bold text-center"
                style={{
                  color: colors.text,
                  textAlign: isRTL ? "right" : "center",
                }}
              >
                {t("settings.language")}
              </Text>
            </View>
            <ScrollView className="max-h-96">
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  className="flex-row items-center justify-between p-4 border-b"
                  style={{
                    backgroundColor:
                      lang.code === language
                        ? colors.success + "20"
                        : "transparent",
                    borderBottomColor: colors.border,
                    flexDirection: isRTL ? "row-reverse" : "row",
                  }}
                  onPress={() => handleLanguageSelect(lang.code)}
                >
                  <View
                    className="flex-row items-center"
                    style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                  >
                    <View
                      className="w-10 h-10 bg-green-100 rounded-full items-center justify-center"
                      style={{
                        marginRight: isRTL ? 0 : 16,
                        marginLeft: isRTL ? 16 : 0,
                      }}
                    >
                      <Ionicons name="globe" size={20} color="#10B981" />
                    </View>
                    <View>
                      <Text
                        className="font-medium text-base"
                        style={{
                          color: colors.text,
                          textAlign: isRTL ? "right" : "left",
                        }}
                      >
                        {lang.nativeName}
                      </Text>
                      <Text
                        className="text-sm"
                        style={{
                          color: colors.textSecondary,
                          textAlign: isRTL ? "right" : "left",
                        }}
                      >
                        {lang.name}
                      </Text>
                    </View>
                  </View>
                  {lang.code === language && (
                    <Ionicons
                      name="checkmark"
                      size={24}
                      color={colors.success}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
