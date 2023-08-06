/* eslint-disable no-unused-expressions */
import 'mocha';
import * as chai from 'chai';
import {isErrorV3Response} from '../src/types/responses/v3/ErrorResponse';

const expect = chai.expect;

describe('isErrorResponse', () => {
	it('should validate error response', () => {
		expect(isErrorV3Response(undefined)).to.be.false;
		expect(isErrorV3Response({success: false, status_code: 7, status_message: 'something'})).to.be.true;
	});
});
