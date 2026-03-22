import { inject, injectable } from 'tsyringe';
import { VehicleRepository } from '@domain/repositories/vehicle.repository';
import {
  UpdateVehicleUseCase,
  UpdateVehicleInput,
  UpdateVehicleOutput,
} from '@domain/use-cases/vehicle/update-vehicle.use-case';
import { updateVehicleSchema } from '@application/dtos/vehicle/update-vehicle.dto';
import { validateOrThrow } from '@application/helpers/validation.helper';
import { NotFound } from '@infra/protocols/http/exceptions/not-found.exception';

@injectable()
export class UpdateVehicleUseCaseImpl implements UpdateVehicleUseCase {
  constructor(
    @inject(VehicleRepository)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async updateVehicle(input: UpdateVehicleInput): Promise<UpdateVehicleOutput> {
    const { id, ...body } = input;
    const data = validateOrThrow(updateVehicleSchema, body);

    const vehicle = await this.vehicleRepository.findById(id);

    if (!vehicle) {
      throw new NotFound(`Vehicle with id ${id} not found`, 'VEHICLE_NOT_FOUND');
    }

    const updated: Partial<typeof vehicle> = {};
    if (data.plate !== undefined) updated.plate = data.plate;
    if (data.color !== undefined) updated.color = data.color;
    if (data.brand !== undefined) updated.brand = data.brand;
    updated.updatedAt = new Date();

    await this.vehicleRepository.update(id, updated);

    return {
      id: vehicle.id,
      plate: data.plate ?? vehicle.plate,
      color: data.color ?? vehicle.color,
      brand: data.brand ?? vehicle.brand,
      updatedAt: updated.updatedAt,
    };
  }
}
