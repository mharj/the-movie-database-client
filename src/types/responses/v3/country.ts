import {z} from 'zod';

export const countryV3Schema = z.object({
	iso_3166_1: z.string(),
	name: z.string(),
});
