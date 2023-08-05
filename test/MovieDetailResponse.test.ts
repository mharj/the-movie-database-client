/* eslint-disable import/first */
/* eslint-disable no-unused-expressions */
import 'mocha';
import * as chai from 'chai';
import {assertMovieDetailResponse, isMovieDetailResponse, testAssertMovieDetailResponse} from '../src/types/responses/v3/MovieDetailResponse';
import {ZodError} from 'zod';

const expect = chai.expect;

describe('MovieDetailResponse', () => {
	beforeEach(() => {
		process.env.NODE_ENV = 'test';
	});
	it('should validate', () => {
		expect(isMovieDetailResponse(undefined)).to.be.false;
	});
	it('should assert', () => {
		expect(() => assertMovieDetailResponse(undefined)).to.throw(ZodError);
		expect(() => testAssertMovieDetailResponse(undefined)).to.throw(ZodError);
	});
	it('should validate', () => {
		process.env.NODE_ENV = 'production';
		expect(() => testAssertMovieDetailResponse(undefined)).not.throw();
	});
});
