import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from ".";
import { PAGE_SIZE } from "../config/constants";

export interface IMalEntity {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface IImageSet {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface IDateProps {
  day: number;
  month: number;
  year: number;
}

export interface INameUrlPair {
  name: string;
  url: string;
}

export interface ITitleEntry {
  type: string;
  title: string;
}

export interface ITrailer {
  youtube_id: string;
  url: string;
  embed_url: string;
}

export interface IImages {
  jpg: IImageSet;
  webp: IImageSet;
}

export interface IAiredInfo {
  from: string;
  to: string;
  prop: {
    from: IDateProps;
    to: IDateProps;
    string: string;
  };
}

export interface IBroadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

export interface IRelation {
  relation: string;
  entry: IMalEntity[];
}

export interface IThemeInfo {
  openings: string[];
  endings: string[];
}

// Main anime data interface
export interface IAnimeData {
  mal_id: number;
  url: string;
  images: IImages;
  trailer: ITrailer;
  approved: boolean;
  titles: ITitleEntry[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: "TV" | "Movie" | "OVA" | "Special" | "ONA" | "Music";
  source: string;
  episodes: number;
  status: "Finished Airing" | "Currently Airing" | "Not yet aired";
  airing: boolean;
  aired: IAiredInfo;
  duration: string;
  rating:
    | "G - All Ages"
    | "PG - Children"
    | "PG-13 - Teens 13 or older"
    | "R - 17+ (violence & profanity)"
    | "R+ - Mild Nudity"
    | "Rx - Hentai";
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: "winter" | "spring" | "summer" | "fall";
  year: number;
  broadcast: IBroadcast;
  producers: IMalEntity[];
  licensors: IMalEntity[];
  studios: IMalEntity[];
  genres: IMalEntity[];
  explicit_genres: IMalEntity[];
  themes: IMalEntity[];
  demographics: IMalEntity[];
  relations: IRelation[];
  theme: IThemeInfo;
  external: INameUrlPair[];
  streaming: INameUrlPair[];
}

export interface IItem {
  count: number;
  total: number;
  per_page: number;
}

export interface IPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: IItem;
}

export interface IAnimeListResponse {
  data: IAnimeData[];
  pagination: IPagination;
}

export interface IAnimeDetailResponse {
  data: IAnimeData;
}

export const useGetAnimeList = () => {
  return useInfiniteQuery({
    queryKey: ["anime"],
    queryFn: async ({ pageParam }) => {
      const response = await api.get<IAnimeListResponse>(`anime`, {
        params: {
          limit: PAGE_SIZE,
          page: pageParam,
        },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.has_next_page) {
        return lastPage.pagination.current_page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export const useGetAnimeDetail = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ["anime", id],
    queryFn: async () => {
      const response = await api.get<IAnimeDetailResponse>(`anime/${id}`);
      return response.data;
    },
  });
};

export interface IAnimeGenresResponse {
  data: IAnimeGenre[];
}

export interface IAnimeGenre {
  mal_id: number;
  name: string;
}
