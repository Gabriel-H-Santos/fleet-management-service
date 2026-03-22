import { z } from 'zod';

export const startVehicleUsageSchema = z.object({
  vehicleId: z.string().uuid('vehicleId must be a valid UUID'),
  driverId: z.string().uuid('driverId must be a valid UUID'),
  reason: z.string().min(1, 'Reason is required'),
  startDate: z.coerce.date().optional(),
});

export type StartVehicleUsageDto = z.infer<typeof startVehicleUsageSchema>;
