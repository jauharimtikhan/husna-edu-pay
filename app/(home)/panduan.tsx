import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/color";
import HeaderHomeScreen from "@/components/HeaderHomeScreen";

const panduan = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <HeaderHomeScreen title="Panduan Penggunaan" />
      <View style={{ flex: 1, marginTop: 40, paddingHorizontal: 16 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.black,
          }}
        >
          Panduan Penggunaan Aplikasi
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "400",
            color: colors.black,
            marginTop: 8,
          }}
        >
          Berikut adalah panduan penggunaan aplikasi untuk memudahkan Anda dalam
          menggunakan aplikasi ini.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default panduan;
