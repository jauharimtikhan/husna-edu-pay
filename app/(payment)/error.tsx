import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/color";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/Button";
import { router } from "expo-router";
import VirtualAccount from "@/components/VirtualAccount";
import { BCA } from "@/constants/midtransDummyResponse";
import QrisPayment from "@/components/QrisPayment";

const Error = () => {
  const [loadingCek, setLoadingCek] = useState(false);

  const handleCekStatus = async () => {
    setLoadingCek(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    ToastAndroid.show("Cek Status Pembayaran!", ToastAndroid.SHORT);
    setLoadingCek(false);
  };

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
            backgroundColor: "rgba(255, 3,43, 0.13)",
            height: 300,
          }}
        >
          <Image
            source={require("@/assets/images/icons/seal-error.png")}
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
            Terjadi Kesalahan
          </Text>
          <View
            style={{
              width: 90,
              height: 4,
              borderRadius: 10,
              alignSelf: "center",
              backgroundColor: "#D70022",
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
            Rp. 400.000
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
            Order Id #billiard-221219
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 32,
            marginTop: 20,
          }}
        >
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
              BCA
            </Text>
            <Image
              source={require("@/assets/images/icons/bank/bca.png")}
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
            BCA Virtual Account
          </Text>
          <VirtualAccount
            expiry={BCA.expiry_time}
            number={BCA.va_numbers[0].va_number}
          />
          <QrisPayment
            expiry={BCA.expiry_time}
            qrString="jaskdjasasd"
            data={BCA}
          />

          <View
            style={{
              marginTop: 15,
              marginBottom: 40,
            }}
          >
            <Text>
              viverra in non ex. faucibus urna. in Donec vitae sit lobortis,
              consectetur dignissim, diam facilisis luctus vitae Nam sed ex.
              Quisque non nisl. tincidunt Nunc faucibus vitae vitae viverra
              amet, lacus orci efficitur. Nunc vitae Nunc luctus ex commodo
              Vestibulum ipsum Nunc risus Ut non placerat ex sollicitudin. In
              dui elementum viverra placerat non eu vitae non odio sodales. Nam
              tortor. maximus Lorem Praesent vel Nunc tempor non in Morbi amet,
              elit efficitur. sollicitudin.
            </Text>
          </View>
          <Button
            loading={loadingCek}
            title="Cek Status"
            onPress={handleCekStatus}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Error;
