import Header from "@/app/components/layout/Header";
import Screen from "@/app/components/layout/Screen";
import AnimeList from "@/app/components/shared/AnimeList";
import { useFavourites } from "@/app/providers/FavouritesProvider";
import { useNavigation } from "@react-navigation/native";
import React, { Fragment, useCallback } from "react";

const Favourites = () => {
  const navigation = useNavigation();
  const { favourites } = useFavourites();

  const onCardPress = useCallback(
    (mal_id: number) => {
      return navigation.navigate("Detail", { id: mal_id });
    },
    [navigation],
  );

  const onEndReached = useCallback(() => {
    return;
  }, []);

  const refetch = useCallback(() => {
    return;
  }, []);

  return (
    <Screen variant="fixed" safeAreaTop={false} safeAreaBottom={false}>
      <Header
        leftAction={<Fragment />}
        title="Favourites"
        backgroundVariant="transparent"
        backgroundColor="transparent"
      />
      <AnimeList
        animeList={favourites}
        onEndReached={onEndReached}
        isLoading={false}
        onCardPress={onCardPress}
        error={null}
        refetch={refetch}
      />
    </Screen>
  );
};

export default Favourites;
