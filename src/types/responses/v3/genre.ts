import {z} from 'zod';

export const genreV3Schema = z.object({
	id: z.number(),
	name: z.string(),
});
