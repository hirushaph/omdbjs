# OMDB API Wrapper

Simple Javascript wrapper for interacting with the Open Movie Database (OMDB) API. It allows users to search for movies and TV series, retrieve detailed information about specific titles, and more.

## ⚙ Installation

To use this wrapper in your project, you can install it via npm:

```bash
npm install --save omdbjs
```

## Import

```js
// Using Modules
import { OMDB } from "omdbjs";

// OR

// Using Common JS
const { OMDB } = require("omdbjs");
```

## 🌄 Initialization

You need to get api key from here [OMDB API](https://www.omdbapi.com/apikey.aspx)

```js
// Initialize OMDB with your API key
const omdb = new OMDB("your_api_key_here");
```

## 💻 Usage

#### Get Search Results

```js
// SEARCH FOR MOVIES OR SERIES

// Returns list of movies or series related to "Avengers"
const results = await omdb.searchMovies("Avengers");

// Return list of results realted to "avengers" and added options
const results = await omdb.search("Avengers", {
  // These options are optional
  year: 2019, // search by year
  type: "movie", // search only for movies (movie | series)
  page: 1, // page number for results
});

// ===== ONLY GET MOVIE RESULTS =====

// Return list of movies related to avengers
const movieResults = await omdb.searchMovies("Avengers");

// Return list of movies related to avengers released in 2019
const movieResults = await omdb.searchMovies("avengers", {
  // Extra Options - these option are Optional
  year: 2019,
});

// Avaliable Extra Options for MOVIES
{
  year: 2019; // realease year
  page: 1; // results page number
}

// ===== ONLY GET TV SERIES RESULTS =====

const seriesResults = await omdb.searchMovies("See");

// Return list of series related to "see" released in 2019
const seriesResults = await omdb.searchMovies("avengers", {
  // Extra Options - these option are Optional
  year: 2019,
});

// Avaliable Extra Options for SERIES
{
  year: 2019; // realease year
  page: 1; // results page number
}
```

#### Get Single Movie or Series By IMDB ID

```js
// Return movie or series information related to input id
const result = await omdb.getById("imdbid-here");
```

#### Get Single Movie or Series By Name

```js
// Return best matching movie or series for input name
const result = await omdb.getOneByName("movie or series name");

// Filter Result with optional params
const result = await omdb.getOneByName("movie or series name",{
    // these options are optional
    type:"movie" // only search for movies (movie | series)
    year: 2019 // filter by year
    plot:"short" // How plot info should return short info or full info
})

// GET ONLY SINGLE MOVIE

const movie = await omdb.getMovieByName("moviename")

// With extra options - optional
const movie = await omdb.getMovieByName("moviename",{
    year : 2019 // release year
    plot : "full" // plot length short or full
})

// GET ONLY SINGLE SERIES

const series = await omdb.getSeriesByName("seriesname")

// With extra options - optional
const movie = await omdb.getSeriesByName("seriesname",{
    year : 2019 // release year
    plot : "short" // plot length short or full
})

```

### 🍃 Contributing

Contributions are welcome! If you have any bug reports, or improvements, feel free to open an issue or create a pull request.
