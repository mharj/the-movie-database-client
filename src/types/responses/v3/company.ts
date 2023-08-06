import {z} from 'zod';

export const companyV3Schema = z.object({
	id: z.number(),
	logo_path: z.string().nullable(),
	name: z.string(),
	origin_country: z.string(),
});
