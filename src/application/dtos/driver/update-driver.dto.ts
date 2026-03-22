import { z } from 'zod';

export const updateDriverSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export type UpdateDriverDto = z.infer<typeof updateDriverSchema>;
