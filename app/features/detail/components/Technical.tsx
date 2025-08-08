import { IMalEntity } from "@/app/api/anime";
import Text from "@/app/components/ui/Text";
import { theme } from "@/app/config/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

type TechnicalProps = {
  studios: IMalEntity[] | undefined;
  producers: IMalEntity[] | undefined;
  licensors: IMalEntity[] | undefined;
};

const Section = ({
  title,
  value,
}: {
  title: string;
  value: string | undefined;
}) => {
  return (
    <View style={styles.section}>
      <Text variant="h6" weight="bold" color="primary">
        {title}
      </Text>
      <Text variant="bodySmall" style={styles.value} numberOfLines={1}>
        {value ?? "N/A"}
      </Text>
    </View>
  );
};

const Technical = ({ studios, producers, licensors }: TechnicalProps) => {
  return (
    <View style={styles.container}>
      <Section
        title="Studios"
        value={studios?.map((studio) => studio.name).join(", ")}
      />
      <Section
        title="Producers"
        value={producers?.map((producer) => producer.name).join(", ")}
      />
      <Section
        title="Licensors"
        value={licensors?.map((licensor) => licensor.name).join(", ")}
      />
    </View>
  );
};

export default Technical;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing[4],
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[2],
    paddingVertical: theme.spacing[2],
    borderBottomWidth: 1,
    borderColor: theme.dark.colors.borderLight,
  },
  title: {
    flexShrink: 1,
  },
  value: {
    flexShrink: 1,
  },
});
