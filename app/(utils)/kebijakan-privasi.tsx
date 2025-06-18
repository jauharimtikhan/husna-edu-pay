import { View, Text, Dimensions } from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { colors, newColors } from "@/constants/color";
import { TouchableOpacity } from "react-native";
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Image } from "react-native";
import { ActivityIndicator } from "react-native";
import useFetch from "@/hooks/useFetch";
import { api } from "@/utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Input from "@/components/Input";
import MarkdownRenderer from "@/components/MarkdownRederer";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const KebijakanPrivasi = () => {
  const insets = useSafeAreaInsets();
  const {
    data: content,
    loading,
    refect: refetch,
  } = useFetch(async () => {
    const res = await api.get("/utils/kebijakan-privasi");
    if (res.status === 200) {
      return res.data.content;
    }
    return null;
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: newColors[600],
        paddingTop: insets.top,
      }}
    >
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => router.canGoBack() && router.back()}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Entypo name="chevron-left" size={24} color={colors.white} />
            <Text
              style={{
                fontFamily: "poppins",
                fontSize: 20,
                fontWeight: "900",
                color: colors.white,
                maxWidth: 200,
              }}
            >
              Kembali
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 16,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: colors.white,
          flex: 1,
          position: "relative",
        }}
      >
        <View
          style={{
            flex: 1,
            gap: 12,
            marginTop: 12,
          }}
        >
          <Text
            style={{
              fontFamily: "poppins",
              fontWeight: 700,
              fontSize: 24,
              textAlign: "center",
            }}
          >
            Kebijakan Privasi
          </Text>
          {loading ? (
            <ActivityIndicator size="large" color={newColors[600]} />
          ) : (
            <MarkdownRenderer content={String(content)} />
          )}
        </View>
      </View>
    </View>
  );
};

export default KebijakanPrivasi;
