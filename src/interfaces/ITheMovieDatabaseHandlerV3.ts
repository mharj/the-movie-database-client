import {MovieDetailParams} from '../types/params/v3/MovieDetailParams';
import {MovieDetailResponse} from '../types/responses/v3/MovieDetailResponse';
import {MovieSearchParams} from '../types/params/v3/MovieSearchParams';
import {MovieSearchResponse} from '../types/responses/v3/MovieSearchResponse';
import {TvShowDetailParams} from '../types/params/v3/TvShowDetailParams';
import {TvShowDetailResponse} from '../types/responses/v3/TvShowDetailResponse';
import {TvShowSearchParams} from '../types/params/v3/TvShowSearchParams';
import {TvShowSearchResponse} from '../types/responses/v3/TvShowSearchResponse';

export type CommonQueryParams<T> = T & {
	api_key: string;
};

export interface ITheMovieDatabaseHandlerV3 {
	/**
	 * Handle a Movie search request.
	 * @see https://developer.themoviedb.org/reference/search-movie
	 */
	handleMovieSearch(search: CommonQueryParams<MovieSearchParams>): Promise<MovieSearchResponse>;
	/**
	 * Handle a movie details request.
	 * @see https://developer.themoviedb.org/reference/movie-details
	 * @param id - Movie ID
	 * @param params - Query params
	 */
	handleMovieDetails(id: number, params: CommonQueryParams<MovieDetailParams>): Promise<MovieDetailResponse>;
	/**
	 * Handle a TV Show search request.
	 * @see https://developer.themoviedb.org/reference/search-tv
	 */
	handleTvShowSearch(search: CommonQueryParams<TvShowSearchParams>): Promise<TvShowSearchResponse>;

	/**
	 * Handle a TY Show details request.
	 * @see https://developer.themoviedb.org/reference/tv-series-details
	 * @param id - Movie ID
	 * @param params - Query params
	 */
	handleTvShowDetails(id: number, params: CommonQueryParams<TvShowDetailParams>): Promise<TvShowDetailResponse>;
}
