import type {CommonQueryParams, ITheMovieDatabaseHandlerV3} from '../interfaces/ITheMovieDatabaseHandlerV3';
import {isJsonResponse} from '../lib/fetchUtils';
import type {MovieDetailV3Params} from '../types/params/v3/MovieDetailParams';
import type {MovieSearchV3Params} from '../types/params/v3/MovieSearchParams';
import type {TvShowDetailV3Params} from '../types/params/v3/TvShowDetailParams';
import type {TvShowSearchV3Params} from '../types/params/v3/TvShowSearchParams';
import {ApiErrorV3} from '../types/responses/v3/ApiError';
import {isErrorV3Response} from '../types/responses/v3/ErrorResponse';
import {type MovieDetailV3Response, testAssertMovieDetailV3Response} from '../types/responses/v3/MovieDetailResponse';
import {type MovieSearchV3Response, testAssertMovieSearchV3Response} from '../types/responses/v3/MovieSearchResponse';
import {type TvShowDetailV3Response, testAssertTvShowDetailV3Response} from '../types/responses/v3/TvShowDetailResponse';
import {type TvShowSearchV3Response, testAssertTvShowSearchV3Response} from '../types/responses/v3/TvShowSearchResponse';

const baseUrl = 'https://api.themoviedb.org/3';

/**
 * Convert all values in an object to strings.
 */
function objectValuesToString(data: Record<string, string | number | boolean>): Record<string, string> {
	return Object.entries(data).reduce<Record<string, string>>((acc, [key, value]) => {
		acc[key] = String(value);
		return acc;
	}, {});
}

async function handleResponse(res: Response): Promise<unknown> {
	if (!res.ok) {
		if (isJsonResponse(res)) {
			const errData: unknown = await res.json();
			if (isErrorV3Response(errData)) {
				throw new ApiErrorV3(errData.status_message, errData.status_code);
			}
		}
		throw new Error(`Request failed with status ${res.status}`);
	}
	if (!isJsonResponse(res)) {
		throw new Error(`Response is not JSON`);
	}
	return res.json();
}

/**
 * Default fetch handler for the v3 API.
 */
export const defaultV3: ITheMovieDatabaseHandlerV3 = {
	handleMovieDetails: async (id: number, params: CommonQueryParams<MovieDetailV3Params>): Promise<MovieDetailV3Response> => {
		const queryParams = new URLSearchParams(objectValuesToString(params));
		const req = new Request(`${baseUrl}/movie/${id}?${queryParams.toString()}`);
		const res = await fetch(req);
		const data: unknown = await handleResponse(res);
		testAssertMovieDetailV3Response(data);
		return data;
	},
	handleMovieSearch: async (search: CommonQueryParams<MovieSearchV3Params>): Promise<MovieSearchV3Response> => {
		const queryParams = new URLSearchParams(objectValuesToString(search));
		const req = new Request(`${baseUrl}/search/movie?${queryParams.toString()}`);
		const res = await fetch(req);
		const data: unknown = await handleResponse(res);
		testAssertMovieSearchV3Response(data);
		return data;
	},
	handleTvShowDetails: async (id: number, params: CommonQueryParams<TvShowDetailV3Params>): Promise<TvShowDetailV3Response> => {
		const queryParams = new URLSearchParams(objectValuesToString(params));
		const req = new Request(`${baseUrl}/tv/${id}?${queryParams.toString()}`);
		const res = await fetch(req);
		const data: unknown = await handleResponse(res);
		testAssertTvShowDetailV3Response(data);
		return data;
	},
	handleTvShowSearch: async (search: CommonQueryParams<TvShowSearchV3Params>): Promise<TvShowSearchV3Response> => {
		const queryParams = new URLSearchParams(objectValuesToString(search));
		const req = new Request(`${baseUrl}/search/tv?${queryParams.toString()}`);
		const res = await fetch(req);
		const data: unknown = await handleResponse(res);
		testAssertTvShowSearchV3Response(data);
		return data;
	},
};
