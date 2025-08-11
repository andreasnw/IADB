import Button from "@/app/components/ui/Button";
import { theme } from "@/app/config/theme";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

const Share = ({ onPress }: { onPress: () => void }) => {
  return (
    <Button
      onPress={onPress}
      variant="ghost"
      size="sm"
      icon={
        <AntDesign name="sharealt" size={16} color={theme.dark.colors.text} />
      }
    />
  );
};

export default Share;
