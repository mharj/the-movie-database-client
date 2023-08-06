export type MovieSearchV3Params = {
	query: string;
	include_adult?: boolean;
	language?: string;
	primary_release_year?: number;
	page?: number;
	region?: string;
	year?: string;
};
