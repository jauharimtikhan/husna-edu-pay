import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Touchable,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { api } from "@/utils/axios";
import numberFormat from "@/utils/numberFormat";
import { bankImage, cStoreImage } from "@/constants/bankLists";
import { colors, newColors } from "@/constants/color";
import { Linking } from "react-native";

// =============== REUSABLE COMPONENTS ===============

type PaymentHeaderProps = {
  amount: string | number;
  orderId: string;
};

const PaymentHeader = ({ amount, orderId }: PaymentHeaderProps) => (
  <View style={styles.headerContainer}>
    <Image
      source={require("@/assets/images/icons/seal-warning 1.png")}
      style={styles.warningIcon}
    />
    <Text style={styles.headerTitle}>Menunggu Pembayaran</Text>
    <View style={styles.divider} />
    <Text style={styles.amountText}>{numberFormat(Number(amount))}</Text>
    <Text style={styles.orderIdText}>Order Id #{orderId}</Text>
  </View>
);

type PaymentMethodInfoProps = {
  title: string;
  logoSource: any;
  subtitle: string;
  accountNumber: string;
  expiry: string;
};

const PaymentMethodInfo = ({
  title,
  logoSource,
  subtitle,
  accountNumber,
  expiry,
}: PaymentMethodInfoProps) => {
  const { copyToClipboard } = useClipboard();
  return (
    <View style={styles.paymentMethodContainer}>
      <View style={styles.paymentMethodHeader}>
        <Text style={styles.paymentMethodTitle}>{title}</Text>
        <Image source={logoSource} style={styles.bankLogo} />
      </View>

      <Text style={styles.paymentSubtitle}>{subtitle}</Text>

      <View style={styles.accountInfoContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              styles.accountNumber,
              {
                flex: 1,
              },
            ]}
          >
            {accountNumber}
          </Text>
          <TouchableOpacity
            onPress={() =>
              copyToClipboard(accountNumber, "Berhasil menyalin text")
            }
            style={{
              alignSelf: "flex-start",
            }}
          >
            <Feather name="copy" size={18} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.expiryText}>
          Berlaku hingga: {formatIndonesianDate(expiry).tgl} -{" "}
          {formatIndonesianDate(expiry).wkt}
        </Text>
      </View>
    </View>
  );
};

type QRISPaymentProps = {
  expiry: string;
  qrString: string;
};

const QRISPayment = ({ expiry, qrString }: QRISPaymentProps) => (
  <View style={styles.qrPaymentContainer}>
    <Text style={styles.paymentSubtitle}>QRIS Payment</Text>
    <View style={styles.qrCodePlaceholder}>
      <Image
        source={{
          uri: qrString,
          width: 180,
          height: 180,
        }}
        resizeMode="cover"
      />
    </View>
    <Text style={styles.expiryText}>Berlaku hingga: {expiry}</Text>
  </View>
);

type PaymentInstructionsProps = {
  paymentType: string;
  transactionType: string;
};

const PaymentInstructions = ({
  paymentType,
  transactionType,
}: PaymentInstructionsProps) => {
  const getInstruction = () => {
    if (paymentType === "bank_transfer") {
      return "Silakan transfer ke Virtual Account sesuai nominal di atas.";
    }
    if (paymentType === "cstore") {
      return "Silakan bayar di gerai sesuai dengan kode pembayaran di atas.";
    }
    if (["qris", "gopay", "shopeepay"].includes(transactionType)) {
      return "Silakan scan QR code menggunakan applikasi E-Wallet favorit anda";
    }
    return "Silakan melakukan pembayaran sesuai dengan nominal di atas.";
  };

  return (
    <View style={styles.instructionsContainer}>
      <Text style={styles.instructionsText}>{getInstruction()}</Text>
    </View>
  );
};

type CheckStatusButtonProps = {
  loading: boolean;
  onPress: () => void;
};

const CheckStatusButton = ({ loading, onPress }: CheckStatusButtonProps) => (
  <TouchableOpacity
    style={styles.checkStatusButton}
    onPress={onPress}
    disabled={loading}
  >
    {loading ? (
      <ActivityIndicator color="white" />
    ) : (
      <Text style={styles.buttonText}>Cek Status Pembayaran</Text>
    )}
  </TouchableOpacity>
);

// =============== MAIN PENDING COMPONENT ===============
import { BCA } from "@/constants/midtransDummyResponse";
import formatIndonesianDate from "@/utils/formatDate";
import useClipboard from "@/hooks/useClipboard";
import { MidtransChargeResponse } from "@/types/midtrans-response";
import {
  getMidtransCode,
  getSafeAreaValue,
  isBankTransfer,
  isCstore,
  isGopay,
  isQrCharge,
  isShopeepay,
} from "@/utils";

const Pending = () => {
  const { data } = useLocalSearchParams();
  const [params, setParams] = useState<MidtransChargeResponse | null>(null);
  const [loadingCek, setLoadingCek] = useState(false);

  const handleCekStatus = async () => {
    if (!params) return;

    setLoadingCek(true);
    try {
      const res = await api.post(`/transaksi/status/${params?.order_id}`);

      const { transaction_status, status_code, gross_amount } =
        res.data?.data || {};

      if (transaction_status === "settlement") {
        router.replace({
          pathname: "/(payment)/settlement",
          params: { data: JSON.stringify(res.data?.data) },
        });
      } else if (!["settlement", "pending"].includes(transaction_status)) {
        router.replace({
          pathname: "/(payment)/error",
          params: {
            kode_tagihan: params?.order_id,
            order_id: params?.order_id,
            amount: gross_amount,
            midtrans_code: status_code,
          },
        });
      } else {
        ToastAndroid.show("Pembayaran masih diproses", ToastAndroid.SHORT);
        setParams(res.data?.data);
      }
    } catch (error) {
      ToastAndroid.show(
        "Gagal memeriksa status pembayaran",
        ToastAndroid.SHORT
      );
      console.log("Error checking payment status:", error);
    } finally {
      setLoadingCek(false);
    }
  };
  const getDeeplinkRedirectUrl = (param: MidtransChargeResponse) => {
    return (
      (param &&
        isShopeepay(param) &&
        param.actions?.find((action) =>
          ["deeplink-redirect"].includes(action.name)
        )?.url) ||
      ""
    );
  };

  useEffect(() => {
    if (data) {
      try {
        const param = JSON.parse(data as string);
        if (param.data) {
          setParams(param.data);
          if (param.data.payment_type === "qris") {
            mutateCheckTraksaksi(param.data.order_id);
          }
          if (param.data.payment_type === "shopeepay") {
            const newParam = param.data as MidtransChargeResponse;
            const deeplink =
              (newParam &&
                isShopeepay(newParam) &&
                newParam.actions?.find((action) =>
                  ["deeplink-redirect"].includes(action.name)
                )?.url) ||
              "";

            if (deeplink) Linking.openURL(deeplink).catch(console.log);
          }
          if (param.payment_type === "gopay") {
            const newParam = param.data as MidtransChargeResponse;
            const gopayDeeplink =
              (newParam &&
                isShopeepay(newParam) &&
                newParam.actions?.find((action) =>
                  ["deeplink-redirect"].includes(action.name)
                )?.url) ||
              "";

            if (gopayDeeplink)
              Linking.openURL(gopayDeeplink).catch(console.log);
          }
        } else {
          setParams(param);
          if (param.payment_type === "qris") {
            mutateCheckTraksaksi(param.order_id);
          }
          if (param.payment_type === "shopeepay") {
            const deeplink = getDeeplinkRedirectUrl(param);
            console.log("SHOPEEPYA DEEPLINK", deeplink);

            if (deeplink) Linking.openURL(deeplink).catch(console.log);
          }
          if (param.payment_type === "gopay") {
            const gopayDeeplink =
              (param &&
                isGopay(param) &&
                param.actions?.find((action) =>
                  ["deeplink-redirect"].includes(action.name)
                )?.url) ||
              "";

            if (gopayDeeplink)
              Linking.openURL(gopayDeeplink).catch(console.log);
          }
          if (param.midtrans_code === "23000") {
            router.back();
            return;
          }
          if (param.midtrans_code === 406) {
            router.push({
              pathname: "/(payment)/error",
              params: {
                midtrans_code: param.midtrans_code,
                kode_tagihan: param.order_id,
                amount: String(param.gross_amount),
                order_id: param.order_id,
              },
            });
            return;
          }
          if (param.midtrans_code === 500) {
            router.push({
              pathname: "/(payment)/error",
              params: {
                midtrans_code: param.midtrans_code,
                kode_tagihan: param.order_id,
                amount: String(param.gross_amount),
                order_id: param.order_id,
              },
            });
            return;
          }
        }
      } catch (error) {
        console.log("Error parsing data:", error);
      }
    }
  }, [data]);

  const mutateCheckTraksaksi = async (orderId: string) => {
    const res = await api.get("/transaksi/cek_transaksi/" + orderId);
    if (res.status === 200) {
      setParams(res.data.data);
    }
  };

  if (params === undefined) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Error</Text>
      </View>
    );
  }

  if (!params) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={newColors[700]} />
        <Text style={styles.loadingText}>Memuat data pembayaran...</Text>
      </View>
    );
  }

  const getPaymentMethodLogo = () => {
    if (params.payment_type === "bank_transfer") {
      const bank =
        (params && isBankTransfer(params) && params.va_numbers?.[0]?.bank) ||
        "mandiri";
      return (
        bankImage[bank as keyof typeof bankImage] ||
        require("@/assets/images/icons/bank/midtrans_logo.png")
      );
    }

    if (params && isCstore(params) && params.payment_type === "cstore") {
      return (
        cStoreImage[params.store as keyof typeof cStoreImage] ||
        require("@/assets/images/icons/bank/midtrans_logo.png")
      );
    }

    return require("@/assets/images/icons/bank/midtrans_logo.png");
  };

  const getPaymentMethodTitle = () => {
    if (
      params &&
      isBankTransfer(params) &&
      params.payment_type === "bank_transfer"
    ) {
      const bank = params.va_numbers?.[0]?.bank || "mandiri";
      return `${bank.toUpperCase()} Virtual Account`;
    }

    if (params && isCstore(params) && params.payment_type === "cstore") {
      return params.store.toUpperCase();
    }

    if (
      ["qris", "gopay", "shopeepay"].includes(params && params.payment_type)
    ) {
      return "QRIS Payment";
    }

    return "Metode Pembayaran";
  };

  const getAccountNumber = () => {
    if (
      params &&
      isBankTransfer(params) &&
      params.payment_type === "bank_transfer"
    ) {
      return (
        params.va_numbers?.[0]?.va_number || params.permata_va_number || ""
      );
    }

    if (params && isCstore(params) && params.payment_type === "cstore") {
      return params.payment_code || "";
    }

    return "";
  };

  const getQrString = () => {
    if (!params) return "";

    const isValidType = isQrCharge(params) || isGopay(params);
    if (!isValidType) return "";

    const qrAction = params.actions?.find(
      (action) => action.name === "generate-qr-code"
    );

    return qrAction?.url ?? "";
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <PaymentHeader amount={params.gross_amount} orderId={params.order_id} />

        <View style={styles.contentContainer}>
          {params.payment_type === "bank_transfer" && (
            <PaymentMethodInfo
              title={getPaymentMethodTitle()}
              logoSource={getPaymentMethodLogo()}
              subtitle="Virtual Account"
              accountNumber={getAccountNumber()}
              expiry={params.expiry_time || ""}
            />
          )}

          {params.payment_type === "cstore" && (
            <PaymentMethodInfo
              title={getPaymentMethodTitle()}
              logoSource={getPaymentMethodLogo()}
              subtitle="Payment Code"
              accountNumber={getAccountNumber()}
              expiry={(params && isCstore(params) && params.expiry_time) || ""}
            />
          )}

          {["qris"].includes(params.payment_type) && (
            <QRISPayment
              expiry={params.expiry_time || ""}
              qrString={getQrString() || getDeeplinkRedirectUrl(params)}
            />
          )}

          <PaymentInstructions
            paymentType={params.payment_type}
            transactionType={params.payment_type}
          />

          <CheckStatusButton loading={loadingCek} onPress={handleCekStatus} />
        </View>
      </ScrollView>
    </View>
  );
};

// =============== STYLES ===============

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  headerContainer: {
    backgroundColor: "rgba(255, 89, 3, 0.13)",
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    height: 300,
    paddingTop: getSafeAreaValue(),
  },
  warningIcon: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.black,
  },
  divider: {
    width: 90,
    height: 4,
    borderRadius: 10,
    backgroundColor: newColors[700],
    marginVertical: 15,
  },
  amountText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.black,
  },
  orderIdText: {
    fontSize: 12,
    color: colors.black,
    marginTop: 9,
  },
  contentContainer: {
    padding: 24,
  },
  paymentMethodContainer: {
    marginBottom: 24,
  },
  paymentMethodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  paymentMethodTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
  },
  bankLogo: {
    width: 64,
    height: 20,
    resizeMode: "contain",
  },
  paymentSubtitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 12,
  },
  accountInfoContainer: {
    backgroundColor: colors.grey,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  accountNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.black,
    textAlign: "center",
    marginBottom: 8,
  },
  expiryText: {
    fontSize: 14,
    color: colors.black,
    textAlign: "center",
  },
  qrPaymentContainer: {
    marginBottom: 24,
  },
  qrCodePlaceholder: {
    height: 200,
    backgroundColor: colors.grey,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  qrPlaceholderText: {
    color: colors.black,
    fontSize: 16,
  },
  instructionsContainer: {
    marginVertical: 24,
    padding: 16,
    backgroundColor: colors.grey,
    borderRadius: 12,
  },
  instructionsText: {
    fontSize: 16,
    color: colors.black,
    lineHeight: 24,
  },
  checkStatusButton: {
    backgroundColor: newColors[700],
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Pending;
