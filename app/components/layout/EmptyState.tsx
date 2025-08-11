import { theme } from "@/app/config/theme";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../ui/Text";

const EmptyState = ({ title }: { title: string }) => {
  return (
    <View style={styles.container}>
      <Entypo name="cross" size={24} color={theme.dark.colors.textMuted} />
      <Text variant="body" weight="bold" color="textMuted">
        {title}
      </Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
