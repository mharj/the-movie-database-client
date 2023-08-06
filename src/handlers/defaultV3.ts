// istanbul ignore file
import {CommonQueryParams, ITheMovieDatabaseHandlerV3} from '../interfaces/ITheMovieDatabaseHandlerV3';
import {MovieDetailResponse, testAssertMovieDetailResponse} from '../types/responses/v3/MovieDetailResponse';
import {MovieSearchResponse, testAssertMovieSearchResponse} from '../types/responses/v3/MovieSearchResponse';
import {testAssertTvShowDetailResponse, TvShowDetailResponse} from '../types/responses/v3/TvShowDetailResponse';
import {testAssertTvShowSearchResponse, TvShowSearchResponse} from '../types/responses/v3/TvShowSearchResponse';
import {ApiErrorV3} from '../types/responses/v3/ApiError';
import {isErrorResponse} from '../types/responses/v3/ErrorResponse';
import {isJsonResponse} from '../lib/fetchUtils';
import {MovieDetailParams} from '../types/params/v3/MovieDetailParams';
import {MovieSearchParams} from '../types/params/v3/MovieSearchParams';
import {TvShowDetailParams} from '../types/params/v3/TvShowDetailParams';
import {TvShowSearchParams} from '../types/params/v3/TvShowSearchParams';

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
			if (isErrorResponse(errData)) {
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
	handleMovieDetails: async (id: number, params: CommonQueryParams<MovieDetailParams>): Promise<MovieDetailResponse> => {
		const queryParams = new URLSearchParams(objectValuesToString(params));
		const req = new Request(`${baseUrl}/movie/${id}?${queryParams.toString()}`);
		const res = await fetch(req);
		const data: unknown = await handleResponse(res);
		testAssertMovieDetailResponse(data);
		return data;
	},
	handleMovieSearch: async (search: CommonQueryParams<MovieSearchParams>): Promise<MovieSearchResponse> => {
		const queryParams = new URLSearchParams(objectValuesToString(search));
		const req = new Request(`${baseUrl}/search/movie?${queryParams.toString()}`);
		const res = await fetch(req);
		const data: unknown = await handleResponse(res);
		testAssertMovieSearchResponse(data);
		return data;
	},
	handleTvShowDetails: async (id: number, params: CommonQueryParams<TvShowDetailParams>): Promise<TvShowDetailResponse> => {
		const queryParams = new URLSearchParams(objectValuesToString(params));
		const req = new Request(`${baseUrl}/tv/${id}?${queryParams.toString()}`);
		const res = await fetch(req);
		const data: unknown = await handleResponse(res);
		testAssertTvShowDetailResponse(data);
		return data;
	},
	handleTvShowSearch: async (search: CommonQueryParams<TvShowSearchParams>): Promise<TvShowSearchResponse> => {
		const queryParams = new URLSearchParams(objectValuesToString(search));
		const req = new Request(`${baseUrl}/search/tv?${queryParams.toString()}`);
		const res = await fetch(req);
		const data: unknown = await handleResponse(res);
		testAssertTvShowSearchResponse(data);
		return data;
	},
};
