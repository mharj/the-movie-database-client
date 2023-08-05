/* eslint-disable import/first */
/* eslint-disable no-unused-expressions */
import 'mocha';
import * as chai from 'chai';
import {assertMovieSearchResponse, isMovieSearchResponse, testAssertMovieSearchResponse} from '../src/types/responses/v3/MovieSearchResponse';
import {ZodError} from 'zod';

const expect = chai.expect;

describe('MovieSearchResponse', () => {
	beforeEach(() => {
		process.env.NODE_ENV = 'test';
	});
	it('should validate', () => {
		expect(isMovieSearchResponse(undefined)).to.be.false;
	});
	it('should assert', () => {
		expect(() => assertMovieSearchResponse(undefined)).to.throw(ZodError);
		expect(() => testAssertMovieSearchResponse(undefined)).to.throw(ZodError);
	});
	it('should validate', () => {
		process.env.NODE_ENV = 'production';
		expect(() => testAssertMovieSearchResponse(undefined)).not.throw();
	});
});
