import {z} from 'zod';

export const errorSchema = z.object({
	success: z.boolean(),
	status_code: z.number(),
	status_message: z.string(),
});

export type ErrorResponse = z.infer<typeof errorSchema>;

export function isErrorResponse(data: unknown): data is ErrorResponse {
	return errorSchema.safeParse(data).success;
}
