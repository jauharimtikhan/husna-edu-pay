import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  ScrollView,
  Modal,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { colors, newColors } from "@/constants/color";
import PembayaranComponent from "@/components/PembayaranComponent";
import ModalPopUpPayment from "@/components/ModalPopUpPayment";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import DropdownCustomTriger, {
  DropdownOption,
} from "@/components/DropdownCustomTriger";
import { router, useFocusEffect } from "expo-router";
import { QueryParams } from "./history";
import { fetchNotifCountAsync, formatToTimeZone } from "@/utils";
import useFetch from "@/hooks/useFetch";
import { TagihanApiResponse } from "@/types/apiResponse";
import { api } from "@/utils/axios";
import ErrorDisplay from "@/components/ErrorDisplay";
import numberFormat from "@/utils/numberFormat";
import Skeleton from "@/components/Skeleton";

const Tagihan = () => {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [countNotifPembayaran, setCountNotifPembayaran] = useState(null);
  const [valueInsets, setValueInsets] = useState<number>(insets.top);
  const [queryParams, setQueryParams] = useState<QueryParams>({});

  const optionsFilter = useMemo<DropdownOption[]>(
    () => [
      { label: "Belum Dibayar", value: "belum_dibayar" },
      { label: "Tanggal Sekarang", value: "tanggal_sekarang" },
    ],
    []
  );
  const optionsUrutkan = useMemo<DropdownOption[]>(
    () => [
      { label: "Naik", value: "asc" },
      { label: "Menurun", value: "desc" },
    ],
    []
  );

  const handleSelectOption = useCallback((item: DropdownOption) => {
    const filterValue = item.value;

    let newParams: Partial<QueryParams> = {};

    if (filterValue === "belum_dibayar") {
      newParams.status = "capture";
    } else if (filterValue === "tanggal_sekarang") {
      newParams.tanggal = formatToTimeZone(new Date().toISOString());
    } else if (filterValue === "pending") {
      newParams.status = "pending";
    } else if (filterValue === "asc" || filterValue === "desc") {
      newParams.urutkan = filterValue;
    }

    setQueryParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  const {
    data,
    loading,
    refect: refetch,
  } = useFetch<TagihanApiResponse[]>(async () => {
    const countNotifAsync = await fetchNotifCountAsync();
    setCountNotifPembayaran(countNotifAsync);
    try {
      const res = await api.get("/tagihan", { params: queryParams });
      return res.data.data.data ?? [];
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  });
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const renderTagihan = useCallback(
    ({ item }: { item: TagihanApiResponse }) => (
      <TagihanItem
        invoice={item.kode_tagihan}
        nominal={item.nominal}
        status={item.status}
        tanggal={String(item.tanggal)}
        title={item.nama_tagihan}
      />
    ),
    []
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setQueryParams({});
        setValueInsets(0);
      };
    }, [])
  );
  useEffect(() => {
    if (queryParams) {
      refetch();
    }
  }, [queryParams]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: newColors[600],
        paddingTop: insets.top,
      }}
    >
      <StatusBar style="light" backgroundColor={newColors[600]} />
      <View
        style={{
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
              Tagihan Pembayaran
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
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: colors.white,
          marginTop: 25,
          flex: 1,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 16,
          }}
        >
          <DropdownCustomTriger
            options={optionsUrutkan}
            onSelect={handleSelectOption}
            renderTrigger={(isOpen) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Ionicons name="filter-sharp" size={24} color="black" />
                <Text>Urutkan</Text>
              </View>
            )}
            dropdownStyle={{
              backgroundColor: "#f8f8f8",
              minWidth: 200,
              position: "absolute",
              left: 10,
            }}
            itemStyle={{ backgroundColor: "#f8f9fa" }}
            position="bottom"
            overlayOpacity={0}
          />

          <DropdownCustomTriger
            options={optionsFilter}
            onSelect={handleSelectOption}
            renderTrigger={(isOpen) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <FontAwesome name="filter" size={24} color="black" />
                <Text>Filter</Text>
              </View>
            )}
            dropdownStyle={{
              backgroundColor: "#f8f8f8",
              minWidth: 200,
            }}
            itemStyle={{ backgroundColor: "#f8f9fa" }}
            position="bottom"
            overlayOpacity={0}
          />
        </View>
        <View
          style={{
            paddingBottom: 64,
          }}
        >
          {loading ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                gap: 12,
                paddingBottom: 24,
              }}
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  key={`skeleton-${index}`}
                  width="100%"
                  height={80}
                  type="custom"
                  borderRadius={12}
                />
              ))}
            </ScrollView>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id + item.kode_tagihan}
              renderItem={renderTagihan}
              contentContainerStyle={{
                gap: 12,
                paddingBottom: 24,
              }}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#9Bd35A", "#689F38"]}
                  tintColor="#689F38"
                />
              }
              ListEmptyComponent={
                <ErrorDisplay
                  title="Data Tagihan Kosong"
                  showRetry={false}
                  compact={true}
                  actionText=""
                  containerStyle={{
                    backgroundColor: colors.white,
                  }}
                />
              }
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Tagihan;

interface TagihanItemProps {
  title: string;
  invoice: string;
  tanggal: string;
  nominal: number;
  status: string;
}

const TagihanItem = ({ ...props }: TagihanItemProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "flex-start",
            gap: 3,
          }}
        >
          <Text
            style={{
              fontFamily: "poppins",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            {props.title}
          </Text>
          <Text
            style={{
              fontFamily: "poppins",
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            {numberFormat(props.nominal)}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(payment)/detail-pembayaran",
                params: {
                  kode_tagihan: props.invoice,
                  nama_tagihan: props.title,
                  nominal: props.nominal,
                },
              })
            }
            style={{
              backgroundColor: newColors[700],
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "poppins",
                fontWeight: 700,
                fontSize: 14,
                color: colors.white,
              }}
            >
              Bayar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F5F5F5F5",
    borderRadius: 10,
  },
  titleText: {
    //
  },
  badgeContainer: {
    //
  },
});
