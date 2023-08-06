import {companyV3Schema} from './company';
import {countryV3Schema} from './country';
import {genreV3Schema} from './genre';
import {languageV3Schema} from './language';
import {z} from 'zod';

const createdBy = z.object({
	credit_id: z.string(),
	gender: z.number(),
	id: z.number(),
	name: z.string(),
	profile_path: z.string().nullable(),
});

const seasonSchema = z.object({
	air_date: z.string(),
	episode_count: z.number(),
	id: z.number(),
	name: z.string(),
	overview: z.string(),
	poster_path: z.string().nullable(),
	season_number: z.number(),
	vote_average: z.number(),
});

const lastEpisodeToAir = z.object({
	air_date: z.string(),
	episode_number: z.number(),
	id: z.number(),
	name: z.string(),
	overview: z.string(),
	production_code: z.string().nullable(),
	runtime: z.number(),
	season_number: z.number(),
	show_id: z.number(),
	still_path: z.string().nullable(),
	vote_average: z.number(),
	vote_count: z.number(),
});

export const tvShowDetailV3Schema = z.object({
	adult: z.boolean(),
	backdrop_path: z.string().nullable(),
	created_by: z.array(createdBy),
	episode_run_time: z.array(z.number()),
	first_air_date: z.string(),
	genres: z.array(genreV3Schema),
	homepage: z.string().nullable(),
	id: z.number(),
	in_production: z.boolean(),
	languages: z.array(z.string()),
	last_air_date: z.string(),
	last_episode_to_air: lastEpisodeToAir,
	name: z.string(),
	networks: z.array(companyV3Schema),
	next_episode_to_air: z.string().nullable(),
	number_of_episodes: z.number(),
	number_of_seasons: z.number(),
	origin_country: z.array(z.string()),
	original_language: z.string(),
	original_name: z.string(),
	overview: z.string(),
	popularity: z.number(),
	poster_path: z.string().nullable(),
	production_companies: z.array(companyV3Schema),
	production_countries: z.array(countryV3Schema),
	seasons: z.array(seasonSchema),
	spoken_languages: z.array(languageV3Schema),
	status: z.string(),
	tagline: z.string().nullable(),
	type: z.string(),
	vote_average: z.number(),
	vote_count: z.number(),
});

export type TvShowDetailV3Response = z.infer<typeof tvShowDetailV3Schema>;

export function isTvShowDetailV3Response(data: unknown): data is TvShowDetailV3Response {
	return tvShowDetailV3Schema.safeParse(data).success;
}

export function assertTvShowDetailV3Response(data: unknown, strict = false): asserts data is TvShowDetailV3Response {
	if (strict) {
		tvShowDetailV3Schema.strict().parse(data);
	} else {
		tvShowDetailV3Schema.parse(data);
	}
}

export function testAssertTvShowDetailV3Response(data: unknown, strict = false): asserts data is TvShowDetailV3Response {
	if (process.env.NODE_ENV === 'test') {
		assertTvShowDetailV3Response(data, strict);
	}
}
