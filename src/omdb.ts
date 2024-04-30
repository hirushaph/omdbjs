import {
  MediaItem,
  OptionalParams,
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
   * @param name - Movie Name
   * @param extras - Extra Options
   * @returns - Array of Search Results or empty array
   */
  public async searchMovies(
    name: string,
    extras?: SearchByType
  ): Promise<SearchItem[]> {
    const res = await this.search(name, { type: "movie", ...extras });
    return res;
  }

  /**
   * Search Tv Series
   *
   * @param name - Tv Series Name
   * @param extras - Extra Options
   * @returns Array of series or empty array
   */
  public async searchSeries(
    name: string,
    extras?: SearchByType
  ): Promise<SearchItem[]> {
    const res = await this.search(name, { type: "series", ...extras });
    return res;
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
  public async getOneByName(
    name: string,
    extras: SingleItemParams
  ): Promise<MediaItem> {
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
        throw new Error(data.Error);
      }
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
