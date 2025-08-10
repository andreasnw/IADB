import { IAnimeData } from "@/app/api/anime";
import { CARD_HEIGHT, IMAGE_RATIO } from "@/app/config/constants";
import { theme } from "@/app/config/theme";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../ui/Text";

interface CardProps {
  anime: IAnimeData;
  onCardPress: (mal_id: number) => void;
}

const IMAGE_WIDTH = 54;

const Card = ({ anime, onCardPress }: CardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={theme.components.button.activeOpacity}
      onPress={() => onCardPress(anime.mal_id)}
    >
      <Image
        source={{ uri: anime.images.webp.image_url }}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <Text variant="bodySmall" color="textMuted">
          <AntDesign name="star" size={12} color={theme.dark.colors.warning} />{" "}
          {anime.score}
        </Text>
        <Text variant="body" weight="bold" numberOfLines={1}>
          {anime.title}
        </Text>
        <Text variant="caption" numberOfLines={2}>
          {anime.synopsis}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: theme.spacing[2],
    borderBottomWidth: 1,
    borderColor: theme.dark.colors.borderLight,
    height: CARD_HEIGHT,
    alignItems: "center",
  },
  image: {
    width: IMAGE_WIDTH,
    aspectRatio: IMAGE_RATIO,
    borderRadius: theme.borderRadius.sm,
  },
  contentContainer: {
    flex: 1,
    gap: theme.spacing[1],
    flexShrink: 1,
  },
});
