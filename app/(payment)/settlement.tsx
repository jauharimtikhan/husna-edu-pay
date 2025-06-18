import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "@/utils/axios";
import VirtualAccount from "@/components/VirtualAccount";
import QrisPayment from "@/components/QrisPayment";
import Button from "@/components/Button";
import numberFormat from "@/utils/numberFormat";
import { bankImage, cStoreImage } from "@/constants/bankLists";
import { MidtransChargeResponse } from "@/types/midtrans-response";
import { isBankTransfer, isCstore } from "@/utils";

const PaymentSuccessHeader = ({
  amount,
  orderId,
}: {
  amount: number;
  orderId: string;
}) => (
  <View style={{ backgroundColor: "#E8FBF7", height: 300 }}>
    <Image
      source={require("@/assets/images/icons/phospor icon.png")}
      style={{
        alignSelf: "center",
        marginTop: 50,
        width: 80,
        height: 80,
      }}
    />
    <Text
      style={{
        fontSize: 20,
        fontWeight: "semibold",
        textAlign: "center",
        marginTop: 10,
      }}
    >
      Pembayaran Berhasil
    </Text>
    <View
      style={{
        width: 90,
        height: 4,
        borderRadius: 10,
        alignSelf: "center",
        backgroundColor: "#10CEB0",
        marginTop: 15,
      }}
    />
    <Text
      style={{
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 21,
      }}
    >
      {numberFormat(amount)}
    </Text>
    <Text
      style={{
        fontSize: 12,
        fontWeight: "400",
        textAlign: "center",
        marginTop: 9,
        color: "rgba(0,0,0,0.5)",
      }}
    >
      Order Id #{orderId}
    </Text>
  </View>
);

const Settlement = () => {
  const { data } = useLocalSearchParams();
  const [params, setParams] = useState<MidtransChargeResponse | null>(null);
  const [loadingCek, setLoadingCek] = useState(false);

  const handleCekStatus = async () => {
    const param = JSON.parse(data as string);
    setLoadingCek(true);
    const res = await api.post(`/transaksi/status/${param?.order_id}`);
    const updatedParams = res.data?.data;

    if (updatedParams?.transaction_status === "settlement") {
      router.replace({
        pathname: "/(payment)/settlement",
        params: {
          data: JSON.stringify(updatedParams),
        },
      });
    }

    setParams(updatedParams);
    setLoadingCek(false);
  };

  useEffect(() => {
    if (data) {
      const param: MidtransChargeResponse = JSON.parse(data as string);
      setParams(param);
    }
  }, [data]);

  const renderBankTransfer = () => {
    const bank =
      (params && isBankTransfer(params) && params?.va_numbers?.[0]?.bank) ||
      "mandiri";
    const vaNumber =
      (params &&
        isBankTransfer(params) &&
        params?.va_numbers?.[0]?.va_number) ||
      (params && isBankTransfer(params) && params?.permata_va_number);

    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>{bank.toUpperCase()}</Text>
          <Image
            source={
              bankImage[bank as keyof typeof bankImage] ||
              require("@/assets/images/icons/bank/midtrans_logo.png")
            }
            style={{ width: 64, height: 20 }}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            marginTop: 40,
            fontSize: 17,
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          {bank.toUpperCase()} Virtual Account
        </Text>
        <VirtualAccount
          expiry={params?.transaction_time}
          number={vaNumber as string}
        />
      </>
    );
  };

  const renderCStore = () => {
    const store = (params && isCstore(params) && params?.store) || "";
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>{store.toUpperCase()}</Text>
          <Image
            source={
              cStoreImage[store as keyof typeof cStoreImage] ||
              require("@/assets/images/icons/bank/midtrans_logo.png")
            }
            style={{ width: 64, height: 20 }}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            marginTop: 40,
            fontSize: 17,
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          {store.toUpperCase()}
        </Text>
        <VirtualAccount
          expiry={new Date().toDateString()}
          number={(params && isCstore(params) && params.payment_code) || ""}
        />
      </>
    );
  };

  const renderQris = () => {
    const qrUrl =
      "actions" in params! && Array.isArray(params?.actions)
        ? params?.payment_type === "qris"
          ? params.actions.find((a) => a.name === "generate-qr-code")?.url ??
            "settlement"
          : ["gopay", "shopeepay"].includes(params.payment_type)
          ? params.actions.find((a) => a.name === "deeplink-redirect")?.url ??
            "settlement"
          : "settlement"
        : "settlement";

    return (
      <QrisPayment
        expiry={new Date().toISOString()}
        qrString={qrUrl}
        data={params}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {params && (
          <PaymentSuccessHeader
            amount={Number(params.gross_amount)}
            orderId={params.order_id}
          />
        )}

        <View style={{ paddingHorizontal: 32, marginTop: 20 }}>
          {params?.payment_type === "bank_transfer" && renderBankTransfer()}
          {params?.payment_type === "cstore" && renderCStore()}
          {params && ["qris"].includes(params.payment_type) && renderQris()}

          <View style={{ marginTop: 15, marginBottom: 40 }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              Terima kasih telah melakukan pembayaran. Semoga rezeki anda lancar
              😊
            </Text>
          </View>

          <Button
            loading={loadingCek}
            title="Kembali"
            onPress={() => router.replace("/(main)/(home)")}
            style={{
              paddingVertical: 14,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Settlement;
