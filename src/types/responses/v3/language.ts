import {z} from 'zod';

export const languageV3Schema = z.object({
	english_name: z.string(),
	iso_639_1: z.string(),
	name: z.string(),
});
