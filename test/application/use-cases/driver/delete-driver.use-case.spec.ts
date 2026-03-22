import { DeleteDriverUseCaseImpl } from '@application/use-cases/driver/delete-driver.use-case';
import { FakeDriverRepository } from '@test/infra/repositories/fake-driver.repository';
import { driverFactory } from '@factories/driver.factory';
import { NotFound } from '@infra/protocols/http/exceptions/not-found.exception';

describe('DeleteDriverUseCase', () => {
  let useCase: DeleteDriverUseCaseImpl;
  let driverRepository: FakeDriverRepository;

  beforeEach(() => {
    driverRepository = new FakeDriverRepository();
    useCase = new DeleteDriverUseCaseImpl(driverRepository);
  });

  afterEach(() => {
    driverRepository.clear();
  });

  describe('deleteDriver', () => {
    it('should delete a driver successfully', async () => {
      const driver = driverFactory.build();
      driverRepository.seed(driver);

      await useCase.deleteDriver({ id: driver.id });

      expect(driverRepository.getAll()).toHaveLength(0);
    });

    it('should throw NotFound when driver does not exist', async () => {
      await expect(
        useCase.deleteDriver({ id: 'non-existent-id' }),
      ).rejects.toThrow(NotFound);
    });
  });
});
