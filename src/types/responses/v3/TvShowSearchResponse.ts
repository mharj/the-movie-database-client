import {z} from 'zod';

const tvShowSearchResultSchema = z.object({
	adult: z.boolean(),
	backdrop_path: z.string().nullable(),
	first_air_date: z.string().optional(),
	id: z.number(),
	name: z.string().optional(),
	origin_country: z.array(z.string()).optional(),
	original_language: z.string(),
	original_name: z.string().optional(),
	overview: z.string(),
	popularity: z.number(),
	poster_path: z.string().nullable(),
	vote_average: z.number(),
	vote_count: z.number(),
});

export const tvShowSearchResponseSchema = z.object({
	page: z.number(),
	results: z.array(tvShowSearchResultSchema),
	total_pages: z.number(),
	total_results: z.number(),
});

export type TvShowSearchResponse = z.infer<typeof tvShowSearchResponseSchema>;

export function isTvShowSearchResponse(data: unknown): data is TvShowSearchResponse {
	return tvShowSearchResponseSchema.safeParse(data).success;
}

export function assertTvShowSearchResponse(data: unknown): asserts data is TvShowSearchResponse {
	tvShowSearchResponseSchema.parse(data);
}

export function testAssertTvShowSearchResponse(data: unknown): asserts data is TvShowSearchResponse {
	if (process.env.NODE_ENV === 'test') {
		tvShowSearchResponseSchema.parse(data);
	}
}
