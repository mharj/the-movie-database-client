import {MovieDetailV3Params} from '../types/params/v3/MovieDetailParams';
import {MovieDetailV3Response} from '../types/responses/v3/MovieDetailResponse';
import {MovieSearchV3Params} from '../types/params/v3/MovieSearchParams';
import {MovieSearchV3Response} from '../types/responses/v3/MovieSearchResponse';
import {TvShowDetailV3Params} from '../types/params/v3/TvShowDetailParams';
import {TvShowDetailV3Response} from '../types/responses/v3/TvShowDetailResponse';
import {TvShowSearchV3Params} from '../types/params/v3/TvShowSearchParams';
import {TvShowSearchV3Response} from '../types/responses/v3/TvShowSearchResponse';

export type CommonQueryParams<T> = T & {
	api_key: string;
};

export interface ITheMovieDatabaseHandlerV3 {
	/**
	 * Handle a Movie search request.
	 * @see https://developer.themoviedb.org/reference/search-movie
	 */
	handleMovieSearch(search: CommonQueryParams<MovieSearchV3Params>): Promise<MovieSearchV3Response>;
	/**
	 * Handle a movie details request.
	 * @see https://developer.themoviedb.org/reference/movie-details
	 * @param id - Movie ID
	 * @param params - Query params
	 */
	handleMovieDetails(id: number, params: CommonQueryParams<MovieDetailV3Params>): Promise<MovieDetailV3Response>;
	/**
	 * Handle a TV Show search request.
	 * @see https://developer.themoviedb.org/reference/search-tv
	 */
	handleTvShowSearch(search: CommonQueryParams<TvShowSearchV3Params>): Promise<TvShowSearchV3Response>;

	/**
	 * Handle a TY Show details request.
	 * @see https://developer.themoviedb.org/reference/tv-series-details
	 * @param id - Movie ID
	 * @param params - Query params
	 */
	handleTvShowDetails(id: number, params: CommonQueryParams<TvShowDetailV3Params>): Promise<TvShowDetailV3Response>;
}
