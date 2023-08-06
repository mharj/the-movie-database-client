/* eslint-disable import/first */
/* eslint-disable no-unused-expressions */
import 'mocha';
import * as chai from 'chai';
import {assertTvShowDetailResponse, isTvShowDetailResponse, testAssertTvShowDetailResponse} from '../src/types/responses/v3/TvShowDetailResponse';
import {ZodError} from 'zod';

const expect = chai.expect;

describe('MovieDetailResponse', () => {
	beforeEach(() => {
		process.env.NODE_ENV = 'test';
	});
	it('should validate', () => {
		expect(isTvShowDetailResponse(undefined)).to.be.false;
	});
	it('should assert', () => {
		expect(() => assertTvShowDetailResponse(undefined)).to.throw(ZodError);
		expect(() => testAssertTvShowDetailResponse(undefined)).to.throw(ZodError);
	});
	it('should validate', () => {
		process.env.NODE_ENV = 'production';
		expect(() => testAssertTvShowDetailResponse(undefined)).not.throw();
	});
});
