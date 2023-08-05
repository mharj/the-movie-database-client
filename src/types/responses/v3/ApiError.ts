export class ApiErrorV3 extends Error {
	public readonly code: number;
	constructor(message: string, code: number) {
		super(message);
		this.name = 'ApiErrorV3';
		this.code = code;
		Error.captureStackTrace(this, this.constructor);
	}
}
