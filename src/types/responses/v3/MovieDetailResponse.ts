import {z} from 'zod';

const genreSchema = z.object({
	id: z.number(),
	name: z.string(),
});

const productionCompanySchema = z.object({
	id: z.number(),
	logo_path: z.string().nullable(),
	name: z.string(),
	origin_country: z.string(),
});

const productionCountrySchema = z.object({
	iso_3166_1: z.string(),
	name: z.string(),
});

const languageSchema = z.object({
	english_name: z.string(),
	iso_639_1: z.string(),
	name: z.string(),
});

const collectionSchema = z.object({
	backdrop_path: z.string().nullable(),
	id: z.number(),
	name: z.string(),
	poster_path: z.string().nullable(),
});

export const movieDetailSchema = z.object({
	adult: z.boolean(),
	backdrop_path: z.string().nullable(),
	belongs_to_collection: collectionSchema.nullable(),
	budget: z.number(),
	genres: z.array(genreSchema),
	homepage: z.string().nullable(),
	id: z.number(),
	imdb_id: z.string().nullable(),
	original_language: z.string(),
	original_title: z.string(),
	overview: z.string(),
	production_companies: z.array(productionCompanySchema),
	production_countries: z.array(productionCountrySchema),
	release_date: z.string(),
	revenue: z.number(),
	runtime: z.number().nullable(),
	spoken_languages: z.array(languageSchema),
	status: z.string(),
	tag_line: z.string().optional(),
	title: z.string(),
	video: z.boolean(),
	vote_average: z.number(),
	vote_count: z.number(),
});

export type MovieDetailResponse = z.infer<typeof movieDetailSchema>;

/**
 * type guard for MovieDetailResponse
 */
export function isMovieDetailResponse(data: unknown): data is MovieDetailResponse {
	return movieDetailSchema.safeParse(data).success;
}

/**
 * asserts MovieDetailResponse
 */
export function assertMovieDetailResponse(data: unknown): asserts data is MovieDetailResponse {
	movieDetailSchema.parse(data);
}

/**
 * asserts MovieDetailResponse only for NODE_ENV === 'test'
 */
export function testAssertMovieDetailResponse(data: unknown): asserts data is MovieDetailResponse {
	if (process.env.NODE_ENV === 'test') {
		movieDetailSchema.parse(data);
	}
}
