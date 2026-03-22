import { inject, injectable } from 'tsyringe';
import { VehicleRepository } from '@domain/repositories/vehicle.repository';
import {
  DeleteVehicleUseCase,
  DeleteVehicleInput,
} from '@domain/use-cases/vehicle/delete-vehicle.use-case';
import { NotFound } from '@infra/protocols/http/exceptions/not-found.exception';

@injectable()
export class DeleteVehicleUseCaseImpl implements DeleteVehicleUseCase {
  constructor(
    @inject(VehicleRepository)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async deleteVehicle(input: DeleteVehicleInput): Promise<void> {
    const vehicle = await this.vehicleRepository.findById(input.id);

    if (!vehicle) {
      throw new NotFound(`Vehicle with id ${input.id} not found`, 'VEHICLE_NOT_FOUND');
    }

    await this.vehicleRepository.delete(input.id);
  }
}
