// Base response untuk semua transaksi
type MidtransBaseResponse = {
  currency: string;
  expiry_time?: string;
  fraud_status: string;
  gross_amount: string;
  merchant_id: string;
  order_id: string;
  payment_type: string;
  status_code: string;
  status_message: string;
  transaction_id: string;
  transaction_status: string;
  transaction_time: string;
  settlement_time?: string;
};

// === BANK TRANSFER ===
export type MidtransBankTransferResponse = MidtransBaseResponse & {
  payment_type: "bank_transfer";
  permata_va_number?: string;
  va_numbers?: {
    bank: string;
    va_number: string;
  }[];
  bca_va_number?: string;
  bank?: string;
};

// === ECHANNEL (MANDIRI) ===
export type MidtransEchannelResponse = MidtransBaseResponse & {
  payment_type: "echannel";
  bill_key: string;
  biller_code: string;
};

// === QRIS ===
export type MidtransQrisResponse = MidtransBaseResponse & {
  payment_type: "qris";
  actions: {
    name: string;
    method: string;
    url: string;
  }[];
};

// === GOPAY ===
export type MidtransGopayResponse = MidtransBaseResponse & {
  payment_type: "gopay";
  actions: {
    name: string;
    method: string;
    url: string;
  }[];
};

// === SHOPEEPAY ===
export type MidtransShopeePayResponse = MidtransBaseResponse & {
  payment_type: "shopeepay";
  actions: {
    name: string;
    method: string;
    url: string;
  }[];
};

// === CONVENIENCE STORE (INDOMARET, ALFAMART) ===
export type MidtransCStoreResponse = MidtransBaseResponse & {
  payment_type: "cstore";
  payment_code: string;
  store: string; // "indomaret" or "alfamart"
  merchant_name?: string;
  message?: string;
};

// === CREDIT CARD ===
export type MidtransCreditCardResponse = MidtransBaseResponse & {
  payment_type: "credit_card";
  masked_card: string;
  bank: string;
  approval_code: string;
  card_type: string;
  channel: string;
};

// === UNION TYPE UNTUK SEMUA ===
export type MidtransPaymentResponse =
  | MidtransBankTransferResponse
  | MidtransEchannelResponse
  | MidtransQrisResponse
  | MidtransGopayResponse
  | MidtransShopeePayResponse
  | MidtransCStoreResponse
  | MidtransCreditCardResponse;
