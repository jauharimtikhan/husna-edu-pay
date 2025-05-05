import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/utils/axios";
import useFetch from "@/hooks/useFetch";
import { colors } from "@/constants/color";
const logout = () => {
  const {
    data: logoutData,
    loading,
    refect: refetch,
  } = useFetch(async () => {
    await api.post("/auth/logout");
    await AsyncStorage.clear();
  }, false);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <View
        style={{
          width: 300,
          height: 200,
          backgroundColor: "#fff",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          padding: 20,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
            }}
          >
            Logout
          </Text>
          <TouchableOpacity onPress={() => router.canGoBack() && router.back()}>
            <Entypo name="cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginTop: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: "black",
              textAlign: "center",
            }}
          >
            Apakah Anda Yakin Ingin Keluar?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
              paddingHorizontal: 20,
              flexWrap: "nowrap",
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => router.canGoBack() && router.back()}
              style={{
                backgroundColor: "#035A32",
                padding: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#ccc",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "white",
                }}
              >
                Tidak
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await refetch();
                router.replace("/(auth)/login");
              }}
              style={{
                backgroundColor: "#5A0603",
                padding: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#ccc",
                alignItems: "center",
                width: "50%",
              }}
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  Ya
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default logout;
