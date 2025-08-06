import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Navigation from "./app/routes";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
};

export default App;
