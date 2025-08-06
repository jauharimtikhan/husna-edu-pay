import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href, router } from "expo-router";
import { colors, newColors } from "@/constants/color";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm } from "@/hooks/useForm";
import { apiNoToken } from "@/utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENV, STORAGE_VAR } from "@/utils/env";
import * as Device from "expo-device";
import { Entypo } from "@expo/vector-icons";
import { registerForPushNotificationsAsync } from "@/utils/registerPushNotification";
const login = () => {
  const [togglePass, setTogglePass] = useState(true);
  const initialData = {
    username: "",
    password: "",
    token: "",
  };
  const form = useForm({
    initialData,
    onSubmit: async (useFormData) => {
      if (useFormData.username === "" && useFormData.password === "") {
        form.setError("password", "Password tidak boleh kosong");
        form.setError("username", "Username tidak boleh kosong");
        return;
      }
      const deviceId = `${Device.osBuildId}-${Device.deviceName}`;
      const expoToken = await AsyncStorage.getItem(STORAGE_VAR.push_token);

      if (expoToken) {
        form.setData("token", expoToken);
      } else {
        await registerForPushNotificationsAsync();
      }
      await apiNoToken.post("/auth/update_device_id", {
        username: useFormData.username,
        device_id: deviceId,
      });

      const res = await apiNoToken.post("/auth/login", useFormData);

      if (res.status === 200) {
        await AsyncStorage.setItem(STORAGE_VAR.token, res.data?.data?.token);
        await AsyncStorage.setItem(
          STORAGE_VAR.user,
          JSON.stringify(res.data?.data?.user)
        );
        router.replace("/(home)" as Href);
      } else {
        if (res.status === 401) {
          ToastAndroid.show(res.data.data.message, ToastAndroid.SHORT);
          return;
        }
        // console.log(res.data);
      }
    },
  });
  useEffect(() => {
    const initialize = async () => {
      const expoToken = await AsyncStorage.getItem(STORAGE_VAR.push_token);
      if (expoToken) form.setData("token", expoToken);
    };
    initialize();
  }, []);

  return (
    <>
      {/* <StatusBar backgroundColor={newColors[600]} style="dark" /> */}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{
              flex: 1,
            }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    paddingLeft: 34,
                    marginTop: 30,
                  }}
                >
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 36,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Selamat Datang
                  </Text>
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 18,
                      fontWeight: "semibold",
                      textAlign: "center",
                    }}
                  >
                    Silakan Masuk Dengan Akun Anda
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    paddingBottom: 69,
                    paddingHorizontal: 30,
                    gap: 28,
                    marginTop: 34,
                  }}
                >
                  <Input
                    label="Username or email"
                    placeholder="Enter your username or email"
                    style={{
                      height: 40,
                    }}
                    error={form.errors.username}
                    onChangeText={(text) => form.setData("username", text)}
                    value={form.data.username}
                    ref={(ref) => form.registerInput("username", ref)}
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => form.handleSubmitEditing("username")}
                  />
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    error={form.errors.password}
                    value={form.data.password}
                    onChangeText={(text) => form.setData("password", text)}
                    ref={(ref) => form.registerInput("password", ref)}
                    secureTextEntry={togglePass}
                    returnKeyType="done"
                    onSubmitEditing={() => form.submit()}
                    style={{
                      height: 40,
                    }}
                    rightcontent={() => {
                      if (togglePass) {
                        return (
                          <Entypo
                            onPress={() => setTogglePass(false)}
                            name="eye"
                            size={24}
                            color="black"
                          />
                        );
                      } else {
                        return (
                          <Entypo
                            name="eye-with-line"
                            onPress={() => setTogglePass(true)}
                            size={24}
                            color="black"
                          />
                        );
                      }
                    }}
                  />
                  <View
                    style={{
                      marginTop: -20,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => router.push("/(auth)/forgot")}
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 14,
                          textAlign: "left",
                          fontWeight: "semibold",
                        }}
                      >
                        Lupa password?
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Button
                      title="Login"
                      loading={form.processing}
                      onPress={form.submit}
                      style={{
                        justifyContent: "center",
                        borderRadius: 8,
                        paddingVertical: 16,
                        paddingHorizontal: 8,
                        alignItems: "center",
                      }}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default login;
