import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Pressable,
  PressableProps,
} from "react-native";
import React, { useState } from "react";
import { colors, newColors } from "@/constants/color";

interface ButtonProps extends PressableProps {
  title?: string;
  loading?: boolean;
  rightcontent?: React.ReactNode;
}

const Button = ({
  title = "Button",
  loading,
  rightcontent,
  ...props
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      {...props}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={({ pressed }) => {
        const dynamicStyles = [
          styles.buttonContainer,
          isHovered ? styles.hovered : null,
          pressed ? styles.pressed : null,
          props.style as any,
        ];
        return dynamicStyles;
      }}
    >
      {loading ? (
        <ActivityIndicator size={"small"} color={colors.white} />
      ) : (
        <View style={styles.content}>
          <Text style={styles.text}>{title}</Text>
          {rightcontent}
        </View>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: newColors[700],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,

    // Shadow
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  hovered: {
    backgroundColor: newColors[800],
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 18,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
