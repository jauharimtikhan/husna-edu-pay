import React, { useState } from "react";
import {
  View,
  ScrollView,
  Modal,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { colors } from "@/constants/color";
import HeaderHomeScreen from "@/components/HeaderHomeScreen";
import PembayaranComponent from "@/components/PembayaranComponent";
import ModalPopUpPayment from "@/components/ModalPopUpPayment";

const Tagihan = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState(0);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <HeaderHomeScreen title="Tagihan" />
      <View style={{ flex: 1, marginTop: 40, paddingHorizontal: 16 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingBottom: 24 }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <PembayaranComponent
              key={index}
              onPressBayar={() => {
                setModalVisible(true);
                setAmount(400000);
              }}
            />
          ))}
        </ScrollView>
      </View>

      <ModalPopUpPayment
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        nominal={amount}
      />
    </SafeAreaView>
  );
};

export default Tagihan;
