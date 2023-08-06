import {z} from 'zod';

export const errorV3Schema = z.object({
	success: z.boolean(),
	status_code: z.number(),
	status_message: z.string(),
});

export type ErrorV3Response = z.infer<typeof errorV3Schema>;

export function isErrorV3Response(data: unknown): data is ErrorV3Response {
	return errorV3Schema.safeParse(data).success;
}
