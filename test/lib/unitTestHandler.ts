/* eslint-disable @typescript-eslint/require-await */
import * as fs from 'fs';
import {assertMovieDetailResponse, MovieDetailResponse} from '../../src/types/responses/v3/MovieDetailResponse';
import {assertMovieSearchResponse, MovieSearchResponse} from '../../src/types/responses/v3/MovieSearchResponse';
import {CommonQueryParams, ITheMovieDatabaseHandlerV3} from '../../src/interfaces/ITheMovieDatabaseHandlerV3';
import {ApiErrorV3} from '../../src/types/responses/v3/ApiError';
import {readCompressedFile} from './fileUtils';

async function loadData() {
	const data: unknown = JSON.parse(await readCompressedFile('./test/data/searchMovies.json.gz'));
	assertMovieSearchResponse(data);
	return data;
}

let getDataPromise: Promise<MovieSearchResponse> | undefined;
async function getData() {
	if (!getDataPromise) {
		getDataPromise = loadData();
	}
	return getDataPromise;
}

function assertParams(params: CommonQueryParams<unknown>) {
	if (params.api_key === 'undefined') {
		throw new ApiErrorV3('Invalid API key: You must be granted a valid key.', 7);
	}
}

export const unitTestV3Handler: ITheMovieDatabaseHandlerV3 = {
	handleSearch: async (params): Promise<MovieSearchResponse> => {
		assertParams(params);
		return getData();
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
