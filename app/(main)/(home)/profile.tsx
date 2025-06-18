import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { fetchNotifCountAsync, getAssetUrl } from "@/utils";
import { STORAGE_VAR } from "@/utils/env";
import { UserBaseResponse } from "@/types/apiResponse";
import { DEFAULT_AVATAR } from "@/app/(utils)/update-profile";
import ErrorDisplay from "@/components/ErrorDisplay";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const panduan = () => {
  const [countNotifPembayaran, setCountNotifPembayaran] = useState(null);
  const [user, setUser] = useState<UserBaseResponse | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>(DEFAULT_AVATAR);
  const [isReady, setIsReady] = useState(true);
  const {
    data: logoutData,
    loading,
    refect: refetch,
  } = useFetch(async () => {
    await api.post("/auth/logout");
    await AsyncStorage.clear();
  }, false);

  const handleInit = async () => {
    const countNotifAsync = await fetchNotifCountAsync();
    setCountNotifPembayaran(countNotifAsync);
    const userData = await AsyncStorage.getItem(STORAGE_VAR.user);
    if (userData) {
      setIsReady(false);
      const parsedUser = JSON.parse(userData) as UserBaseResponse;
      setUser(parsedUser);
      setAvatarImage(getAssetUrl(parsedUser.avatar ?? ""));
    }
  };
  useEffect(() => {
    handleInit();
  }, []);
  if (isReady) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: newColors[600] }}>
      <View
        style={{
          marginTop: 19,
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
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontFamily: "poppins",
                fontSize: 26,
                fontWeight: "900",
                color: colors.white,
                maxWidth: 200,
              }}
            >
              Profil
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 5,
                position: "relative",
              }}
              onPress={() => router.push("/(utils)/notifikasi")}
            >
              {countNotifPembayaran ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: colors.danger,
                    padding: 2,
                    borderRadius: 9999,
                    zIndex: 9999,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "popins",
                      fontSize: 10,
                      color: colors.white,
                    }}
                  >
                    {countNotifPembayaran}
                  </Text>
                </View>
              ) : null}
              <FontAwesome name="bell" size={24} color={colors.white} />
            </TouchableOpacity>
            <DrawerToggleButton tintColor={colors.white} />
          </View>
        </View>
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
          <View
            style={{
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <Image
              source={{
                uri: avatarImage,
                width: 110,
                height: 110,
              }}
              resizeMode="cover"
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 65,
          }}
        >
          <View
            style={{
              marginTop: 24,
            }}
          >
            <Text
              style={{
                fontFamily: "poppins",
                fontWeight: 800,
                fontSize: 17,
                color: colors.black,
                marginBottom: 8,
              }}
            >
              Menu
            </Text>
            <View
              style={{
                borderRadius: 12,
                backgroundColor: colors.white,
                padding: 16,
                gap: 24,
              }}
            >
              <TouchableOpacity
                onPress={() => router.push("/(utils)/update-profile")}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <FontAwesome5 name="user-edit" size={18} color="black" />
                  <Text
                    style={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    Pengaturan Akun
                  </Text>
                </View>
                <Entypo name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/(utils)/update-password")}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Feather name="lock" size={18} color="black" />
                  <Text
                    style={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    Ubah Kata Sandi
                  </Text>
                </View>
                <Entypo name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: 24,
            }}
          >
            <Text
              style={{
                fontFamily: "poppins",
                fontWeight: 800,
                fontSize: 17,
                color: colors.black,
                marginBottom: 8,
              }}
            >
              Info
            </Text>
            <View
              style={{
                borderRadius: 12,
                backgroundColor: colors.white,
                padding: 16,
                gap: 24,
              }}
            >
              <TouchableOpacity
                onPress={() => router.push("/(utils)/panduan")}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <FontAwesome5 name="question" size={18} color="black" />
                  <Text
                    style={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    Bantuan
                  </Text>
                </View>
                <Entypo name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/(utils)/syarat-ketentuan")}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <FontAwesome5 name="scroll" size={18} color="black" />
                  <Text
                    style={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    Syarat & Ketentuan
                  </Text>
                </View>
                <Entypo name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/(utils)/kebijakan-privasi")}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Ionicons name="shield-checkmark" size={18} color="black" />
                  <Text
                    style={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    Kebijakan Privasi
                  </Text>
                </View>
                <Entypo name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            marginBottom: 50,
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              await refetch();
              router.replace("/(auth)/login");
            }}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: colors.danger,
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderRadius: 12,
              justifyContent: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} size={"small"} />
            ) : (
              <>
                <Text
                  style={{
                    fontFamily: "poppins",
                    fontWeight: 800,
                    fontSize: 18,
                    color: colors.white,
                  }}
                >
                  Logout
                </Text>
                <Feather
                  name="arrow-right-circle"
                  size={18}
                  color={colors.white}
                />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default panduan;
