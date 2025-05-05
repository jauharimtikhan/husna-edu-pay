import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/constants/color";
interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  loading?: boolean;
}
const Button = ({ title = "Button", loading, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity {...props} style={[styles.buttonContainer, props.style]}>
      <LinearGradient
        colors={["#105873", "#02FDB0", "#95FFFA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 5 }}
        locations={[0, 0.5, 1]}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator size={"small"} color={colors.white} />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 50,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
