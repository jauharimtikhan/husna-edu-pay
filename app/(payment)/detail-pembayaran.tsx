import {
  View,
  Text,
  SafeAreaView,
  ToastAndroid,
  Platform,
  StatusBar as RNStatusBar,
  StyleSheet,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { colors, newColors } from "@/constants/color";
import Header from "@/components/Header";
import { router, useLocalSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native";
import ModalPopupPembayaran, {
  ModalPopupPembayaranHandle,
  PaymentMethod,
} from "@/components/ModalPopupPembayaran";
import useFetch from "@/hooks/useFetch";
import { api } from "@/utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_VAR } from "@/utils/env";
import { UserBaseResponse } from "@/types/apiResponse";
import { AxiosError } from "axios";
import { getMidtransCode } from "@/utils";
import { useFocusEffect } from "expo-router";
import numberFormat from "@/utils/numberFormat";

// Konstanta untuk kode error
const MIDTRANS_ERROR_CODES = {
  PAYMENT_FAILED: 406,
  SERVER_ERROR: 500,
};

export default function DetailPembayaran() {
  const { kode_tagihan, nominal, nama_tagihan, multiple_tagihans } =
    useLocalSearchParams();
  const [loadingCharge, setLoadingCharge] = useState(false);
  const paymentModalRef = useRef<ModalPopupPembayaranHandle>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  );

  const {
    data: paymentMethods,
    loading: loadingPaymentMethods,
    refect: refetchPaymentMethods,
  } = useFetch(async () => {
    const res = await api.get("/metode-pembayaran");
    return res.status === 200 ? res.data?.data ?? [] : [];
  }, false);

  const handleSelectMethod = useCallback((method: PaymentMethod) => {
    setSelectedMethod(method);
  }, []);

  const buildTransactionData = useCallback(
    async (method: PaymentMethod) => {
      const user = await AsyncStorage.getItem(STORAGE_VAR.user);
      if (!user) throw new Error("User data not found");

      const userParse: UserBaseResponse = JSON.parse(user);
      const methodName = method.nama.toLowerCase();
      const baseData = {
        email: userParse.email,
        nominal: Number(nominal),
        kode_tagihan: kode_tagihan as string,
      };

      const isEWallet = ["qris", "gopay", "shopeepay", "dana"].includes(
        methodName
      );

      switch (method.kategori) {
        case "bank_transfer":
          return {
            ...baseData,
            metode_pembayaran: "bank_transfer",
            bank: methodName,
            provider: methodName,
            original_metode_pembayaran: "bank_transfer",
          };

        case "cstore":
          return {
            ...baseData,
            metode_pembayaran: "cstore",
            store: methodName,
            original_metode_pembayaran: "cstore",
          };

        default:
          return isEWallet
            ? {
                ...baseData,
                metode_pembayaran: methodName,
                provider: methodName,
                original_metode_pembayaran: "e_wallet",
              }
            : null;
      }
    },
    [nominal, kode_tagihan]
  );

  const handleErrorRedirect = useCallback(
    (errorCode: number) => {
      router.push({
        pathname: "/(payment)/error",
        params: {
          midtrans_code: errorCode,
          kode_tagihan: kode_tagihan as string,
          amount: String(nominal),
          order_id: kode_tagihan as string,
        },
      });
    },
    [kode_tagihan, nominal]
  );

  const handleCharge = useCallback(async () => {
    if (!selectedMethod) return;

    setLoadingCharge(true);
    try {
      const trData = await buildTransactionData(selectedMethod);
      if (!trData) throw new Error("Invalid payment method");

      const res = await api.post("/transaksi/charge", trData);
      const midtransCode = getMidtransCode(res.data);

      // Handle known error codes
      if (
        midtransCode === MIDTRANS_ERROR_CODES.PAYMENT_FAILED ||
        midtransCode === MIDTRANS_ERROR_CODES.SERVER_ERROR
      ) {
        handleErrorRedirect(midtransCode);
        return;
      }

      // Success flow
      router.push({
        pathname: "/(payment)/pending",
        params: { data: JSON.stringify(res.data) },
      });
    } catch (error) {
      // Handle Axios errors
      if (error instanceof AxiosError) {
        if (error.response?.status === MIDTRANS_ERROR_CODES.PAYMENT_FAILED) {
          handleErrorRedirect(error.response.status);
          return;
        }
      }

      // Handle generic errors
      console.log("Charge error:", error);
      ToastAndroid.show("Terjadi kesalahan sistem", ToastAndroid.BOTTOM);
    } finally {
      setLoadingCharge(false);
    }
  }, [selectedMethod, buildTransactionData, handleErrorRedirect]);

  // Reset state when screen loses focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        paymentModalRef.current?.close();
        setSelectedMethod(null);
        setLoadingCharge(false);
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header
          label="Kembali"
          onBack={() => router.canGoBack() && router.back()}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.screenTitle}>Detail Pembayaran</Text>
        </View>

        <View style={styles.detailContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>KODE TRANSAKSI:</Text>
            <Text style={styles.detailValue}>{kode_tagihan ?? ""}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>NAMA TAGIHAN:</Text>
            <Text style={[styles.detailValue, styles.uppercaseText]}>
              {nama_tagihan ?? ""}
            </Text>
          </View>
        </View>

        <View style={styles.paymentSummary}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>TOTAL PEMBAYARAN:</Text>
            <Text style={styles.detailValue}>
              {numberFormat(Number(nominal))}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={async () => {
              paymentModalRef.current?.open();
              await refetchPaymentMethods();
            }}
          >
            <Text style={styles.paymentButtonText}>
              Pilih Metode Pembayaran
            </Text>
          </TouchableOpacity>

          <ModalPopupPembayaran
            ref={paymentModalRef}
            paymentMethods={paymentMethods ?? []}
            onSelect={handleSelectMethod}
            title="Pilih Metode Pembayaran"
            subtitle="Pilih metode pembayaran yang paling nyaman untuk Anda"
            buttonText="LANJUTKAN PEMBAYARAN"
            handleNext={handleCharge}
            loading={loadingPaymentMethods}
            loadingNext={loadingCharge}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
    backgroundColor: newColors[600],
  },
  headerWrapper: {
    marginTop: 10,
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.white,
    marginTop: 24,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  screenTitle: {
    fontFamily: "poppins",
    fontWeight: "800",
    fontSize: 20,
  },
  detailContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: "column",
    gap: 14,
  },
  paymentSummary: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontFamily: "poppins",
    fontWeight: "600",
    fontSize: 16,
  },
  detailValue: {
    fontFamily: "poppins",
    fontWeight: "900",
    fontSize: 18,
  },
  uppercaseText: {
    maxWidth: 180,
    textAlign: "right",
    textTransform: "uppercase",
  },
  buttonContainer: {
    paddingHorizontal: 16,
  },
  paymentButton: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: newColors[700],
    marginBottom: 24,
  },
  paymentButtonText: {
    fontFamily: "poppins",
    fontWeight: "800",
    fontSize: 18,
    color: colors.white,
  },
});
