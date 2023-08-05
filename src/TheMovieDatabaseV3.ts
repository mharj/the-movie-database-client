import {CommonQueryParams, ITheMovieDatabaseHandlerV3} from './interfaces/ITheMovieDatabaseHandlerV3';
import {Err, Ok, Result} from 'mharj-result';
import type {ApiErrorV3} from './types/responses/v3/ApiError';
import {defaultV3} from './handlers/defaultV3';
import {Loadable} from './types/Loadable';
import {MovieDetailParams} from './types/params/v3/MovieDetailParams';
import {MovieDetailResponse} from './types/responses/v3/MovieDetailResponse';
import {MovieSearchParams} from './types/params/v3/MovieSearchParams';
import {MovieSearchResponse} from './types/responses/v3/MovieSearchResponse';
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
	 * @returns - search {@link MovieSearchResponse} Promise {@link Result} on success or {@link ApiErrorV3} | {@link TypeError} | {@link DOMException} on error.
	 * @example
	 * const data = (await client.searchMovies({query: 'The Matrix'})).unwrap(); // data is MovieSearchResponse or throws Error
	 */
	public async searchMovies(params: MovieSearchParams): Promise<Result<MovieSearchResponse, ApiErrorV3 | TypeError | DOMException>> {
		try {
			return Ok(await this.handler.handleSearch(await this.combineParams(params)));
		} catch (err) {
			return Err(wrapError(err));
		}
	}

	/**
	 * Get details for a movie.
	 * {import("path/to/UiStore").UiStore}
	 * @param id - Movie ID
	 * @param params - Query params
	 * @returns - detail {@link MovieDetailResponse} Promise {@link Result}  on success or {@link ApiErrorV3} | {@link TypeError} | {@link DOMException} on error.
	 * @example
	 * const data = (await client.getMovieDetails(603, {language: 'en'})).unwrap(); // data is MovieDetailResponse or throws Error
	 */
	public async getMovieDetails(id: number, params: MovieDetailParams = {}): Promise<Result<MovieDetailResponse, ApiErrorV3 | TypeError | DOMException>> {
		try {
			return Ok(await this.handler.handleMovieDetails(id, await this.combineParams(params)));
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