import {describe, expect, it} from 'vitest';
import {isErrorV3Response} from '../src/types/responses/v3/ErrorResponse';

describe('isErrorResponse', () => {
	it('should validate error response', () => {
		expect(isErrorV3Response(undefined)).to.be.false;
		expect(isErrorV3Response({success: false, status_code: 7, status_message: 'something'})).to.be.true;
	});
});
