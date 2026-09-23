import {beforeEach, describe, expect, it} from 'vitest';
import {ZodError} from 'zod';
import {assertMovieDetailV3Response, isMovieDetailV3Response, testAssertMovieDetailV3Response} from '../src/types/responses/v3/MovieDetailResponse';

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
