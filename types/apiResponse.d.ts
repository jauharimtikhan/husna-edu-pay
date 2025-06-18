export type TagihanBaseResponse = {
  id: number;
  user_id: number;
  nama_tagihan: string;
  kode_tagihan: string;
  nominal: number;
  status: StatusTransaksiType;
  tanggal: string;
  created_at: string;
  updated_at: string;
};

export type UserBaseResponse = {
  id: number;
  nama_lengkap?: string | null;
  username: string;
  email: string;
  alamat?: string | null;
  device_id?: string;
  avatar?: string;
  created_at: string | Date;
  updated_at: string | Date;
};

export interface TagihanApiResponse extends TagihanBaseResponse {
  user: UserBaseResponse;
}

export type TransaksiBaseResonseType = {
  id: number;
  tagihan_id: number;
  metode_pembayaran: string;
  provider: string;
  detail_charge: string;
  created_at: string;
  updated_at: string;
};

export interface HistoryPembayaran {
  id: number;
  user_id: number;
  tagihan_id: number;
  transaksi_id: number;
  user: UserBaseResponse;
  tagihan: TagihanBaseResponse;
  transaksi: TransaksiBaseResonseType;
}

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

export type PayNowType = {
  data: {
    kode_tagihan: string;
    nama_tagihan: string;
    nominal: number;
  }[];
  total_tagihan: number;
  message: string;
};

export type NotifikasiResponseType = {
  id: number;
  user_id: number;
  tagihan_id: number;
  transaksi_id: number;
  status: "belum_dibaca" | "dibaca";
  read_at: string;
  created_at: string;
  updated_at: string;
  user: UserBaseResponse;
  tagihan: TagihanBaseResponse;
  transaksi: TransaksiBaseResonseType;
};
