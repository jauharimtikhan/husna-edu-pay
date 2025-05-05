import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/color";
import HeaderHomeScreen from "@/components/HeaderHomeScreen";

const history = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <HeaderHomeScreen title="History" />
      <View
        style={{
          flex: 1,
          marginTop: 40,
          paddingHorizontal: 16,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            paddingBottom: 24,
            backgroundColor: colors.white,
          }}
          contentContainerStyle={{
            gap: 16,
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <HistoryComponent key={index} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default history;

const HistoryComponent = () => {
  return (
    <View>
      <Text
        style={{
          marginBottom: 7,
          fontSize: 12,
          fontWeight: "600",
          color: colors.black,
          textTransform: "capitalize",
        }}
      >
        Rabu, 15 Jan 2025
      </Text>
      <View
        style={{
          borderRadius: 12,
          backgroundColor: "rgba(0, 0, 0, 0.03)",
          height: 62,
          padding: 9,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: colors.black,
              textTransform: "capitalize",
            }}
          >
            Pembayaran SPP
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: colors.black,
              textTransform: "capitalize",
              marginRight: 24,
            }}
          >
            Rp. 400.000,-
          </Text>
        </View>
        <Text
          style={{
            fontSize: 10,
            fontWeight: "regular",
            color: colors.black,
            textTransform: "capitalize",
          }}
        >
          12.35 WIB
        </Text>
      </View>
    </View>
  );
};
