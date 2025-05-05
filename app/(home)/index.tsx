import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/color";
import { navigations } from "@/constants/nav";
import { Href, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_VAR } from "@/utils/env";
import { useNotification } from "@/contexts/NotificationContext";
import * as Notifications from "expo-notifications";
const index = () => {
  const { lastNotification } = useNotification();
  const [user, setUser] = useState<any>(null);
  const getStorageData = async () => {
    const token = await AsyncStorage.getItem(STORAGE_VAR.token);
    const user = await AsyncStorage.getItem(STORAGE_VAR.user);
    Notifications.addPushTokenListener((notification) => {
      // console.log("Expo Token:", notification);
    });
    if (!token && !user) {
      router.replace("/(auth)/login" as Href);
    }
    setUser(JSON.parse(user as string));
  };

  React.useEffect(() => {
    getStorageData();
    // console.log("NOTIFIKASI:", lastNotification);
  }, [lastNotification]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 16,
          paddingHorizontal: 16,
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontWeight: "semibold",
            color: colors.black,
          }}
        >
          {user ? user?.name : null}
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
      <View
        style={{
          marginTop: 57,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/logo-circle-green.png")}
          resizeMode="contain"
          style={{
            width: 180,
            height: 180,
          }}
        />
      </View>
      <FlatList
        data={navigations}
        renderItem={({ item }) => (
          <Menu title={item.title} logo={item.logo} href={item.href} />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{
          alignItems: "center",
          paddingBottom: 16,
          gap: 18,
          justifyContent: "center",
        }}
        contentContainerStyle={{
          marginTop: 40,
        }}
        style={{
          paddingBottom: 16,
          // paddingHorizontal: 43,
        }}
      />
    </SafeAreaView>
  );
};

export default index;

interface MenuProps {
  title: string;
  logo: any;
  href: Href;
}
const Menu = ({ title, logo, href }: MenuProps) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(href)}
      style={{
        height: 182,
        borderRadius: 12,
        backgroundColor: "rgba(0, 0, 0, 0.05)",
      }}
    >
      <View
        style={{
          padding: 35,
          paddingBottom: 0,
        }}
      >
        <Image
          source={logo}
          resizeMode="contain"
          style={{
            width: 80.16,
            height: 80.16,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: colors.black,
          textAlign: "center",
          marginTop: 28.84,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
