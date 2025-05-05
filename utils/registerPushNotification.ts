import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Alert, Platform, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "@/constants/color";
import { STORAGE_VAR } from "./env";
import { apiNoToken } from "./axios";
// import { ASYNCSTORAGE_VAR } from "@/constants/env";
// import { apiWithoutToken } from "@/libs/axios";
export const registerForPushNotificationsAsync = async () => {
  const deviceId = `${Device.osBuildId}-${Device.deviceName}`;
  if (!Device.isDevice) {
    ToastAndroid.show(
      "Push notifications only work on a real device.",
      ToastAndroid.SHORT
    );
    return null;
  }
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true, // <== ini bikin notifikasi muncul
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: colors.white,
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
    ToastAndroid.show("Izin Notifikasi Di Tolak!", 3000);
    return null;
  }
  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;

  const token = (
    await Notifications.getExpoPushTokenAsync({
      projectId,
    })
  ).data;
  await AsyncStorage.setItem(STORAGE_VAR.push_token, token);
  console.log("Expo Push Token:", token);

  // Kirim token ke backend Laravel
  try {
    await apiNoToken.post("/store/expo_token", {
      device_id: deviceId,
      token: token,
    });
  } catch (error) {
    console.error("Gagal kirim token ke server:", error);
  }

  return token;
};
