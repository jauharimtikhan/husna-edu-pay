import { colors, newColors } from "@/constants/color";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { queryClient } from "@/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  BackHandler,
  Platform,
  ToastAndroid,
  StatusBar as RNStatusBar,
  View,
  Text,
} from "react-native";
import * as Notifications from "expo-notifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

// ✅ Setup global notification handler (hanya sekali)
Notifications.setNotificationHandler({
  handleNotification: async (notification: any) => {
    const channelId =
      notification.request.trigger?.remoteMessage?.data?.channelId ??
      notification.request.content.android?.channelId;

    if (channelId === "notifikasi_pembayaran") {
      console.log("⛔ Block foreground notifikasi pembayaran");
      return {
        shouldShowAlert: false,
        shouldPlaySound: true,
        shouldSetBadge: false,
      };
    }

    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

// ✅ Setup channel hanya sekali (hanya Android)
if (Platform.OS === "android") {
  Notifications.setNotificationChannelAsync("notifikasi_pembayaran", {
    name: "Notifikasi Pembayaran",
    importance: Notifications.AndroidImportance.HIGH,
    sound: "default",
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FFFFFF",
  });
}

export default function RootLayout() {
  const [exitApp, setExitApp] = useState(false);
  const [isAppReady, setIsAppReady] = useState(true);
  useEffect(() => {
    if (Platform.OS === "android") {
      RNStatusBar.setBackgroundColor("transparent");
      RNStatusBar.setTranslucent(true);
    }

    // Untuk handle initial render
    const timeout = setTimeout(() => {
      setIsAppReady(false);
    }, 50);

    let backPressTimer: NodeJS.Timeout;

    const backAction = () => {
      if (router.canGoBack()) {
        router.back();
        return true;
      }
      if (Platform.OS === "ios") return false;

      if (exitApp) {
        BackHandler.exitApp();
        return true;
      }

      setExitApp(true);
      ToastAndroid.show("Tekan sekali lagi untuk keluar", ToastAndroid.SHORT);
      backPressTimer = setTimeout(() => setExitApp(false), 2000);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
      if (backPressTimer) clearTimeout(backPressTimer);
      clearTimeout(timeout);
    };
  }, [exitApp, isAppReady]);
  if (isAppReady) {
    return (
      <View>
        <Text>Applikasi Masih proses loading....</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <NotificationProvider>
          <QueryClientProvider client={queryClient}>
            <Stack
              screenOptions={{
                headerShown: false,
                statusBarBackgroundColor: "transparent",
              }}
            >
              {/* Your screens */}
              <Stack.Screen name="index" />
              <Stack.Screen name="callback" />
              <Stack.Screen name="(auth)/login" />
              <Stack.Screen name="(main)" />
              <Stack.Screen
                name="(payment)/settlement"
                options={{
                  statusBarStyle: "dark",
                  contentStyle: {
                    backgroundColor: colors.white,
                  },
                }}
              />
              {/* ...rest of your screens */}
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
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
