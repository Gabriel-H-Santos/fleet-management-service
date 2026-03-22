import { UpdateVehicleUseCaseImpl } from '@application/use-cases/vehicle/update-vehicle.use-case';
import { FakeVehicleRepository } from '@test/infra/repositories/fake-vehicle.repository';
import { vehicleFactory } from '@factories/vehicle.factory';
import { NotFound } from '@infra/protocols/http/exceptions/not-found.exception';
import { BadRequest } from '@infra/protocols/http/exceptions/bad-request.exception';

describe('UpdateVehicleUseCase', () => {
  let useCase: UpdateVehicleUseCaseImpl;
  let vehicleRepository: FakeVehicleRepository;

  beforeEach(() => {
    vehicleRepository = new FakeVehicleRepository();
    useCase = new UpdateVehicleUseCaseImpl(vehicleRepository);
  });

  afterEach(() => {
    vehicleRepository.clear();
  });

  describe('updateVehicle', () => {
    it('should update a vehicle color successfully', async () => {
      const vehicle = vehicleFactory.build();
      vehicleRepository.seed(vehicle);

      const result = await useCase.updateVehicle({ id: vehicle.id, color: 'Green' });

      expect(result.id).toBe(vehicle.id);
      expect(result.color).toBe('Green');
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should update only the fields provided', async () => {
      const vehicle = vehicleFactory.build({ plate: 'XYZ9999', color: 'Red', brand: 'Ford' });
      vehicleRepository.seed(vehicle);

      const result = await useCase.updateVehicle({ id: vehicle.id, brand: 'Chevrolet' });

      expect(result.plate).toBe('XYZ9999');
      expect(result.color).toBe('Red');
      expect(result.brand).toBe('Chevrolet');
    });

    it('should throw NotFound when vehicle does not exist', async () => {
      await expect(
        useCase.updateVehicle({ id: 'non-existent-id', color: 'Blue' }),
      ).rejects.toThrow(NotFound);
    });

    it('should throw BadRequest when no fields are provided', async () => {
      const vehicle = vehicleFactory.build();
      vehicleRepository.seed(vehicle);

      await expect(
        useCase.updateVehicle({ id: vehicle.id }),
      ).rejects.toThrow(BadRequest);
    });
  });
});
