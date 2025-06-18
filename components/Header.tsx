import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/constants/color";
interface HeaderProps {
  label?: string;
  onBack?: () => void;
}

export default function Header({ label = "Beranda", onBack }: HeaderProps) {
  return (
    <View
      style={{
        marginTop: 10,
        paddingHorizontal: 16,
      }}
    >
      <TouchableOpacity
        onPress={onBack}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Entypo name="chevron-left" size={24} color={colors.white} />
        <Text
          style={{
            fontFamily: "poppins",
            fontWeight: 800,
            fontSize: 20,
            color: colors.white,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
