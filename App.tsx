import React from "react";
import Toast from "react-native-toast-message";
import { FavouritesProvider } from "./app/providers/FavouritesProvider";
import QueryClientProvider from "./app/providers/QueryClientProvider";
import Navigation from "./app/routes";

const App = () => {
  return (
    <QueryClientProvider>
      <FavouritesProvider>
        <Navigation />
        <Toast />
      </FavouritesProvider>
    </QueryClientProvider>
  );
};

export default App;
