import React from "react";
import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
import Skeleton, { SkeletonProps } from "@/components/Skeleton";

export type SkeletonGroupProps = {
  /**
   * Konfigurasi untuk setiap skeleton dalam grup
   */
  items: SkeletonProps[];

  /**
   * Arah tata letak
   * - 'column' (default): Vertikal
   * - 'row': Horizontal
   */
  direction?: "column" | "row";

  /**
   * Jarak antar skeleton
   * Default: 8
   */
  spacing?: number;

  /**
   * Gaya kustom untuk container grup
   */
  style?: StyleProp<ViewStyle>;
};

const SkeletonGroup: React.FC<SkeletonGroupProps> = ({
  items,
  direction = "column",
  spacing = 8,
  style,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: direction,
          gap: spacing,
        },
        style,
      ]}
    >
      {items.map((item, index) => (
        <Skeleton key={index} {...item} spacing={spacing} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default SkeletonGroup;
