import {z} from 'zod';

export const countrySchema = z.object({
	iso_3166_1: z.string(),
	name: z.string(),
});
