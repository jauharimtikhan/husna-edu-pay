import { useState, useCallback } from "react";
import * as Clipboard from "expo-clipboard";
import { ToastAndroid, Platform } from "react-native";

const useClipboard = () => {
  const [copiedText, setCopiedText] = useState<string>("");

  const copyToClipboard = useCallback(
    async (text: string, successMessage: string = "Tersalin!") => {
      try {
        await Clipboard.setStringAsync(text);
        setCopiedText(text);

        if (Platform.OS === "android") {
          ToastAndroid.show(successMessage, ToastAndroid.SHORT);
        }

        return true;
      } catch (error) {
        console.error("Copy failed:", error);
        if (Platform.OS === "android") {
          ToastAndroid.show("Gagal menyalin!", ToastAndroid.SHORT);
        }
        return false;
      }
    },
    []
  );

  const getCopiedText = useCallback(async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
    return text;
  }, []);

  return { copiedText, copyToClipboard, getCopiedText };
};

export default useClipboard;
