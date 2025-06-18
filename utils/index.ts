import {
  BankTransferResponse,
  GoPayResponse,
  MidtransChargeResponse,
  MidtransErrorResponseType,
  OtcResponse,
  QrisResponse,
  ShopeepayResponse,
} from "@/types/midtrans-response";
import { ENV } from "./env";
import { StatusTransaksiType } from "@/types/apiResponse";
import { Platform } from "react-native";
import { StatusBar } from "react-native";
import { api } from "./axios";

export function isBankTransfer(
  data: MidtransChargeResponse
): data is BankTransferResponse {
  return data.payment_type === "bank_transfer";
}

export function isQrCharge(data: MidtransChargeResponse): data is QrisResponse {
  return data.payment_type === "qris";
}

export function isGopay(data: MidtransChargeResponse): data is GoPayResponse {
  return data.payment_type === "gopay";
}

export function isCstore(data: MidtransChargeResponse): data is OtcResponse {
  return data.payment_type === "cstore";
}

export function isShopeepay(
  data: MidtransChargeResponse
): data is ShopeepayResponse {
  return data.payment_type === "shopeepay";
}

export function getMonthInfo(offset: number = 0): {
  value: string;
  label: string;
} {
  const now = new Date();
  const futureDate = new Date(now.getFullYear(), now.getMonth() + offset, 1);

  const bulanIndo = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const year = futureDate.getFullYear();
  const month = futureDate.getMonth() + 1;

  return {
    value: `${year}-${month.toString().padStart(2, "0")}`, // YYYY-MM format
    label: `${bulanIndo[futureDate.getMonth()]} ${year}`, // eg. "Agustus 2025"
  };
}

export function parseToMysqlDate(isoString: string) {
  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // bulan dari 0
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatToTimeZone(dateStr: string, timeZone = "Asia/Jakarta") {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date); // Output: YYYY-MM-DD
}

export function getAssetUrl(imgAddr: string): string {
  let baseUrl;
  if (imgAddr.includes("storage")) {
    baseUrl = ENV.ASSET_BASE_URL.replaceAll("/storage", "");
  } else {
    baseUrl = ENV.ASSET_BASE_URL;
  }
  return `${baseUrl}/${imgAddr}`;
}

export function getMidtransCode(
  response: MidtransErrorResponseType
): number | null {
  return response?.data?.midtrans_code ?? null;
}

export function translateStatusTransaksi(status: StatusTransaksiType): string {
  switch (status.toLowerCase()) {
    case "pending":
      return "Menunggu Pembayaran";
    case "authorize":
      return "Menunggu Otorisasi";
    case "failed":
      return "Transaksi Gagal";
    case "capture":
      return "Perlu Dibayar";
    case "settlement":
      return "Selesai";
    case "deny":
      return "Pembayaran Ditolak";
    case "cancel":
      return "Transaksi Dibatalkan";
    case "refund":
      return "Dana Dikembalikan";
    case "partial_refund":
      return "Sebagian Dana Dikembalikan";
    case "partial_chargeback":
      return "Sebagian Dana Ditarik Kembali";
    case "expire":
      return "Transaksi Kedaluwarsa";
    case "failure":
      return "Terjadi Kegagalan Transaksi";
    default:
      return "Status Tidak Dikenal";
  }
}

export function getSafeAreaValue() {
  return Platform.OS === "android" ? StatusBar.currentHeight : 0;
}

export async function fetchNotifCountAsync() {
  try {
    const res = await api.get("/notifikasi");
    if (res.status === 200) {
      return res.data.total;
    }
  } catch (error) {
    return null;
  }
}
