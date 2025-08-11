import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { theme } from "../config/theme";
import Detail from "../features/detail";
import Genre from "../features/genre";
import TabNavigator from "./TabNavigator";

const isAndroid = Platform.OS === "android";

const androidModalOptions = {
  presentation: "modal" as const,
  contentStyle: {
    animationDirection: "vertical",
    backgroundColor: theme.dark.colors.background,
  },
  animation: "slide_from_bottom",
};

const iosModalOptions = {
  presentation: "modal" as const,
  contentStyle: {
    backgroundColor: "transparent",
  },
};

const RootStack = createNativeStackNavigator({
  screens: {
    TabNavigator: TabNavigator,
    Detail: {
      screen: Detail,
      linking: {
        path: "detail/:id",
      },
    },
    Genre: {
      screen: Genre,
      options: isAndroid ? androidModalOptions : iosModalOptions,
    },
  },
  screenOptions: {
    headerShown: false,
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Navigation = createStaticNavigation(RootStack);

export default Navigation;
