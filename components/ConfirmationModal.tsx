// components/ConfirmationModal.tsx
import { colors, newColors } from "@/constants/color";
import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";

interface ConfirmationModalProps {
  visible: boolean;
  title?: string;
  message: string;
  onCancel: (event: GestureResponderEvent) => void;
  onConfirm: (event: GestureResponderEvent) => void;
  confirmText?: string;
  cancelText?: string;
  loadingProcess?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title = "Konfirmasi",
  message,
  onCancel,
  onConfirm,
  confirmText = "Ya",
  cancelText = "Batal",
  loadingProcess,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              {loadingProcess ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <Text style={styles.confirmText}>{confirmText}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cancelButton: {
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#ccc",
    borderRadius: 6,
  },
  confirmButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: newColors[700],
    borderRadius: 6,
  },
  cancelText: {
    color: "#333",
    fontWeight: "600",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "600",
  },
});
