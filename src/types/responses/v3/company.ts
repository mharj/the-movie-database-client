import {z} from 'zod';

export const companySchema = z.object({
	id: z.number(),
	logo_path: z.string().nullable(),
	name: z.string(),
	origin_country: z.string(),
});
