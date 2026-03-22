import { VehicleUsage } from '@domain/entities/vehicle-usage.entity';

export interface VehicleUsageRepository {
  create(usage: VehicleUsage): Promise<VehicleUsage>;
  update(id: string, data: Partial<VehicleUsage>): Promise<boolean>;
  findById(id: string): Promise<VehicleUsage | null>;
  findAll(): Promise<VehicleUsage[]>;
  findActiveByVehicleId(vehicleId: string): Promise<VehicleUsage | null>;
  findActiveByDriverId(driverId: string): Promise<VehicleUsage | null>;
}

export const VehicleUsageRepository = Symbol.for('VehicleUsageRepository');
