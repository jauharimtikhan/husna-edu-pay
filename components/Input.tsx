import { View, Text, TextInputProps, TextInput } from "react-native";
import React, { forwardRef } from "react";
import { colors } from "@/constants/color";

interface InputProps extends TextInputProps {
  label?: string;
  icon?: any;
  error?: string;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ label, icon, error, ...props }, ref) => {
    return (
      <View>
        {label && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            {icon()}
            <Text style={{ color: "#000", fontSize: 16 }}>{label}</Text>
          </View>
        )}
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.grey,
            borderRadius: 10,
            paddingHorizontal: 16,
            backgroundColor: colors.grey,
            paddingVertical: 8,
          }}
        >
          <TextInput ref={ref} {...props} style={{ fontSize: 16 }} />
        </View>
        {error && <Text style={{ color: "red", fontSize: 12 }}>{error}</Text>}
      </View>
    );
  }
);

export default Input;
