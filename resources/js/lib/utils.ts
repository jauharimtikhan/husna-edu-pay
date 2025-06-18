import {
    BankTransferResponse,
    GoPayResponse,
    MidtransChargeResponse,
    MidtransPaymentLinkResponse,
    OtcResponse,
    QrisResponse,
    ShopeepayResponse,
} from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateInvoiceCode(prefix = "INV"): string {
    const now = new Date();

    // Format tanggal: YYYYMMDD
    const datePart = now.toISOString().split("T")[0].replace(/-/g, "");

    // Generate 6 karakter acak (angka + huruf kapital)
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();

    return `${prefix}-${datePart}-${randomPart}`;
}

export function formatRupiah() {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    });
}

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

export function isPaymentLink(
    data: MidtransChargeResponse
): data is MidtransPaymentLinkResponse {
    return data.payment_type === "payment_link";
}

export function isOnline(): boolean {
    return typeof window !== "undefined" && navigator.onLine;
}

export function getAssetUrl(imgAddr: string) {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    return `${baseUrl}/storage/${imgAddr}`;
}
