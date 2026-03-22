import { inject, injectable } from 'tsyringe';
import { VehicleUsageRepository } from '@domain/repositories/vehicle-usage.repository';
import {
  ListVehicleUsagesUseCase,
  VehicleUsageListItem,
} from '@domain/use-cases/vehicle-usage/list-vehicle-usages.use-case';

@injectable()
export class ListVehicleUsagesUseCaseImpl implements ListVehicleUsagesUseCase {
  constructor(
    @inject(VehicleUsageRepository)
    private readonly vehicleUsageRepository: VehicleUsageRepository,
  ) {}

  async listUsages(): Promise<VehicleUsageListItem[]> {
    const usages = await this.vehicleUsageRepository.findAll();

    return usages.map((usage) => ({
      id: usage.id,
      reason: usage.reason,
      startDate: usage.startDate,
      endDate: usage.endDate,
      driver: {
        id: usage.driver.id,
        name: usage.driver.name,
      },
      vehicle: {
        id: usage.vehicle.id,
        plate: usage.vehicle.plate,
        color: usage.vehicle.color,
        brand: usage.vehicle.brand,
      },
    }));
  }
}
