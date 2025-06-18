import { View, Text, Dimensions, ToastAndroid, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { colors, newColors } from "@/constants/color";
import { TouchableOpacity } from "react-native";
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Image } from "react-native";
import { ActivityIndicator } from "react-native";
import useFetch from "@/hooks/useFetch";
import { api } from "@/utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Input from "@/components/Input";
import { useForm } from "@/hooks/useForm";
import { UserBaseResponse } from "@/types/apiResponse";
import { STORAGE_VAR } from "@/utils/env";
import ConfirmationModal from "@/components/ConfirmationModal";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const UpdatePassword = () => {
  const insets = useSafeAreaInsets();
  const [isReady, setIsReady] = useState(true);
  const [user, setUser] = useState<UserBaseResponse | null>(null);
  const [toggleOldPass, setToggleOldPass] = useState(true);
  const [toggleNewPass, setToggleNewPass] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const form = useForm({
    initialData: {
      password_lama: "",
      password_baru: "",
      konfirmasi_password_baru: "",
      email: "",
    },
    onSubmit: async (data) => {
      const res = await api.post("/auth/update-password", data);
      if (res.status === 200) {
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        setTimeout(() => {
          AsyncStorage.clear();
          router.replace("/(auth)/login");
          return;
        }, 300);
      }
    },
  });

  const initialize = async () => {
    const userData = await AsyncStorage.getItem(STORAGE_VAR.user);
    if (userData) {
      setIsReady(false);
      const parsedUser = JSON.parse(userData) as UserBaseResponse;
      setUser(parsedUser);
      form.setData("email", parsedUser.email);
    }
  };

  useEffect(() => {
    initialize();
  }, [isReady]);

  if (isReady) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: newColors[600],
        paddingTop: insets.top,
      }}
    >
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => router.canGoBack() && router.back()}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Entypo name="chevron-left" size={24} color={colors.white} />
            <Text
              style={{
                fontFamily: "poppins",
                fontSize: 20,
                fontWeight: "900",
                color: colors.white,
                maxWidth: 200,
              }}
            >
              Kembali
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 16,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: colors.white,
          flex: 1,
          position: "relative",
        }}
      >
        <View
          style={{
            flex: 1,
            gap: 12,
            marginTop: 20,
          }}
        >
          <Input
            label="Kata Sandi Lama"
            placeholder="Masukan kata sandi lama"
            value={form.data.password_lama}
            onChangeText={(value) => form.setData("password_lama", value)}
            ref={(ref) => form.registerInput("password_lama", ref)}
            returnKeyType="next"
            onSubmitEditing={() => form.handleSubmitEditing("password_lama")}
            error={form.errors.password_lama}
            secureTextEntry={toggleOldPass}
            rightcontent={() => (
              <TouchableOpacity
                onPress={() => setToggleOldPass(!toggleOldPass)}
              >
                {toggleOldPass ? (
                  <Entypo name="eye" size={24} color="black" />
                ) : (
                  <Entypo name="eye-with-line" size={24} color="black" />
                )}
              </TouchableOpacity>
            )}
          />
          <Input
            label="Kata Sandi Baru"
            placeholder="Masukan kata sandi baru"
            value={form.data.password_baru}
            onChangeText={(value) => form.setData("password_baru", value)}
            ref={(ref) => form.registerInput("password_baru", ref)}
            returnKeyType="next"
            onSubmitEditing={() => form.handleSubmitEditing("password_baru")}
            error={form.errors.password_baru}
            secureTextEntry={toggleNewPass}
            rightcontent={() => (
              <TouchableOpacity
                onPress={() => setToggleNewPass(!toggleNewPass)}
              >
                {toggleNewPass ? (
                  <Entypo name="eye" size={24} color="black" />
                ) : (
                  <Entypo name="eye-with-line" size={24} color="black" />
                )}
              </TouchableOpacity>
            )}
          />
          <Input
            label="Konfirmasi Kata Sandi Baru"
            placeholder="Masukan ulang kata sandi baru"
            value={form.data.konfirmasi_password_baru}
            onChangeText={(value) =>
              form.setData("konfirmasi_password_baru", value)
            }
            ref={(ref) => form.registerInput("konfirmasi_password_baru", ref)}
            returnKeyType="done"
            onSubmitEditing={() =>
              form.handleSubmitEditing("konfirmasi_password_baru")
            }
            error={form.errors.konfirmasi_password_baru}
            secureTextEntry={toggleNewPass}
            rightcontent={() => (
              <TouchableOpacity
                onPress={() => setToggleNewPass(!toggleNewPass)}
              >
                {toggleNewPass ? (
                  <Entypo name="eye" size={24} color="black" />
                ) : (
                  <Entypo name="eye-with-line" size={24} color="black" />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={{
            marginBottom: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (
                form.data.password_baru !== "" &&
                form.data.password_lama !== "" &&
                form.data.konfirmasi_password_baru !== ""
              ) {
                setModalVisible(true);
              } else {
                ToastAndroid.show(
                  "Silahkan lengkapi form dahulu!",
                  ToastAndroid.SHORT
                );
                return;
              }
            }}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: newColors[700],
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderRadius: 12,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "poppins",
                fontWeight: 800,
                fontSize: 18,
                color: colors.white,
              }}
            >
              Ubah Kata Sandi
            </Text>
          </TouchableOpacity>
        </View>
        <ConfirmationModal
          visible={modalVisible}
          title="Apakah Anda Yakin?"
          onCancel={() => {
            setModalVisible(false);
            ToastAndroid.show("Anda membatalkan Tindakan", ToastAndroid.SHORT);
          }}
          onConfirm={form.submit}
          loadingProcess={form.processing}
          message="Anda akan logout otomatis!"
        />
      </View>
    </View>
  );
};

export default UpdatePassword;
