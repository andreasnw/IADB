import { theme } from "@/app/config/theme";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

const LoadingPlaceholder = ({ style }: { style?: ViewStyle[] }) => {
  return <View style={[styles.container, style]} />;
};

export default LoadingPlaceholder;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.dark.colors.card,
    borderRadius: theme.borderRadius.lg,
  },
});
