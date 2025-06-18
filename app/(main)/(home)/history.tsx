import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { colors, newColors } from "@/constants/color";
import useFetch from "@/hooks/useFetch";
import { api } from "@/utils/axios";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import DropdownCustomTriger, {
  DropdownOption,
} from "@/components/DropdownCustomTriger";
import { router, useFocusEffect } from "expo-router";
import { HistoryPembayaran } from "@/types/apiResponse";
import TagihanItem from "@/components/TagihanItem";
import { fetchNotifCountAsync, formatToTimeZone } from "@/utils";
import Skeleton from "@/components/Skeleton";
import ErrorDisplay from "@/components/ErrorDisplay";
export interface QueryParams {
  bulan?: string;
  tanggal?: string;
  status?: string;
  urutkan?: string;
}

const history = () => {
  const insets = useSafeAreaInsets();
  const [valueInsets, setValueInsets] = useState<number>(insets.top);
  const [refresh, setRefresh] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [queryParams, setQueryParams] = useState<QueryParams>({});
  const [countNotifPembayaran, setCountNotifPembayaran] = useState(null);
  const optionsFilter = useMemo<DropdownOption[]>(
    () => [
      { label: "Belum Dibayar", value: "belum_dibayar" },
      { label: "Tanggal Sekarang", value: "tanggal_sekarang" },
      { label: "Menunggu Pembayaran", value: "pending" },
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
  } = useFetch<HistoryPembayaran[]>(async () => {
    const countNotifAsync = await fetchNotifCountAsync();
    setCountNotifPembayaran(countNotifAsync);
    const res = await api.get("/history", {
      params: queryParams,
    });
    if (res.status === 200) return res.data.data;
    return null;
  });

  const handleRefresh = useCallback(async () => {
    setRefresh(true);
    await refetch();
    setRefresh(false);
  }, [refetch]);

  useEffect(() => {
    if (queryParams) {
      refetch();
    }
  }, [queryParams]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setQueryParams({});
        setValueInsets(0);
      };
    }, [])
  );

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
              Riwayat Pembayaran
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
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
            </View>
            <DrawerToggleButton tintColor={colors.white} />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          position: "relative",
          marginTop: 24,
        }}
      >
        <View
          style={{
            flex: 1,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: colors.white,
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
          <FlatList
            ref={flatListRef}
            refreshing={refresh}
            onRefresh={handleRefresh}
            data={data}
            contentContainerStyle={{
              gap: 10,
              paddingBottom: 24,
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TagihanItem
                status={item.tagihan.status}
                invoice={item.tagihan.kode_tagihan}
                nominal={Number(item.tagihan.nominal)}
                tanggal={item.created_at}
                title={item.tagihan.nama_tagihan}
              />
            )}
            ListEmptyComponent={() =>
              loading ? (
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
          />
        </View>
      </View>
    </View>
  );
};

export default history;
