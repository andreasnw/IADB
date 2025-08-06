import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../config/theme";
import Text from "../ui/Text";

type HeaderVariant = "default" | "centered" | "large" | "minimal";
type HeaderBackground = "primary" | "secondary" | "surface" | "transparent";

interface HeaderProps {
  // Content
  title?: string;
  subtitle?: string;

  // Navigation
  showBackButton?: boolean;
  onBackPress?: () => void;
  backIcon?: React.ReactNode;

  // Actions
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  secondaryRightAction?: React.ReactNode;

  // Styling
  variant?: HeaderVariant;
  backgroundVariant?: HeaderBackground;
  backgroundColor?: string;

  // Layout
  safeAreaTop?: boolean;
  borderBottom?: boolean;
  shadow?: boolean;

  // Custom styles
  style?: ViewStyle;
  titleStyle?: ViewStyle;
  contentStyle?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({
  // Content props
  title,
  subtitle,

  // Navigation props
  showBackButton = false,
  onBackPress,
  backIcon,

  // Action props
  leftAction,
  rightAction,
  secondaryRightAction,

  // Styling props
  variant = "default",
  backgroundVariant = "surface",
  backgroundColor,

  // Layout props
  safeAreaTop = true,
  borderBottom = true,
  shadow = false,

  // Custom styles
  style,
  titleStyle,
  contentStyle,
}) => {
  const insets = useSafeAreaInsets();

  // Build container style
  const containerStyle = [
    styles.container,
    backgroundColor
      ? { backgroundColor }
      : styles[`background_${backgroundVariant}`],
    borderBottom && styles.borderBottom,
    shadow && styles.shadow,
    safeAreaTop && { paddingTop: insets.top },
    style,
  ];

  // Build content style based on variant
  const headerContentStyle = [
    styles.content,
    styles[`content_${variant}`],
    contentStyle,
  ];

  // Build title section style
  const titleSectionStyle = [
    styles.titleSection,
    styles[`titleSection_${variant}`],
    titleStyle,
  ];

  // Left section content
  const leftSection = showBackButton ? (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={onBackPress}
      activeOpacity={0.7}
    >
      {backIcon || <Text variant="h5">←</Text>}
    </TouchableOpacity>
  ) : leftAction ? (
    <View style={styles.leftAction}>{leftAction}</View>
  ) : (
    <View style={styles.actionPlaceholder} />
  );

  // Title section content
  const titleSection =
    title || subtitle ? (
      <View style={titleSectionStyle}>
        {title && (
          <Text
            variant={variant === "large" ? "h3" : "h5"}
            weight="semibold"
            numberOfLines={1}
            style={styles[`title_${variant}`]}
          >
            {title}
          </Text>
        )}
        {subtitle && (
          <Text
            variant={variant === "large" ? "body" : "caption"}
            color="textSecondary"
            numberOfLines={1}
            style={styles[`subtitle_${variant}`]}
          >
            {subtitle}
          </Text>
        )}
      </View>
    ) : null;

  // Right section content
  const rightSection =
    rightAction || secondaryRightAction ? (
      <View style={styles.rightActions}>
        {secondaryRightAction && (
          <View style={styles.secondaryAction}>{secondaryRightAction}</View>
        )}
        {rightAction && <View style={styles.rightAction}>{rightAction}</View>}
      </View>
    ) : (
      <View style={styles.actionPlaceholder} />
    );

  return (
    <View style={containerStyle}>
      <View style={headerContentStyle}>
        {leftSection}
        {titleSection}
        {rightSection}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Container styles
  container: {
    zIndex: 10,
  },

  // Background variants
  background_primary: {
    backgroundColor: theme.dark.colors.background,
  },
  background_secondary: {
    backgroundColor: theme.dark.colors.surface,
  },
  background_surface: {
    backgroundColor: theme.dark.colors.surface,
  },
  background_transparent: {
    backgroundColor: "transparent",
  },

  // Border and shadow
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: theme.dark.colors.borderLight,
  },
  shadow: {
    ...theme.shadows.sm,
  },

  // Content layout variants
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing[4],
    minHeight: 56,
  },
  content_default: {
    justifyContent: "space-between",
  },
  content_centered: {
    justifyContent: "space-between",
  },
  content_large: {
    alignItems: "flex-start",
    paddingVertical: theme.spacing[4],
    minHeight: 80,
  },
  content_minimal: {
    paddingHorizontal: theme.spacing[2],
    minHeight: 48,
  },

  // Action sections
  actionButton: {
    padding: theme.spacing[2],
    marginHorizontal: -theme.spacing[2],
    borderRadius: theme.borderRadius.md,
  },
  leftAction: {
    alignItems: "flex-start",
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[2],
  },
  rightAction: {
    alignItems: "flex-end",
  },
  secondaryAction: {
    alignItems: "flex-end",
  },
  actionPlaceholder: {
    width: 40,
  },

  // Title section variants
  titleSection: {
    flex: 1,
    alignItems: "flex-start",
  },
  titleSection_default: {
    marginHorizontal: theme.spacing[3],
  },
  titleSection_centered: {
    alignItems: "center",
    marginHorizontal: theme.spacing[3],
  },
  titleSection_large: {
    marginHorizontal: theme.spacing[3],
    marginTop: theme.spacing[2],
  },
  titleSection_minimal: {
    marginHorizontal: theme.spacing[2],
  },

  // Title text variants
  title_default: {
    textAlign: "left",
  },
  title_centered: {
    textAlign: "center",
  },
  title_large: {
    textAlign: "left",
  },
  title_minimal: {
    textAlign: "left",
  },

  // Subtitle text variants
  subtitle_default: {
    textAlign: "left",
    marginTop: theme.spacing[1],
  },
  subtitle_centered: {
    textAlign: "center",
    marginTop: theme.spacing[1],
  },
  subtitle_large: {
    textAlign: "left",
    marginTop: theme.spacing[1],
  },
  subtitle_minimal: {
    textAlign: "left",
  },
});

export default Header;
export type { HeaderBackground, HeaderProps, HeaderVariant };
