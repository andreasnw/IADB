import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from ".";

export interface MalEntity {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface ImageSet {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface DateProps {
  day: number;
  month: number;
  year: number;
}

export interface NameUrlPair {
  name: string;
  url: string;
}

export interface TitleEntry {
  type: string;
  title: string;
}

export interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
}

export interface Images {
  jpg: ImageSet;
  webp: ImageSet;
}

export interface AiredInfo {
  from: string;
  to: string;
  prop: {
    from: DateProps;
    to: DateProps;
    string: string;
  };
}

export interface Broadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

export interface Relation {
  relation: string;
  entry: MalEntity[];
}

export interface ThemeInfo {
  openings: string[];
  endings: string[];
}

// Main anime data interface
export interface AnimeData {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: TitleEntry[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: "TV" | "Movie" | "OVA" | "Special" | "ONA" | "Music";
  source: string;
  episodes: number;
  status: "Finished Airing" | "Currently Airing" | "Not yet aired";
  airing: boolean;
  aired: AiredInfo;
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
  broadcast: Broadcast;
  producers: MalEntity[];
  licensors: MalEntity[];
  studios: MalEntity[];
  genres: MalEntity[];
  explicit_genres: MalEntity[];
  themes: MalEntity[];
  demographics: MalEntity[];
  relations: Relation[];
  theme: ThemeInfo;
  external: NameUrlPair[];
  streaming: NameUrlPair[];
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
  data: AnimeData[];
  pagination: IPagination;
}

export interface IAnimeDetailResponse {
  data: AnimeData;
}

export const useGetAnimeList = () => {
  return useInfiniteQuery({
    queryKey: ["anime"],
    queryFn: async ({ pageParam }) => {
      const response = await api.get<IAnimeListResponse>(`anime`, {
        params: {
          limit: 10,
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
