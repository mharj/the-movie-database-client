/* eslint-disable import/first */
/* eslint-disable no-unused-expressions */
import 'mocha';
import * as chai from 'chai';
import {assertMovieDetailV3Response, isMovieDetailV3Response, testAssertMovieDetailV3Response} from '../src/types/responses/v3/MovieDetailResponse';
import {ZodError} from 'zod';

const expect = chai.expect;

describe('MovieDetailResponse', () => {
	beforeEach(() => {
		process.env.NODE_ENV = 'test';
	});
	it('should validate', () => {
		expect(isMovieDetailV3Response(undefined)).to.be.false;
	});
	it('should assert', () => {
		expect(() => assertMovieDetailV3Response(undefined)).to.throw(ZodError);
		expect(() => testAssertMovieDetailV3Response(undefined)).to.throw(ZodError);
	});
	it('should validate', () => {
		process.env.NODE_ENV = 'production';
		expect(() => testAssertMovieDetailV3Response(undefined)).not.throw();
	});
});
