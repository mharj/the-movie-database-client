import {describe, expect, it} from 'vitest';
import {wrapError} from '../src/lib/errorWrapper';
import {ApiErrorV3} from '../src/types/responses/v3/ApiError';

describe('wrapError', () => {
	it('should be valid error value', () => {
		expect(wrapError('test')).to.be.eql(new TypeError('Unknown error: test'));
		expect(wrapError(new TypeError('test'))).to.be.eql(new TypeError('test'));
		expect(wrapError(new ApiErrorV3('test', 5))).to.be.eql(new ApiErrorV3('test', 5));
		expect(wrapError(new DOMException('test'))).to.be.eql(new DOMException('test'));
	});
});
