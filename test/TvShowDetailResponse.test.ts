import {beforeEach, describe, expect, it} from 'vitest';
import {ZodError} from 'zod';
import {assertTvShowDetailV3Response, isTvShowDetailV3Response, testAssertTvShowDetailV3Response} from '../src/types/responses/v3/TvShowDetailResponse';

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
