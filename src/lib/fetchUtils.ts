/**
 * Is the response a JSON response?
 */
export function isJsonResponse(response: Response): boolean {
	const contentType = response.headers.get('content-type');
	return (contentType && contentType.startsWith('application/json')) || false;
}
