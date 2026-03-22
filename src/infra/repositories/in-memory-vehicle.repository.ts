import { injectable } from 'tsyringe';
import { Vehicle } from '@domain/entities/vehicle.entity';
import { VehicleFilters, VehicleRepository } from '@domain/repositories/vehicle.repository';

@injectable()
export class InMemoryVehicleRepository implements VehicleRepository {
  private vehicles: Vehicle[] = [];

  async create(vehicle: Vehicle): Promise<Vehicle> {
    vehicle.id = crypto.randomUUID();
    this.vehicles.push(vehicle);
    return vehicle;
  }

  async update(id: string, data: Partial<Vehicle>): Promise<boolean> {
    const index = this.vehicles.findIndex((v) => v.id === id);
    if (index === -1) return false;
    this.vehicles[index] = { ...this.vehicles[index], ...data };
    return true;
  }

  async delete(id: string): Promise<void> {
    this.vehicles = this.vehicles.filter((v) => v.id !== id);
  }

  async findById(id: string): Promise<Vehicle | null> {
    return this.vehicles.find((v) => v.id === id) ?? null;
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    return this.vehicles.find((v) => v.plate === plate) ?? null;
  }

  async findAll(filters?: VehicleFilters): Promise<Vehicle[]> {
    let result = [...this.vehicles];

    if (filters?.color) {
      result = result.filter((v) =>
        v.color.toLowerCase().includes(filters.color!.toLowerCase()),
      );
    }

    if (filters?.brand) {
      result = result.filter((v) =>
        v.brand.toLowerCase().includes(filters.brand!.toLowerCase()),
      );
    }

    return result;
  }
}
