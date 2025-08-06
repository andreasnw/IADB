import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from "react-native";
import { theme } from "../../config/theme";

type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "bodyLarge"
  | "bodySmall"
  | "caption"
  | "overline"
  | "button"
  | "link";

type TextColor =
  | "primary"
  | "secondary"
  | "text"
  | "textSecondary"
  | "textMuted"
  | "textInverse"
  | "success"
  | "warning"
  | "error"
  | "info";

type TextAlign = "left" | "center" | "right" | "justify";

type TextWeight = "normal" | "medium" | "semibold" | "bold";

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
  align?: TextAlign;
  weight?: TextWeight;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  monospace?: boolean;
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({
  variant = "body",
  color = "text",
  align = "left",
  weight,
  italic = false,
  underline = false,
  strikethrough = false,
  monospace = false,
  style,
  children,
  ...props
}) => {
  const textStyles = [
    styles.base,
    styles[variant],
    styles[`color_${color}`],
    styles[`align_${align}`],
    weight && styles[`weight_${weight}`],
    italic && styles.italic,
    underline && styles.underline,
    strikethrough && styles.strikethrough,
    monospace && styles.monospace,
    style,
  ];

  return (
    <RNText style={textStyles} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  // Base text style
  base: {
    fontSize: theme.typography.fontSize.base,
    lineHeight:
      theme.typography.fontSize.base * theme.typography.lineHeight.normal,
    color: theme.dark.colors.text,
  },

  // Variant styles - Headings
  h1: {
    fontSize: theme.typography.fontSize["5xl"],
    lineHeight:
      theme.typography.fontSize["5xl"] * theme.typography.lineHeight.tight,
    fontWeight: theme.typography.fontWeight.bold,
  },
  h2: {
    fontSize: theme.typography.fontSize["4xl"],
    lineHeight:
      theme.typography.fontSize["4xl"] * theme.typography.lineHeight.tight,
    fontWeight: theme.typography.fontWeight.bold,
  },
  h3: {
    fontSize: theme.typography.fontSize["3xl"],
    lineHeight:
      theme.typography.fontSize["3xl"] * theme.typography.lineHeight.tight,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  h4: {
    fontSize: theme.typography.fontSize["2xl"],
    lineHeight:
      theme.typography.fontSize["2xl"] * theme.typography.lineHeight.tight,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  h5: {
    fontSize: theme.typography.fontSize.xl,
    lineHeight:
      theme.typography.fontSize.xl * theme.typography.lineHeight.normal,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  h6: {
    fontSize: theme.typography.fontSize.lg,
    lineHeight:
      theme.typography.fontSize.lg * theme.typography.lineHeight.normal,
    fontWeight: theme.typography.fontWeight.medium,
  },

  // Body text variants
  body: {
    fontSize: theme.typography.fontSize.base,
    lineHeight:
      theme.typography.fontSize.base * theme.typography.lineHeight.normal,
  },
  bodyLarge: {
    fontSize: theme.typography.fontSize.lg,
    lineHeight:
      theme.typography.fontSize.lg * theme.typography.lineHeight.normal,
  },
  bodySmall: {
    fontSize: theme.typography.fontSize.sm,
    lineHeight:
      theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
  },

  // Utility text variants
  caption: {
    fontSize: theme.typography.fontSize.xs,
    lineHeight:
      theme.typography.fontSize.xs * theme.typography.lineHeight.normal,
    color: theme.dark.colors.textMuted,
  },
  overline: {
    fontSize: theme.typography.fontSize.xs,
    lineHeight:
      theme.typography.fontSize.xs * theme.typography.lineHeight.normal,
    fontWeight: theme.typography.fontWeight.medium,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  button: {
    fontSize: theme.typography.fontSize.base,
    lineHeight:
      theme.typography.fontSize.base * theme.typography.lineHeight.tight,
    fontWeight: theme.typography.fontWeight.medium,
  },
  link: {
    fontSize: theme.typography.fontSize.base,
    lineHeight:
      theme.typography.fontSize.base * theme.typography.lineHeight.normal,
    color: theme.dark.colors.primary,
    textDecorationLine: "underline",
  },

  // Color variants
  color_primary: {
    color: theme.dark.colors.primary,
  },
  color_secondary: {
    color: theme.dark.colors.secondary,
  },
  color_text: {
    color: theme.dark.colors.text,
  },
  color_textSecondary: {
    color: theme.dark.colors.textSecondary,
  },
  color_textMuted: {
    color: theme.dark.colors.textMuted,
  },
  color_textInverse: {
    color: theme.dark.colors.textInverse,
  },
  color_success: {
    color: theme.dark.colors.success,
  },
  color_warning: {
    color: theme.dark.colors.warning,
  },
  color_error: {
    color: theme.dark.colors.error,
  },
  color_info: {
    color: theme.dark.colors.info,
  },

  // Text alignment
  align_left: {
    textAlign: "left",
  },
  align_center: {
    textAlign: "center",
  },
  align_right: {
    textAlign: "right",
  },
  align_justify: {
    textAlign: "justify",
  },

  // Font weights
  weight_normal: {
    fontWeight: theme.typography.fontWeight.normal,
  },
  weight_medium: {
    fontWeight: theme.typography.fontWeight.medium,
  },
  weight_semibold: {
    fontWeight: theme.typography.fontWeight.semibold,
  },
  weight_bold: {
    fontWeight: theme.typography.fontWeight.bold,
  },

  // Text decorations
  italic: {
    fontStyle: "italic",
  },
  underline: {
    textDecorationLine: "underline",
  },
  strikethrough: {
    textDecorationLine: "line-through",
  },
  monospace: {
    fontFamily: "monospace",
  },
});

export default Text;
export type { TextAlign, TextColor, TextProps, TextVariant, TextWeight };
