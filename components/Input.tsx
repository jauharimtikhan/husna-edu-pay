import { View, Text, TextInputProps, TextInput } from "react-native";
import React, { forwardRef } from "react";
import { colors } from "@/constants/color";

interface InputProps extends TextInputProps {
  label?: string;
  icon?: any;
  error?: string;
  rightcontent?: any;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ label, icon, error, rightcontent, ...props }, ref) => {
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
            {icon && icon()}
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
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextInput ref={ref} {...props} style={{ fontSize: 16, flex: 1 }} />
          {rightcontent && rightcontent()}
        </View>
        {error && <Text style={{ color: "red", fontSize: 12 }}>{error}</Text>}
      </View>
    );
  }
);

export default Input;
