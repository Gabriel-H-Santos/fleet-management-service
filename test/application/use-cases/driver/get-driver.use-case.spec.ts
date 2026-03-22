import { GetDriverUseCaseImpl } from '@application/use-cases/driver/get-driver.use-case';
import { FakeDriverRepository } from '@test/infra/repositories/fake-driver.repository';
import { driverFactory } from '@factories/driver.factory';
import { NotFound } from '@infra/protocols/http/exceptions/not-found.exception';

describe('GetDriverUseCase', () => {
  let useCase: GetDriverUseCaseImpl;
  let driverRepository: FakeDriverRepository;

  beforeEach(() => {
    driverRepository = new FakeDriverRepository();
    useCase = new GetDriverUseCaseImpl(driverRepository);
  });

  afterEach(() => {
    driverRepository.clear();
  });

  describe('getDriver', () => {
    it('should return a driver by id', async () => {
      const driver = driverFactory.build();
      driverRepository.seed(driver);

      const result = await useCase.getDriver({ id: driver.id });

      expect(result.id).toBe(driver.id);
      expect(result.name).toBe(driver.name);
    });

    it('should throw NotFound when driver does not exist', async () => {
      await expect(
        useCase.getDriver({ id: 'non-existent-id' }),
      ).rejects.toThrow(NotFound);
    });
  });
});
