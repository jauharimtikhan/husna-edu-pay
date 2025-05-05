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
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href, router } from "expo-router";
import { colors } from "@/constants/color";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm } from "@/hooks/useForm";
import { apiNoToken } from "@/utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENV, STORAGE_VAR } from "@/utils/env";
import * as Device from "expo-device";
const login = () => {
  const initialData = {
    email: "",
    password: "",
  };
  const form = useForm({
    initialData,
    onSubmit: async (useFormData) => {
      const deviceId = `${Device.osBuildId}-${Device.deviceName}`;
      const expoToken = await AsyncStorage.getItem(STORAGE_VAR.push_token);

      if (expoToken) {
        await apiNoToken.post("/auth/update_device_id", {
          email: useFormData.email,
          device_id: deviceId,
        });
      }

      const res = await apiNoToken.post("/auth/login", useFormData);
      if (res.status === 200) {
        await AsyncStorage.setItem(STORAGE_VAR.token, res.data?.data?.token);
        await AsyncStorage.setItem(
          STORAGE_VAR.user,
          JSON.stringify(res.data?.data)
        );
        router.replace("/(home)" as Href);
      } else {
        console.log(res.data);
      }
    },
  });

  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      resizeMode="cover"
      style={{
        flex: 1,
      }}
    >
      <StatusBar backgroundColor="transparent" style="light" />
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
                  paddingHorizontal: 16,
                }}
              >
                <TouchableOpacity
                  onPress={() => router.canGoBack() && router.back()}
                >
                  <Image
                    source={require("@/assets/images/icons/mdi-light_arrow-left-circle.png")}
                    resizeMode="contain"
                    style={{
                      width: 37,
                      height: 37,
                      marginTop: 16,
                      marginBottom: 16,
                      tintColor: "#fff",
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    alignSelf: "flex-start",
                    marginBottom: 27,
                    paddingLeft: 34,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 36,
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: colors.white,
                    borderTopLeftRadius: 60,
                    borderBottomRightRadius: 60,
                    width: "100%",
                    paddingVertical: 69,
                    paddingHorizontal: 30,
                    gap: 39,
                  }}
                >
                  <View>
                    <Text>email: user@tes.com</Text>
                    <Text>pass: user123</Text>
                  </View>
                  <Input
                    label="Username or email"
                    placeholder="Enter your username or email"
                    style={{
                      height: 40,
                    }}
                    icon={() => (
                      <Image
                        source={require("@/assets/images/icons/user.png")}
                        resizeMode="contain"
                        style={{ width: 23, height: 24, tintColor: "#000" }}
                      />
                    )}
                    error={form.errors.email}
                    onChangeText={(text) => form.setData("email", text)}
                    value={form.data.email}
                    ref={(ref) => form.registerInput("email", ref)}
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => form.handleSubmitEditing("email")}
                  />
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    icon={() => (
                      <Image
                        source={require("@/assets/images/icons/lock.png")}
                        resizeMode="contain"
                        style={{ width: 23, height: 24, tintColor: "#000" }}
                      />
                    )}
                    error={form.errors.password}
                    value={form.data.password}
                    onChangeText={(text) => form.setData("password", text)}
                    ref={(ref) => form.registerInput("password", ref)}
                    secureTextEntry={true}
                    returnKeyType="done"
                    onSubmitEditing={() => form.submit()}
                    style={{
                      height: 40,
                    }}
                  />
                  <View
                    style={{
                      marginTop: -20,
                    }}
                  >
                    <TouchableOpacity>
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 14,
                          textAlign: "left",
                          fontWeight: "semibold",
                        }}
                      >
                        Forgot password?
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Button
                      title="Login"
                      loading={form.processing}
                      onPress={form.submit}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default login;
