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
        const data = notification.request.content.data;
        if (data) {
          setDataPayment(data);
        }
        setLastNotification(notification);
        console.log(" Notifikasi data", notification);
      });

    // Handle tapped notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("User clicked notif:", response.notification);
        router.push({
          pathname: "/(payment)/status",
          params: {
            data: JSON.stringify(response.notification.request.content.data),
          },
        });
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
      value={{ expoPushToken, lastNotification, dataPayment }}
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
