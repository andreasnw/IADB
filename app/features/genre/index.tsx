import { IAnimeGenre, useGetAnimeGenres } from "@/app/api/anime";
import Header from "@/app/components/layout/Header";
import Screen from "@/app/components/layout/Screen";
import ListLoading from "@/app/components/shared/ListLoading";
import Button from "@/app/components/ui/Button";
import EmptyState from "@/app/components/ui/EmptyState";
import ErrorState from "@/app/components/ui/ErrorState";
import { ANIMATION_DURATION } from "@/app/config/constants";
import theme from "@/app/config/theme";
import { useGenre } from "@/app/providers/GenreProvider";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Fragment, useCallback, useMemo } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import Footer from "./components/Footer";
import Item from "./components/Item";

const Genre = () => {
  const navigation = useNavigation();
  const { data, isLoading, error, refetch } = useGetAnimeGenres();
  const { setGenre, getSelectedGenre } = useGenre();

  const onPress = useCallback(
    (genre: IAnimeGenre) => {
      setGenre(genre);
      setTimeout(() => {
        return navigation.goBack();
      }, ANIMATION_DURATION);
    },
    [setGenre, navigation],
  );

  const onClear = useCallback(() => {
    setGenre(null);
    setTimeout(() => {
      return navigation.goBack();
    }, ANIMATION_DURATION);
  }, [setGenre, navigation]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<IAnimeGenre>) => {
      const isSelected = getSelectedGenre(item);
      return (
        <Item genre={item} isSelected={isSelected} onSelectGenre={onPress} />
      );
    },
    [onPress, getSelectedGenre],
  );

  const renderEmptyState = useMemo(() => {
    if (isLoading) {
      return (
        <ListLoading cardHeight={theme.components.button.base.minHeight} />
      );
    }

    if (error) {
      return <ErrorState title={error.message} onRefresh={() => refetch()} />;
    }

    return <EmptyState title="No data found" />;
  }, [isLoading, error, refetch]);

  return (
    <Screen variant="modal">
      <View style={styles.container}>
        <FlatList
          data={data?.data}
          renderItem={renderItem}
          ListHeaderComponent={
            <Header
              title="Genre"
              backgroundColor={theme.dark.colors.background}
              leftAction={<Fragment />}
              variant="minimal"
              safeAreaTop={false}
              rightAction={
                <Button
                  variant="ghost"
                  size="sm"
                  icon={
                    <Ionicons
                      name="close"
                      size={24}
                      color={theme.dark.colors.text}
                    />
                  }
                  onPress={() => navigation.goBack()}
                />
              }
            />
          }
          contentContainerStyle={styles.content}
          stickyHeaderIndices={[0]}
          ListEmptyComponent={renderEmptyState}
        />
        <Footer onClear={onClear} />
      </View>
    </Screen>
  );
};

export default Genre;

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing[4],
    backgroundColor: theme.dark.colors.background,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    paddingBottom: theme.spacing[10],
  },
  content: {
    flexGrow: 1,
  },
});
