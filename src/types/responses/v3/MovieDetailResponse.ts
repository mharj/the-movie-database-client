import {companyV3Schema} from './company';
import {countryV3Schema} from './country';
import {genreV3Schema} from './genre';
import {languageV3Schema} from './language';
import {z} from 'zod';

const collectionV3Schema = z.object({
	backdrop_path: z.string().nullable(),
	id: z.number(),
	name: z.string(),
	poster_path: z.string().nullable(),
});

export const movieDetailV3Schema = z.object({
	adult: z.boolean(),
	backdrop_path: z.string().nullable(),
	belongs_to_collection: collectionV3Schema.nullable(),
	budget: z.number(),
	genres: z.array(genreV3Schema),
	homepage: z.string().nullable(),
	id: z.number(),
	imdb_id: z.string().nullable(),
	original_language: z.string(),
	original_title: z.string(),
	overview: z.string(),
	production_companies: z.array(companyV3Schema),
	production_countries: z.array(countryV3Schema),
	release_date: z.string(),
	revenue: z.number(),
	runtime: z.number().nullable(),
	spoken_languages: z.array(languageV3Schema),
	status: z.string(),
	tag_line: z.string().optional(),
	title: z.string(),
	video: z.boolean(),
	vote_average: z.number(),
	vote_count: z.number(),
});

export type MovieDetailV3Response = z.infer<typeof movieDetailV3Schema>;

/**
 * type guard for MovieDetailResponse
 */
export function isMovieDetailV3Response(data: unknown): data is MovieDetailV3Response {
	return movieDetailV3Schema.safeParse(data).success;
}

/**
 * asserts MovieDetailResponse
 */
export function assertMovieDetailV3Response(data: unknown): asserts data is MovieDetailV3Response {
	movieDetailV3Schema.parse(data);
}

/**
 * asserts MovieDetailResponse only for NODE_ENV === 'test'
 */
export function testAssertMovieDetailV3Response(data: unknown): asserts data is MovieDetailV3Response {
	if (process.env.NODE_ENV === 'test') {
		movieDetailV3Schema.parse(data);
	}
}
