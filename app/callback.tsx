import { View, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors, newColors } from "@/constants/color";
import { Redirect, router } from "expo-router";
import * as Linking from "expo-linking";
import { api } from "@/utils/axios";
import Button from "@/components/Button";

const CallbackGopay = () => {
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const url = Linking.useLinkingURL();

  const fetchPaymentStatus = async () => {
    setLoading(true);
    try {
      if (!url || !url.includes("callback")) {
        setPaymentData({ message: "Struktur URL tidak sah!" });
        return;
      }

      const { order_id } = Linking.parse(url).queryParams as any;

      if (!order_id) {
        setPaymentData({ message: "Order ID tidak ditemukan!" });
        return;
      }

      const response = await api.post(`/transaksi/status/${order_id}`);

      if (response.data?.data) {
        setPaymentData(response.data.data);
      } else {
        setPaymentData({ message: "Data transaksi tidak ditemukan!" });
      }
    } catch (error) {
      setPaymentData({ message: "Terjadi kesalahan sistem", error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentStatus();
  }, []);

  // Loading State
  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: newColors[600],
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <StatusBar style="light" backgroundColor={newColors[600]} />
        <ActivityIndicator size="large" color={colors.white} />
      </SafeAreaView>
    );
  }

  // Error View or No Data
  if (!paymentData || paymentData?.message) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: newColors[600],
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <Text
          style={{
            color: colors.danger,
            fontFamily: "poppins",
            fontWeight: "700",
            fontSize: 16,
          }}
        >
          {paymentData?.message || "Terjadi Kesalahan!"}
        </Text>
        <View style={{ marginTop: 24 }}>
          <Button
            onPress={() => router.replace("/(main)/(home)")}
            title="Kembali"
            style={{
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const { status_code, gross_amount, order_id, transaction_status } =
    paymentData;

  const redirectParams = {
    kode_tagihan: order_id,
    order_id,
    amount: gross_amount,
    midtrans_code: status_code,
  };

  return (
    <Redirect
      href={{
        pathname: "/(payment)/status",
        params: { data: JSON.stringify(paymentData) },
      }}
    />
  );
};

export default CallbackGopay;
