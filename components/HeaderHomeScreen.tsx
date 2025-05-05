import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "@/constants/color";
import { router } from "expo-router";
interface Props {
  title?: string;
}
const HeaderHomeScreen = ({ title }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginTop: 20,
      }}
    >
      <TouchableOpacity onPress={() => router.canGoBack() && router.back()}>
        <Image
          source={require("@/assets/images/icons/btn-back.png")}
          resizeMode="contain"
          style={{
            width: 44,
            height: 44,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          color: colors.black,
        }}
      >
        {title}
      </Text>
      <TouchableOpacity onPress={() => router.push("/(modal)/logout")}>
        <Image
          source={require("@/assets/images/icons/btn-logout.png")}
          resizeMode="contain"
          style={{
            width: 39,
            height: 39,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderHomeScreen;

const styles = StyleSheet.create({});
