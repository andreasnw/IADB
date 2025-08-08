import { IAnimeData } from "@/app/api/anime";
import Button from "@/app/components/ui/Button";
import Text from "@/app/components/ui/Text";
import { ANIMATION_DURATION, IMAGE_RATIO } from "@/app/config/constants";
import { theme } from "@/app/config/theme";
import { useFavourites } from "@/app/providers/FavouritesProvider";
import { AntDesign, Entypo, FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeInUp,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const IMAGE_WIDTH = 100;

const AnimatedButton = Animated.createAnimatedComponent(Button);

const Poster = ({ anime }: { anime: IAnimeData }) => {
  const { toggleFavourite, isFavourite } = useFavourites();
  const scale = useSharedValue(1);

  const { images, genres, score, rank, mal_id } = anime;

  const isFavourited = isFavourite(mal_id);

  const handleToggleFavourite = () => {
    return toggleFavourite(anime);
  };

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
    })
    .onFinalize(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      runOnJS(handleToggleFavourite)();
    });

  return (
    <View style={styles.container}>
      <Animated.View
        style={styles.animatedContainer}
        entering={FadeInUp.duration(ANIMATION_DURATION)}
      >
        <Image
          source={{ uri: images?.webp.large_image_url }}
          style={styles.image}
        />
        <Text variant="bodySmall" color="textMuted" numberOfLines={1}>
          {genres?.map((genre) => genre.name).join(" • ")}
        </Text>
        <Text variant="bodySmall" color="textMuted" numberOfLines={1}>
          <AntDesign name="star" size={12} color={theme.dark.colors.warning} />{" "}
          {score} •{" "}
          <FontAwesome6
            name="ranking-star"
            size={12}
            color={theme.dark.colors.warning}
          />{" "}
          {rank}
        </Text>
      </Animated.View>
      <GestureDetector gesture={tapGesture}>
        <AnimatedButton
          style={animatedButtonStyle}
          title={isFavourited ? "Favourited" : "Add to favourites"}
          variant={isFavourited ? "primary" : "outline"}
          size="sm"
          leftIcon={
            <Entypo
              name={isFavourited ? "heart" : "heart-outlined"}
              size={12}
              color={
                isFavourited
                  ? theme.dark.colors.background
                  : theme.dark.colors.primary
              }
            />
          }
        />
      </GestureDetector>
    </View>
  );
};

export default Poster;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing[4],
    marginBottom: 0,
    paddingBottom: theme.spacing[4],
    gap: theme.spacing[2],
    borderBottomWidth: 1,
    borderColor: theme.dark.colors.borderLight,
  },
  animatedContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing[2],
  },
  image: {
    width: IMAGE_WIDTH,
    aspectRatio: IMAGE_RATIO,
  },
});
