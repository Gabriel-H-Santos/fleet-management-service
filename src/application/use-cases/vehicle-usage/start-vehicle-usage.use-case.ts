import { inject, injectable } from 'tsyringe';
import { VehicleUsage } from '@domain/entities/vehicle-usage.entity';
import { VehicleRepository } from '@domain/repositories/vehicle.repository';
import { DriverRepository } from '@domain/repositories/driver.repository';
import { VehicleUsageRepository } from '@domain/repositories/vehicle-usage.repository';
import {
  StartVehicleUsageUseCase,
  StartVehicleUsageInput,
  StartVehicleUsageOutput,
} from '@domain/use-cases/vehicle-usage/start-vehicle-usage.use-case';
import { startVehicleUsageSchema } from '@application/dtos/vehicle-usage/start-vehicle-usage.dto';
import { validateOrThrow } from '@application/helpers/validation.helper';
import { NotFound } from '@infra/protocols/http/exceptions/not-found.exception';
import { Conflict } from '@infra/protocols/http/exceptions/conflict.exception';

@injectable()
export class StartVehicleUsageUseCaseImpl implements StartVehicleUsageUseCase {
  constructor(
    @inject(VehicleRepository)
    private readonly vehicleRepository: VehicleRepository,
    @inject(DriverRepository)
    private readonly driverRepository: DriverRepository,
    @inject(VehicleUsageRepository)
    private readonly vehicleUsageRepository: VehicleUsageRepository,
  ) {}

  async startUsage(input: StartVehicleUsageInput): Promise<StartVehicleUsageOutput> {
    const data = validateOrThrow(startVehicleUsageSchema, input);

    const vehicle = await this.vehicleRepository.findById(data.vehicleId);
    if (!vehicle) {
      throw new NotFound(
        `Vehicle with id ${data.vehicleId} not found`,
        'VEHICLE_NOT_FOUND',
      );
    }

    const driver = await this.driverRepository.findById(data.driverId);
    if (!driver) {
      throw new NotFound(
        `Driver with id ${data.driverId} not found`,
        'DRIVER_NOT_FOUND',
      );
    }

    const vehicleAlreadyInUse = await this.vehicleUsageRepository.findActiveByVehicleId(data.vehicleId);
    if (vehicleAlreadyInUse) {
      throw new Conflict(
        `Vehicle with id ${data.vehicleId} is already in use`,
        'VEHICLE_ALREADY_IN_USE',
      );
    }

    const driverAlreadyDriving = await this.vehicleUsageRepository.findActiveByDriverId(data.driverId);
    if (driverAlreadyDriving) {
      throw new Conflict(
        `Driver with id ${data.driverId} is already using a vehicle`,
        'DRIVER_ALREADY_IN_USE',
      );
    }

    const usage = await this.vehicleUsageRepository.create(
      VehicleUsage.create({
        vehicle,
        driver,
        reason: data.reason,
        startDate: data.startDate ?? new Date(),
      }),
    );

    return {
      id: usage.id,
      vehicleId: usage.vehicle.id,
      driverId: usage.driver.id,
      reason: usage.reason,
      startDate: usage.startDate,
      endDate: usage.endDate,
    };
  }
}
