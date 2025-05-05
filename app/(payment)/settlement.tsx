import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/color";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/Button";
import { router, useLocalSearchParams } from "expo-router";
import VirtualAccount from "@/components/VirtualAccount";
import { BCA } from "@/constants/midtransDummyResponse";
import QrisPayment from "@/components/QrisPayment";
import { api } from "@/utils/axios";
import { bankImage, cStoreImage } from "@/constants/bankLists";
import numberFormat from "@/utils/numberFormat";

const Settlement = () => {
  const { data } = useLocalSearchParams();
  const [params, setParams] = useState<any>(null);
  const [loadingCek, setLoadingCek] = useState(false);

  const handleCekStatus = async () => {
    const param = JSON.parse(data as string);
    setLoadingCek(true);
    const res = await api.get(`/transactions/status/${param?.order_id}`);
    if (res.data?.data?.transaction_status === "settlement") {
      router.replace({
        pathname: "/(payment)/settlement",
        params: {
          data: JSON.stringify(res.data?.data),
        },
      });
    }
    setParams(res.data?.data);
    setLoadingCek(false);
  };

  useEffect(() => {
    if (data) {
      const param = JSON.parse(data as string);
      setParams(param);
    }
  }, [data]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar style="dark" backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "#E8FBF7",
            height: 300,
          }}
        >
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
            {numberFormat(Number(params?.gross_amount))}
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
            Order Id #{params?.order_id}
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 32,
            marginTop: 20,
          }}
        >
          {params?.payment_type === "bank_transfer" ? (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {String(params?.va_numbers?.[0]?.bank).toUpperCase() ??
                    "Mandiri"}
                </Text>
                {params?.va_numbers?.[0]?.bank ? (
                  <Image
                    source={
                      params?.va_numbers?.[0]?.bank &&
                      bankImage[
                        params.va_numbers[0].bank as keyof typeof bankImage
                      ]
                        ? bankImage[
                            params.va_numbers[0].bank as keyof typeof bankImage
                          ]
                        : require("@/assets/images/icons/bank/midtrans_logo.png")
                    }
                    style={{
                      width: 64,
                      height: 20,
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require("@/assets/images/icons/bank/mandiri.png")}
                    style={{
                      width: 64,
                      height: 20,
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  marginTop: 40,
                  fontSize: 17,
                  fontWeight: "600",
                  marginBottom: 8,
                }}
              >
                {String(params?.va_numbers?.[0]?.bank).toUpperCase() ??
                  "Mandiri"}{" "}
                Virtual Account
              </Text>
              <VirtualAccount
                expiry={params.settlement_time}
                number={
                  params?.va_numbers?.[0]?.va_number ||
                  params?.permata_va_number
                }
              />
            </>
          ) : null}
          {params?.payment_type === "cstore" ? (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {String(params?.store).toUpperCase()}
                </Text>
                <Image
                  source={
                    params?.va_numbers?.[0]?.bank &&
                    cStoreImage[params.store as keyof typeof cStoreImage]
                      ? cStoreImage[params.store as keyof typeof cStoreImage]
                      : require("@/assets/images/icons/bank/midtrans_logo.png")
                  }
                  style={{
                    width: 64,
                    height: 20,
                  }}
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
                {String(params?.store).toUpperCase()}
              </Text>
              <VirtualAccount
                expiry={params?.settlement_time}
                number={params?.payment_code}
              />
            </>
          ) : null}
          {["qris", "gopay", "shopeepay"].includes(params?.transaction_type) ? (
            <QrisPayment
              expiry={params.expiry_time}
              qrString="jaskdjasasd"
              data={params?.qr_string}
            />
          ) : null}

          <View
            style={{
              marginTop: 15,
              marginBottom: 40,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Terima kasih telah melakukan pembayaran. Semoga rezeki anda lancar
              😊
            </Text>
          </View>
          <Button
            loading={loadingCek}
            title="Kembali"
            onPress={() => router.replace("/(home)")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Settlement;
