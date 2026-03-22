import { StartVehicleUsageUseCaseImpl } from '@application/use-cases/vehicle-usage/start-vehicle-usage.use-case';
import { FakeVehicleRepository } from '@test/infra/repositories/fake-vehicle.repository';
import { FakeDriverRepository } from '@test/infra/repositories/fake-driver.repository';
import { FakeVehicleUsageRepository } from '@test/infra/repositories/fake-vehicle-usage.repository';
import { vehicleFactory } from '@factories/vehicle.factory';
import { driverFactory } from '@factories/driver.factory';
import { vehicleUsageFactory } from '@factories/vehicle-usage.factory';
import { NotFound } from '@infra/protocols/http/exceptions/not-found.exception';
import { Conflict } from '@infra/protocols/http/exceptions/conflict.exception';
import { BadRequest } from '@infra/protocols/http/exceptions/bad-request.exception';
import { faker } from '@faker-js/faker';

describe('StartVehicleUsageUseCase', () => {
  let useCase: StartVehicleUsageUseCaseImpl;
  let vehicleRepository: FakeVehicleRepository;
  let driverRepository: FakeDriverRepository;
  let vehicleUsageRepository: FakeVehicleUsageRepository;

  beforeEach(() => {
    vehicleRepository = new FakeVehicleRepository();
    driverRepository = new FakeDriverRepository();
    vehicleUsageRepository = new FakeVehicleUsageRepository();
    useCase = new StartVehicleUsageUseCaseImpl(
      vehicleRepository,
      driverRepository,
      vehicleUsageRepository,
    );
  });

  afterEach(() => {
    vehicleRepository.clear();
    driverRepository.clear();
    vehicleUsageRepository.clear();
  });

  describe('startUsage', () => {
    it('should start a vehicle usage successfully', async () => {
      const vehicle = vehicleFactory.build();
      const driver = driverFactory.build();
      vehicleRepository.seed(vehicle);
      driverRepository.seed(driver);

      const result = await useCase.startUsage({
        vehicleId: vehicle.id,
        driverId: driver.id,
        reason: 'Client visit',
      });

      expect(result.id).toBeDefined();
      expect(result.vehicleId).toBe(vehicle.id);
      expect(result.driverId).toBe(driver.id);
      expect(result.reason).toBe('Client visit');
      expect(result.startDate).toBeInstanceOf(Date);
      expect(result.endDate).toBeNull();
    });

    it('should use provided startDate when given', async () => {
      const vehicle = vehicleFactory.build();
      const driver = driverFactory.build();
      vehicleRepository.seed(vehicle);
      driverRepository.seed(driver);

      const startDate = new Date('2024-01-15T09:00:00Z');

      const result = await useCase.startUsage({
        vehicleId: vehicle.id,
        driverId: driver.id,
        reason: 'Delivery',
        startDate,
      });

      expect(result.startDate).toEqual(startDate);
    });

    it('should throw NotFound when vehicle does not exist', async () => {
      const driver = driverFactory.build();
      driverRepository.seed(driver);

      await expect(
        useCase.startUsage({
          vehicleId: faker.string.uuid(),
          driverId: driver.id,
          reason: 'Test',
        }),
      ).rejects.toThrow(NotFound);
    });

    it('should throw NotFound when driver does not exist', async () => {
      const vehicle = vehicleFactory.build();
      vehicleRepository.seed(vehicle);

      await expect(
        useCase.startUsage({
          vehicleId: vehicle.id,
          driverId: faker.string.uuid(),
          reason: 'Test',
        }),
      ).rejects.toThrow(NotFound);
    });

    it('should throw Conflict when vehicle is already in use', async () => {
      const vehicle = vehicleFactory.build();
      const driver1 = driverFactory.build();
      const driver2 = driverFactory.build();
      vehicleRepository.seed(vehicle);
      driverRepository.seed(driver1, driver2);

      const activeUsage = vehicleUsageFactory.build({ vehicle, driver: driver1, endDate: null });
      vehicleUsageRepository.seed(activeUsage);

      await expect(
        useCase.startUsage({
          vehicleId: vehicle.id,
          driverId: driver2.id,
          reason: 'Test',
        }),
      ).rejects.toThrow(Conflict);
    });

    it('should throw Conflict when driver is already using another vehicle', async () => {
      const vehicle1 = vehicleFactory.build();
      const vehicle2 = vehicleFactory.build();
      const driver = driverFactory.build();
      vehicleRepository.seed(vehicle1, vehicle2);
      driverRepository.seed(driver);

      const activeUsage = vehicleUsageFactory.build({ vehicle: vehicle1, driver, endDate: null });
      vehicleUsageRepository.seed(activeUsage);

      await expect(
        useCase.startUsage({
          vehicleId: vehicle2.id,
          driverId: driver.id,
          reason: 'Test',
        }),
      ).rejects.toThrow(Conflict);
    });

    it('should throw BadRequest when vehicleId is not a valid UUID', async () => {
      await expect(
        useCase.startUsage({
          vehicleId: 'not-a-uuid',
          driverId: 'not-a-uuid',
          reason: 'Test',
        }),
      ).rejects.toThrow(BadRequest);
    });

    it('should allow a vehicle to be used again after previous usage is finished', async () => {
      const vehicle = vehicleFactory.build();
      const driver1 = driverFactory.build();
      const driver2 = driverFactory.build();
      vehicleRepository.seed(vehicle);
      driverRepository.seed(driver1, driver2);

      const finishedUsage = vehicleUsageFactory.build({
        vehicle,
        driver: driver1,
        endDate: new Date(),
      });
      vehicleUsageRepository.seed(finishedUsage);

      const result = await useCase.startUsage({
        vehicleId: vehicle.id,
        driverId: driver2.id,
        reason: 'New trip',
      });

      expect(result.vehicleId).toBe(vehicle.id);
    });
  });
});
