import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../features/detail";
import Genre from "../features/genre";
import TabNavigator from "./TabNavigator";

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
      options: {
        presentation: "modal",
        contentStyle: {
          backgroundColor: "transparent",
        },
      },
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
