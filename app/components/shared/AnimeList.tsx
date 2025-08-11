import { IAnimeData } from "@/app/api/anime";
import { CARD_HEIGHT, PAGE_SIZE } from "@/app/config/constants";
import { theme } from "@/app/config/theme";
import React, { useCallback, useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import EmptyState from "../layout/EmptyState";
import ErrorState from "../layout/ErrorState";
import Card from "./Card";
import ListLoading from "./ListLoading";

const AnimeList = ({
  animeList,
  onEndReached,
  isLoading,
  onCardPress,
  error,
  refetch,
}: {
  animeList: IAnimeData[];
  onEndReached: () => void;
  isLoading: boolean;
  onCardPress: (mal_id: number) => void;
  error: Error | null;
  refetch: () => void;
}) => {
  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: CARD_HEIGHT,
      offset: CARD_HEIGHT * index,
      index,
    }),
    [],
  );

  const renderEmptyState = useMemo(() => {
    if (isLoading) {
      return <ListLoading />;
    }

    if (error) {
      return <ErrorState title={error.message} onRefresh={() => refetch()} />;
    }

    return <EmptyState title="No data found" />;
  }, [isLoading, error, refetch]);

  return (
    <FlatList
      data={animeList}
      renderItem={({ item }) => <Card anime={item} onCardPress={onCardPress} />}
      keyExtractor={(item) => item.mal_id.toString()}
      onEndReached={onEndReached}
      initialNumToRender={PAGE_SIZE}
      maxToRenderPerBatch={PAGE_SIZE * 2}
      windowSize={PAGE_SIZE * 2}
      getItemLayout={getItemLayout}
      removeClippedSubviews={false}
      onEndReachedThreshold={0.1}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={renderEmptyState}
    />
  );
};

export default AnimeList;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing[4],
  },
});
