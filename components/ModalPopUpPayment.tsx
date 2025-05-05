import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { colors } from "@/constants/color";
import { bankLists } from "@/constants/bankLists";
import numberFormat from "@/utils/numberFormat";
import { SafeAreaView } from "react-native-safe-area-context";
import { BCA } from "@/constants/midtransDummyResponse";
import PaymentStatus from "./PaymentStatus";
import PaymentInfo from "./PaymentInfo";
import VirtualAccount from "./VirtualAccount";
import QrisPayment from "./QrisPayment";
import useFetch from "@/hooks/useFetch";
import { api } from "@/utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_VAR } from "@/utils/env";
import { router } from "expo-router";
import { AxiosError } from "axios";
import { useNotification } from "@/contexts/NotificationContext";

interface Props {
  onClose: () => void;
  visible: boolean;
  nominal?: number;
}

const ModalPopUpPayment = ({ visible, onClose, nominal }: Props) => {
  const { lastNotification } = useNotification();
  const [amount, setAmount] = useState("0");
  const [bank, setBank] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRequesting, setIsRequesting] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const {
    data: chargeData,
    loading: chargeLoading,
    refect: chargeRefetch,
    error: chargeError,
  } = useFetch(async (params) => {
    try {
      const user = await AsyncStorage.getItem(STORAGE_VAR.user);
      const userParse = JSON.parse(user as string);
      let trData;
      if (params.transactionType === "bank_transfer") {
        trData = {
          email: userParse?.email,
          amount: params.amount,
          transaction_type: params.transactionType,
          bank: params.bank,
        };
      } else if (params.transactionType === "qris") {
        trData = {
          email: userParse?.email,
          amount: params.amount,
          transaction_type: params.transactionType,
        };
      } else if (params.transactionType === "gopay") {
        trData = {
          email: userParse?.email,
          amount: params.amount,
          transaction_type: params.transactionType,
        };
      } else if (params.transactionType === "shopeepay") {
        trData = {
          email: userParse?.email,
          amount: params.amount,
          transaction_type: params.transactionType,
        };
      } else if (params.transactionType === "cstore") {
        trData = {
          email: userParse?.email,
          amount: params.amount,
          transaction_type: params.transactionType,
          store: params.bank,
        };
      } else if (params.transactionType === "dana") {
        trData = {
          email: userParse?.email,
          amount: params.amount,
          transaction_type: params.transactionType,
        };
      }
      // console.log("Charging with:", trData);

      const res = await api.post("/transactions/charge", trData);
      return res.data?.data;
    } catch (err: any) {
      if (err instanceof AxiosError) {
        console.error("Charge error 422:", err.response?.data?.errors);
      }
      console.error("Charge error:", err);
      throw err; // biar hook bisa tangkep error
    }
  }, false);

  useEffect(() => {
    setAmount(nominal ? numberFormat(nominal) : "0");
    if (!visible) {
      setAmount("0");
      setBank("");
      setPaymentMethod("");
      setCurrentIndex(0);
    }
  }, [nominal, visible]);

  const handleBankSelect = async (item: any, sectionTitle: string) => {
    if (isRequesting) return;
    setIsRequesting(true);
    setBank(item.name);
    const rawAmount = parseInt(amount.replace(/[^0-9]/g, "") || "0");
    setCurrentIndex(1);
    await chargeRefetch({
      amount: rawAmount,
      transactionType: item.payment_type,
      bank:
        sectionTitle === "Bank Transfer"
          ? item.bank_name
          : String(item.name).toLocaleLowerCase(),
    });

    setIsRequesting(false);
  };
  // console.log(chargeData);

  const renderBankList = () => (
    <View style={{ paddingHorizontal: 10 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {bankLists.map((section) => (
          <View key={section.title}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <FlatList
              data={section.data}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              contentContainerStyle={{ paddingBottom: 24 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => handleBankSelect(item, section.title)}
                >
                  <Image source={item.logo} style={styles.logo} />
                </TouchableOpacity>
              )}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderPaymentDetail = () =>
    chargeLoading ? (
      <ActivityIndicator size={"large"} color={colors.blue} />
    ) : (
      <ScrollView showsVerticalScrollIndicator={false}>
        <PaymentStatus
          type={
            chargeData?.transaction_status ||
            lastNotification?.request.content.data?.transaction_status
          }
        />
        <PaymentInfo
          orderId={chargeData?.order_id}
          amount={`${amount}`}
          method={`${bank} Virtual Account`}
        />
        {chargeData?.actions ? (
          <QrisPayment
            data={chargeData}
            qrString={chargeData?.qr_string}
            expiry={chargeData?.expiry_time as string}
          />
        ) : (
          <VirtualAccount
            number={
              chargeData?.va_numbers?.[0]?.va_number ||
              chargeData?.permata_va_number ||
              chargeData?.payment_code
            }
            expiry={chargeData?.expiry_time as string}
          />
        )}
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {
            onClose();
            router.push({
              pathname: "/(payment)/status",
              params: {
                data: JSON.stringify(chargeData),
              },
            });
          }}
        >
          <Text style={styles.payText}>Check Status</Text>
        </TouchableOpacity>
      </ScrollView>
    );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.keyboardView}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalContainer}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.header}>
                <Text style={styles.title}>Pembayaran</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.closeText}>Tutup</Text>
                </TouchableOpacity>
              </View>

              {currentIndex === 0 && (
                <>
                  <View>
                    <TextInput
                      ref={inputRef}
                      style={styles.input}
                      keyboardType="numeric"
                      placeholder="Masukan Nominal Pembayaran!"
                      value={amount}
                      onChangeText={(text) => {
                        const raw = parseInt(
                          text.replace(/[^0-9]/g, "") || "0"
                        );
                        setAmount(numberFormat(raw));
                      }}
                    />
                    <Text style={styles.warningText}>
                      *Pastikan Nominal Sesuai!
                    </Text>
                  </View>
                  {renderBankList()}
                </>
              )}

              {chargeError ? (
                <Text
                  style={{
                    color: "red",
                    textAlign: "center",
                    marginVertical: 10,
                    fontSize: 24,
                  }}
                >
                  Gagal memuat pembayaran, coba lagi.
                </Text>
              ) : (
                currentIndex === 1 && renderPaymentDetail()
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalPopUpPayment;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  keyboardView: {
    width: "100%",
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    width: "100%",
    maxHeight: Dimensions.get("window").height * 0.85,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.black,
  },
  closeText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.blue,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 8,
    padding: 10,
    paddingLeft: 16,
    backgroundColor: colors.white,
    marginBottom: 12,
  },
  warningText: {
    marginTop: -12,
    fontSize: 12,
    fontWeight: "400",
    color: "red",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
  },
  card: {
    width: "48%",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  payButton: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    alignItems: "center",
  },
  payText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
});
