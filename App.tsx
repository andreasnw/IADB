import React from "react";
import Toast from "react-native-toast-message";
import linking from "./app/lib/linking";
import { FavouritesProvider } from "./app/providers/FavouritesProvider";
import { GenreProvider } from "./app/providers/GenreProvider";
import QueryClientProvider from "./app/providers/QueryClientProvider";
import Navigation from "./app/routes";

const App = () => (
  <QueryClientProvider>
    <FavouritesProvider>
      <GenreProvider>
        <Navigation linking={linking} />
        <Toast />
      </GenreProvider>
    </FavouritesProvider>
  </QueryClientProvider>
);

export default App;
