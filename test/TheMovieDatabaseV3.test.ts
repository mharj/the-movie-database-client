/* eslint-disable import/first */
process.env.NODE_ENV = 'test';
import 'mocha';
import * as chai from 'chai';
import * as dotenv from 'dotenv';
import * as util from 'util';
import {getUnitTestMovieIds, unitTestV3Handler} from './lib/unitTestHandler';
import {ApiErrorV3} from '../src/types/responses/v3/ApiError';
import {assertMovieDetailResponse} from '../src/types/responses/v3/MovieDetailResponse';
import {assertMovieSearchResponse} from '../src/types/responses/v3/MovieSearchResponse';
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

describe('Api V3', () => {
	beforeEach(() => {
		setApiKey(process.env.THE_MOVIE_DB_API_KEY || 'secret');
	});
	describe('movie search', () => {
		it('should return list of movies', async () => {
			const data = (await client.searchMovies({query: 'James Bond'})).unwrap();
			assertMovieSearchResponse(data);
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
					assertMovieDetailResponse(data);
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
});
