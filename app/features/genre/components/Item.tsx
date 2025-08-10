import { IAnimeGenre } from "@/app/api/anime";
import Button from "@/app/components/ui/Button";
import theme from "@/app/config/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";

type ItemProps = {
  genre: IAnimeGenre;
  isSelected: boolean;
  onSelectGenre: (genre: IAnimeGenre) => void;
};

const Item = ({ genre, isSelected, onSelectGenre }: ItemProps) => {
  const renderRightIcon = useMemo(() => {
    if (!isSelected) return null;
    return (
      <Ionicons name="checkmark" size={24} color={theme.dark.colors.primary} />
    );
  }, [isSelected]);

  return (
    <Button
      variant="ghost"
      size="sm"
      fullWidth
      onPress={() => onSelectGenre(genre)}
      title={genre.name}
      textStyle={isSelected ? [styles.text, styles.selectedText] : styles.text}
      style={styles.button}
      rightIcon={renderRightIcon}
    />
  );
};

export default Item;

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
    flex: 1,
    color: theme.dark.colors.text,
  },
  button: {
    height: theme.components.button.base.minHeight,
  },
  selectedText: {
    color: theme.dark.colors.primary,
  },
});
