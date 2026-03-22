import { injectable } from 'tsyringe';
import { VehicleUsage } from '@domain/entities/vehicle-usage.entity';
import { VehicleUsageRepository } from '@domain/repositories/vehicle-usage.repository';

@injectable()
export class InMemoryVehicleUsageRepository implements VehicleUsageRepository {
  private usages: VehicleUsage[] = [];

  async create(usage: VehicleUsage): Promise<VehicleUsage> {
    usage.id = crypto.randomUUID();
    this.usages.push(usage);
    return usage;
  }

  async update(id: string, data: Partial<VehicleUsage>): Promise<boolean> {
    const index = this.usages.findIndex((u) => u.id === id);
    if (index === -1) return false;
    this.usages[index] = { ...this.usages[index], ...data };
    return true;
  }

  async findById(id: string): Promise<VehicleUsage | null> {
    return this.usages.find((u) => u.id === id) ?? null;
  }

  async findAll(): Promise<VehicleUsage[]> {
    return [...this.usages];
  }

  async findActiveByVehicleId(vehicleId: string): Promise<VehicleUsage | null> {
    return (
      this.usages.find(
        (u) => u.vehicle.id === vehicleId && u.endDate === null,
      ) ?? null
    );
  }

  async findActiveByDriverId(driverId: string): Promise<VehicleUsage | null> {
    return (
      this.usages.find(
        (u) => u.driver.id === driverId && u.endDate === null,
      ) ?? null
    );
  }
}
