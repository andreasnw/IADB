import Button from "@/app/components/ui/Button";
import React from "react";
import { StyleSheet, View } from "react-native";

type FooterProps = {
  onClear: () => void;
};

const Footer = ({ onClear }: FooterProps) => {
  return (
    <View style={styles.footer}>
      <Button
        variant="ghost"
        size="sm"
        title="Clear"
        onPress={onClear}
        fullWidth
      />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    flex: 1,
  },
});
