import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

export type ErrorDisplayProps = {
  /** Judul error */
  title: string;

  /** Deskripsi detail error */
  description?: string;

  /** Kode error (opsional) */
  errorCode?: string;

  /** Icon custom (opsional) */
  icon?: React.ReactNode;

  /** Nama icon dari MaterialIcons (opsional) */
  iconName?: keyof typeof MaterialIcons.glyphMap;

  /** Gambar custom (opsional) */
  image?: ImageSourcePropType;

  /** Label tombol aksi */
  actionText?: string;

  /** Fungsi yang dipanggil saat tombol diklik */
  onActionPress?: (event: GestureResponderEvent) => void;

  /** Style custom untuk container */
  containerStyle?: StyleProp<ViewStyle>;

  /** Style custom untuk konten */
  contentStyle?: StyleProp<ViewStyle>;

  /** Style custom untuk judul */
  titleStyle?: StyleProp<TextStyle>;

  /** Style custom untuk deskripsi */
  descriptionStyle?: StyleProp<TextStyle>;

  /** Style custom untuk tombol */
  buttonStyle?: StyleProp<ViewStyle>;

  /** Style custom untuk teks tombol */
  buttonTextStyle?: StyleProp<TextStyle>;

  /** Tampilkan tombol coba lagi secara otomatis */
  showRetry?: boolean;

  /** Fungsi retry otomatis */
  onRetry?: () => void;

  /** Tampilkan border */
  withBorder?: boolean;

  /** Mode compact untuk tampilan lebih kecil */
  compact?: boolean;
};

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title,
  description,
  errorCode,
  icon,
  iconName = "error-outline",
  image,
  actionText = "Coba Lagi",
  onActionPress,
  containerStyle,
  contentStyle,
  titleStyle,
  descriptionStyle,
  buttonStyle,
  buttonTextStyle,
  showRetry = false,
  onRetry,
  withBorder = false,
  compact = false,
}) => {
  const { colors } = useTheme();

  const handlePress = (e: GestureResponderEvent) => {
    onActionPress?.(e);
    onRetry?.();
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
        withBorder && styles.borderContainer,
        compact && styles.compactContainer,
        containerStyle,
      ]}
    >
      <View
        style={[styles.content, contentStyle, compact && styles.compactContent]}
      >
        {/* Gambar atau icon */}
        {image ? (
          <Image
            source={image}
            style={[styles.image, compact && styles.compactImage]}
            resizeMode="contain"
          />
        ) : icon ? (
          icon
        ) : (
          <MaterialIcons
            name={iconName}
            size={compact ? 48 : 64}
            color={colors.notification}
            style={styles.icon}
          />
        )}

        {/* Judul error */}
        <Text
          style={[
            styles.title,
            { color: colors.text },
            compact && styles.compactTitle,
            titleStyle,
          ]}
        >
          {title}
        </Text>

        {/* Deskripsi error */}
        {description && (
          <Text
            style={[
              styles.description,
              { color: colors.text },
              compact && styles.compactDescription,
              descriptionStyle,
            ]}
          >
            {description}
          </Text>
        )}

        {/* Kode error (jika ada) */}
        {errorCode && (
          <View style={styles.errorCodeContainer}>
            <Text style={[styles.errorCode, { color: colors.notification }]}>
              Kode Error: {errorCode}
            </Text>
          </View>
        )}

        {/* Tombol aksi */}

        {(showRetry || actionText) && (
          <TouchableOpacity
            onPress={handlePress}
            style={[
              styles.button,
              { backgroundColor: colors.primary },
              compact && styles.compactButton,
              buttonStyle,
            ]}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.buttonText,
                { color: colors.card },
                compact && styles.compactButtonText,
                buttonTextStyle,
              ]}
            >
              {actionText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    margin: 16,
  },
  compactContainer: {
    padding: 16,
  },
  content: {
    alignItems: "center",
    maxWidth: 400,
  },
  compactContent: {
    maxWidth: 300,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 12,
  },
  compactImage: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  icon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 28,
  },
  compactTitle: {
    fontSize: 18,
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
    opacity: 0.8,
  },
  compactDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  errorCodeContainer: {
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    borderRadius: 4,
  },
  errorCode: {
    fontSize: 12,
    fontWeight: "500",
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  compactButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    minWidth: 140,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  compactButtonText: {
    fontSize: 14,
  },
});

export default ErrorDisplay;
