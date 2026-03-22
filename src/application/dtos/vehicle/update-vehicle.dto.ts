import { z } from 'zod';

export const updateVehicleSchema = z.object({
  plate: z.string().min(1).optional(),
  color: z.string().min(1).optional(),
  brand: z.string().min(1).optional(),
}).refine(
  (data) => data.plate !== undefined || data.color !== undefined || data.brand !== undefined,
  { message: 'At least one field must be provided for update' },
);

export type UpdateVehicleDto = z.infer<typeof updateVehicleSchema>;
