import React from "react";
import { FavouritesProvider } from "./app/providers/FavouritesProvider";
import QueryClientProvider from "./app/providers/QueryClientProvider";
import Navigation from "./app/routes";

const App = () => {
  return (
    <QueryClientProvider>
      <FavouritesProvider>
        <Navigation />
      </FavouritesProvider>
    </QueryClientProvider>
  );
};

export default App;
