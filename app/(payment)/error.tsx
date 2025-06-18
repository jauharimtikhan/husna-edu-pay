import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/color";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/Button";
import { router, useLocalSearchParams } from "expo-router";
import VirtualAccount from "@/components/VirtualAccount";
import QrisPayment from "@/components/QrisPayment";
import useFetch from "@/hooks/useFetch";
import { api } from "@/utils/axios";
import numberFormat from "@/utils/numberFormat";

// Mapping kode error Midtrans ke pesan yang user-friendly
const MIDTRANS_ERROR_MESSAGES: Record<string, string> = {
  // 2xx - Success
  "200": "Transaksi berhasil.",
  "201": "Transaksi berhasil dibuat, menunggu penyelesaian oleh pelanggan.",
  "202":
    "Transaksi ditolak oleh sistem pembayaran atau deteksi penipuan Midtrans.",
  "407": "Transaksi telah kedaluwarsa.",

  // 3xx - Redirection
  "300": "Permintaan telah dialihkan secara permanen.",
  "301": "Sumber daya telah dipindahkan secara permanen.",
  "302": "Sumber daya telah dipindahkan sementara.",

  // 4xx - Client Error
  "400": "Permintaan tidak valid. Silakan periksa data yang dikirim.",
  "401": "Akses ditolak. Silakan periksa Client Key atau Server Key Anda.",
  "402": "Merchant tidak memiliki akses untuk metode pembayaran ini.",
  "403":
    "Sumber daya yang diminta tidak dapat menghasilkan konten yang dapat diterima.",
  "404": "Sumber daya yang diminta tidak ditemukan.",
  "405": "Metode HTTP tidak diizinkan.",
  "406":
    "Order ID duplikat. Order ID telah digunakan sebelumnya. Atau anda masih memiliki tagihan dengan kode tagihan yang sama dan masih berstatus pending!",
  "408": "Tipe data yang dikirim tidak sesuai.",
  "409": "Terlalu banyak transaksi dengan nomor kartu yang sama.",
  "410": "Akun merchant dinonaktifkan. Silakan hubungi dukungan Midtrans.",
  "411": "Token ID hilang, tidak valid, atau telah kedaluwarsa.",
  "412": "Merchant tidak dapat mengubah status transaksi.",
  "413":
    "Permintaan tidak dapat diproses karena sintaks yang salah dalam body permintaan.",
  "414":
    "Permintaan pengembalian dana ditolak karena dana merchant tidak mencukupi.",
  "429": "Batas permintaan API terlampaui. Silakan coba lagi nanti.",

  // 5xx - Server Error
  "500": "Terjadi kesalahan internal pada server Midtrans.",
  "501": "Fitur belum tersedia.",
  "502": "Kesalahan koneksi dengan bank.",
  "503": "Layanan tidak tersedia. Silakan coba lagi nanti.",
  "504": "Deteksi penipuan tidak tersedia saat ini.",
  default: "Terjadi kesalahan dalam pemrosesan pembayaran",
};

const ErrorScreen = () => {
  const [loadingCek, setLoadingCek] = useState(false);
  const { midtrans_code, kode_tagihan, amount, order_id, data } =
    useLocalSearchParams();
  const [statusCodeMidtrans, setStatusCodeMIdtrans] =
    useState<any>(midtrans_code);

  // State untuk menyimpan pesan error
  const [errorMessage, setErrorMessage] = useState<string>(
    MIDTRANS_ERROR_MESSAGES.default
  );

  // Setel pesan error berdasarkan kode Midtrans
  useEffect(() => {
    if (midtrans_code && typeof midtrans_code === "string") {
      const message =
        MIDTRANS_ERROR_MESSAGES[midtrans_code] ||
        MIDTRANS_ERROR_MESSAGES.default;
      setErrorMessage(message);
    }
  }, [midtrans_code, data]);

  const {
    data: cekTransaksi,
    loading: loadingCekTransaksi,
    refect: refetchCekTransaksi,
  } = useFetch(async () => {
    if (!kode_tagihan) return null;
    const res = await api.get(`/transaksi/cek_transaksi/${kode_tagihan}`);
    return res.data;
  }, false);

  const { data: transaksiDetailResult, refect: refetchTransaksiDetailResult } =
    useFetch(async () => {
      if (!kode_tagihan) return null;
      const res = await api.post(`/transaksi/status/${kode_tagihan}`);
      return res.data?.data || null;
    }, false);

  // Handle pengecekan status transaksi
  const handleCekStatus = async () => {
    setLoadingCek(true);

    try {
      await refetchCekTransaksi();

      if (!cekTransaksi) {
        await refetchTransaksiDetailResult();
      }
      setStatusCodeMIdtrans(Number(transaksiDetailResult?.status_code) ?? 400);
      if (transaksiDetailResult?.status_code === "201") {
        router.replace({
          pathname: "/(payment)/pending",
          params: {
            data: JSON.stringify(transaksiDetailResult),
          },
        });
      } else if (transaksiDetailResult?.status_code === "407") {
        if (midtrans_code && typeof midtrans_code === "string") {
          const message =
            MIDTRANS_ERROR_MESSAGES[407] || MIDTRANS_ERROR_MESSAGES.default;
          setErrorMessage(message);
        }
      }
    } catch (error) {
      ToastAndroid.show(
        "Gagal memeriksa status pembayaran",
        ToastAndroid.SHORT
      );
    } finally {
      setLoadingCek(false);
    }
  };

  // Navigasi kembali jika data tidak lengkap
  if (!midtrans_code || !kode_tagihan) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Data transaksi tidak valid</Text>
        <Button title="Kembali" onPress={() => router.back()} />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Error */}
        <View style={styles.errorHeader}>
          <Image
            source={require("@/assets/images/icons/seal-error.png")}
            style={styles.errorIcon}
          />
          <Text style={styles.errorTitle}>Terjadi Kesalahan</Text>
          <View style={styles.errorDivider} />
          <Text style={styles.amountText}>
            {numberFormat(Number(amount)) || numberFormat(0)}
          </Text>
          <Text style={styles.orderIdText}>
            Order Id #{order_id || "unknown"}
          </Text>
        </View>

        {/* Error Message */}
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessageTitle}>Deskripsi Kesalahan:</Text>
          <Text style={styles.errorMessageText}>{errorMessage}</Text>

          <Text style={styles.errorMessageTitle}>Kode Error:</Text>
          <Text style={styles.errorCodeText}>{statusCodeMidtrans}</Text>
        </View>

        {/* Action Button */}
        {statusCodeMidtrans !== "406" ? (
          <Button
            loading={loadingCek || loadingCekTransaksi}
            title="Kembali ke Beranda"
            onPress={() => router.replace("/(main)/(home)")}
            style={styles.checkButton}
          />
        ) : (
          <Button
            loading={loadingCek || loadingCekTransaksi}
            title={
              midtrans_code && midtrans_code === "406"
                ? "Proses Pembayaran Lebih Lanjut"
                : "Cek Status Pembayaran"
            }
            onPress={handleCekStatus}
            style={styles.checkButton}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  errorHeader: {
    backgroundColor: "rgba(255, 3, 43, 0.13)",
    height: 300,
    alignItems: "center",
    paddingTop: 50,
  },
  errorIcon: {
    width: 80,
    height: 80,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
    color: colors.black,
  },
  errorDivider: {
    width: 90,
    height: 4,
    borderRadius: 10,
    backgroundColor: "#D70022",
    marginTop: 15,
  },
  amountText: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 21,
    color: colors.black,
  },
  orderIdText: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 9,
    color: "rgba(0,0,0,0.5)",
  },
  errorMessageContainer: {
    padding: 20,
    backgroundColor: "rgba(255, 3, 43, 0.05)",
    margin: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
  },
  errorMessageTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 5,
  },
  errorMessageText: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 15,
  },
  errorCodeText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.danger,
  },
  paymentDetails: {
    paddingHorizontal: 32,
    marginTop: 20,
  },
  bankInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  bankName: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "500",
  },
  bankLogo: {
    width: 64,
    height: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
    color: colors.black,
  },
  instructionText: {
    marginTop: 15,
    marginBottom: 20,
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
  },
  checkButton: {
    marginHorizontal: 32,
    marginTop: 10,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
    color: colors.danger,
  },
});

export default ErrorScreen;
