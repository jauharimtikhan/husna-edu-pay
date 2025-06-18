import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_VAR } from "@/utils/env";
// import { ASYNCSTORAGE_VAR } from "@/constants/env";

type NotificationContextType = {
  expoPushToken: string | null;
  lastNotification: Notifications.Notification | null;
  dataPayment: any;
  countNotifPembayaran: number | null;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [lastNotification, setLastNotification] =
    useState<Notifications.Notification | null>(null);
  const [countNotifPembayaran, setCountNotifPembayaran] = useState<
    number | null
  >(null);
  const [dataPayment, setDataPayment] = useState<any>(null);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem(STORAGE_VAR.push_token);
      if (token) setExpoPushToken(token);
    })();

    // Handle foreground notification
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const configNotif = notification.request.trigger as any;
        const getChannelId = configNotif.remoteMessage.data.channelId;
        const data = notification.request.content.data;
        if (data) {
          setDataPayment(data);
        }
        setLastNotification(notification);
        if (getChannelId === "notifikasi_pembayaran" && data) {
          setCountNotifPembayaran(data.total);
        }
      });

    // Handle tapped notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const configNotif = response.notification.request.trigger as any;
        const getChannelId = configNotif.remoteMessage.data.channelId;
        if (!getChannelId) {
          router.push({
            pathname: "/(payment)/status",
            params: {
              data: JSON.stringify(response.notification.request.content.data),
            },
          });
          return;
        }
        console.log("CHANNEL ID NOTIFIKASI CONTEXT: ", getChannelId);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        expoPushToken,
        lastNotification,
        dataPayment,
        countNotifPembayaran,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
