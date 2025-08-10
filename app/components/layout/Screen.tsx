import React from "react";
import {
  Platform,
  ScrollView,
  ScrollViewProps,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../config/theme";

type ScreenVariant = "scroll" | "fixed" | "keyboard" | "modal";
type BackgroundVariant = "primary" | "secondary" | "surface" | "card";

interface ScreenProps {
  children: React.ReactNode;
  variant?: ScreenVariant;

  // Background and styling
  backgroundColor?: string;
  backgroundVariant?: BackgroundVariant;

  // Safe area configuration
  safeAreaTop?: boolean;
  safeAreaBottom?: boolean;
  safeAreaLeft?: boolean;
  safeAreaRight?: boolean;

  // Padding and spacing
  padding?: keyof typeof theme.spacing;
  paddingHorizontal?: keyof typeof theme.spacing;
  paddingVertical?: keyof typeof theme.spacing;

  // ScrollView props (when variant is "scroll")
  scrollViewProps?: Omit<ScrollViewProps, "children">;

  // Custom styles
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;

  // Status bar
  statusBarStyle?: "default" | "dark-content";
  statusBarBackgroundColor?: string;
}

const Screen: React.FC<ScreenProps> = ({
  children,
  variant = "scroll",

  // Background props
  backgroundColor,
  backgroundVariant = "primary",

  // Safe area props
  safeAreaTop = false,
  safeAreaBottom = false,
  safeAreaLeft = false,
  safeAreaRight = false,

  // Spacing props
  padding,
  paddingHorizontal,
  paddingVertical,

  // Other props
  scrollViewProps,
  style,
  contentContainerStyle,
  statusBarStyle = "default",
  statusBarBackgroundColor,
}) => {
  const insets = useSafeAreaInsets();

  // Build dynamic styles based on props
  const containerStyle = [
    styles.container,
    backgroundColor
      ? { backgroundColor }
      : styles[`background_${backgroundVariant}`],
    style,
  ];

  const paddingStyle: ViewStyle = {
    ...(padding && { padding: theme.spacing[padding] }),
    ...(paddingHorizontal && {
      paddingHorizontal: theme.spacing[paddingHorizontal],
    }),
    ...(paddingVertical && {
      paddingVertical: theme.spacing[paddingVertical],
    }),
    ...(safeAreaTop && { paddingTop: insets.top }),
    ...(safeAreaBottom && { paddingBottom: insets.bottom }),
    ...(safeAreaLeft && { paddingLeft: insets.left }),
    ...(safeAreaRight && { paddingRight: insets.right }),
  };

  const contentStyle = [paddingStyle, contentContainerStyle];

  // Get background color for status bar
  const statusBarBackground =
    statusBarBackgroundColor ||
    backgroundColor ||
    (backgroundVariant === "primary"
      ? theme.dark.colors.background
      : backgroundVariant === "secondary"
        ? theme.dark.colors.surface
        : backgroundVariant === "surface"
          ? theme.dark.colors.surface
          : theme.dark.colors.card);

  // Render based on variant
  if (variant === "scroll") {
    return (
      <>
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={statusBarBackground}
          translucent={Platform.OS === "android"}
        />
        <ScrollView
          style={containerStyle}
          contentContainerStyle={[styles.scrollContent, contentStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          {...scrollViewProps}
        >
          {children}
        </ScrollView>
      </>
    );
  }

  if (variant === "keyboard") {
    return (
      <>
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={statusBarBackground}
          translucent={Platform.OS === "android"}
        />
        <View style={containerStyle}>
          <ScrollView
            style={styles.flex}
            contentContainerStyle={[styles.scrollContent, contentStyle]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            {...scrollViewProps}
          >
            {children}
          </ScrollView>
        </View>
      </>
    );
  }

  // variant === "modal"
  if (variant === "modal") {
    return (
      <>
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={statusBarBackground}
        />
        <View style={[containerStyle, styles.modal]}>{children}</View>
      </>
    );
  }

  // variant === "fixed"
  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackground}
        translucent={Platform.OS === "android"}
      />
      <View style={containerStyle}>
        <View style={[styles.flex, contentStyle]}>{children}</View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // Base styles
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  modal: {
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    paddingBottom: theme.spacing[8],
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
  background_card: {
    backgroundColor: theme.dark.colors.card,
  },

  // Content styles
  scrollContent: {
    flexGrow: 1,
  },
});

export default Screen;
export type { BackgroundVariant, ScreenProps, ScreenVariant };
