import React, { createContext, useCallback, useContext, useState } from "react";
import { IAnimeGenre } from "../api/anime";

type GenreContextType = {
  genre: IAnimeGenre | null;
  getSelectedGenre: (item: IAnimeGenre) => boolean;
  setGenre: (genre: IAnimeGenre | null) => void;
};

const GenreContext = createContext<GenreContextType | undefined>(undefined);

export const GenreProvider = ({ children }: { children: React.ReactNode }) => {
  const [genre, setGenre] = useState<IAnimeGenre | null>(null);

  const getSelectedGenre = useCallback(
    (item: IAnimeGenre) => {
      return genre?.mal_id === item.mal_id;
    },
    [genre],
  );

  return (
    <GenreContext.Provider value={{ genre, setGenre, getSelectedGenre }}>
      {children}
    </GenreContext.Provider>
  );
};

export const useGenre = (): GenreContextType => {
  const context = useContext(GenreContext);
  if (!context) {
    throw new Error("useGenre must be used within a GenreProvider");
  }
  return context;
};
