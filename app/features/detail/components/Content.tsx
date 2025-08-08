import Text from "@/app/components/ui/Text";
import { theme } from "@/app/config/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

const Content = ({ synopsis }: { synopsis: string | undefined }) => {
  return (
    <View style={styles.container}>
      <Text variant="h6" weight="bold" color="primary" style={styles.title}>
        Synopsis
      </Text>
      <Text variant="bodySmall">{synopsis ?? "N/A"}</Text>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing[4],
  },

  title: {
    marginBottom: theme.spacing[2],
  },
});
