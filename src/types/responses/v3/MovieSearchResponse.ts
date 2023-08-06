import {z} from 'zod';

const movieSearchResultV3Schema = z.object({
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

export const movieSearchResponseV3Schema = z.object({
	page: z.number(),
	results: z.array(movieSearchResultV3Schema),
	total_pages: z.number(),
	total_results: z.number(),
});

export type MovieSearchV3Response = z.infer<typeof movieSearchResponseV3Schema>;

/**
 * Type guard for MovieSearchResponse
 */
export function isMovieSearchV3Response(data: unknown): data is MovieSearchV3Response {
	return movieSearchResponseV3Schema.safeParse(data).success;
}

/**
 * asserts MovieSearchResponse
 */
export function assertMovieSearchV3Response(data: unknown): asserts data is MovieSearchV3Response {
	movieSearchResponseV3Schema.parse(data);
}

/**
 * asserts MovieSearchResponse only for NODE_ENV === 'test'
 */
export function testAssertMovieSearchV3Response(data: unknown): asserts data is MovieSearchV3Response {
	if (process.env.NODE_ENV === 'test') {
		movieSearchResponseV3Schema.parse(data);
	}
}
