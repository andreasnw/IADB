import { Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Color palette inspired by  dark theme
const colors = {
  // Primary colors ( Green)
  primary: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    200: "#BBF7D0",
    300: "#86EFAC",
    400: "#4ADE80",
    500: "#1DB954", //  Green
    600: "#16A34A",
    700: "#15803D",
    800: "#166534",
    900: "#14532D",
  },

  // Secondary colors ( accent colors)
  secondary: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#3B82F6", // Blue accent
    600: "#2563EB",
    700: "#1D4ED8",
    800: "#1E40AF",
    900: "#1E3A8A",
  },

  // Neutral colors (Dark theme grays)
  neutral: {
    50: "#FAFAFA",
    100: "#F4F4F5",
    200: "#E4E4E7",
    300: "#D4D4D8",
    400: "#A1A1AA",
    500: "#71717A",
    600: "#52525B",
    700: "#3F3F46",
    800: "#27272A",
    900: "#18181B",
  },

  // Dark theme specific colors
  dark: {
    50: "#FAFAFA",
    100: "#212121", // Dark card background
    200: "#191414", //  main dark
    300: "#121212", //  darker
    400: "#0D1117", // GitHub dark
    500: "#000000", // Pure black
    600: "#1A1A1A", // Very dark gray
    700: "#2A2A2A", // Dark gray
    800: "#3A3A3A", // Medium dark gray
    900: "#4A4A4A", // Light dark gray
  },

  // Semantic colors (dark theme optimized)
  success: {
    50: "#F0FDF4",
    500: "#1DB954", //  green for success
    600: "#16A34A",
  },

  warning: {
    50: "#FFFBEB",
    500: "#F59E0B",
    600: "#D97706",
  },

  error: {
    50: "#FEF2F2",
    500: "#EF4444",
    600: "#DC2626",
  },

  info: {
    50: "#EFF6FF",
    500: "#3B82F6",
    600: "#2563EB",
  },
} as const;

// Typography system
const typography = {
  fontSize: {
    xs: 8,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    "2xl": 20,
    "3xl": 24,
    "4xl": 28,
    "5xl": 32,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },

  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const;

// Spacing system
const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
} as const;

// Border radius
const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  full: 9999,
} as const;

// Shadows (adjusted for dark theme)
const shadows = {
  sm: {
    shadowColor: colors.dark[500],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: colors.dark[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: colors.dark[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: colors.dark[500],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
} as const;

// Dark theme (-inspired)
const darkTheme = {
  colors: {
    // Background colors (dark theme)
    background: colors.dark[300], //  main dark #191414
    surface: colors.dark[100], // Dark card background #212121
    card: colors.dark[100], // Card backgrounds
    modal: colors.dark[300], // Modal backgrounds

    // Text colors (dark text on dark)
    text: colors.neutral[50], // White text
    textSecondary: colors.neutral[300], // Light gray text
    textMuted: colors.neutral[500], // Muted gray text
    textInverse: colors.dark[200], // Dark text for dark backgrounds

    // Border colors
    border: colors.neutral[700], // Dark border
    borderLight: colors.neutral[800], // Darker border

    // Primary colors ( Green)
    primary: colors.primary[500], //  Green #1DB954
    primaryLight: colors.primary[400], // Lighter green
    primaryDark: colors.primary[600], // Darker green

    // Secondary colors (Blue accent)
    secondary: colors.secondary[500], // Blue accent
    secondaryLight: colors.secondary[400], // Light blue
    secondaryDark: colors.secondary[600], // Dark blue

    // Semantic colors
    success: colors.success[500], //  green
    successLight: colors.success[50],
    warning: colors.warning[500],
    warningLight: colors.warning[50],
    error: colors.error[500],
    errorLight: colors.error[50],
    info: colors.info[500],
    infoLight: colors.info[50],

    // Tab bar (-style)
    tabBarActive: colors.primary[500], // green
    tabBarInactive: colors.neutral[500], // Gray
    tabBarBackground: colors.dark[300], // Dark background
  },
} as const;

// Component styles
const components = {
  button: {
    activeOpacity: 0.8,
    base: {
      borderRadius: borderRadius.full,
      paddingHorizontal: spacing[6],
      paddingVertical: spacing[3],
      alignItems: "center",
      justifyContent: "center",
      minHeight: 48,
    },
    sizes: {
      sm: {
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[2],
        minHeight: 36,
      },
      md: {
        paddingHorizontal: spacing[6],
        paddingVertical: spacing[3],
        minHeight: 48,
      },
      lg: {
        paddingHorizontal: spacing[8],
        paddingVertical: spacing[4],
        minHeight: 56,
      },
    },
  },

  input: {
    base: {
      borderRadius: borderRadius.md,
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[3],
      fontSize: typography.fontSize.base,
      borderWidth: 1,
      minHeight: 48,
    },
  },

  card: {
    base: {
      borderRadius: borderRadius.lg,
      padding: spacing[4],
      ...shadows.base,
    },
  },

  avatar: {
    sizes: {
      sm: { width: 32, height: 32, borderRadius: 16 },
      md: { width: 48, height: 48, borderRadius: 24 },
      lg: { width: 64, height: 64, borderRadius: 32 },
      xl: { width: 96, height: 96, borderRadius: 48 },
    },
  },
} as const;

// Screen dimensions
const layout = {
  window: {
    width: screenWidth,
    height: screenHeight,
  },
  isSmallDevice: screenWidth < 375,
  isLargeDevice: screenWidth >= 414,
  header: {
    height: 56,
  },
  tabBar: {
    height: 60,
  },
} as const;

// Main theme object
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  components,
  layout,
  dark: darkTheme,
} as const;

// Theme type for TypeScript
export type Theme = typeof theme;
export type ThemeColors = typeof darkTheme.colors;

// Default export
export default theme;
