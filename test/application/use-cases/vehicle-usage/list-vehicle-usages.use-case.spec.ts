import { ListVehicleUsagesUseCaseImpl } from '@application/use-cases/vehicle-usage/list-vehicle-usages.use-case';
import { FakeVehicleUsageRepository } from '@test/infra/repositories/fake-vehicle-usage.repository';
import { vehicleUsageFactory } from '@factories/vehicle-usage.factory';

describe('ListVehicleUsagesUseCase', () => {
  let useCase: ListVehicleUsagesUseCaseImpl;
  let vehicleUsageRepository: FakeVehicleUsageRepository;

  beforeEach(() => {
    vehicleUsageRepository = new FakeVehicleUsageRepository();
    useCase = new ListVehicleUsagesUseCaseImpl(vehicleUsageRepository);
  });

  afterEach(() => {
    vehicleUsageRepository.clear();
  });

  describe('listUsages', () => {
    it('should return all usages with driver and vehicle info', async () => {
      vehicleUsageRepository.seed(vehicleUsageFactory.build(), vehicleUsageFactory.build());

      const result = await useCase.listUsages();

      expect(result).toHaveLength(2);
      expect(result[0].driver).toBeDefined();
      expect(result[0].driver.name).toBeDefined();
      expect(result[0].vehicle).toBeDefined();
      expect(result[0].vehicle.plate).toBeDefined();
    });

    it('should return empty array when no usages exist', async () => {
      const result = await useCase.listUsages();

      expect(result).toHaveLength(0);
    });

    it('should include null endDate for active usages', async () => {
      vehicleUsageRepository.seed(vehicleUsageFactory.build({ endDate: null }));

      const result = await useCase.listUsages();

      expect(result[0].endDate).toBeNull();
    });

    it('should include endDate for finished usages', async () => {
      const endDate = new Date();
      vehicleUsageRepository.seed(vehicleUsageFactory.build({ endDate }));

      const result = await useCase.listUsages();

      expect(result[0].endDate).toEqual(endDate);
    });
  });
});
