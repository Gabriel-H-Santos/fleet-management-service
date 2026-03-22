import { z } from 'zod';

export const createVehicleSchema = z.object({
  plate: z.string().min(1, 'Plate is required'),
  color: z.string().min(1, 'Color is required'),
  brand: z.string().min(1, 'Brand is required'),
});

export type CreateVehicleDto = z.infer<typeof createVehicleSchema>;
