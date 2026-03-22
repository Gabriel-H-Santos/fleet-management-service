import { GetVehicleUseCaseImpl } from '@application/use-cases/vehicle/get-vehicle.use-case';
import { FakeVehicleRepository } from '@test/infra/repositories/fake-vehicle.repository';
import { vehicleFactory } from '@factories/vehicle.factory';
import { NotFound } from '@infra/protocols/http/exceptions/not-found.exception';

describe('GetVehicleUseCase', () => {
  let useCase: GetVehicleUseCaseImpl;
  let vehicleRepository: FakeVehicleRepository;

  beforeEach(() => {
    vehicleRepository = new FakeVehicleRepository();
    useCase = new GetVehicleUseCaseImpl(vehicleRepository);
  });

  afterEach(() => {
    vehicleRepository.clear();
  });

  describe('getVehicle', () => {
    it('should return a vehicle by id', async () => {
      const vehicle = vehicleFactory.build();
      vehicleRepository.seed(vehicle);

      const result = await useCase.getVehicle({ id: vehicle.id });

      expect(result.id).toBe(vehicle.id);
      expect(result.plate).toBe(vehicle.plate);
      expect(result.color).toBe(vehicle.color);
      expect(result.brand).toBe(vehicle.brand);
    });

    it('should throw NotFound when vehicle does not exist', async () => {
      await expect(
        useCase.getVehicle({ id: 'non-existent-id' }),
      ).rejects.toThrow(NotFound);
    });
  });
});
