///@ts-nocheck
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type StatusType = "pending" | "settlement" | "accept";

const iconMap = {
  pending: {
    name: "clock-o",
    color: "#facc15",
    bg: "#fefce8",
    border: "#fde68a",
  },
  success: {
    name: "check-circle",
    color: "#22c55e",
    bg: "#ecfdf5",
    border: "#a7f3d0",
  },
  error: {
    name: "times-circle",
    color: "#ef4444",
    bg: "#fef2f2",
    border: "#fecaca",
  },
};

const labelMap = {
  pending: "Waiting for Payment",
  settlement: "Payment Success",
  accept: "Payment Failed",
};

export default function PaymentStatus({ type }: { type: StatusType }) {
  const icon = iconMap[type];
  const label = labelMap[type];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: icon.bg, borderColor: icon.border },
      ]}
    >
      <FontAwesome name={icon.name} size={20} color={icon.color} />
      <Text style={[styles.text, { color: icon.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
