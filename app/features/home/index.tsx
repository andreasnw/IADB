import Header from "@/app/components/layout/Header";
import Screen from "@/app/components/layout/Screen";
import AnimeList from "@/app/components/shared/AnimeList";
import { useNavigation } from "@react-navigation/native";
import React, { Fragment, useCallback, useMemo } from "react";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { useGetAnimeList } from "../../api/anime";

const Home = () => {
  const navigation = useNavigation();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    error,
    refetch,
  } = useGetAnimeList();

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

  if (isError) {
    Toast.show({
      text1: "Error",
      text2: error?.message,
      type: "error",
    });
  }

  return (
    <Screen variant="fixed" safeAreaTop={false} safeAreaBottom={false}>
      <Header
        leftAction={<Fragment />}
        title="Anime List"
        backgroundVariant="transparent"
        backgroundColor="transparent"
        rightAction={isFetching ? <ActivityIndicator /> : null}
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
