import { useGetAnimeDetail } from "@/app/api/anime";
import { StaticScreenProps } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type DetailProps = StaticScreenProps<{
  id: number;
}>;

const Detail = ({ route }: DetailProps) => {
  const { id } = route.params;
  const { data, isLoading, isError } = useGetAnimeDetail({ id });
  return (
    <View>
      <Text>Detail</Text>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({});
