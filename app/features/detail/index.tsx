import { useGetAnimeDetail } from "@/app/api/anime";
import EmptyState from "@/app/components/layout/EmptyState";
import ErrorState from "@/app/components/layout/ErrorState";
import Header from "@/app/components/layout/Header";
import Screen from "@/app/components/layout/Screen";
import { theme } from "@/app/config/theme";
import Poster from "@/app/features/detail/components/Poster";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import React, { Fragment, useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  Share as RNShare,
  StyleSheet,
  View,
} from "react-native";
import Content from "./components/Content";
import Share from "./components/Share";

export type DetailProps = StaticScreenProps<{
  id: number;
}>;

const Detail = ({ route }: DetailProps) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const { data, isLoading, isError, refetch } = useGetAnimeDetail({ id });

  const header = useMemo(() => {
    if (isLoading) return { title: undefined, description: undefined };
    if (!data || !data?.data) return { title: "N/A", description: undefined };
    return {
      title: data.data.title,
      description: `${data.data.year ?? "N/A"} - ${data.data.rating ?? "N/A"} - ${data.data.duration ?? "N/A"}`,
    };
  }, [data, isLoading]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSharePress = useCallback(() => {
    const url = Linking.createURL(`detail/${id}`);
    return RNShare.share({
      message: url,
    });
  }, [id]);

  const renderContent = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={theme.dark.colors.primary} />
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
        <Content
          synopsis={data.data.synopsis}
          studios={data.data.studios}
          producers={data.data.producers}
          licensors={data.data.licensors}
        />
      </Fragment>
    );
  }, [isLoading, isError, refetch, data]);

  return (
    <Fragment>
      <Header
        showBackButton
        onBackPress={goBack}
        title={header.title}
        subtitle={header.description}
        backgroundColor={theme.dark.colors.background}
        rightAction={<Share onPress={onSharePress} />}
      />
      <Screen variant="scroll" safeAreaTop={false} safeAreaBottom={false}>
        {renderContent()}
      </Screen>
    </Fragment>
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
