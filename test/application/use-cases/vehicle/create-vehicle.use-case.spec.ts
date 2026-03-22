import { CreateVehicleUseCaseImpl } from '@application/use-cases/vehicle/create-vehicle.use-case';
import { FakeVehicleRepository } from '@test/infra/repositories/fake-vehicle.repository';
import { BadRequest } from '@infra/protocols/http/exceptions/bad-request.exception';

describe('CreateVehicleUseCase', () => {
  let useCase: CreateVehicleUseCaseImpl;
  let vehicleRepository: FakeVehicleRepository;

  beforeEach(() => {
    vehicleRepository = new FakeVehicleRepository();
    useCase = new CreateVehicleUseCaseImpl(vehicleRepository);
  });

  afterEach(() => {
    vehicleRepository.clear();
  });

  describe('createVehicle', () => {
    it('should create a vehicle successfully', async () => {
      const result = await useCase.createVehicle({
        plate: 'ABC1234',
        color: 'Red',
        brand: 'Toyota',
      });

      expect(result.id).toBeDefined();
      expect(result.plate).toBe('ABC1234');
      expect(result.color).toBe('Red');
      expect(result.brand).toBe('Toyota');
      expect(result.createdAt).toBeInstanceOf(Date);
    });

    it('should persist the vehicle in the repository', async () => {
      await useCase.createVehicle({
        plate: 'ABC1234',
        color: 'Blue',
        brand: 'Honda',
      });

      const all = vehicleRepository.getAll();
      expect(all).toHaveLength(1);
      expect(all[0].plate).toBe('ABC1234');
    });

    it('should throw BadRequest when plate is missing', async () => {
      await expect(
        useCase.createVehicle({ plate: '', color: 'Red', brand: 'Toyota' }),
      ).rejects.toThrow(BadRequest);
    });

    it('should throw BadRequest when color is missing', async () => {
      await expect(
        useCase.createVehicle({ plate: 'ABC1234', color: '', brand: 'Toyota' }),
      ).rejects.toThrow(BadRequest);
    });

    it('should throw BadRequest when brand is missing', async () => {
      await expect(
        useCase.createVehicle({ plate: 'ABC1234', color: 'Red', brand: '' }),
      ).rejects.toThrow(BadRequest);
    });
  });
});
