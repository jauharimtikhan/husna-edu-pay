import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, newColors } from "@/constants/color";
import { Href, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_VAR } from "@/utils/env";
import { useNotification } from "@/contexts/NotificationContext";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DrawerToggleButton } from "@react-navigation/drawer";
import Button from "@/components/Button";
import Feather from "@expo/vector-icons/Feather";
import TagihanItem from "@/components/TagihanItem";
import useFetch from "@/hooks/useFetch";
import { api } from "@/utils/axios";
import Skeleton from "@/components/Skeleton";
import numberFormat from "@/utils/numberFormat";
import ErrorDisplay from "@/components/ErrorDisplay";
import {
  HistoryPembayaran,
  PayNowType,
  UserBaseResponse,
} from "@/types/apiResponse";
import * as Device from "expo-device";
import { fetchNotifCountAsync } from "@/utils";

const Index = () => {
  const { lastNotification } = useNotification();
  const [user, setUser] = useState<UserBaseResponse | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [countNotifPembayaran, setCountNotifPembayaran] = useState(null);

  const getStorageData = async () => {
    const token = await AsyncStorage.getItem(STORAGE_VAR.token);
    const user = await AsyncStorage.getItem(STORAGE_VAR.user);
    if (!token && !user) {
      router.replace("/(auth)/login" as Href);
    }
    setUser(JSON.parse(user as string));
    const countNotifAsync = await fetchNotifCountAsync();
    setCountNotifPembayaran(countNotifAsync);
  };

  const {
    data: lastTagihan,
    loading: loadingLastTagihan,
    refect: refetchLastTagihan,
  } = useFetch(async () => {
    const res = await api.get("/tagihan/total-tagihan-bulan-ini");
    return res.data?.nominal ?? 0;
  }, true);

  const {
    data: riwayatPembayaran,
    loading: loadingRiwayatPembayaran,
    refect: refetchRiwayatPembayaran,
  } = useFetch<HistoryPembayaran[]>(async () => {
    const res = await api.get("/history/list");
    if (res.status === 200) return res.data.data;
    return null;
  }, true);
  const {
    data: payNowData,
    loading: loadingPayNow,
    refect: refetchPayNow,
  } = useFetch<PayNowType>(async () => {
    const res = await api.get("/tagihan/bayar-sekarang");

    return res.data;
  }, true);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refetchLastTagihan(),
        refetchRiwayatPembayaran(),
        refetchPayNow(),
        getStorageData(),
      ]);
    } catch (error) {
      //
    } finally {
      setRefreshing(false);
    }
  }, [refetchLastTagihan, refetchRiwayatPembayaran, refetchPayNow]);

  const handleGetPayNow = async () => {
    if (!payNowData) {
      ToastAndroid.show("Tagihan bulan ini kosong!", ToastAndroid.SHORT);
      return;
    }

    router.push({
      pathname: "/(payment)/detail-multiple-pembayaran",
      params: {
        data_tagihans: JSON.stringify(payNowData),
      },
    });
  };

  useEffect(() => {
    getStorageData();
  }, [lastNotification, countNotifPembayaran]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: newColors[600] }}>
      <StatusBar style="light" backgroundColor={newColors[600]} />

      {/* Header */}
      <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontFamily: "poppins",
                fontSize: 24,
                fontWeight: "900",
                color: colors.white,
              }}
            >
              HUSNA EDUPAY
            </Text>
            <Text
              style={{
                fontFamily: "poppins",
                fontSize: 14,
                fontWeight: "500",
                color: colors.white,
              }}
            >
              Selamat Datang, {(user && user.nama_lengkap) || ""}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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

      {/* Total Tagihan */}
      <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 12,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontFamily: "poppins",
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            Total Tagihan Bulan Ini
          </Text>
          {loadingLastTagihan ? (
            <Skeleton
              type="text"
              width={"100%"}
              height={40}
              style={{ marginTop: 12 }}
            />
          ) : (
            <Text
              style={{
                fontFamily: "poppins",
                fontSize: 32,
                fontWeight: "900",
              }}
            >
              {numberFormat(lastTagihan as number)}
            </Text>
          )}
        </View>

        {payNowData && (
          <Button
            onPress={handleGetPayNow}
            title="Bayar Sekarang"
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              height: 40,
              borderRadius: 8,
              marginTop: 16,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
            rightcontent={
              <Feather
                name="arrow-right-circle"
                style={{ marginLeft: 6 }}
                size={16}
                color={colors.white}
              />
            }
          />
        )}
      </View>

      {/* Riwayat Header */}
      <View
        style={{
          marginTop: 25,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          backgroundColor: colors.white,
          paddingVertical: 25,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontFamily: "poppins",
              fontSize: 16,
              fontWeight: "400",
            }}
          >
            Riwayat Pembayaran
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(main)/(home)/history")}
          >
            <Text
              style={{
                fontFamily: "poppins",
                fontWeight: "300",
                fontSize: 14,
                color: newColors[700],
              }}
            >
              Lihat Semua
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Riwayat List */}
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <FlatList
          data={loadingRiwayatPembayaran ? [] : riwayatPembayaran ?? []}
          keyExtractor={(item, index) =>
            item?.tagihan?.kode_tagihan
              ? `${item.tagihan.kode_tagihan}-${index}`
              : `${index}`
          }
          scrollEnabled
          renderItem={({ item }) =>
            item?.tagihan ? (
              <TagihanItem
                status={item.tagihan.status}
                title={item.tagihan.nama_tagihan}
                invoice={item.tagihan.kode_tagihan}
                tanggal={item.tagihan.tanggal as string}
                nominal={item.tagihan.nominal}
              />
            ) : null
          }
          contentContainerStyle={{
            gap: 12,
            paddingBottom: 30,
            paddingHorizontal: 20,
            backgroundColor: colors.white,
          }}
          ListEmptyComponent={() =>
            loadingRiwayatPembayaran ? (
              <>
                {Array.from({ length: 7 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    type="custom"
                    borderRadius={12}
                    width={"100%"}
                    height={60}
                  />
                ))}
              </>
            ) : (
              <ErrorDisplay
                title="Belum Ada Riwayat Pembayaran"
                description="Silahkan melakukan pembayaran tagihan dahulu!"
                showRetry={false}
                compact={true}
                actionText=""
                containerStyle={{
                  backgroundColor: colors.white,
                }}
              />
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#9Bd35A", "#689F38"]}
              tintColor="#689F38"
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Index;
