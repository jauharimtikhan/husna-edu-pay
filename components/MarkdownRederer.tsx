import React, { useState } from "react";
import MarkdownDisplay from "react-native-markdown-display";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

interface MarkdownRendererProps {
  content: string;
  handleRefreshData?: (refresh: boolean) => void;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  handleRefreshData,
}) => {
  const { width } = useWindowDimensions();
  const [refresh, setRefreshing] = useState(false);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => handleRefreshData?.(refresh)}
        />
      }
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <MarkdownDisplay style={markdownStyles}>{content}</MarkdownDisplay>
    </ScrollView>
  );
};

// Custom styling untuk elemen Markdown
const markdownStyles = StyleSheet.create({
  body: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "#333",
  },
  heading1: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    marginVertical: 10,
    color: "#1a1a1a",
  },
  heading2: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 24,
    marginVertical: 8,
    color: "#1e1e1e",
  },
  link: {
    color: "#0066cc",
    textDecorationLine: "underline",
  },
  list_item: {
    marginVertical: 5,
  },
  bullet_list: {
    marginVertical: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});

export default MarkdownRenderer;
