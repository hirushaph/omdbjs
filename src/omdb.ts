type MediaItem = {
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

type SearchItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export class OMDB {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("API key is required");
    }
    this.apiKey = apiKey;
    this.baseUrl = `http://www.omdbapi.com`;
  }
  /**
   * Search movies or series
   *
   * @param query - Search Query
   * @returns - Array of search results
   */
  public async search(query: string): Promise<SearchItem[]> {
    try {
      const res = await fetch(
        `${this.baseUrl}/?apikey=${this.apiKey}&s=${query}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch search data");

      return data.Search || [];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get movie or series info by id
   *
   * @param id - IMDB ID
   * @returns {Object} - Movie or Series Information
   */

  public async getById(id: string): Promise<MediaItem> {
    try {
      const res = await fetch(`${this.baseUrl}/?apikey=${this.apiKey}&i=${id}`);
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch by id");

      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search and get one movie or series by name
   *
   * @param {string} name - Movie or Series name
   * @returns {object} - One Movie or Series info
   */

  public async getOneByName(name: string): Promise<MediaItem> {
    try {
      const res = await fetch(
        `${this.baseUrl}/?apikey=${this.apiKey}&t=${name}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch by name");

      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
}
