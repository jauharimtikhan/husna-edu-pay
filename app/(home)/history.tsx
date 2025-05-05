import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/color";
import HeaderHomeScreen from "@/components/HeaderHomeScreen";
import useFetch from "@/hooks/useFetch";
import { api } from "@/utils/axios";
import formatIndonesianDate from "@/utils/formatDate";
import numberFormat from "@/utils/numberFormat";

const history = () => {
  const {
    data,
    loading,
    refect: refetch,
  } = useFetch(async () => {
    const res = await api.get("/transactions/history");
    return res.data?.data;
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <HeaderHomeScreen title="History" />
      <View
        style={{
          flex: 1,
          marginTop: 40,
          paddingHorizontal: 16,
        }}
      >
        <FlatList
          data={data}
          style={{
            paddingBottom: 16,
          }}
          contentContainerStyle={{
            marginBottom: 16,
            gap: 10,
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HistoryComponent
              transaction_id={item.transaction_id}
              status={item.status}
              created_at={item.created_at}
              amount={item.amount}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default history;

interface HistoryComponentProps {
  created_at: string;
  transaction_id: string;
  status: string;
  amount: string;
}
const HistoryComponent = ({
  transaction_id,
  amount,
  created_at,
  status,
}: HistoryComponentProps) => {
  return (
    <View>
      <Text
        style={{
          marginBottom: 7,
          fontSize: 12,
          fontWeight: "600",
          color: colors.black,
          textTransform: "capitalize",
        }}
      >
        {formatIndonesianDate(created_at).tgl}
      </Text>
      <View
        style={{
          borderRadius: 12,
          backgroundColor: "rgba(0, 0, 0, 0.03)",
          height: 62,
          padding: 9,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: colors.black,
              textTransform: "capitalize",
            }}
          >
            {transaction_id.toUpperCase()}
          </Text>
          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: colors.black,
                textTransform: "capitalize",
                marginRight: 24,
              }}
            >
              {numberFormat(Number(amount))},-
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: colors.black,
                marginRight: 24,
              }}
            >
              {status}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 10,
            fontWeight: "regular",
            color: colors.black,
            textTransform: "capitalize",
          }}
        >
          {formatIndonesianDate(created_at).wkt}
        </Text>
      </View>
    </View>
  );
};
