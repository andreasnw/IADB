import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useGetAnimeList } from "../../api/anime";

const Home = () => {
  const navigation = useNavigation();
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useGetAnimeList();
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Go to Detail"
        onPress={() =>
          navigation.navigate("Detail", {
            id: data?.pages[0].data[2].mal_id ?? 0,
          })
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
