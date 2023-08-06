# @mharj/the-movie-database-client

This is a limited client for The Movie Database API.<br/>
Currently only the v3 API is supported for the following methods:

- Query Movies: searchMovies
- Query TV Shows: searchTvShows
- Get Movie Details: getMovieDetails
- Get TV Show Details: getTvShowDetails

All methods are using Rust style Result type to indicate success or failure. (or use .unwrap() to get the value or throw an error)

## Installation

```bash
npm install @mharj/the-movie-database-client
```

## Usage

```typescript
import {TheMovieDatabaseV3} from '@mharj/the-movie-database-client';

const client = new TheMovieDatabaseV3('your-api-key'); // key can be value, Promised value or a function that returns either

const movieSearchList: MovieSearchResponse = (await client.searchMovies({query: 'James Bond'})).unwrap();

const movieDetails: MovieDetailResponse = (await client.getMovieDetails(movieSearchList.results[0].id)).unwrap();

const tvSearchList: TvShowSearchResponse = (await client.searchTvShows({query: 'Ring'})).unwrap();

const tvDetails: TvShowDetailResponse = (await client.getTvShowDetails(tvSearchList.results[0].id)).unwrap();
```
