import {
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar as RNStatusBar,
  Dimensions,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, newColors } from "@/constants/color";
import { router, useLocalSearchParams } from "expo-router";
import { PayNowType, UserBaseResponse } from "@/types/apiResponse";
import ModalPopupPembayaran, {
  ModalPopupPembayaranHandle,
  PaymentMethod,
} from "@/components/ModalPopupPembayaran";
import useFetch from "@/hooks/useFetch";
import { api } from "@/utils/axios";
import { useFocusEffect } from "expo-router";
import { AxiosError } from "axios";
import { getMidtransCode } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_VAR } from "@/utils/env";
import Header from "@/components/Header";
import numberFormat from "@/utils/numberFormat";
import Table, { TableColumn } from "@/components/Table";
import ConfirmationModal from "@/components/ConfirmationModal";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

const MIDTRANS_ERROR_CODES = {
  PAYMENT_FAILED: 406,
  SERVER_ERROR: 500,
};

export default function DetailMultiplePembayaran() {
  const { data_tagihans } = useLocalSearchParams();
  const [dataCharge, setDataCharge] = useState<PayNowType | undefined>(
    undefined
  );
  const [loadingCharge, setLoadingCharge] = useState(false);
  const paymentModalRef = useRef<ModalPopupPembayaranHandle>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    // aksi ketika user konfirmasi
    console.log("Data dihapus");
    setModalVisible(false);
  };

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
      if (!dataCharge) return;
      const user = await AsyncStorage.getItem(STORAGE_VAR.user);
      if (!user) throw new Error("User data not found");

      const userParse: UserBaseResponse = JSON.parse(user);
      const methodName = method.nama.toLowerCase();
      const isEWallet = ["qris", "gopay", "shopeepay", "dana"].includes(
        methodName
      );

      const baseData = dataCharge.data.map((item) => {
        const commonFields = {
          email: userParse.email,
          nominal: item.nominal,
          kode_tagihan: item.kode_tagihan,
          nama_tagihan: item.nama_tagihan,
        };

        switch (method.kategori) {
          case "bank_transfer":
            return {
              ...commonFields,
              metode_pembayaran: "bank_transfer",
              original_metode_pembayaran: "bank_transfer",
              provider: methodName,
              bank: methodName,
            };

          case "cstore":
            return {
              ...commonFields,
              metode_pembayaran: "cstore",
              original_metode_pembayaran: "cstore",
              provider: methodName,
              store: methodName,
            };

          default:
            if (isEWallet) {
              return {
                ...commonFields,
                metode_pembayaran: methodName,
                original_metode_pembayaran: "e_wallet",
                provider: methodName,
              };
            }
            return null; // Invalid or unsupported method
        }
      });

      // Filter out nulls just in case
      return baseData.filter(Boolean);
    },
    [dataCharge]
  );

  const handleErrorRedirect = useCallback((errorCode: number) => {
    router.push({
      pathname: "/(payment)/error",
      params: {
        midtrans_code: errorCode,
        kode_tagihan: "",
        amount: 0,
        order_id: "",
      },
    });
  }, []);

  const handleCharge = useCallback(async () => {
    if (!selectedMethod) return;

    setLoadingCharge(true);
    try {
      const trData = await buildTransactionData(selectedMethod);
      if (!trData) throw new Error("Invalid payment method");

      const res = await api.post("/transaksi/charge-multiple", {
        data_charge: trData,
      });

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
          ToastAndroid.show(
            "Terjadi Kesalahan Pembayaran",
            ToastAndroid.BOTTOM
          );
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

  const handleConfirm = () => {
    setModalVisible(true);
    return;
  };

  const handleDeleteItem = (id: string) => {
    if (!dataCharge) return;

    const newData = dataCharge.data.filter((item) => item.kode_tagihan !== id);
    const newTotal = newData.reduce((sum, item) => sum + item.nominal, 0);

    setDataCharge({
      ...dataCharge,
      data: newData,
      total_tagihan: newTotal,
    });
  };

  const cols = useMemo<TableColumn<PayNowType>[]>(() => {
    return [
      { title: "Nama Tagihan", width: 80, dataIndex: "nama_tagihan" },
      { title: "Kode Tagihan", width: 80, dataIndex: "kode_tagihan" },
      {
        title: "Nominal",
        dataIndex: "nominal",
        render: (rowData) => numberFormat(rowData),
        align: "right",
      },
      {
        title: "",
        dataIndex: "kode_tagihan",
        cellStyle: {
          width: 50,
        },
        width: 50,
        render: (value) => {
          return (
            <TouchableOpacity onPress={() => handleDeleteItem(value)}>
              <Feather name="trash-2" size={20} color={colors.danger} />
            </TouchableOpacity>
          );
        },
        align: "right",
      },
    ];
  }, [dataCharge, handleDeleteItem]);

  useEffect(() => {
    if (!data_tagihans) {
      ToastAndroid.show("Data Tagihan Tidak Valid!", ToastAndroid.SHORT);
      return;
    }

    const resData: PayNowType = JSON.parse(data_tagihans as string);
    setDataCharge(resData);
  }, [data_tagihans]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        paymentModalRef.current?.close();
        setSelectedMethod(null);
        setLoadingCharge(false);
        setModalVisible(false);
      };
    }, [])
  );
  if (dataCharge)
    return (
      <SafeAreaView style={styles.container}>
        {modalVisible ? (
          <StatusBar backgroundColor="rgba(0,0,0,0.4)" style="light" />
        ) : null}
        <View style={styles.headerWrapper}>
          <Header
            label="Bayar Semua Tagihan Bulan Ini"
            onBack={() => router.canGoBack() && router.back()}
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.screenTitle}>Detail Pembayaran</Text>
          </View>

          <View style={styles.detailContainer}>
            {dataCharge && (
              <Table
                containerStyle={{
                  marginHorizontal: "auto",
                  paddingHorizontal: 12,
                }}
                columns={cols}
                data={dataCharge.data}
              />
            )}
          </View>

          <View style={styles.paymentSummary}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>TOTAL PEMBAYARAN:</Text>
              <Text style={styles.detailValue}>
                {numberFormat(Number(dataCharge?.total_tagihan))}
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
              handleNext={handleConfirm}
              loading={loadingPaymentMethods}
            />

            <ConfirmationModal
              visible={modalVisible}
              message={`Ingin membayar ${dataCharge.data.length} tagihan ini!`}
              onCancel={() => setModalVisible(false)}
              onConfirm={handleCharge}
              confirmText="Ya, Saya Yakin"
              cancelText="Tidak, Kembali!"
              title="Apakah Anda Yakin?"
              loadingProcess={loadingCharge}
            />
          </View>
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 24,

    width: "100%",
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
