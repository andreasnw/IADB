import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IAnimeData } from "../api/anime";
import { FAVOURITES_KEY } from "../config/constants";

type FavouritesContextType = {
  favourites: IAnimeData[];
  toggleFavourite: (favourite: IAnimeData) => void;
  isFavourite: (id: number) => boolean;
  clearFavourites: () => void;
};

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined,
);

export const FavouritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favourites, setFavourites] = useState<IAnimeData[]>([]);

  useEffect(() => {
    const loadFavourites = async () => {
      const raw = await AsyncStorage.getItem(FAVOURITES_KEY);
      if (raw) {
        setFavourites(JSON.parse(raw));
      }
    };
    loadFavourites();
  }, []);

  const saveFavourites = async (newFavourites: IAnimeData[]) => {
    await AsyncStorage.setItem(
      FAVOURITES_KEY,
      JSON.stringify([...newFavourites]),
    );
  };

  const toggleFavourite = useCallback((favourite: IAnimeData) => {
    setFavourites((prev) => {
      if (prev.length === 0) {
        saveFavourites([favourite]);
        return [favourite];
      }

      let updated = [...prev];

      const index = updated.findIndex((f) => f?.mal_id === favourite?.mal_id);

      if (index !== -1) {
        updated.splice(index, 1);
      } else {
        updated = [...updated, favourite];
      }

      saveFavourites(updated);
      return updated;
    });
  }, []);

  const isFavourite = useCallback(
    (id: number) => {
      return (
        favourites.findIndex((favourite) => favourite.mal_id === id) !== -1
      );
    },
    [favourites],
  );

  const clearFavourites = useCallback(() => {
    setFavourites([]);
    AsyncStorage.removeItem(FAVOURITES_KEY);
  }, []);

  return (
    <FavouritesContext.Provider
      value={{ favourites, toggleFavourite, isFavourite, clearFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = (): FavouritesContextType => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};
