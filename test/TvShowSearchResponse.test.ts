/* eslint-disable import/first */
/* eslint-disable no-unused-expressions */
import 'mocha';
import * as chai from 'chai';
import {assertTvShowSearchV3Response, isTvShowSearchV3Response, testAssertTvShowSearchV3Response} from '../src/types/responses/v3/TvShowSearchResponse';
import {ZodError} from 'zod';

const expect = chai.expect;

describe('TvShowSearchV3Response', () => {
	beforeEach(() => {
		process.env.NODE_ENV = 'test';
	});
	it('should validate', () => {
		expect(isTvShowSearchV3Response(undefined)).to.be.false;
	});
	it('should assert', () => {
		expect(() => assertTvShowSearchV3Response(undefined)).to.throw(ZodError);
		expect(() => testAssertTvShowSearchV3Response(undefined)).to.throw(ZodError);
	});
	it('should validate', () => {
		process.env.NODE_ENV = 'production';
		expect(() => testAssertTvShowSearchV3Response(undefined)).not.throw();
	});
});
