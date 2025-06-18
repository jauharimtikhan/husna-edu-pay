import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
  StyleProp,
  Dimensions,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export type SkeletonProps = {
  /**
   * Tipe skeleton yang diinginkan
   * - 'box': Persegi panjang (default)
   * - 'circle': Lingkaran
   * - 'text': Garis teks
   * - 'custom': Kustom menggunakan style
   */
  type?: "box" | "circle" | "text" | "custom";

  /**
   * Lebar skeleton
   * Default: 100% untuk text, 200 untuk box
   */
  width?: number | string;

  /**
   * Tinggi skeleton
   * Default: 16 untuk text, 200 untuk box, sama dengan width untuk circle
   */
  height?: number | string;

  /**
   * Radius border
   * Default: 4 untuk box dan text, 50% untuk circle
   */
  borderRadius?: number;

  /**
   * Warna dasar skeleton
   * Default: '#E1E1E1'
   */
  backgroundColor?: string;

  /**
   * Warna highlight animasi
   * Default: '#F5F5F5'
   */
  highlightColor?: string;

  /**
   * Durasi animasi dalam milidetik
   * Default: 1500
   */
  duration?: number;

  /**
   * Gaya kustom untuk container skeleton
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Jarak antar skeleton saat digunakan dalam grup
   * Default: 8
   */
  spacing?: number;

  /**
   * Jumlah baris untuk tipe 'text'
   * Default: 1
   */
  lines?: number;
};

const Skeleton: React.FC<SkeletonProps> = ({
  type = "box",
  width,
  height,
  borderRadius,
  backgroundColor = "#E1E1E1",
  highlightColor = "#F5F5F5",
  duration = 1500,
  style,
  spacing = 8,
  lines = 1,
}) => {
  const animation = useRef(new Animated.Value(0)).current;

  // Default values based on type
  const defaultWidth = type === "text" ? "100%" : type === "circle" ? 40 : 200;
  const defaultHeight =
    type === "text" ? 16 : type === "circle" ? width || 40 : 200;
  const defaultBorderRadius =
    type === "circle"
      ? typeof (width || defaultWidth) === "number"
        ? ((width || defaultWidth) as number) / 2
        : 20
      : borderRadius || (type === "text" ? 4 : 8);

  // Animation effect
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );

    loop.start();

    return () => loop.stop();
  }, [animation, duration]);

  // Shimmer effect position
  const shimmerPosition = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
  });

  // Render skeleton lines for text type
  if (type === "text" && lines > 1) {
    return (
      <View style={[styles.linesContainer, style]}>
        {Array.from({ length: lines }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.singleLineContainer,
              { marginBottom: index < lines - 1 ? spacing : 0 },
            ]}
          >
            <Skeleton
              type="text"
              width={index === lines - 1 ? "80%" : "100%"}
              backgroundColor={backgroundColor}
              highlightColor={highlightColor}
              duration={duration}
            />
          </View>
        ))}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        ///@ts-ignore
        {
          width: width || defaultWidth,
          height: height || defaultHeight,
          borderRadius: defaultBorderRadius,
          backgroundColor,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX: shimmerPosition }],
          },
        ]}
      >
        <LinearGradient
          colors={["transparent", highlightColor, "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: 100, // shimmer width for smoother transition
  },
  container: {
    position: "relative",
  },
  shimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.3,
  },
  linesContainer: {
    width: "100%",
  },
  singleLineContainer: {
    width: "100%",
  },
});

export default Skeleton;
