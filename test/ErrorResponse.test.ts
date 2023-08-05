/* eslint-disable no-unused-expressions */
import 'mocha';
import * as chai from 'chai';
import {isErrorResponse} from '../src/types/responses/v3/ErrorResponse';

const expect = chai.expect;

describe('isErrorResponse', () => {
	it('should validate error response', () => {
		expect(isErrorResponse(undefined)).to.be.false;
		expect(isErrorResponse({success: false, status_code: 7, status_message: 'something'})).to.be.true;
	});
});
