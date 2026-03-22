import { ListVehiclesUseCaseImpl } from '@application/use-cases/vehicle/list-vehicles.use-case';
import { FakeVehicleRepository } from '@test/infra/repositories/fake-vehicle.repository';
import { vehicleFactory } from '@factories/vehicle.factory';

describe('ListVehiclesUseCase', () => {
  let useCase: ListVehiclesUseCaseImpl;
  let vehicleRepository: FakeVehicleRepository;

  beforeEach(() => {
    vehicleRepository = new FakeVehicleRepository();
    useCase = new ListVehiclesUseCaseImpl(vehicleRepository);
  });

  afterEach(() => {
    vehicleRepository.clear();
  });

  describe('listVehicles', () => {
    it('should return all vehicles when no filters are provided', async () => {
      vehicleRepository.seed(vehicleFactory.build(), vehicleFactory.build());

      const result = await useCase.listVehicles();

      expect(result).toHaveLength(2);
    });

    it('should filter vehicles by color', async () => {
      vehicleRepository.seed(
        vehicleFactory.build({ color: 'Red' }),
        vehicleFactory.build({ color: 'Blue' }),
        vehicleFactory.build({ color: 'Red' }),
      );

      const result = await useCase.listVehicles({ color: 'Red' });

      expect(result).toHaveLength(2);
      expect(result.every((v) => v.color === 'Red')).toBe(true);
    });

    it('should filter vehicles by brand', async () => {
      vehicleRepository.seed(
        vehicleFactory.build({ brand: 'Toyota' }),
        vehicleFactory.build({ brand: 'Honda' }),
      );

      const result = await useCase.listVehicles({ brand: 'Toyota' });

      expect(result).toHaveLength(1);
      expect(result[0].brand).toBe('Toyota');
    });

    it('should return empty array when no vehicles match filters', async () => {
      vehicleRepository.seed(vehicleFactory.build({ color: 'Red' }));

      const result = await useCase.listVehicles({ color: 'Blue' });

      expect(result).toHaveLength(0);
    });

    it('should return empty array when repository is empty', async () => {
      const result = await useCase.listVehicles();

      expect(result).toHaveLength(0);
    });
  });
});
