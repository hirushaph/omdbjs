export type MediaItem = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  Response: string;
  totalSeasons?: string; // Only present for TV series
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
};

export type SearchItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export interface OptionalParams {
  year?: number;
  type?: "movie" | "series" | "episode";
}

export interface SingleItemParams extends OptionalParams {
  plot?: "short" | "full";
}

export interface SearchParams extends OptionalParams {
  page?: number;
}

export type SearchByType = Omit<SearchParams, "type">;
export type GetOneByType = Omit<SingleItemParams, "type">;
