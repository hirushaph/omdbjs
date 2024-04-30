import {
  GetOneByType,
  MediaItem,
  SearchByType,
  SearchItem,
  SearchParams,
  SingleItemParams,
} from "./types";

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
  public async search(
    query: string,
    extras?: SearchParams
  ): Promise<SearchItem[]> {
    try {
      const extraParams = extras
        ? this.getOptionalParams(extras, "search")
        : undefined;
      console.log(extraParams);
      const res = await fetch(
        `${this.baseUrl}/?apikey=${this.apiKey}&s=${query}${
          extraParams ? extraParams : ""
        }`
      );
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch search data");

      return data.Search || [];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search Movies
   *
   * @param {string} name - Movie Name
   * @param {object} extras - Extra Options
   * @returns - Array of Search Results or empty array
   */
  public async searchMovies(
    name: string,
    extras?: SearchByType
  ): Promise<SearchItem[]> {
    try {
      const res = await this.search(name, { type: "movie", ...extras });
      return res;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search Tv Series
   *
   * @param {string} name - Tv Series Name
   * @param {object} extras - Extra Options
   * @returns Array of series or empty array
   */
  public async searchSeries(
    name: string,
    extras?: SearchByType
  ): Promise<SearchItem[]> {
    try {
      const res = await this.search(name, { type: "series", ...extras });
      return res;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get movie or series info by id
   *
   * @param {string} id - IMDB ID
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
   * @returns {object} - One Movie or Series info or null
   */

  public async getOneByName(
    name: string,
    extras: SingleItemParams
  ): Promise<MediaItem | null> {
    try {
      const extraParams = extras
        ? this.getOptionalParams(extras, "single")
        : undefined;
      console.log(extraParams);
      const res = await fetch(
        `${this.baseUrl}/?apikey=${this.apiKey}&t=${name}${extraParams}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch by name");

      if (data.Response === "False") {
        return null;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search and Get One Movie By Name
   *
   * @param {string} name - Movie name
   * @param {object} extras - Extra options
   * @returns - Movie information or null
   */

  public async getMovieByName(name: string, extras: GetOneByType) {
    try {
      const data = this.getOneByName(name, { type: "movie", ...extras });
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search and Get One Series By Name
   *
   * @param {string} name - Series name
   * @param {object} extras - Extra options
   * @returns - Series information or null
   */

  public async getSeriesByName(name: string, extras: GetOneByType) {
    try {
      const data = this.getOneByName(name, { type: "series", ...extras });
      return data;
    } catch (error) {
      throw error;
    }
  }

  private getOptionalParams(
    queryParams: SearchParams | SingleItemParams,
    type: string
  ): string {
    const keys: { [key: string]: string } = {
      year: "y",
      type: "type",
      page: "page",
      plot: "plot",
    };

    const urlParams = Object.entries(queryParams)
      .map(([key, value]) => {
        if (key === undefined && value === undefined) return;
        if (key === "page" && type === "single") return;
        if (key === "plot" && type === "search") return;
        return `${keys[key]}=${value}`;
      })
      .filter((str) => str !== "")
      .join("&");

    return "&" + urlParams;
  }
}
