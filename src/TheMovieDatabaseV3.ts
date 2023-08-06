import {CommonQueryParams, ITheMovieDatabaseHandlerV3} from './interfaces/ITheMovieDatabaseHandlerV3';
import {Err, Ok, Result} from 'mharj-result';
import type {ApiErrorV3} from './types/responses/v3/ApiError';
import {defaultV3} from './handlers/defaultV3';
import {Loadable} from './types/Loadable';
import {MovieDetailV3Params} from './types/params/v3/MovieDetailParams';
import {MovieDetailV3Response} from './types/responses/v3/MovieDetailResponse';
import {MovieSearchV3Params} from './types/params/v3/MovieSearchParams';
import {MovieSearchV3Response} from './types/responses/v3/MovieSearchResponse';
import {TvShowDetailV3Params} from './types/params/v3/TvShowDetailParams';
import {TvShowDetailV3Response} from './types/responses/v3/TvShowDetailResponse';
import {TvShowSearchV3Params} from './types/params/v3/TvShowSearchParams';
import {TvShowSearchV3Response} from './types/responses/v3/TvShowSearchResponse';
import {wrapError} from './lib/errorWrapper';

/**
 * TheMovieDatabase API v3 client.
 */
export class TheMovieDatabaseV3 {
	private apiKey: Loadable<string>;
	private handler: ITheMovieDatabaseHandlerV3;
	/**
	 *
	 * @param apiKey - {@link Loadable}  API key (value, promise or function that returns value or promise)
	 * @param handler - optional {@link ITheMovieDatabaseHandlerV3} handler for unit testing
	 * @example
	 * const client = new TheMovieDatabaseV3('api-key');
	 */
	constructor(apiKey: Loadable<string>, handler?: ITheMovieDatabaseHandlerV3) {
		this.handler = handler || defaultV3;
		this.apiKey = apiKey;
	}

	/**
	 * Query the API for movies.
	 *
	 * @param params - search parameters
	 * @returns - search {@link MovieSearchV3Response} Promise {@link Result} on success or {@link ApiErrorV3} | {@link TypeError} | {@link DOMException} on error.
	 * @example
	 * const data = (await client.searchMovies({query: 'The Matrix'})).unwrap(); // data is MovieSearchResponse or throws Error
	 */
	public async searchMovies(params: MovieSearchV3Params): Promise<Result<MovieSearchV3Response, ApiErrorV3 | TypeError | DOMException>> {
		try {
			return Ok(await this.handler.handleMovieSearch(await this.combineParams(params)));
		} catch (err) {
			return Err(wrapError(err));
		}
	}

	/**
	 * Get details for a movie.
	 * @param id - Movie ID
	 * @param params - Query params
	 * @returns - detail {@link MovieDetailV3Response} Promise {@link Result}  on success or {@link ApiErrorV3} | {@link TypeError} | {@link DOMException} on error.
	 * @example
	 * const data = (await client.getMovieDetails(603, {language: 'en'})).unwrap(); // data is MovieDetailResponse or throws Error
	 */
	public async getMovieDetails(id: number, params: MovieDetailV3Params = {}): Promise<Result<MovieDetailV3Response, ApiErrorV3 | TypeError | DOMException>> {
		try {
			return Ok(await this.handler.handleMovieDetails(id, await this.combineParams(params)));
		} catch (err) {
			return Err(wrapError(err));
		}
	}

	/**
	 * Query the API for Tv Shows.
	 *
	 * @param params - search parameters
	 * @returns - search {@link TvShowSearchV3Response} Promise {@link Result} on success or {@link ApiErrorV3} | {@link TypeError} | {@link DOMException} on error.
	 * @example
	 * const data = (await client.searchTvShows({query: 'Ring'})).unwrap(); // data is TvShowSearchResponse or throws Error
	 */
	public async searchTvShows(params: TvShowSearchV3Params): Promise<Result<TvShowSearchV3Response, ApiErrorV3 | TypeError | DOMException>> {
		try {
			return Ok(await this.handler.handleTvShowSearch(await this.combineParams(params)));
		} catch (err) {
			return Err(wrapError(err));
		}
	}

	/**
	 * Get details for a TV Show.
	 * @param id - TV Show ID
	 * @param params - Query params
	 * @returns - detail {@link TvShowDetailV3Response} Promise {@link Result}  on success or {@link ApiErrorV3} | {@link TypeError} | {@link DOMException} on error.
	 * @example
	 * const data = (await client.getTvShowDetails(603, {language: 'en'})).unwrap(); // data is TvShowDetailResponse or throws Error
	 */
	public async getTvShowDetails(id: number, params: TvShowDetailV3Params = {}): Promise<Result<TvShowDetailV3Response, ApiErrorV3 | TypeError | DOMException>> {
		try {
			return Ok(await this.handler.handleTvShowDetails(id, await this.combineParams(params)));
		} catch (err) {
			return Err(wrapError(err));
		}
	}

	private async combineParams<T>(params: T): Promise<CommonQueryParams<T>> {
		return Object.assign({}, params, await this.buildBaseQueryParams());
	}

	private async buildBaseQueryParams(): Promise<CommonQueryParams<unknown>> {
		const apiKey = await (typeof this.apiKey === 'function' ? this.apiKey() : this.apiKey);
		if (typeof apiKey !== 'string') {
			throw new TypeError('API key is not a string');
		}
		return {
			api_key: apiKey,
		};
	}
}
