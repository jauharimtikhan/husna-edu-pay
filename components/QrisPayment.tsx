import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ToastAndroid } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as Linking from "expo-linking";
export default function QrisPayment({
  qrString,
  expiry,
  data,
}: {
  qrString: string;
  expiry: string;
  data?: any;
}) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const openDeepLink = async () => {
    const deepLink = data?.actions?.find(
      (item: any) => item.name === "deeplink-redirect"
    )?.url;

    const supported = await Linking.canOpenURL(deepLink);
    if (supported) {
      await Linking.openURL(deepLink);
    } else {
      ToastAndroid.show("Tidak bisa membuka URL ini!", ToastAndroid.SHORT);
    }
  };
  useEffect(() => {
    const target = new Date(expiry).getTime(); // ubah string ke timestamp (ms)
    const updateTimeLeft = () => {
      const now = new Date().getTime();
      const diff = Math.max(Math.floor((target - now) / 1000), 0); // hitung sisa waktu dalam detik
      setTimeLeft(diff);
    };

    updateTimeLeft(); // inisialisasi awal

    const timer = setInterval(() => {
      updateTimeLeft();
    }, 1000);
    const deepLink = data?.actions?.find(
      (item: any) => item.name === "deeplink-redirect"
    )?.url;
    if (deepLink) {
      openDeepLink();
    }
    return () => clearInterval(timer);
  }, [expiry]);

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Scan QRIS to Pay</Text>
      <View style={styles.qrContainer}>
        <QRCode value={qrString} size={200} />
      </View>
      <Text style={styles.desc}>
        Open your mobile banking or e-wallet to scan the QR code.
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 12,
          gap: 6,
        }}
      >
        <FontAwesome name="clock-o" size={16} color="#6b7280" />
        <Text
          style={{
            color: "#6b7280",
            fontSize: 14,
          }}
        >
          Bayar Sebelum: {formatTime(timeLeft)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#111827",
  },
  qrContainer: {
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 12,
  },
  desc: {
    marginTop: 12,
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
});
