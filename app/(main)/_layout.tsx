import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, newColors } from "@/constants/color";
import { Image } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { api } from "@/utils/axios";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useFetch from "@/hooks/useFetch";
import { UserBaseResponse } from "@/types/apiResponse";
import { DEFAULT_AVATAR } from "../(utils)/update-profile";
import { STORAGE_VAR } from "@/utils/env";
import { getAssetUrl } from "@/utils";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const DrawerContent = (props: DrawerContentComponentProps) => {
  const [user, setUser] = useState<UserBaseResponse | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>(DEFAULT_AVATAR);
  const [isReady, setIsReady] = useState(true);
  const {
    data: logoutData,
    loading,
    refect: refetch,
  } = useFetch(async () => {
    await AsyncStorage.clear();
    await api.post("/auth/logout");
  }, false);

  const handleInit = async () => {
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
    <DrawerContentScrollView {...props}>
      <SafeAreaView
        style={{
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            right: 10,
          }}
        >
          <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
            <Entypo name="cross" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderWidth: 10,
                borderColor: newColors[500],
                borderRadius: 9999,
                position: "relative",
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
                  color: colors.white,
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
                  color: colors.white,
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
              marginTop: SCREEN_HEIGHT * 0.29,
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
    </DrawerContentScrollView>
  );
};

export default function MainLayout() {
  return (
    <GestureHandlerRootView>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            maxWidth: SCREEN_WIDTH * 0.65,
            backgroundColor: newColors[600],
          },
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="(home)"
          options={{
            headerShown: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
