import { View, Text } from "react-native";
import React from "react";
import { colors } from "@/constants/color";

interface BadgeProps {
  text: string;
  color: "success" | "danger" | "warning" | "secondary";
}

const badgeColors: Record<
  BadgeProps["color"],
  {
    borderColor: string;
    backgroundColor: string;
    textColor: string;
  }
> = {
  danger: {
    borderColor: "#E2A1A1",
    backgroundColor: "#F9F2F2",
    textColor: "#E73535",
  },
  success: {
    borderColor: "#6DC580",
    backgroundColor: "#FFFFFF",
    textColor: "#6DC580",
  },
  warning: {
    borderColor: "#F1C40F",
    backgroundColor: "#FEF9E7",
    textColor: "#D4AC0D",
  },
  secondary: {
    borderColor: colors.blue,
    backgroundColor: "#F2F4F4",
    textColor: "#5D6D7E",
  },
};

export default function Badge({ text, color }: BadgeProps) {
  const styles = badgeColors[color];

  return (
    <View
      style={{
        borderRadius: 50,
        borderWidth: 1,
        borderColor: styles.borderColor,
        backgroundColor: styles.backgroundColor,
        paddingVertical: 4,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 100,
        marginHorizontal: "auto",
      }}
    >
      <Text
        style={{
          color: styles.textColor,
          fontSize: 12,
          fontFamily: "poppins",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {text.toUpperCase()}
      </Text>
    </View>
  );
}
