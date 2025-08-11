import { theme } from "@/app/config/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Text from "../ui/Text";

const ErrorState = ({
  title,
  onRefresh,
}: {
  title: string;
  onRefresh: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onRefresh}>
      <Feather
        name="refresh-ccw"
        size={24}
        color={theme.dark.colors.textMuted}
      />
      <Text variant="body" weight="bold" color="textMuted">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ErrorState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing[4],
  },
});
