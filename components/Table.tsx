// components/Table.tsx
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

export interface TableColumn {
  title: string;
  dataIndex: string;
  width?: number;
  align?: "left" | "center" | "right";
  headerStyle?: TextStyle;
  cellStyle?: TextStyle;
  render?: (
    value: any,
    rowData?: Record<string, any>,
    rowIndex?: number
  ) => React.ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  containerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  rowStyle?: ViewStyle;
  showBorder?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  containerStyle,
  headerStyle,
  rowStyle,
  showBorder = true,
}) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={[styles.container, containerStyle]}
      showsHorizontalScrollIndicator={false}
    >
      <View style={{ width: "100%" }}>
        {/* Header */}
        <View style={[styles.header, headerStyle]}>
          {columns.map((col, index) => (
            <Text
              key={index}
              style={[
                styles.headerText,
                { width: col.width ?? 120, textAlign: col.align ?? "left" },
                col.headerStyle,
              ]}
            >
              {col.title}
            </Text>
          ))}
        </View>

        {/* Rows */}
        {data.map((item, rowIndex) => (
          <View
            key={rowIndex}
            style={[
              styles.row,
              rowStyle,
              showBorder && { borderBottomWidth: 1, borderColor: "#ccc" },
            ]}
          >
            {columns.map((col, colIndex) => (
              <View
                key={colIndex}
                style={{
                  width: col.width ?? 120,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={[
                    styles.cellText,
                    { textAlign: col.align ?? "left" },
                    col.cellStyle,
                  ]}
                >
                  {col.render
                    ? col.render(item[col.dataIndex], item, rowIndex)
                    : item[col.dataIndex]}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Table;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#f3f3f3",
    paddingVertical: 8,
  },
  headerText: {
    fontWeight: "bold",
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  cellText: {
    paddingHorizontal: 8,
    color: "#333",
  },
});
