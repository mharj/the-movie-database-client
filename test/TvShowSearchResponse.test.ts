import {beforeEach, describe, expect, it} from 'vitest';
import {ZodError} from 'zod';
import {assertTvShowSearchV3Response, isTvShowSearchV3Response, testAssertTvShowSearchV3Response} from '../src/types/responses/v3/TvShowSearchResponse';

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
