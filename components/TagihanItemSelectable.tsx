import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Badge from "./Badge";
import Checkbox from "expo-checkbox";
import { colors, newColors } from "@/constants/color";
import formatIndonesianDate from "@/utils/formatDate";
import numberFormat from "@/utils/numberFormat";
import { StatusTransaksiType } from "@/types/apiResponse";
import { translateStatusTransaksi } from "@/utils";

interface TagihanItemProps {
  title?: string;
  invoice?: string;
  tanggal?: string;
  nominal?: number | string;
  status: StatusTransaksiType;
  isChecked: boolean;
  setChecked: (kode_tagihan: string) => void;
}

export const statusBadgeMap: Record<
  StatusTransaksiType,
  "success" | "danger" | "secondary" | "warning"
> = {
  authorize: "success",
  cancel: "danger",
  capture: "secondary",
  deny: "danger",
  expire: "danger",
  failed: "danger",
  failure: "danger",
  partial_chargeback: "warning",
  partial_refund: "warning",
  pending: "warning",
  refund: "warning",
  settlement: "success",
};

const TagihanItemSelectable: React.FC<TagihanItemProps> = ({
  title,
  invoice,
  tanggal,
  nominal,
  status,
  isChecked,
  setChecked,
}) => {
  const { tgl, wkt } = formatIndonesianDate(tanggal || "");

  const badgeColor = statusBadgeMap[status] ?? "warning";

  return (
    <TouchableOpacity
      onPress={() => setChecked(invoice ?? "")}
      style={styles.container}
    >
      <View style={styles.row}>
        <View style={styles.checkboxWrapper}>
          <Checkbox
            style={{
              borderRadius: 999,
            }}
            value={isChecked}
            onValueChange={() => setChecked(invoice ?? "")}
          />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.invoice}>Kode Transaksi: {invoice}</Text>
          <View style={styles.dateRow}>
            <Text style={styles.dateText}>{tgl}</Text>
            <View style={styles.dot} />
            <Text style={styles.dateText}>{wkt}</Text>
          </View>
        </View>
        <View style={styles.amountStatus}>
          <Text style={styles.amount}>{numberFormat(Number(nominal))}</Text>
          <Badge color={badgeColor} text={translateStatusTransaksi(status)} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TagihanItemSelectable;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkboxWrapper: {
    paddingRight: 12,
  },
  textWrapper: {
    flex: 1,
    gap: 3,
    alignItems: "flex-start",
  },
  title: {
    fontFamily: "poppins",
    fontWeight: "700",
    fontSize: 16,
  },
  invoice: {
    fontFamily: "poppins",
    fontWeight: "300",
    fontSize: 12,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dateText: {
    fontFamily: "poppins",
    fontWeight: "300",
    fontSize: 12,
  },
  dot: {
    width: 3,
    height: 3,
    backgroundColor: colors.black,
    borderRadius: 9999,
  },
  amountStatus: {
    alignItems: "flex-end",
  },
  amount: {
    fontFamily: "poppins",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10,
  },
});
