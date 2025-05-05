import { colors } from "@/constants/color";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { queryClient } from "@/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { BackHandler, Platform, ToastAndroid } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const [exitApp, setExitApp] = useState(false);
  useEffect(() => {
    let backPressTimer: NodeJS.Timeout;

    const backAction = () => {
      if (router.canGoBack()) {
        router.back();
        return true;
      }
      if (Platform.OS === "ios") {
        // Jangan lakukan exitApp, cukup abaikan
        return false;
      }

      if (exitApp) {
        BackHandler.exitApp();
        return true;
      }

      setExitApp(true);
      ToastAndroid.show("Tekan sekali lagi untuk keluar", ToastAndroid.SHORT);

      // Simpan timer agar bisa dibersihkan nanti
      backPressTimer = setTimeout(() => setExitApp(false), 2000);

      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => {
      backHandler.remove();
      if (backPressTimer) clearTimeout(backPressTimer); // Bersihkan timer saat unmount
    };
  }, [exitApp]);
  return (
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
            statusBarBackgroundColor: "transparent",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="callback-gopay" />
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen
            name="(home)/index"
            options={{
              statusBarBackgroundColor: colors.white,
              statusBarStyle: "dark",
            }}
          />
          <Stack.Screen
            name="(home)/pembayaran"
            options={{
              statusBarBackgroundColor: colors.white,
              statusBarStyle: "dark",
            }}
          />
          <Stack.Screen
            name="(home)/tagihan"
            options={{
              statusBarBackgroundColor: colors.white,
              statusBarStyle: "dark",
            }}
          />
          <Stack.Screen
            name="(home)/history"
            options={{
              statusBarBackgroundColor: colors.white,
              statusBarStyle: "dark",
            }}
          />
          <Stack.Screen
            name="(home)/panduan"
            options={{
              statusBarBackgroundColor: colors.white,
              statusBarStyle: "dark",
            }}
          />
          <Stack.Screen
            name="(payment)/status"
            options={{
              statusBarBackgroundColor: "transparent",
              statusBarStyle: "light",
            }}
          />
          <Stack.Screen
            name="(payment)/settlement"
            options={{
              statusBarStyle: "dark",
              contentStyle: {
                backgroundColor: colors.white,
              },
            }}
          />
          <Stack.Screen
            name="(payment)/error"
            options={{
              statusBarStyle: "dark",
              contentStyle: {
                backgroundColor: colors.white,
              },
            }}
          />
          <Stack.Screen
            name="(payment)/pending"
            options={{
              contentStyle: {
                backgroundColor: colors.white,
              },
            }}
          />
          <Stack.Screen
            name="(modal)/logout"
            options={{
              statusBarBackgroundColor: "rgba(0, 0, 0, 0.03)",
              presentation: "transparentModal",
              animation: "slide_from_bottom",
              animationDuration: 200,
              statusBarTranslucent: true,
            }}
          />
        </Stack>
      </QueryClientProvider>
    </NotificationProvider>
  );
}
