import Button from "@/app/components/ui/Button";
import theme from "@/app/config/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator } from "react-native";

type FilterProps = {
  isFiltered: boolean;
  onPress: () => void;
  isFetching: boolean;
};

const Filter = ({ isFiltered, onPress, isFetching }: FilterProps) => {
  if (isFetching) {
    return <ActivityIndicator />;
  }
  return (
    <Button
      onPress={onPress}
      variant="ghost"
      size="sm"
      icon={
        <Ionicons
          name={isFiltered ? "filter-circle" : "filter-circle-outline"}
          size={24}
          color={
            isFiltered ? theme.dark.colors.primary : theme.dark.colors.text
          }
        />
      }
    />
  );
};

export default Filter;
