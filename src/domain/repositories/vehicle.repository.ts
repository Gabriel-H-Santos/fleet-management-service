import { Vehicle } from '@domain/entities/vehicle.entity';

export interface VehicleFilters {
  color?: string;
  brand?: string;
}

export interface VehicleRepository {
  create(vehicle: Vehicle): Promise<Vehicle>;
  update(id: string, data: Partial<Vehicle>): Promise<boolean>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Vehicle | null>;
  findByPlate(plate: string): Promise<Vehicle | null>;
  findAll(filters?: VehicleFilters): Promise<Vehicle[]>;
}

export const VehicleRepository = Symbol.for('VehicleRepository');
