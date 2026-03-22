import { inject, injectable } from 'tsyringe';
import { VehicleRepository } from '@domain/repositories/vehicle.repository';
import {
  ListVehiclesUseCase,
  ListVehiclesInput,
  ListVehiclesOutput,
} from '@domain/use-cases/vehicle/list-vehicles.use-case';

@injectable()
export class ListVehiclesUseCaseImpl implements ListVehiclesUseCase {
  constructor(
    @inject(VehicleRepository)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async listVehicles(input?: ListVehiclesInput): Promise<ListVehiclesOutput[]> {
    const vehicles = await this.vehicleRepository.findAll({
      color: input?.color,
      brand: input?.brand,
    });

    return vehicles.map((vehicle) => ({
      id: vehicle.id,
      plate: vehicle.plate,
      color: vehicle.color,
      brand: vehicle.brand,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
    }));
  }
}
