import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { theme } from "../config/theme";
import Favourites from "../features/favourites";
import Home from "../features/home";

const TabNavigator = createBottomTabNavigator({
  screens: {
    Home: Home,
    Favourites: Favourites,
  },
  screenOptions: ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName: keyof typeof Entypo.glyphMap = "home";
      if (route.name === "Home") {
        iconName = "home";
      } else if (route.name === "Favourites") {
        iconName = "heart";
      }
      return <Entypo name={iconName} color={color} size={size} />;
    },
    headerShown: false,
    tabBarActiveTintColor: theme.dark.colors.tabBarActive,
    tabBarInactiveTintColor: theme.dark.colors.tabBarInactive,
    tabBarStyle: {
      backgroundColor: theme.dark.colors.tabBarBackground,
    },
  }),
});

export default TabNavigator;
