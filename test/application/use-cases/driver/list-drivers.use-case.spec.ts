import { ListDriversUseCaseImpl } from '@application/use-cases/driver/list-drivers.use-case';
import { FakeDriverRepository } from '@test/infra/repositories/fake-driver.repository';
import { driverFactory } from '@factories/driver.factory';

describe('ListDriversUseCase', () => {
  let useCase: ListDriversUseCaseImpl;
  let driverRepository: FakeDriverRepository;

  beforeEach(() => {
    driverRepository = new FakeDriverRepository();
    useCase = new ListDriversUseCaseImpl(driverRepository);
  });

  afterEach(() => {
    driverRepository.clear();
  });

  describe('listDrivers', () => {
    it('should return all drivers when no filter is provided', async () => {
      driverRepository.seed(driverFactory.build(), driverFactory.build());

      const result = await useCase.listDrivers();

      expect(result).toHaveLength(2);
    });

    it('should filter drivers by name (partial, case-insensitive)', async () => {
      driverRepository.seed(
        driverFactory.build({ name: 'Alice Smith' }),
        driverFactory.build({ name: 'Bob Jones' }),
        driverFactory.build({ name: 'Alice Cooper' }),
      );

      const result = await useCase.listDrivers({ name: 'alice' });

      expect(result).toHaveLength(2);
      expect(result.every((d) => d.name.toLowerCase().includes('alice'))).toBe(true);
    });

    it('should return empty array when no drivers match the filter', async () => {
      driverRepository.seed(driverFactory.build({ name: 'John' }));

      const result = await useCase.listDrivers({ name: 'xyz' });

      expect(result).toHaveLength(0);
    });
  });
});
