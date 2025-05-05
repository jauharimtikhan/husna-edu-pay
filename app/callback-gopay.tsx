import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/constants/color";
import Button from "@/components/Button";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import { api } from "@/utils/axios";
const CallbackGopay = () => {
  const [dataPayment, setDataPayment] = useState<any>(null);
  const url = Linking.useLinkingURL();
  const [loading, setLoading] = useState(false);

  const getStatusPayment = async () => {
    setLoading(true);
    if (url?.includes("callback-gopay")) {
      const parse = Linking.parse(url);
      const { order_id } = parse.queryParams as any;
      const response = await api.get(`/transactions/status/${order_id}`);
      setDataPayment(response.data?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getStatusPayment();
  }, []);
  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
          paddingHorizontal: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar style="dark" backgroundColor={colors.white} />
        <ActivityIndicator size="large" color={colors.blue} />
      </SafeAreaView>
    );
  }
  return (
    <Redirect
      href={{
        pathname: "/(payment)/status",
        params: {
          data: JSON.stringify(dataPayment),
        },
      }}
    />
  );
};

export default CallbackGopay;
