export const bankLists = [
  {
    title: "Bank Transfer",
    data: [
      {
        id: 1,
        name: "Bank Mandiri",
        logo: require("@/assets/images/icons/bank/mandiri.png"),
        payment_type: "bank_transfer",
        bank_name: "mandiri",
      },
      {
        id: 2,
        name: "Bank BCA",
        logo: require("@/assets/images/icons/bank/bca.png"),
        payment_type: "bank_transfer",
        bank_name: "bca",
      },
      {
        id: 3,
        name: "Bank BRI",
        logo: require("@/assets/images/icons/bank/bri.png"),
        payment_type: "bank_transfer",
        bank_name: "bri",
      },
      {
        id: 4,
        name: "Bank BNI",
        logo: require("@/assets/images/icons/bank/bni.png"),
        payment_type: "bank_transfer",
        bank_name: "bni",
      },
    ],
  },
  {
    title: "E-Wallet",
    data: [
      {
        id: 1,
        name: "GOPAY",
        logo: require("@/assets/images/icons/bank/gopay_white.png"),
        payment_type: "gopay",
      },
      {
        id: 2,
        name: "SHOPEE PAY",
        logo: require("@/assets/images/icons/bank/shopeepay_rectangle_orange.png"),
        payment_type: "shopeepay",
      },
      {
        id: 3,
        name: "QRIS",
        logo: require("@/assets/images/icons/bank/qris.png"),
        payment_type: "qris",
      },
      {
        id: 4,
        name: "DANA",
        logo: require("@/assets/images/icons/bank/dana.png"),
        payment_type: "dana",
      },
    ],
  },
  {
    title: "Over The Counter",
    data: [
      {
        id: 1,
        name: "Alfamart",
        logo: require("@/assets/images/icons/bank/alfamart.png"),
        payment_type: "cstore",
      },
      {
        id: 2,
        name: "Indomaret",
        logo: require("@/assets/images/icons/bank/indomaret.png"),
        payment_type: "cstore",
      },
    ],
  },
];

export const bankImage = {
  bca: require("@/assets/images/icons/bank/bca.png"),
  bni: require("@/assets/images/icons/bank/bni.png"),
  bri: require("@/assets/images/icons/bank/bri.png"),
  mandiri: require("@/assets/images/icons/bank/mandiri.png"),
};

export const cStoreImage = {
  indomaret: require("@/assets/images/icons/bank/indomaret.png"),
  alfamart: require("@/assets/images/icons/bank/alfamart.png"),
};
