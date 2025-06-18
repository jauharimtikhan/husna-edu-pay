export interface User {
    id: number;
    username: string;
}

export type Alert = {
    type: "success" | "error";
    message: string;
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    alert?: Alert;
};

export type StatusTransaksiType =
    | "pending"
    | "authorize"
    | "failed"
    | "capture"
    | "settlement"
    | "deny"
    | "cancel"
    | "refund"
    | "partial_refund"
    | "partial_chargeback"
    | "expire"
    | "failure";

interface MidtransBaseResponse {
    transaction_time: string;
    gross_amount: string;
    order_id: string;
    payment_type: string;
    signature_key: string;
    status_code: string;
    transaction_id: string;
    transaction_status:
        | "capture"
        | "settlement"
        | "pending"
        | "deny"
        | "cancel"
        | "expire"
        | "failure"
        | string;
    fraud_status?: "accept" | "deny" | "challenge" | string;
    status_message: string;
    currency?: string;
    merchant_id?: string;
}

// Type for bank_transfer (with optional VA or permata)
interface BankTransferResponse extends MidtransBaseResponse {
    payment_type: "bank_transfer";
    va_numbers?: {
        bank: string;
        va_number: string;
    }[];
    permata_va_number?: string;
    pdf_url?: string;
}

// Type for credit_card
interface CreditCardResponse extends MidtransBaseResponse {
    payment_type: "credit_card";
    redirect_url?: string;
    masked_card?: string;
    bank?: string;
    approval_code?: string;
    eci?: string;
    channel?: string;
    card_type?: string;
}

// Type for gopay
interface GoPayResponse extends MidtransBaseResponse {
    payment_type: "gopay";
    actions?: {
        name: string;
        method: string;
        url: string;
    }[];
}

// Type for qris
interface QrisResponse extends MidtransBaseResponse {
    payment_type: "qris";
    actions?: {
        name: string;
        method: string;
        url: string;
    }[];
}

interface ShopeepayResponse extends MidtransBaseResponse {
    payment_type: "shopeepay";
    actions?: {
        name: string;
        method: string;
        url: string;
    }[];
}

interface OtcResponse extends MidtransBaseResponse {
    store: "indomaret" | "alfamart";
    payment_code: string;
    payment_type: "cstore";
}
export interface MidtransPaymentLinkResponse extends MidtransBaseResponse {
    payment_type: "payment_link";
    payment_url: string;
}

// Union type (add more payment types as needed)
export type MidtransChargeResponse =
    | BankTransferResponse
    | CreditCardResponse
    | GoPayResponse
    | QrisResponse
    | ShopeepayResponse
    | OtcResponse
    | MidtransPaymentLinkResponse
    | MidtransBaseResponse;

export type MidtransErrorResponseType = {
    midtrans_code: string | number;
    message: any;
    status: string;
    transaction_id?: string;
};
