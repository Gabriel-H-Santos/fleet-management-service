import { inject, injectable } from 'tsyringe';
import { Vehicle } from '@domain/entities/vehicle.entity';
import { VehicleRepository } from '@domain/repositories/vehicle.repository';
import {
  CreateVehicleUseCase,
  CreateVehicleInput,
  CreateVehicleOutput,
} from '@domain/use-cases/vehicle/create-vehicle.use-case';
import { createVehicleSchema } from '@application/dtos/vehicle/create-vehicle.dto';
import { validateOrThrow } from '@application/helpers/validation.helper';

@injectable()
export class CreateVehicleUseCaseImpl implements CreateVehicleUseCase {
  constructor(
    @inject(VehicleRepository)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async createVehicle(input: CreateVehicleInput): Promise<CreateVehicleOutput> {
    const data = validateOrThrow(createVehicleSchema, input);

    const vehicle = await this.vehicleRepository.create(
      Vehicle.create({
        plate: data.plate,
        color: data.color,
        brand: data.brand,
      }),
    );

    return {
      id: vehicle.id,
      plate: vehicle.plate,
      color: vehicle.color,
      brand: vehicle.brand,
      createdAt: vehicle.createdAt,
    };
  }
}
