import React, { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { theme } from "../../config/theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode; // For icon-only buttons
  isIconButton?: boolean; // Explicitly mark as icon button
  textStyle?: TextStyle | TextStyle[];
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  icon,
  isIconButton,
  style,
  textStyle,
  ...props
}) => {
  const isDisabled = disabled || loading;

  // Determine if this is an icon-only button
  const iconOnly =
    isIconButton || (icon && !title) || (!title && !leftIcon && !rightIcon);

  // Dynamic styles that depend on props
  const dynamicButtonStyle: ViewStyle = {
    ...(fullWidth && !iconOnly && styles.fullWidth),
    ...(iconOnly && styles[`iconOnly_${size}`]),
    ...(isDisabled && styles.disabled),
    ...(variant === "outline" && isDisabled && styles.outlineDisabled),
  };

  const dynamicTextStyle: TextStyle = useMemo(
    () => ({
      ...(variant === "outline" && isDisabled && styles.outlineTextDisabled),
      ...(variant === "ghost" && isDisabled && styles.ghostTextDisabled),
    }),
    [variant, isDisabled],
  );

  const getLoadingIndicatorColor = useCallback((): string => {
    if (variant === "outline" || variant === "ghost") {
      return theme.dark.colors.primary;
    }
    return theme.dark.colors.textInverse;
  }, [variant]);

  const buttonStyles = [
    styles.base,
    iconOnly ? styles.iconBase : styles.textBase,
    styles[size],
    styles[variant],
    dynamicButtonStyle,
    style,
  ];

  const textStyles = useMemo(
    () => [
      styles.baseText,
      styles[`${size}Text`],
      styles[`${variant}Text`],
      dynamicTextStyle,
      textStyle,
    ],
    [size, variant, dynamicTextStyle, textStyle],
  );

  const renderContent = useCallback(() => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={getLoadingIndicatorColor()}
          style={styles.loadingIndicator}
        />
      );
    }

    if (iconOnly) {
      return icon || leftIcon || rightIcon;
    }

    return (
      <>
        {leftIcon && <Text style={styles.leftIcon}>{leftIcon}</Text>}
        {title && <Text style={textStyles}>{title}</Text>}
        {rightIcon && <Text style={styles.rightIcon}>{rightIcon}</Text>}
      </>
    );
  }, [
    loading,
    iconOnly,
    leftIcon,
    title,
    textStyles,
    rightIcon,
    getLoadingIndicatorColor,
    icon,
  ]);

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Base styles
  base: {
    ...theme.components.button.base,
    alignItems: "center",
    justifyContent: "center",
  },

  // Layout variants
  textBase: {
    flexDirection: "row",
  },
  iconBase: {
    flexDirection: "row",
  },

  // Size variants
  sm: theme.components.button.sizes.sm,
  md: theme.components.button.sizes.md,
  lg: theme.components.button.sizes.lg,

  // Icon-only size variants (square buttons)
  iconOnly_sm: {
    width: 36,
    height: 36,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  iconOnly_md: {
    width: 48,
    height: 48,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  iconOnly_lg: {
    width: 56,
    height: 56,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  // Color variants
  primary: {
    backgroundColor: theme.dark.colors.primary,
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: theme.dark.colors.secondary,
    borderWidth: 0,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.dark.colors.primary,
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  danger: {
    backgroundColor: theme.dark.colors.error,
    borderWidth: 0,
  },

  // Text base styles
  baseText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: "center",
  },

  // Text size variants
  smText: {
    fontSize: theme.typography.fontSize.sm,
  },
  mdText: {
    fontSize: theme.typography.fontSize.base,
  },
  lgText: {
    fontSize: theme.typography.fontSize.lg,
  },

  // Text color variants
  primaryText: {
    color: theme.dark.colors.textInverse,
  },
  secondaryText: {
    color: theme.dark.colors.textInverse,
  },
  outlineText: {
    color: theme.dark.colors.primary,
  },
  ghostText: {
    color: theme.dark.colors.primary,
  },
  dangerText: {
    color: theme.dark.colors.textInverse,
  },

  // State styles
  disabled: {
    backgroundColor: theme.dark.colors.textMuted,
    opacity: 0.6,
  },
  outlineDisabled: {
    backgroundColor: "transparent",
    borderColor: theme.dark.colors.textMuted,
  },
  outlineTextDisabled: {
    color: theme.dark.colors.textMuted,
  },
  ghostTextDisabled: {
    color: theme.dark.colors.textMuted,
  },

  // Layout styles
  fullWidth: {
    alignSelf: "stretch",
  },

  // Icon styles
  loadingIndicator: {
    alignSelf: "center",
  },
  leftIcon: {
    marginRight: theme.spacing[2],
    alignSelf: "center",
  },
  rightIcon: {
    marginLeft: theme.spacing[2],
    alignSelf: "center",
  },
});

export default Button;
export type { ButtonProps, ButtonSize, ButtonVariant };
