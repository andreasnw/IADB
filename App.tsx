import React from "react";
import Toast from "react-native-toast-message";
import { FavouritesProvider } from "./app/providers/FavouritesProvider";
import { GenreProvider } from "./app/providers/GenreProvider";
import QueryClientProvider from "./app/providers/QueryClientProvider";
import Navigation from "./app/routes";

const App = () => {
  return (
    <QueryClientProvider>
      <FavouritesProvider>
        <GenreProvider>
          <Navigation />
          <Toast />
        </GenreProvider>
      </FavouritesProvider>
    </QueryClientProvider>
  );
};

export default App;
