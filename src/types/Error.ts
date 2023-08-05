import {ApiErrorV3} from './responses/v3/ApiError';

export type AllErrors = ApiErrorV3 | TypeError | DOMException;
