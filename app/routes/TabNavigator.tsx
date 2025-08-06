import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favourites from "../features/favourites";
import Home from "../features/home";

const TabNavigator = createBottomTabNavigator({
  screens: {
    Home: Home,
    Favourites: Favourites,
  },
  screenOptions: {
    headerShown: false,
  },
});

export default TabNavigator;
