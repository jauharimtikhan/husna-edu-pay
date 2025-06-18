import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Cellular from "expo-cellular";
import * as Network from "expo-network";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_VAR } from "@/utils/env";
import { registerForPushNotificationsAsync } from "@/utils/registerPushNotification";
import { colors } from "@/constants/color";
import Button from "@/components/Button";

export default function Index() {
  const [isChecking, setIsChecking] = useState(true); // loading state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isInternetReachable } = Network.useNetworkState();
  const [permission, requestPermission] = Cellular.usePermissions();

  useEffect(() => {
    const init = async () => {
      if (!permission) {
        await requestPermission();
      }

      const token = await AsyncStorage.getItem(STORAGE_VAR.token);
      const pushToken = await AsyncStorage.getItem(STORAGE_VAR.push_token);
      if (!pushToken) {
        await registerForPushNotificationsAsync();
      }

      setIsLoggedIn(!!token && !!pushToken);

      // beri delay untuk splash 2 detik
      setTimeout(() => {
        setIsChecking(false);
      }, 2000);
    };

    init();
  }, [permission, isInternetReachable]);

  if (!isChecking) {
    return <Redirect href={isLoggedIn ? "/(main)/(home)" : "/(auth)/login"} />;
  }
  if (!isInternetReachable && isInternetReachable !== undefined) {
    // console.log("No internet connection");
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: colors.white,
        }}
      >
        <StatusBar style="dark" backgroundColor="transparent" />
        <Image
          style={{
            justifyContent: "flex-start",
            width: 300,
            height: 300,
          }}
          source={require("@/assets/images/icons/no-connection.png")}
        />
        <Text
          style={{
            fontSize: 28,
            fontWeight: "800",
            color: colors.danger,
            marginTop: -20,
          }}
        >
          Tidak Ada Koneksi Internet!
        </Text>
        <View
          style={{
            marginTop: 32,
            width: "100%",
            paddingHorizontal: 32,
          }}
        >
          <Button title="Coba Lagi" onPress={() => {}} />
        </View>
      </SafeAreaView>
    );
  }

  return;
}
