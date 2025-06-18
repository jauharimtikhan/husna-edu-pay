import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";

const StatusScreen = () => {
  const { data } = useLocalSearchParams();

  useEffect(() => {
    if (!data) return;

    const params = JSON.parse(data as string);
    const { status_code, gross_amount, order_id, transaction_status } = params;

    const redirectParams = {
      kode_tagihan: order_id,
      order_id,
      amount: gross_amount,
      midtrans_code: status_code,
    };

    if (params?.transaction_status === "pending") {
      router.replace({
        pathname: "/(payment)/pending",
        params: { data },
      });
    } else if (params?.transaction_status === "settlement") {
      router.replace({
        pathname: "/(payment)/settlement",
        params: { data },
      });
    } else {
      router.replace({
        pathname: "/(payment)/error",
        params: redirectParams,
      });
    }
  }, [data]);

  return null; // karena hanya redirect, ga perlu render apa-apa
};

export default StatusScreen;
