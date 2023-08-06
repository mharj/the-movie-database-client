/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable import/first */
process.env.NODE_ENV = 'test';
import 'mocha';
import * as chai from 'chai';
import * as dotenv from 'dotenv';
import * as util from 'util';
import {getUnitTestMovieIds, getUnitTestTvShowIds, unitTestV3Handler} from './lib/unitTestHandler';
import {ApiErrorV3} from '../src/types/responses/v3/ApiError';
import {assertMovieDetailV3Response} from '../src/types/responses/v3/MovieDetailResponse';
import {assertMovieSearchV3Response} from '../src/types/responses/v3/MovieSearchResponse';
import {assertTvShowDetailV3Response} from '../src/types/responses/v3/TvShowDetailResponse';
import {assertTvShowSearchV3Response} from '../src/types/responses/v3/TvShowSearchResponse';
import {TheMovieDatabaseV3} from '../src/';

let apiKey = process.env.THE_MOVIE_DB_API_KEY || 'secret';

function getApiKey(): string {
	return apiKey;
}

function setApiKey(key: string): void {
	apiKey = key;
}

export function log(obj: unknown): void {
	console.log(util.inspect(obj, false, null, true));
}

const expect = chai.expect;

dotenv.config();

const idList = getUnitTestMovieIds();

const client: TheMovieDatabaseV3 = new TheMovieDatabaseV3(getApiKey, unitTestV3Handler);

export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// random id builder with max value
export function randomId(max: number): number {
	return Math.floor(Math.random() * max);
}

// function to build array of random ids and count
export function randomIds(max: number, count: number): number[] {
	const ids: number[] = [];
	for (let i = 0; i < count; i++) {
		ids.push(randomId(max));
	}
	return ids;
}

const tvIdList = getUnitTestTvShowIds();

describe('Api V3', () => {
	beforeEach(() => {
		setApiKey(process.env.THE_MOVIE_DB_API_KEY || 'secret');
	});
	describe('movie search', () => {
		it('should return list', async () => {
			const data = (await client.searchMovies({query: 'James Bond'})).unwrap();
			assertMovieSearchV3Response(data, true);
		});
		it('should fail if not valid api key', async () => {
			setApiKey('undefined');
			const res = await client.searchMovies({query: 'James Bond'});
			expect(() => res.unwrap()).to.throw(ApiErrorV3, 'Invalid API key: You must be granted a valid key.');
			expect(res.err()).to.be.instanceOf(ApiErrorV3).and.have.property('code', 7);
		});
	});
	describe('movie details', () => {
		idList.forEach((id) => {
			it(`should get movie defails for id ${id}`, async function () {
				const res = await client.getMovieDetails(id);
				if (res.isErr) {
					expect(() => res.unwrap()).to.throw(ApiErrorV3, 'The resource you requested could not be found.');
				} else {
					const data = res.ok();
					assertMovieDetailV3Response(data, true);
				}
			});
		});
		it('should not get not existing movie', async () => {
			const res = await client.getMovieDetails(-1);
			expect(() => res.unwrap()).to.throw(ApiErrorV3, 'The resource you requested could not be found.');
		});
		it('should fail if not valid api key', async () => {
			setApiKey('undefined');
			const res = await client.getMovieDetails(-1);
			expect(() => res.unwrap()).to.throw(ApiErrorV3, 'Invalid API key: You must be granted a valid key.');
			expect(res.err()).to.be.instanceOf(ApiErrorV3).and.have.property('code', 7);
		});
		it('should fail if not valid api key type', async () => {
			setApiKey({} as string);
			const res = await client.getMovieDetails(-1);
			expect(() => res.unwrap()).to.throw(TypeError, 'API key is not a string');
		});
	});
	describe('TV Show search', () => {
		it('should return list', async () => {
			const data = (await client.searchTvShows({query: 'Ring'})).unwrap();
			assertTvShowSearchV3Response(data, true);
		});
		it('should fail if not valid api key', async () => {
			setApiKey('undefined');
			const res = await client.searchTvShows({query: 'Ring'});
			expect(() => res.unwrap()).to.throw(ApiErrorV3, 'Invalid API key: You must be granted a valid key.');
			expect(res.err()).to.be.instanceOf(ApiErrorV3).and.have.property('code', 7);
		});
	});
	describe('TV Show details', () => {
		tvIdList.forEach((id) => {
			it(`should get defails for id ${id}`, async function () {
				const res = await client.getTvShowDetails(id);
				if (res.isErr) {
					expect(() => res.unwrap()).to.throw(ApiErrorV3, 'The resource you requested could not be found.');
				} else {
					const data = res.ok();
					assertTvShowDetailV3Response(data, true);
				}
			});
		});
		it('should not get not existing', async () => {
			const res = await client.getTvShowDetails(-1);
			expect(() => res.unwrap()).to.throw(ApiErrorV3, 'The resource you requested could not be found.');
		});
		it('should fail if not valid api key', async () => {
			setApiKey('undefined');
			const res = await client.getTvShowDetails(-1);
			expect(() => res.unwrap()).to.throw(ApiErrorV3, 'Invalid API key: You must be granted a valid key.');
			expect(res.err()).to.be.instanceOf(ApiErrorV3).and.have.property('code', 7);
		});
		it('should fail if not valid api key type', async () => {
			setApiKey({} as string);
			const res = await client.getMovieDetails(-1);
			expect(() => res.unwrap()).to.throw(TypeError, 'API key is not a string');
		});
	});
});
