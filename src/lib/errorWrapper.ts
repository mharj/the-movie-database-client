import {AllErrors} from '../types/Error';
import {ApiErrorV3} from '../types/responses/v3/ApiError';

export function wrapError(err: unknown): AllErrors {
	if (err instanceof TypeError) {
		return err;
	}
	if (err instanceof DOMException) {
		return err;
	}
	if (err instanceof ApiErrorV3) {
		return err;
	}
	return new TypeError(`Unknown error: ${String(err)}`);
}
