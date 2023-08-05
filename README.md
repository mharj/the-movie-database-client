# @mharj/the-movie-database-client

This is a limited client for The Movie Database API.<br/>
Currently only the v3 API is supported, search movies and get movie details are the only supported endpoints.<br/>
All methods are using Rust style Result type to indicate success or failure. (or use .unwrap() to get the value or throw an error)

## Installation

```bash
npm install @mharj/the-movie-database-client
```

## Usage

```typescript
import {TheMovieDatabaseV3} from '@mharj/the-movie-database-client';

const client = new TheMovieDatabaseV3('your-api-key'); // key can be value, Promised value or a function that returns either

const searchList: MovieSearchResponse = (await client.searchMovies({query: 'James Bond'})).unwrap();

const movieDetails: MovieDetailResponse = (await client.getMovieDetails(searchList.results[0].id)).unwrap();
```
