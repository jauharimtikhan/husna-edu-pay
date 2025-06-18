import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  RefreshControl,
  TouchableOpacityProps,
  StyleSheet,
  StatusBar as RNStatusBar,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, newColors } from "@/constants/color";
import TagihanItemSelectable from "@/components/TagihanItemSelectable";
import Button from "@/components/Button";
import { router, useFocusEffect } from "expo-router";
import DropdownCustomTriger, {
  DropdownOption,
} from "@/components/DropdownCustomTriger";
import useFetch from "@/hooks/useFetch";
import { api } from "@/utils/axios";
import { TagihanApiResponse } from "@/types/apiResponse";
import Skeleton from "@/components/Skeleton";
import ErrorDisplay from "@/components/ErrorDisplay";
import { formatToTimeZone, getMonthInfo, getSafeAreaValue } from "@/utils";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

interface QueryParams {
  bulan?: string;
  tanggal?: string;
  status?: string;
}

const Pembayaran = () => {
  const insets = useSafeAreaInsets();
  const [valueInsets, setValueInsets] = useState<number>(insets.top);
  const filterOptions = useMemo<DropdownOption[]>(
    () => [
      { label: "Belum Dibayar", value: "belum_dibayar" },
      { label: "Tanggal Sekarang", value: "tanggal_sekarang" },
      { label: "Pending", value: "pending" },
    ],
    []
  );

  const [selectedFilter, setSelectedFilter] = useState<DropdownOption | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [queryParams, setQueryParams] = useState<QueryParams>({});
  const [dataCharge, setDataCharge] = useState<{
    kode_tagihan?: string;
    nominal?: string;
    nama_tagihan: string;
  } | null>(null);
  const filterMap = useMemo(
    () => ({
      belum_dibayar: { status: "capture" },
      tanggal_sekarang: {
        tanggal: formatToTimeZone(new Date().toISOString()),
      },
      pending: { status: "pending" },
    }),
    []
  );

  const {
    data: listTagihan,
    loading: loadingListTagihan,
    refect: refetchListTagihan,
  } = useFetch<TagihanApiResponse[]>(async () => {
    try {
      const res = await api.get("/tagihan", { params: queryParams });
      return res.data.data.data ?? [];
    } catch (error) {
      console.log("Fetch error:", error);
      return [];
    }
  }, true);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetchListTagihan();
    setRefreshing(false);
  }, [refetchListTagihan]);

  const handleSelect = useCallback(
    (item: DropdownOption) => {
      setSelectedFilter(item);
      const newParams = filterMap[item.value as keyof typeof filterMap] || {};
      setQueryParams((prev) => ({ ...prev, ...newParams }));
    },
    [filterMap]
  );

  const renderTagihan = useCallback(
    ({ item }: { item: TagihanApiResponse }) => (
      <TagihanItemSelectable
        invoice={item.kode_tagihan}
        nominal={item.nominal}
        status={item.status}
        tanggal={String(item.tanggal)}
        title={item.nama_tagihan}
        isChecked={selectedInvoice === item.kode_tagihan}
        setChecked={(invoice) => {
          if (selectedInvoice === invoice) {
            setSelectedInvoice(null);
          } else {
            setSelectedInvoice(invoice);
            setDataCharge({
              kode_tagihan: item.kode_tagihan,
              nama_tagihan: item.nama_tagihan,
              nominal: String(item.nominal),
            });
          }
        }}
      />
    ),
    [selectedInvoice]
  );

  const monthFilters = useMemo(
    () =>
      [0, 1, 2, 3].map((offset) => ({
        label: getMonthInfo(offset).label,
        value: getMonthInfo(offset).value,
      })),
    []
  );

  const handlePaymentPress = useCallback(() => {
    if (!selectedInvoice && !dataCharge) return;
    router.push({
      pathname: `/(payment)/detail-pembayaran`,
      params: {
        kode_tagihan: dataCharge?.kode_tagihan,
        nominal: String(dataCharge?.nominal),
        nama_tagihan: dataCharge?.nama_tagihan,
      },
    });
  }, [selectedInvoice]);

  useFocusEffect(
    useCallback(() => {
      setValueInsets(21);
      return () => {
        setSelectedFilter(null);
        setSelectedInvoice(null);
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
      <View style={{ flex: 1, marginTop: 10 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Pilih Tagihan Yang Ingin Anda Bayar</Text>
          <DropdownCustomTriger
            options={filterOptions}
            onSelect={handleSelect}
            renderTrigger={() => (
              <Ionicons name="filter-sharp" size={24} color={colors.white} />
            )}
            dropdownStyle={styles.dropdown}
            itemStyle={styles.dropdownItem}
            position="bottom"
            overlayOpacity={0}
          />
        </View>

        <View style={styles.contentContainer}>
          {/* month filter */}
          <View>
            <ScrollView
              horizontal
              contentContainerStyle={styles.monthFilters}
              showsHorizontalScrollIndicator={false}
            >
              <ButtonFilter label="Semua" onPress={() => setQueryParams({})} />
              {monthFilters.map((month) => (
                <ButtonFilter
                  key={month.value}
                  label={month.label}
                  onPress={async () => {
                    setQueryParams((prev) => ({
                      ...prev,
                      bulan: month.value,
                    }));
                    await refetchListTagihan();
                  }}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.divider} />

          <View style={styles.listContainer}>
            {loadingListTagihan ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.skeletonContainer}
              >
                {Array.from({ length: 6 }).map((_, index) => (
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
                data={listTagihan}
                keyExtractor={(item) => item.id + item.kode_tagihan}
                renderItem={renderTagihan}
                contentContainerStyle={[styles.listContent]}
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
                initialNumToRender={10}
                maxToRenderPerBatch={5}
              />
            )}
          </View>

          <Button
            title="Lanjut Ke Pembayaran"
            onPress={handlePaymentPress}
            disabled={!selectedInvoice}
            style={[
              styles.paymentButton,
              !selectedInvoice && styles.disabledButton,
              { marginBottom: insets.bottom > 0 ? insets.bottom : 30 },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const ButtonFilter = React.memo(({ label, ...props }: ButtonFilterProps) => (
  <TouchableOpacity {...props} style={[styles.filterButton, props.style]}>
    <Text style={styles.filterButtonText}>{label}</Text>
  </TouchableOpacity>
));

interface ButtonFilterProps extends TouchableOpacityProps {
  label: string;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: newColors[600],
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingBottom: 8,
  },
  title: {
    fontFamily: "poppins",
    fontWeight: "800",
    fontSize: 24,
    color: colors.white,
    maxWidth: 250,
  },
  dropdown: {
    backgroundColor: "#f8f8f8",
    minWidth: 200,
  },
  dropdownItem: {
    backgroundColor: "#f8f9fa",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  monthFilters: {
    flexDirection: "row",
    gap: 10,
    marginTop: 24,
    paddingBottom: 8,
  },
  divider: {
    borderBottomWidth: 2,
    borderColor: "#888383",
  },
  listContainer: {
    marginTop: 26,
    flex: 1,
  },
  skeletonContainer: {
    gap: 12,
    paddingBottom: 24,
  },
  listContent: {
    gap: 10,
    paddingBottom: 10,
  },
  paymentButton: {
    backgroundColor: newColors[700],
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  paymentButtonText: {
    fontFamily: "poppins",
    fontWeight: "800",
    color: colors.white,
    fontSize: 18,
  },
  filterButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    maxHeight: 30,
  },
  filterButtonText: {
    fontFamily: "poppins",
    fontWeight: "400",
    fontSize: 16,
  },
});

export default Pembayaran;
