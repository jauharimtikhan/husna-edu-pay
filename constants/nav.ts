import { Href } from "expo-router";

export const navigations = [
  {
    id: 1,
    logo: require("@/assets/images/BTN-TAGIHAN.png"),
    title: "Tagihan",
    href: "/(home)/tagihan" as Href,
  },
  {
    id: 2,
    logo: require("@/assets/images/BTN-PEMBAYARAN.png"),
    title: "Pembayaran",
    href: "/(home)/pembayaran" as Href,
  },
  {
    id: 3,
    logo: require("@/assets/images/BTN-HISTORY-PEMBAYARAN.png"),
    title: "History Pembayaran",
    href: "/(home)/history" as Href,
  },
  {
    id: 4,
    logo: require("@/assets/images/BTN-PANDUAN.png"),
    title: "Panduan Penggunaan",
    href: "/(home)/panduan" as Href,
  },
];
