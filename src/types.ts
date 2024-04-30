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
  /** Array of Ratings */
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

export type OptionalParams = {
  /** Release year */
  year?: number;
  /** Media type movie | series | episode */
  type?: "movie" | "series" | "episode";
};

export type SingleItemParams = OptionalParams & {
  /** Get full plot or short plot - short | full */
  plot?: "short" | "full";
};

export type SearchParams = OptionalParams & {
  /** Page number - navigate trough search results pages */
  page?: number;
};

export type SearchByType = Omit<SearchParams, "type">;
export type GetOneByType = Omit<SingleItemParams, "type">;
