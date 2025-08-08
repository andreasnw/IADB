import { useGetAnimeDetail } from "@/app/api/anime";
import Header from "@/app/components/layout/Header";
import Screen from "@/app/components/layout/Screen";
import EmptyState from "@/app/components/ui/EmptyState";
import ErrorState from "@/app/components/ui/ErrorState";
import theme from "@/app/config/theme";
import Poster from "@/app/features/detail/components/Poster";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import React, { Fragment, useCallback, useMemo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Content from "./components/Content";
import Technical from "./components/Technical";

type DetailProps = StaticScreenProps<{
  id: number;
}>;

const Detail = ({ route }: DetailProps) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const { data, isLoading, isError, refetch } = useGetAnimeDetail({ id });

  const header = useMemo(() => {
    if (isLoading) return { title: undefined, description: undefined };
    if (!data) return { title: "N/A", description: undefined };
    return {
      title: data.data.title,
      description: `${data.data.year} - ${data.data.rating} - ${data.data.duration}`,
    };
  }, [data]);

  const renderContent = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      );
    }

    if (isError) {
      return <ErrorState title="Error fetching data" onRefresh={refetch} />;
    }

    if (!data) {
      return <EmptyState title="No data found" />;
    }

    return (
      <Fragment>
        <Poster anime={data.data} />
        <Technical
          studios={data.data.studios}
          producers={data.data.producers}
          licensors={data.data.licensors}
        />
        <Content synopsis={data.data.synopsis} />
      </Fragment>
    );
  }, [isLoading, isError, refetch, data]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <GestureHandlerRootView>
      <Header
        showBackButton
        onBackPress={goBack}
        title={header.title}
        subtitle={header.description}
        backgroundColor={theme.dark.colors.background}
      />
      <Screen variant="scroll" safeAreaTop={false} safeAreaBottom={false}>
        {renderContent()}
      </Screen>
    </GestureHandlerRootView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
