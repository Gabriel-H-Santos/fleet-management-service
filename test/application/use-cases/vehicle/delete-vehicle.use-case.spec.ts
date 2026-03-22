import { DeleteVehicleUseCaseImpl } from '@application/use-cases/vehicle/delete-vehicle.use-case';
import { FakeVehicleRepository } from '@test/infra/repositories/fake-vehicle.repository';
import { vehicleFactory } from '@factories/vehicle.factory';
import { NotFound } from '@infra/protocols/http/exceptions/not-found.exception';

describe('DeleteVehicleUseCase', () => {
  let useCase: DeleteVehicleUseCaseImpl;
  let vehicleRepository: FakeVehicleRepository;

  beforeEach(() => {
    vehicleRepository = new FakeVehicleRepository();
    useCase = new DeleteVehicleUseCaseImpl(vehicleRepository);
  });

  afterEach(() => {
    vehicleRepository.clear();
  });

  describe('deleteVehicle', () => {
    it('should delete a vehicle successfully', async () => {
      const vehicle = vehicleFactory.build();
      vehicleRepository.seed(vehicle);

      await useCase.deleteVehicle({ id: vehicle.id });

      expect(vehicleRepository.getAll()).toHaveLength(0);
    });

    it('should throw NotFound when vehicle does not exist', async () => {
      await expect(
        useCase.deleteVehicle({ id: 'non-existent-id' }),
      ).rejects.toThrow(NotFound);
    });
  });
});
