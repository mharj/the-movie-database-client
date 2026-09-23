import {describe, expect, it} from 'vitest';
import {isJsonResponse} from '../src/lib/fetchUtils';

const jsonResponse = new Response(JSON.stringify({}), {
	status: 200,
	headers: {
		'content-type': 'application/json',
	},
});

const textResponse = new Response('', {
	status: 200,
	headers: {
		'content-type': 'text/plain',
	},
});

describe('fetchUtils', () => {
	it('should validate json responses', () => {
		expect(isJsonResponse(jsonResponse)).to.be.true;
		expect(isJsonResponse(textResponse)).to.be.false;
	});
});
