import { inject, injectable } from 'tsyringe';
import { VehicleRepository } from '@domain/repositories/vehicle.repository';
import {
  GetVehicleUseCase,
  GetVehicleInput,
  GetVehicleOutput,
} from '@domain/use-cases/vehicle/get-vehicle.use-case';
import { NotFound } from '@infra/protocols/http/exceptions/not-found.exception';

@injectable()
export class GetVehicleUseCaseImpl implements GetVehicleUseCase {
  constructor(
    @inject(VehicleRepository)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async getVehicle(input: GetVehicleInput): Promise<GetVehicleOutput> {
    const vehicle = await this.vehicleRepository.findById(input.id);

    if (!vehicle) {
      throw new NotFound(`Vehicle with id ${input.id} not found`, 'VEHICLE_NOT_FOUND');
    }

    return {
      id: vehicle.id,
      plate: vehicle.plate,
      color: vehicle.color,
      brand: vehicle.brand,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
    };
  }
}
