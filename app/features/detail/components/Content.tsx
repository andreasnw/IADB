import { IMalEntity } from "@/app/api/anime";
import Text from "@/app/components/ui/Text";
import { theme } from "@/app/config/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import Section from "./Section";

const Content = ({
  synopsis,
  studios,
  producers,
  licensors,
}: {
  synopsis: string | undefined;
  studios: IMalEntity[] | undefined;
  producers: IMalEntity[] | undefined;
  licensors: IMalEntity[] | undefined;
}) => {
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
    marginVertical: theme.spacing[2],
  },
});
