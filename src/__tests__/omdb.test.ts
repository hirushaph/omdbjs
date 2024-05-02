import { OMDB } from "../omdb";

describe("OMDB API", () => {
  let omdb: OMDB;

  beforeEach(() => {
    omdb = new OMDB("123");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Search", () => {
    it("Should return search results", async () => {
      const responseData = {
        Search: [
          {
            Title: "Movie 1",
            Year: "2021",
            imdbID: "tt123456",
            Type: "movie",
            Poster: "poster1.jpg",
          },
          {
            Title: "Movie 2",
            Year: "2019",
            imdbID: "tt654321",
            Type: "movie",
            Poster: "poster2.jpg",
          },
        ],
      };

      //Mock fetch function

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(responseData),
      });

      const searchResults = await omdb.search("Avengers");
      expect(fetch).toHaveBeenCalledWith(
        "http://www.omdbapi.com/?apikey=123&s=Avengers"
      );
      expect(searchResults[0].Title).toBe("Movie 1");
      expect(searchResults).toEqual(responseData.Search);
    });

    it("should return empty array if no movies or series found", async () => {
      const responseData = { Response: "False", Error: "Movie not found!" };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(responseData),
      });

      const searchResults = await omdb.search("Fake Movie");

      expect(searchResults).toEqual([]);
    });

    it("should throw error if response is not ok", async () => {
      const responseData = { Response: "False", Error: "Some Error" };

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.resolve(responseData),
      });

      await expect(omdb.search("avengers")).rejects.toThrow(
        Error("Failed to fetch search data")
      );
    });

    it("should throw response Error message if response status is 401", async () => {
      const responseData = { Response: "False", Error: "Some Error" };

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 401,
        json: () => Promise.resolve(responseData),
      });

      await expect(omdb.search("avengers")).rejects.toThrow(
        Error("Some Error")
      );
    });

    it("should pass all extra options correctly", async () => {
      const responseData = {
        Search: [
          {
            Title: "Movie 1",
            Year: "2021",
            imdbID: "tt123456",
            Type: "movie",
            Poster: "poster1.jpg",
          },
        ],
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(responseData),
      });

      const results = await omdb.search("Avengers", {
        year: 2019,
        type: "movie",
        page: 1,
      });

      expect(fetch).toHaveBeenCalledWith(
        "http://www.omdbapi.com/?apikey=123&s=Avengers&y=2019&type=movie&page=1"
      );
    });
  });

  describe("Get One Item By Name", () => {
    it("should return one item", async () => {
      const responseData = {
        Title: "Avengers : Endgame",
        Year: "2019",
        Runtime: "182",
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(responseData),
      });

      const results = await omdb.getOneByName("Avengers Endgame");

      expect(results).toEqual(responseData);
    });

    it("should return null if no movie or series found", async () => {
      const responseData = { Response: "False", Error: "Movie not found!" };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(responseData),
      });

      const searchResults = await omdb.getOneByName("Fake Movie");

      expect(searchResults).toEqual(null);
    });

    it("should throw error if response is not ok", async () => {
      const responseData = { Response: "False", Error: "Some Error" };

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.resolve(responseData),
      });

      await expect(omdb.getOneByName("avengers")).rejects.toThrow(
        Error("Failed to fetch search data")
      );
    });

    it("should pass all extra options correctly", async () => {
      const responseData = {
        Title: "Avengers : Endgame",
        Year: "2019",
        Runtime: "182",
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(responseData),
      });

      const results = await omdb.getOneByName("Avengers", {
        year: 2019,
        type: "movie",
        plot: "short",
      });

      expect(fetch).toHaveBeenCalledWith(
        "http://www.omdbapi.com/?apikey=123&t=Avengers&y=2019&type=movie&plot=short"
      );
    });
  });
});
