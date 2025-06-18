import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
  Dimensions,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
  ScrollViewProps,
} from "react-native";

export type DropdownOption = {
  label: string;
  value: string | number;
};

type DropdownProps = {
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  renderTrigger: (isOpen: boolean) => React.ReactNode;
  dropdownStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  itemTextStyle?: TextStyle;
  scrollViewProps?: ScrollViewProps;
  position?: "auto" | "top" | "bottom"; // Posisi dropdown relatif terhadap trigger
  animationDuration?: number;
  overlayOpacity?: number;
};

const DropdownCustomTriger: React.FC<DropdownProps> = ({
  options,
  onSelect,
  renderTrigger,
  dropdownStyle,
  itemStyle,
  itemTextStyle,
  scrollViewProps,
  position = "auto",
  animationDuration = 300,
  overlayOpacity = 0.5,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const triggerRef = useRef<View>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: DropdownOption) => {
    onSelect(item);
    closeDropdown();
  };

  const closeDropdown = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start(() => setIsOpen(false));
  };

  const handleTriggerLayout = (e: LayoutChangeEvent) => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
    });
  };

  // Animasi saat dropdown terbuka
  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  // Hitung posisi dropdown
  const windowHeight = Dimensions.get("window").height;
  const dropdownTop = triggerLayout.y + triggerLayout.height;
  const dropdownBottom = windowHeight - triggerLayout.y;

  let dynamicPosition = position;
  if (position === "auto") {
    dynamicPosition = dropdownBottom < dropdownHeight + 50 ? "top" : "bottom";
  }

  const getDropdownPosition = () => {
    if (dynamicPosition === "top") {
      return { bottom: dropdownBottom + 5 };
    }
    return { top: dropdownTop + 5 };
  };

  return (
    <View>
      <View
        ref={triggerRef}
        onLayout={handleTriggerLayout}
        collapsable={false} // Penting untuk pengukuran di Android
      >
        <TouchableOpacity onPress={toggleDropdown} activeOpacity={0.7}>
          {renderTrigger(isOpen)}
        </TouchableOpacity>
      </View>

      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={closeDropdown}
      >
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <Animated.View
            style={[
              styles.modalOverlay,
              {
                opacity: fadeAnim,
                backgroundColor: `rgba(0,0,0,${overlayOpacity})`,
              },
            ]}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.dropdown,
            getDropdownPosition(),
            {
              left: 190,
              width: triggerLayout.width,
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
            dropdownStyle,
          ]}
          onLayout={(e) => setDropdownHeight(e.nativeEvent.layout.height)}
        >
          <ScrollView
            nestedScrollEnabled
            {...scrollViewProps}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {options.map((item) => (
              <TouchableOpacity
                key={item.value.toString()}
                style={[styles.listItem, itemStyle]}
                onPress={() => handleSelect(item)}
              >
                <Text style={[styles.itemText, itemTextStyle]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  dropdown: {
    position: "absolute",
    maxHeight: 200,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollView: {
    borderRadius: 8,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  itemText: {
    fontSize: 16,
    color: "#212529",
  },
});

export default DropdownCustomTriger;
