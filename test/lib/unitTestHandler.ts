/* eslint-disable @typescript-eslint/require-await */
import * as fs from 'fs';
import {assertMovieDetailV3Response, MovieDetailV3Response} from '../../src/types/responses/v3/MovieDetailResponse';
import {assertMovieSearchV3Response, MovieSearchV3Response} from '../../src/types/responses/v3/MovieSearchResponse';
import {assertTvShowDetailV3Response, TvShowDetailV3Response} from '../../src/types/responses/v3/TvShowDetailResponse';
import {assertTvShowSearchV3Response, TvShowSearchV3Response} from '../../src/types/responses/v3/TvShowSearchResponse';
import {CommonQueryParams, ITheMovieDatabaseHandlerV3} from '../../src/interfaces/ITheMovieDatabaseHandlerV3';
import {ApiErrorV3} from '../../src/types/responses/v3/ApiError';
import {readCompressedFile} from './fileUtils';
import {TvShowSearchV3Params} from '../../src/types/params/v3/TvShowSearchParams';

async function loadMovieData() {
	const data: unknown = JSON.parse(await readCompressedFile('./test/data/searchMovies.json.gz'));
	assertMovieSearchV3Response(data);
	return data;
}

async function loadTvShowData() {
	const data: unknown = JSON.parse(await readCompressedFile('./test/data/tvShowSearch.json.gz'));
	assertTvShowSearchV3Response(data);
	return data;
}

let getMovieDataPromise: Promise<MovieSearchV3Response> | undefined;
async function getMovieData() {
	if (!getMovieDataPromise) {
		getMovieDataPromise = loadMovieData();
	}
	return getMovieDataPromise;
}

let getTvShowDataPromise: Promise<TvShowSearchV3Response> | undefined;
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
	handleMovieDetails: async (id, params): Promise<MovieDetailV3Response> => {
		assertParams(params);
		const fileName = `./test/data/movie_${id}.json.gz`;
		if (id < 0 || !fs.existsSync(fileName)) {
			throw new ApiErrorV3('The resource you requested could not be found.', 34);
		}
		const data: unknown = JSON.parse(await readCompressedFile(fileName));
		assertMovieDetailV3Response(data);
		return data;
	},
	handleMovieSearch: async (params): Promise<MovieSearchV3Response> => {
		assertParams(params);
		return getMovieData();
	},
	handleTvShowDetails: async (id, params): Promise<TvShowDetailV3Response> => {
		assertParams(params);
		const fileName = `./test/data/tv_${id}.json.gz`;
		if (id < 0 || !fs.existsSync(fileName)) {
			throw new ApiErrorV3('The resource you requested could not be found.', 34);
		}
		const data: unknown = JSON.parse(await readCompressedFile(fileName));
		assertTvShowDetailV3Response(data);
		return data;
	},
	handleTvShowSearch: async (params: CommonQueryParams<TvShowSearchV3Params>): Promise<TvShowSearchV3Response> => {
		assertParams(params);
		return getTvShowData();
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
