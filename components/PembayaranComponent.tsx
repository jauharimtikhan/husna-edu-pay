import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@/constants/color";

interface Props {
  title?: string;
  price?: string;
  month?: string;
  onPressBayar?: () => void;
}

const PembayaranComponent: React.FC<Props> = ({ onPressBayar }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.month}>Oktober</Text>
        <Text style={styles.price}>Rp. 400.000,-</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPressBayar}>
        <Text style={styles.buttonText}>Bayar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PembayaranComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    height: 63,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  month: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
  },
  price: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.black,
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: 5,
    height: 28,
    width: 61,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.white,
  },
});
