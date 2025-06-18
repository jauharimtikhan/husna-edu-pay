import { MidtransChargeResponse } from "@/types/midtrans-response";

const BCA = {
  status_code: "201",
  status_message: "Success, Bank Transfer transaction is created",
  transaction_id: "fd692f57-8b03-4d99-a166-e9b2ec1ae69d",
  order_id: "INV-nGkPYKFL3mYy",
  merchant_id: "G289195862",
  gross_amount: "400000.00",
  currency: "IDR",
  payment_type: "bank_transfer",
  transaction_time: "2025-05-01 03:09:37",
  transaction_status: "pending",
  fraud_status: "accept",
  va_numbers: [
    {
      bank: "bri",
      va_number: "958624979267915788",
    },
  ],
  expiry_time: "2025-05-02 03:09:37",
};

export { BCA };
