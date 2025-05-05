import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

export default function VirtualAccount({
  number,
  expiry,
}: {
  number: string;
  expiry: string; // ubah ke string karena datangnya dalam bentuk "2025-05-02 03:09:37"
}) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

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

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(number);
    ToastAndroid.show(
      "No VA Berhasil Disalin ke Clipboard",
      ToastAndroid.SHORT
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Virtual Account Number</Text>
      <View style={styles.row}>
        <Text style={[styles.value, { fontSize: 18 }]}>{number}</Text>
        <TouchableOpacity onPress={copyToClipboard}>
          <MaterialIcons name="content-copy" size={20} color="#3b82f6" />
        </TouchableOpacity>
      </View>
      <View style={styles.timerBox}>
        <FontAwesome name="clock-o" size={16} color="#6b7280" />
        <Text style={styles.timerText}>
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
  },
  label: {
    color: "#6b7280",
    fontSize: 14,
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  timerBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 6,
  },
  timerText: {
    color: "#6b7280",
    fontSize: 14,
  },
});
