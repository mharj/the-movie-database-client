/* eslint-disable import/first */
/* eslint-disable no-unused-expressions */
import 'mocha';
import * as chai from 'chai';
import {assertTvShowSearchResponse, isTvShowSearchResponse, testAssertTvShowSearchResponse} from '../src/types/responses/v3/TvShowSearchResponse';
import {ZodError} from 'zod';

const expect = chai.expect;

describe('TvShowSearchResponse', () => {
	beforeEach(() => {
		process.env.NODE_ENV = 'test';
	});
	it('should validate', () => {
		expect(isTvShowSearchResponse(undefined)).to.be.false;
	});
	it('should assert', () => {
		expect(() => assertTvShowSearchResponse(undefined)).to.throw(ZodError);
		expect(() => testAssertTvShowSearchResponse(undefined)).to.throw(ZodError);
	});
	it('should validate', () => {
		process.env.NODE_ENV = 'production';
		expect(() => testAssertTvShowSearchResponse(undefined)).not.throw();
	});
});
