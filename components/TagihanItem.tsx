import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Badge from "./Badge";
import { colors } from "@/constants/color";
import formatIndonesianDate from "@/utils/formatDate";
import numberFormat from "@/utils/numberFormat";
import { StatusTransaksiType } from "@/types/apiResponse";
import { translateStatusTransaksi } from "@/utils";
import { router } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { api } from "@/utils/axios";
import Skeleton from "./Skeleton";

interface TagihanItemProps {
  title?: string;
  invoice?: string;
  tanggal?: string;
  nominal?: number | string;
  status: StatusTransaksiType;
}

const statusBadgeMap: Record<
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

const TagihanItem = ({
  title,
  invoice,
  tanggal,
  nominal,
  status,
}: TagihanItemProps) => {
  const [loading, setLoading] = useState(false);

  const fetchTransaksiDetail = async () => {
    const res = await api.post("/transaksi/status/" + invoice);
    return res.status === 200 ? res.data.data : null;
  };

  const fetchTransaksiDetailPending = async () => {
    const res = await api.get("/transaksi/cek_transaksi/" + invoice);

    return res.status === 200 ? res.data.data : null;
  };

  const retry = async (fn: () => Promise<any>, maxRetry = 3) => {
    let attempt = 0;
    while (attempt < maxRetry) {
      try {
        const result = await fn();
        if (!result) throw new Error("Result is null");
        return result;
      } catch (error) {
        attempt++;
      }
    }
    return null;
  };

  const handlePress = async () => {
    setLoading(true);

    const trx =
      status === "pending"
        ? await retry(fetchTransaksiDetailPending)
        : await retry(fetchTransaksiDetail);

    setLoading(false);

    if (!trx) {
      ToastAndroid.show(
        "Terjadi Kesalahan!, Silahkan Ulangi Tindakan",
        ToastAndroid.SHORT
      );
      return;
    }

    const routeBase = "/(payment)";
    const commonParams = {
      kode_tagihan: invoice,
      order_id: invoice,
      amount: nominal,
      midtrans_code: trx.status_code,
    };

    switch (trx.transaction_status) {
      case "settlement":
        router.push({
          pathname: `${routeBase}/settlement`,
          params: { data: JSON.stringify(trx) },
        });
        break;
      case "pending":
        router.push({
          pathname: `${routeBase}/pending`,
          params: { data: JSON.stringify(trx) },
        });
        break;
      case "cancel":
      case "deny":
      case "expire":
      case "failure":
        router.push({
          pathname: `${routeBase}/error`,
          params: commonParams,
        });
        break;
    }
  };

  const badgeColor = statusBadgeMap[status] ?? "warning";
  const formattedDate = formatIndonesianDate(tanggal ?? "");

  if (loading) {
    return <Skeleton width={"100%"} height={80} type="box" />;
  }
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.row}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subText}>Kode Transaksi: {invoice}</Text>
          <View style={styles.dateRow}>
            <Text style={styles.subText}>{formattedDate.tgl}</Text>
            <View style={styles.dot} />
            <Text style={styles.subText}>{formattedDate.wkt}</Text>
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{numberFormat(Number(nominal))}</Text>
          <Badge color={badgeColor} text={translateStatusTransaksi(status)} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TagihanItem;

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
  infoContainer: {
    justifyContent: "flex-start",
    gap: 3,
  },
  title: {
    fontFamily: "poppins",
    fontWeight: "700",
    fontSize: 20,
  },
  subText: {
    fontFamily: "poppins",
    fontSize: 12,
    color: "#333",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dot: {
    width: 3,
    height: 3,
    backgroundColor: colors.black,
    borderRadius: 9999,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontFamily: "poppins",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10,
  },
});
