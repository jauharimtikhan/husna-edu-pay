import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PaymentInfo({
  orderId,
  amount,
  method,
}: {
  orderId: string;
  amount: string;
  method: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Order ID</Text>
      <Text style={styles.value}>{orderId}</Text>

      <Text style={styles.label}>Amount</Text>
      <Text style={[styles.value, { fontSize: 20 }]}>{amount}</Text>

      <Text style={styles.label}>Payment Method</Text>
      <Text style={styles.value}>{method}</Text>
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
});
