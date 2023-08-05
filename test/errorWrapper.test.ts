import 'mocha';
import * as chai from 'chai';
import {ApiErrorV3} from '../src/types/responses/v3/ApiError';
import {wrapError} from '../src/lib/errorWrapper';

const expect = chai.expect;

describe('wrapError', () => {
	it('should be valid error value', () => {
		expect(wrapError('test')).to.be.eql(new TypeError('Unknown error: test'));
		expect(wrapError(new TypeError('test'))).to.be.eql(new TypeError('test'));
		expect(wrapError(new ApiErrorV3('test', 5))).to.be.eql(new ApiErrorV3('test', 5));
		expect(wrapError(new DOMException('test'))).to.be.eql(new DOMException('test'));
	});
});
