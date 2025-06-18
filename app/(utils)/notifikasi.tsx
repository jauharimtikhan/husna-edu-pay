import {
  View,
  Text,
  Dimensions,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useCallback, useState } from "react";
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
import Input from "@/components/Input";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Badge from "@/components/Badge";
import { StyleSheet } from "react-native";
import { useNotification } from "@/contexts/NotificationContext";
import {
  NotifikasiResponseType,
  StatusTransaksiType,
} from "@/types/apiResponse";
import formatIndonesianDate from "@/utils/formatDate";
import { statusBadgeMap } from "@/components/TagihanItemSelectable";
import ErrorDisplay from "@/components/ErrorDisplay";
import Skeleton from "@/components/Skeleton";
import { translateStatusTransaksi } from "@/utils";
import ModalDetailTransaksi from "@/components/ModalDetailTransaksi";
import { MidtransChargeResponse } from "@/types/midtrans-response";
import { BCA } from "@/constants/midtransDummyResponse";

const Notifikasi = () => {
  const { lastNotification } = useNotification();
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataTransaksi, setDataTransaksi] =
    useState<NotifikasiResponseType | null>(null);

  const {
    data,
    loading,
    refect: refetch,
  } = useFetch<NotifikasiResponseType[]>(async () => {
    try {
      const res = await api.get("/notifikasi");
      return res.data.data;
    } catch (error) {
      return null;
    }
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleOpenModal = (transaksi: NotifikasiResponseType) => {
    setDataTransaksi(transaksi);
    setModalVisible(true);
  };

  const {
    data: updateAllNotif,
    loading: loadingUpdateAllNotif,
    refect: refetchUpdateAllNotif,
  } = useFetch(async () => {
    try {
      const res = await api.post("/notifikasi/update-all");
      if (res.status === 200) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }, false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: newColors[600] }}>
      {/* Header */}
      <View style={{ marginTop: 19, paddingHorizontal: 16 }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => router.canGoBack() && router.back()}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Entypo name="chevron-left" size={24} color={colors.white} />
            <Text
              style={{
                fontFamily: "poppins",
                fontSize: 20,
                fontWeight: "900",
                color: colors.white,
              }}
            >
              Kembali
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              await refetchUpdateAllNotif();
              await refetch();
              console.log("clicked clear notif");
            }}
          >
            {loadingUpdateAllNotif ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <MaterialCommunityIcons
                name="broom"
                size={24}
                color={colors.white}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View
        style={{
          marginTop: 24,
          paddingHorizontal: 16,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: colors.white,
          flex: 1,
          position: "relative",
          paddingTop: 12,
        }}
      >
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()} // <-- tambahkan keyExtractor
          renderItem={({ item }) => (
            <NotifikasiItem item={item} onSelect={handleOpenModal} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#9Bd35A", "#689F38"]}
              tintColor="#689F38"
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
          ListEmptyComponent={() =>
            loading ? (
              <>
                {Array.from({ length: 12 }).map((_, i) => (
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
                title="Notifikasi Kosong"
                showRetry={false}
                compact
                actionText=""
                containerStyle={{ backgroundColor: colors.white }}
              />
            )
          }
        />
        {dataTransaksi && (
          <ModalDetailTransaksi
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            data={dataTransaksi}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Notifikasi;

interface NotifikasiItemProps {
  item: NotifikasiResponseType;
  onSelect: (value: NotifikasiResponseType) => void;
}

const NotifikasiItem: React.FC<NotifikasiItemProps> = ({ item, onSelect }) => {
  const badgeColor = statusBadgeMap[item.tagihan.status] ?? "warning";
  const {
    data,
    loading,
    refect: refetch,
  } = useFetch(async () => {
    const res = await api.post(
      `/transaksi/status/${item.tagihan.kode_tagihan}`
    );
    return res.data.data;
  }, false);

  if (loading) {
    return (
      <Skeleton type="custom" borderRadius={12} width="100%" height={60} />
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(item);
      }}
      style={[
        styles.container,
        {
          backgroundColor:
            item.status === "belum_dibaca" ? newColors[100] : "#F5F5F5",
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ justifyContent: "flex-start", gap: 3, flex: 1 }}>
          <Text
            style={{
              fontFamily: "poppins",
              fontWeight: "700",
              fontSize: 18,
              maxWidth: 280,
            }}
            numberOfLines={1}
          >
            {item.tagihan.nama_tagihan}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ fontFamily: "poppins", fontSize: 12 }}>
              {formatIndonesianDate(item.created_at).tgl}
            </Text>
            <View
              style={{
                width: 3,
                height: 3,
                backgroundColor: colors.black,
                borderRadius: 9999,
              }}
            />
            <Text style={{ fontFamily: "poppins", fontSize: 12 }}>
              {formatIndonesianDate(item.created_at).wkt}
            </Text>
          </View>
        </View>
        <Badge
          color={badgeColor}
          text={translateStatusTransaksi(item.tagihan.status)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F5F5F5F5",
    borderRadius: 10,
  },
});
