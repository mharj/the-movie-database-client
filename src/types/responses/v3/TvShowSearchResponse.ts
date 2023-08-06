import {z} from 'zod';

const tvShowSearchResultV3Schema = z.object({
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

export const tvShowSearchResponseV3Schema = z.object({
	page: z.number(),
	results: z.array(tvShowSearchResultV3Schema),
	total_pages: z.number(),
	total_results: z.number(),
});

export type TvShowSearchV3Response = z.infer<typeof tvShowSearchResponseV3Schema>;

export function isTvShowSearchV3Response(data: unknown): data is TvShowSearchV3Response {
	return tvShowSearchResponseV3Schema.safeParse(data).success;
}

export function assertTvShowSearchV3Response(data: unknown, strict = false): asserts data is TvShowSearchV3Response {
	tvShowSearchResponseV3Schema.parse(data);
	if (strict) {
		tvShowSearchResponseV3Schema.strict().parse(data);
	} else {
		tvShowSearchResponseV3Schema.parse(data);
	}
}

export function testAssertTvShowSearchV3Response(data: unknown, strict = false): asserts data is TvShowSearchV3Response {
	if (process.env.NODE_ENV === 'test') {
		assertTvShowSearchV3Response(data, strict);
	}
}
