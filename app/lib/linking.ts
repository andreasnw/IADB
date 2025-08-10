import * as Linking from "expo-linking";

const prefix = Linking.createURL("/");

const linking = {
  enabled: true,
  prefixes: [prefix],
};

export default linking;
