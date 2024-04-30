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
  DVD?: string; // Only present for movies
  BoxOffice?: string; // Only present for movies
  Production?: string; // Only present for movies
  Website?: string; // Only present for movies
};

export type SearchItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type OptionalParams = {
  year?: number;
  type?: "movie" | "series" | "episode";
};

export type SingleItemParams = OptionalParams & {
  plot?: "short" | "full";
};

export type SearchParams = OptionalParams & {
  page?: number;
};

export type SearchByType = Omit<SearchParams, "type">;
