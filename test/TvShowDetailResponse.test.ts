/* eslint-disable import/first */
/* eslint-disable no-unused-expressions */
import 'mocha';
import * as chai from 'chai';
import {assertTvShowDetailV3Response, isTvShowDetailV3Response, testAssertTvShowDetailV3Response} from '../src/types/responses/v3/TvShowDetailResponse';
import {ZodError} from 'zod';

const expect = chai.expect;

describe('MovieDetailV3Response', () => {
	beforeEach(() => {
		process.env.NODE_ENV = 'test';
	});
	it('should validate', () => {
		expect(isTvShowDetailV3Response(undefined)).to.be.false;
	});
	it('should assert', () => {
		expect(() => assertTvShowDetailV3Response(undefined)).to.throw(ZodError);
		expect(() => testAssertTvShowDetailV3Response(undefined)).to.throw(ZodError);
	});
	it('should validate', () => {
		process.env.NODE_ENV = 'production';
		expect(() => testAssertTvShowDetailV3Response(undefined)).not.throw();
	});
});
