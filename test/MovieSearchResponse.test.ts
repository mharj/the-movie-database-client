import {beforeEach, describe, expect, it} from 'vitest';
import {ZodError} from 'zod';
import {assertMovieSearchV3Response, isMovieSearchV3Response, testAssertMovieSearchV3Response} from '../src/types/responses/v3/MovieSearchResponse';

describe('MovieSearchV3Response', () => {
	beforeEach(() => {
		process.env.NODE_ENV = 'test';
	});
	it('should validate', () => {
		expect(isMovieSearchV3Response(undefined)).to.be.false;
	});
	it('should assert', () => {
		expect(() => assertMovieSearchV3Response(undefined)).to.throw(ZodError);
		expect(() => testAssertMovieSearchV3Response(undefined)).to.throw(ZodError);
	});
	it('should validate', () => {
		process.env.NODE_ENV = 'production';
		expect(() => testAssertMovieSearchV3Response(undefined)).not.throw();
	});
});
