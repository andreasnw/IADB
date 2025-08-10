import Header from "@/app/components/layout/Header";
import Screen from "@/app/components/layout/Screen";
import AnimeList from "@/app/components/shared/AnimeList";
import { useGenre } from "@/app/providers/GenreProvider";
import { useNavigation } from "@react-navigation/native";
import React, { Fragment, useCallback, useMemo } from "react";
import { useGetAnimeList } from "../../api/anime";
import Filter from "./components/Filter";

const Home = () => {
  const navigation = useNavigation();
  const { genre } = useGenre();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    error,
    refetch,
  } = useGetAnimeList({ genre: genre?.mal_id ?? null });

  const animeList = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      return fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  const onCardPress = useCallback(
    (mal_id: number) => {
      return navigation.navigate("Detail", { id: mal_id });
    },
    [navigation],
  );

  const onFilterPress = useCallback(() => {
    return navigation.navigate("Genre");
  }, [navigation]);

  return (
    <Screen variant="fixed">
      <Header
        leftAction={<Fragment />}
        title="Anime List"
        backgroundVariant="transparent"
        backgroundColor="transparent"
        rightAction={
          <Filter
            isFiltered={!!genre}
            onPress={onFilterPress}
            isFetching={isFetching}
          />
        }
      />
      <AnimeList
        animeList={animeList}
        onEndReached={onEndReached}
        isLoading={isLoading}
        onCardPress={onCardPress}
        error={error}
        refetch={refetch}
      />
    </Screen>
  );
};

export default Home;
