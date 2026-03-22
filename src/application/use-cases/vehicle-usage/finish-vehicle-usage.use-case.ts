import { inject, injectable } from 'tsyringe';
import { VehicleUsageRepository } from '@domain/repositories/vehicle-usage.repository';
import {
  FinishVehicleUsageUseCase,
  FinishVehicleUsageInput,
  FinishVehicleUsageOutput,
} from '@domain/use-cases/vehicle-usage/finish-vehicle-usage.use-case';
import { NotFound } from '@infra/protocols/http/exceptions/not-found.exception';
import { BadRequest } from '@infra/protocols/http/exceptions/bad-request.exception';

@injectable()
export class FinishVehicleUsageUseCaseImpl implements FinishVehicleUsageUseCase {
  constructor(
    @inject(VehicleUsageRepository)
    private readonly vehicleUsageRepository: VehicleUsageRepository,
  ) {}

  async finishUsage(input: FinishVehicleUsageInput): Promise<FinishVehicleUsageOutput> {
    const usage = await this.vehicleUsageRepository.findById(input.id);

    if (!usage) {
      throw new NotFound(
        `Vehicle usage with id ${input.id} not found`,
        'VEHICLE_USAGE_NOT_FOUND',
      );
    }

    if (usage.endDate !== null) {
      throw new BadRequest(
        `Vehicle usage with id ${input.id} is already finished`,
        'VEHICLE_USAGE_ALREADY_FINISHED',
      );
    }

    const endDate = new Date();
    await this.vehicleUsageRepository.update(input.id, { endDate, updatedAt: endDate });

    return {
      id: usage.id,
      vehicleId: usage.vehicle.id,
      driverId: usage.driver.id,
      reason: usage.reason,
      startDate: usage.startDate,
      endDate,
    };
  }
}
