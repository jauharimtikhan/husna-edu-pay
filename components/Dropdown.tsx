import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  ScrollViewProps,
  ViewStyle,
  TextStyle,
} from "react-native";

// Tipe untuk opsi dropdown
export type DropdownOption = {
  label: string;
  value: string | number;
};

// Props untuk komponen Dropdown
type DropdownProps = {
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  placeholder?: string;
  style?: ViewStyle;
  dropdownStyle?: ViewStyle;
  textStyle?: TextStyle;
  itemStyle?: ViewStyle;
  itemTextStyle?: TextStyle;
  scrollViewProps?: ScrollViewProps;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder = "Pilih opsi",
  style,
  dropdownStyle,
  textStyle,
  itemStyle,
  itemTextStyle,
  scrollViewProps,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption | null>(null);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false, // Height animation requires false
    }).start();
  };

  const handleSelect = (item: DropdownOption) => {
    setSelected(item);
    onSelect(item);
    toggleDropdown();
  };

  const rotateInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const heightInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.min(150, options.length * 50)], // Dinamis berdasarkan jumlah opsi
  });

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.dropdownHeader, dropdownStyle]}
        onPress={toggleDropdown}
        activeOpacity={0.7}
      >
        <Text style={[styles.selectedText, textStyle]}>
          {selected ? selected.label : placeholder}
        </Text>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
          <Text style={styles.arrow}>▼</Text>
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.dropdownList,
          { height: heightInterpolation },
          dropdownStyle,
        ]}
      >
        <ScrollView nestedScrollEnabled={true} {...scrollViewProps}>
          {isOpen &&
            options.map((item, index) => (
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignSelf: "center",
    marginVertical: 20,
    zIndex: 1, // Untuk memastikan dropdown muncul di atas komponen lain
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 8,
  },
  selectedText: {
    fontSize: 16,
    color: "#495057",
  },
  arrow: {
    fontSize: 14,
    color: "#6c757d",
  },
  dropdownList: {
    position: "absolute",
    top: "100%",
    width: "100%",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 8,
    backgroundColor: "white",
    overflow: "hidden",
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

export default Dropdown;
