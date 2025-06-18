import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { newColors } from "@/constants/color";
import { MidtransChargeResponse } from "@/types/midtrans-response";
import numberFormat from "@/utils/numberFormat";
import { NotifikasiResponseType } from "@/types/apiResponse";
import formatIndonesianDate from "@/utils/formatDate";
import { translateStatusTransaksi } from "@/utils";

interface ItemDetail {
  label: string;
  value: string | number;
}

interface Props {
  visible: boolean;
  onClose: (index: number) => void;
  data: NotifikasiResponseType & {
    items?: ItemDetail[];
  };
}

const ModalDetailTransaksi: React.FC<Props> = ({ visible, onClose, data }) => {
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["55%", "75%"], []);
  const detailList: ItemDetail[] = [
    { label: "Nama Tagihan", value: data.tagihan.nama_tagihan },
    { label: "Kode Tagihan", value: data.tagihan.kode_tagihan },
    { label: "Status", value: translateStatusTransaksi(data.tagihan.status) },
    {
      label: "Nominal",
      value: numberFormat(Number(data.tagihan.nominal)),
    },
    {
      label: "Tanggal Pembayaran",
      value: `${formatIndonesianDate(data.tagihan.tanggal).tgl} - ${
        formatIndonesianDate(data.tagihan.tanggal).wkt
      }`,
    },
  ];

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={visible ? 0 : -1}
      onChange={onClose}
      enablePanDownToClose
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handle}
    >
      <BottomSheetView style={styles.container}>
        <Text style={styles.title}>Detail Transaksi</Text>

        {detailList.map((item) => (
          <View key={item.label} style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}

        {data && data.items && (
          <>
            <Text style={styles.subTitle}>Item</Text>
            <FlatList
              data={data.items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.item}>• {item.label}</Text>
              )}
              scrollEnabled={false}
            />
          </>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ModalDetailTransaksi;

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    backgroundColor: "#ccc",
    width: 40,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 14,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 9,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontSize: 14,
    color: "#111",
    fontWeight: "500",
  },
  item: {
    fontSize: 14,
    color: "#444",
    paddingVertical: 2,
    paddingLeft: 6,
  },
});
