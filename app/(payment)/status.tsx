import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";

const StatusScreen = () => {
  const { data } = useLocalSearchParams();

  useEffect(() => {
    if (!data) return;

    const params = JSON.parse(data as string);
    console.log("PARAM STATUS:", params);

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
        params: { data },
      });
    }
  }, [data]);

  return null; // karena hanya redirect, ga perlu render apa-apa
};

export default StatusScreen;
