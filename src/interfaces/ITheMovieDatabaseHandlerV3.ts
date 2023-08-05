import {MovieDetailParams} from '../types/params/v3/MovieDetailParams';
import {MovieDetailResponse} from '../types/responses/v3/MovieDetailResponse';
import {MovieSearchParams} from '../types/params/v3/MovieSearchParams';
import {MovieSearchResponse} from '../types/responses/v3/MovieSearchResponse';

export type CommonQueryParams<T> = T & {
	api_key: string;
};

export interface ITheMovieDatabaseHandlerV3 {
	/**
	 * Handle a search request.
	 * @see https://developer.themoviedb.org/reference/search-movie
	 */
	handleSearch(search: CommonQueryParams<MovieSearchParams>): Promise<MovieSearchResponse>;
	/**
	 * Handle a movie details request.
	 * @see https://developer.themoviedb.org/reference/movie-details
	 * @param id - Movie ID
	 * @param params - Query params
	 */
	handleMovieDetails(id: number, params: CommonQueryParams<MovieDetailParams>): Promise<MovieDetailResponse>;
}
