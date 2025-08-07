import { CARD_HEIGHT, PAGE_SIZE } from "@/app/config/constants";
import { theme } from "@/app/config/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import LoadingPlaceholder from "../ui/LoadingPlaceholder";

const ListLoading = () => {
  return (
    <View style={styles.container}>
      {Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <LoadingPlaceholder key={index} style={styles.loading} />
      ))}
    </View>
  );
};

export default ListLoading;

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing[1],
  },
  loading: {
    height: CARD_HEIGHT,
    width: "100%",
  },
});
