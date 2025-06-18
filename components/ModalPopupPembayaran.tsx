import { colors, newColors } from "@/constants/color";
import { getAssetUrl } from "@/utils";
import { Entypo } from "@expo/vector-icons";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Animated,
  ScrollView,
  Image,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ActivityIndicator,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export type PaymentMethod = {
  id: string | number;
  nama: string;
  gambar: string;
  description?: string;
  kategori: string;
};

type PaymentGroup = {
  items: PaymentMethod[];
  most_popular_used: PaymentMethod | null;
};

type PaymentGroups = {
  [groupName: string]: PaymentGroup;
};

type ModalPopupPembayaranProps = {
  paymentMethods: PaymentGroups;
  onSelect: (method: PaymentMethod) => void;
  onClose?: () => void;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  modalStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  itemStyle?: ViewStyle;
  itemTextStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  handleNext?: () => void;
  groupHeaderStyle?: ViewStyle;
  groupTitleStyle?: TextStyle;
  loading?: boolean;
  itemActiveStyle?: ViewStyle;
  itemTextActiveStyle?: TextStyle;
  loadingNext?: boolean;
};

export type ModalPopupPembayaranHandle = {
  open: () => void;
  close: () => void;
};

const ModalPopupPembayaran = forwardRef<
  ModalPopupPembayaranHandle,
  ModalPopupPembayaranProps
>(
  (
    {
      paymentMethods,
      onSelect,
      onClose,
      title = "Pilih Metode Pembayaran",
      subtitle = "Pilih metode pembayaran yang ingin Anda gunakan",
      buttonText = "Bayar Sekarang",
      modalStyle,
      headerStyle,
      titleStyle,
      subtitleStyle,
      itemStyle,
      itemTextStyle,
      buttonStyle,
      buttonTextStyle,
      handleNext,
      groupHeaderStyle,
      groupTitleStyle,
      loading,
      itemActiveStyle,
      itemTextActiveStyle,
      loadingNext,
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState<
      Record<string, boolean>
    >({});
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
      null
    );
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    // Initialize expanded groups
    useEffect(() => {
      const initialExpanded: Record<string, boolean> = {};
      Object.keys(paymentMethods).forEach((groupName) => {
        initialExpanded["bank_transfer"] = true; // Default: semua grup terbuka
      });
      setExpandedGroups(initialExpanded);
    }, [paymentMethods]);

    const toggleGroup = (groupName: string) => {
      setExpandedGroups((prev) => ({
        ...prev,
        [groupName]: !prev[groupName],
      }));
    };

    const open = () => {
      setVisible(true);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const close = () => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setVisible(false);
        onClose?.();
      });
    };

    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    const handleSelect = (method: PaymentMethod) => {
      setSelectedMethod(method);
      onSelect(method);
    };

    // Fungsi untuk mengubah nama grup menjadi format yang lebih user-friendly
    const formatGroupName = (name: string) => {
      return name
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={close}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={close}
        >
          <Animated.View
            style={[
              styles.backdrop,
              { opacity: backdropOpacity, backgroundColor: "transparent" },
            ]}
          />
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.modalContainer,
            modalStyle,
            { transform: [{ translateY }] },
          ]}
        >
          <View style={[styles.header, headerStyle]}>
            <TouchableOpacity onPress={close}>
              <View style={styles.handleBar} />
            </TouchableOpacity>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
          </View>

          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: 24,
              }}
            >
              <ActivityIndicator size="large" color={newColors[700]} />
            </View>
          ) : (
            <>
              <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
              >
                {Object.entries(paymentMethods).map(([groupName, group]) => (
                  <View key={groupName} style={styles.groupContainer}>
                    <TouchableOpacity
                      style={[styles.groupHeader, groupHeaderStyle]}
                      onPress={() => toggleGroup(groupName)}
                    >
                      <Text style={[styles.groupTitle, groupTitleStyle]}>
                        {formatGroupName(groupName)}
                      </Text>
                      <Text style={styles.arrowIcon}>
                        {expandedGroups[groupName] ? (
                          <Entypo
                            name="chevron-small-down"
                            size={24}
                            color="black"
                          />
                        ) : (
                          <Entypo
                            name="chevron-small-up"
                            size={24}
                            color="black"
                          />
                        )}
                      </Text>
                    </TouchableOpacity>

                    {expandedGroups[groupName] &&
                      group.items.map((method) => {
                        const isSelected = selectedMethod?.id === method.id;
                        return (
                          <TouchableOpacity
                            key={method.id}
                            style={[
                              styles.itemContainer,
                              itemStyle,
                              isSelected && styles.itemContainerActive, // Default active style
                              isSelected && itemActiveStyle, // Custom active style from props
                            ]}
                            onPress={() => handleSelect(method)}
                          >
                            <Image
                              source={{
                                uri: getAssetUrl(method.gambar),
                              }}
                              style={styles.icon}
                              resizeMode="contain"
                            />
                            <View style={styles.textContainer}>
                              <Text
                                style={[
                                  styles.itemText,
                                  itemTextStyle,
                                  isSelected && styles.itemTextActive, // Default active text style
                                  isSelected && itemTextActiveStyle,
                                ]}
                              >
                                {method.nama}
                              </Text>
                              {method.description && (
                                <Text
                                  style={[
                                    styles.description,
                                    isSelected && styles.descriptionActive, // Active description style
                                  ]}
                                >
                                  {method.description}
                                </Text>
                              )}
                            </View>
                            {group.most_popular_used &&
                              group.most_popular_used.id === method.id && (
                                <View
                                  style={[
                                    styles.popularBadge,
                                    isSelected && styles.popularBadgeActive, // Active badge style
                                  ]}
                                >
                                  <Text style={styles.popularText}>
                                    Populer
                                  </Text>
                                </View>
                              )}
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={[styles.button, buttonStyle]}
                onPress={handleNext}
              >
                {loadingNext ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <Text style={[styles.buttonText, buttonTextStyle]}>
                    {buttonText}
                  </Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "none",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 30,
    minHeight: 800,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  header: {
    paddingVertical: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  scrollContainer: {
    marginVertical: 20,
  },
  groupContainer: {
    marginBottom: 10,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  arrowIcon: {
    fontSize: 14,
    color: "#666",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  description: {
    fontSize: 13,
    color: "#888",
    marginTop: 4,
  },
  popularBadge: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  popularText: {
    fontSize: 12,
    color: "#2196F3",
    fontWeight: "500",
  },
  button: {
    backgroundColor: newColors[700],
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainerActive: {
    backgroundColor: "#F0F7FF", // Light blue background for active
    borderLeftWidth: 3,
    borderLeftColor: newColors[700], // Primary color accent
    borderRadius: 8,
  },
  iconActive: {
    tintColor: newColors[700], // Primary color for active icon
  },
  itemTextActive: {
    color: newColors[700], // Primary color for active text
    fontWeight: "bold",
  },
  descriptionActive: {
    color: newColors[600], // Slightly lighter primary color
  },
  popularBadgeActive: {
    backgroundColor: "#BBDEFB", // Darker blue for active badge
  },
});

export default ModalPopupPembayaran;
