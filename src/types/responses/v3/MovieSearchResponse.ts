import {z} from 'zod';

const movieSearchResultSchema = z.object({
	adult: z.boolean(),
	backdrop_path: z.string().nullable(),
	genre_ids: z.array(z.number()),
	id: z.number(),
	original_language: z.string(),
	original_title: z.string(),
	overview: z.string(),
	popularity: z.number(),
	poster_path: z.string().nullable(),
	release_date: z.string(),
	title: z.string(),
	video: z.boolean(),
	vote_average: z.number(),
	vote_count: z.number(),
});

export const movieSearchResponseSchema = z.object({
	page: z.number(),
	results: z.array(movieSearchResultSchema),
	total_pages: z.number(),
	total_results: z.number(),
});

export type MovieSearchResponse = z.infer<typeof movieSearchResponseSchema>;

/**
 * Type guard for MovieSearchResponse
 */
export function isMovieSearchResponse(data: unknown): data is MovieSearchResponse {
	return movieSearchResponseSchema.safeParse(data).success;
}

/**
 * asserts MovieSearchResponse
 */
export function assertMovieSearchResponse(data: unknown): asserts data is MovieSearchResponse {
	movieSearchResponseSchema.parse(data);
}

/**
 * asserts MovieSearchResponse only for NODE_ENV === 'test'
 */
export function testAssertMovieSearchResponse(data: unknown): asserts data is MovieSearchResponse {
	if (process.env.NODE_ENV === 'test') {
		movieSearchResponseSchema.parse(data);
	}
}
