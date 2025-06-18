import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors, newColors } from "@/constants/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 72,
          justifyContent: "center",
          alignItems: "center",
          borderColor: colors.white,
          outlineColor: colors.white,
          borderWidth: 0,
          elevation: 0,
          backgroundColor: colors.white,
          shadowColor: colors.white,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: colors.white,
          borderWidth: 0,
          borderColor: colors.white,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="home-filled"
                style={{
                  opacity: focused ? 100 : 50,
                }}
                size={24}
                color={focused ? newColors[600] : "#808080"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="text-box-search-outline"
                style={{
                  opacity: focused ? 100 : 50,
                }}
                size={24}
                color={focused ? newColors[600] : "#808080"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="pembayaran"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 999,
                  backgroundColor: newColors[800],
                  borderWidth: 6,
                  borderColor: newColors[300],
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 40,
                }}
              >
                <Ionicons name="wallet" size={34} color={colors.white} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="tagihan"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={require("@/assets/images/icon-bill.png")}
                width={24}
                height={24}
                style={{
                  opacity: focused ? 100 : 50,
                  width: 24,
                  height: 24,
                }}
                tintColor={focused ? newColors[600] : "#808080"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="user"
                style={{
                  opacity: focused ? 100 : 50,
                }}
                size={24}
                color={focused ? newColors[600] : "#808080"}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
