import Text from "@/app/components/ui/Text";
import { theme } from "@/app/config/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

const Section = ({
  title,
  value,
}: {
  title: string;
  value: string | undefined;
}) => {
  return (
    <View style={styles.section}>
      <Text variant="h6" weight="bold" color="primary" style={styles.text}>
        {title}
      </Text>
      <Text variant="bodySmall" style={styles.text} numberOfLines={1}>
        {value ?? "N/A"}
      </Text>
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[2],
    paddingVertical: theme.spacing[2],
    borderBottomWidth: 1,
    borderColor: theme.dark.colors.borderLight,
  },
  text: {
    flexShrink: 1,
  },
});
