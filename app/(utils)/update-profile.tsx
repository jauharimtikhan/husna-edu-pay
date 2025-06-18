import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "@/components/Input";
import { useForm } from "@/hooks/useForm";
import { api } from "@/utils/axios";
import { STORAGE_VAR } from "@/utils/env";
import { UserBaseResponse } from "@/types/apiResponse";
import { colors, newColors } from "@/constants/color";
import { router } from "expo-router";
import { getAssetUrl } from "@/utils";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type UpdateProfileType = {
  nama_lengkap: string;
  alamat: string;
  avatar: string | File;
  email: string;
};

export const DEFAULT_AVATAR = "https://avatar.iran.liara.run/public/40";

const UpdateProfile = () => {
  const [user, setUser] = useState<UserBaseResponse | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>(DEFAULT_AVATAR);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [isReady, setIsReady] = useState(true);

  const formUpdate = useForm<UpdateProfileType>({
    initialData: {
      nama_lengkap: "",
      alamat: "",
      avatar: "",
      email: "",
    },
    onSubmit: async (data) => {
      try {
        const formData = new FormData();
        formData.append("email", user?.email ?? "");
        formData.append("nama_lengkap", data.nama_lengkap);
        formData.append("alamat", data.alamat);
        if (avatarImage !== DEFAULT_AVATAR) {
          const localUri = avatarImage;
          const filename =
            localUri.split("/").pop() ?? `photo-${Date.now()}.jpg`;
          const match = /\.(\w+)$/.exec(filename ?? "");
          const ext = match ? match[1] : "jpg";

          const file = {
            uri: localUri,
            name: filename,
            type: `image/${ext}`,
          };

          formData.append("avatar", file as any); // 👈 wajib pakai ini
        }

        const res = await api.post("/auth/update-profile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        await AsyncStorage.setItem(
          STORAGE_VAR.user,
          JSON.stringify(res.data.data)
        );

        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Gagal memperbarui profil.";
        console.error("Update profile error:", error);
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      }
    },
  });

  const handleRequestImage = useCallback(async () => {
    if (!status?.granted) await requestPermission();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setAvatarImage(uri);
      formUpdate.setData("avatar", uri);
    }
  }, [status, requestPermission]);

  const initialize = async () => {
    const userData = await AsyncStorage.getItem(STORAGE_VAR.user);
    if (userData) {
      setIsReady(false);
      const parsedUser = JSON.parse(userData) as UserBaseResponse;
      setUser(parsedUser);
      formUpdate.setData("nama_lengkap", parsedUser.nama_lengkap ?? "");
      formUpdate.setData("alamat", parsedUser.alamat ?? "");
      setAvatarImage(getAssetUrl(parsedUser.avatar ?? ""));
    }
  };

  useEffect(() => {
    initialize();
  }, [isReady]);

  if (isReady) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: newColors[600] }}>
      <View style={{ marginTop: 19, paddingHorizontal: 16 }}>
        <TouchableOpacity
          onPress={() => router.canGoBack() && router.back()}
          style={{
            flexDirection: "row",
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
              marginLeft: 8,
            }}
          >
            Kembali
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 65,
          paddingHorizontal: 16,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: colors.white,
          flex: 1,
          position: "relative",
        }}
      >
        {/* Avatar */}
        <View
          style={{
            position: "absolute",
            top: -60,
            left: SCREEN_WIDTH / 2 - 55,
            borderWidth: 10,
            borderColor: newColors[500],
            borderRadius: 9999,
          }}
        >
          <View style={{ overflow: "hidden", borderRadius: 9999 }}>
            <Image
              source={{ uri: avatarImage, width: 110, height: 110 }}
              resizeMode="cover"
            />
          </View>
          <View style={{ position: "absolute", bottom: 0, right: 10 }}>
            <TouchableOpacity onPress={handleRequestImage}>
              <Entypo
                name="camera"
                size={24}
                color={
                  avatarImage !== DEFAULT_AVATAR ? newColors[700] : colors.white
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form */}
        <View style={{ flex: 1, marginTop: 85, gap: 12 }}>
          <Input
            label="Nama Lengkap"
            placeholder="Masukan nama lengkap anda"
            value={formUpdate.data.nama_lengkap}
            onChangeText={(v) => formUpdate.setData("nama_lengkap", v)}
            ref={(ref) => formUpdate.registerInput("nama_lengkap", ref)}
            returnKeyType="next"
            error={formUpdate.errors.nama_lengkap}
            onSubmitEditing={() =>
              formUpdate.handleSubmitEditing("nama_lengkap")
            }
          />
          <Input
            label="Alamat"
            placeholder="Masukan alamat anda"
            value={formUpdate.data.alamat}
            onChangeText={(v) => formUpdate.setData("alamat", v)}
            ref={(ref) => formUpdate.registerInput("alamat", ref)}
            returnKeyType="done"
            error={formUpdate.errors.alamat}
          />
        </View>

        {/* Button */}
        <View style={{ marginBottom: 50 }}>
          <TouchableOpacity
            onPress={formUpdate.submit}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              backgroundColor: newColors[700],
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
            }}
          >
            {formUpdate.processing ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <Text
                style={{
                  fontFamily: "poppins",
                  fontWeight: "800",
                  fontSize: 18,
                  color: colors.white,
                }}
              >
                Simpan
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateProfile;
