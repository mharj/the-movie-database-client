/* eslint-disable @typescript-eslint/require-await */
import * as fs from 'fs';
import {assertMovieDetailResponse, MovieDetailResponse} from '../../src/types/responses/v3/MovieDetailResponse';
import {assertMovieSearchResponse, MovieSearchResponse} from '../../src/types/responses/v3/MovieSearchResponse';
import {assertTvShowDetailResponse, TvShowDetailResponse} from '../../src/types/responses/v3/TvShowDetailResponse';
import {assertTvShowSearchResponse, TvShowSearchResponse} from '../../src/types/responses/v3/TvShowSearchResponse';
import {CommonQueryParams, ITheMovieDatabaseHandlerV3} from '../../src/interfaces/ITheMovieDatabaseHandlerV3';
import {ApiErrorV3} from '../../src/types/responses/v3/ApiError';
import {readCompressedFile} from './fileUtils';
import {TvShowSearchParams} from '../../src/types/params/v3/TvShowSearchParams';

async function loadMovieData() {
	const data: unknown = JSON.parse(await readCompressedFile('./test/data/searchMovies.json.gz'));
	assertMovieSearchResponse(data);
	return data;
}

async function loadTvShowData() {
	const data: unknown = JSON.parse(await readCompressedFile('./test/data/tvShowSearch.json.gz'));
	assertTvShowSearchResponse(data);
	return data;
}

let getMovieDataPromise: Promise<MovieSearchResponse> | undefined;
async function getMovieData() {
	if (!getMovieDataPromise) {
		getMovieDataPromise = loadMovieData();
	}
	return getMovieDataPromise;
}

let getTvShowDataPromise: Promise<TvShowSearchResponse> | undefined;
async function getTvShowData() {
	if (!getTvShowDataPromise) {
		getTvShowDataPromise = loadTvShowData();
	}
	return getTvShowDataPromise;
}

function assertParams(params: CommonQueryParams<unknown>) {
	if (params.api_key === 'undefined') {
		throw new ApiErrorV3('Invalid API key: You must be granted a valid key.', 7);
	}
}

export const unitTestV3Handler: ITheMovieDatabaseHandlerV3 = {
	handleMovieSearch: async (params): Promise<MovieSearchResponse> => {
		assertParams(params);
		return getMovieData();
	},
	handleMovieDetails: async (id, params): Promise<MovieDetailResponse> => {
		assertParams(params);
		const fileName = `./test/data/movie_${id}.json.gz`;
		if (id < 0 || !fs.existsSync(fileName)) {
			throw new ApiErrorV3('The resource you requested could not be found.', 34);
		}
		const data: unknown = JSON.parse(await readCompressedFile(fileName));
		assertMovieDetailResponse(data);
		return data;
	},
	handleTvShowSearch: async (params: CommonQueryParams<TvShowSearchParams>): Promise<TvShowSearchResponse> => {
		assertParams(params);
		return getTvShowData();
	},
	handleTvShowDetails: async (id, params): Promise<TvShowDetailResponse> => {
		assertParams(params);
		const fileName = `./test/data/tv_${id}.json.gz`;
		if (id < 0 || !fs.existsSync(fileName)) {
			throw new ApiErrorV3('The resource you requested could not be found.', 34);
		}
		const data: unknown = JSON.parse(await readCompressedFile(fileName));
		assertTvShowDetailResponse(data);
		return data;
	},
};

// get list of compressed movie file ids from test/data
export function getUnitTestMovieIds(): number[] {
	const files = fs.readdirSync('./test/data');
	const ids: number[] = [];
	for (const file of files) {
		if (file.startsWith('movie_')) {
			const id = parseInt(file.replace('movie_', '').replace('.json.gz', ''), 10);
			if (!isNaN(id)) {
				ids.push(id);
			}
		}
	}
	return ids;
}

// get list of compressed tv show file ids from test/data
export function getUnitTestTvShowIds(): number[] {
	const files = fs.readdirSync('./test/data');
	const ids: number[] = [];
	for (const file of files) {
		if (file.startsWith('tv-')) {
			const id = parseInt(file.replace('tv-', '').replace('.json.gz', ''), 10);
			if (!isNaN(id)) {
				ids.push(id);
			}
		}
	}
	return ids;
}
