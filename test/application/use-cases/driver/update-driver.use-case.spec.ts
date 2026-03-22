import { UpdateDriverUseCaseImpl } from '@application/use-cases/driver/update-driver.use-case';
import { FakeDriverRepository } from '@test/infra/repositories/fake-driver.repository';
import { driverFactory } from '@factories/driver.factory';
import { NotFound } from '@infra/protocols/http/exceptions/not-found.exception';
import { BadRequest } from '@infra/protocols/http/exceptions/bad-request.exception';

describe('UpdateDriverUseCase', () => {
  let useCase: UpdateDriverUseCaseImpl;
  let driverRepository: FakeDriverRepository;

  beforeEach(() => {
    driverRepository = new FakeDriverRepository();
    useCase = new UpdateDriverUseCaseImpl(driverRepository);
  });

  afterEach(() => {
    driverRepository.clear();
  });

  describe('updateDriver', () => {
    it('should update a driver name successfully', async () => {
      const driver = driverFactory.build();
      driverRepository.seed(driver);

      const result = await useCase.updateDriver({ id: driver.id, name: 'New Name' });

      expect(result.id).toBe(driver.id);
      expect(result.name).toBe('New Name');
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should throw NotFound when driver does not exist', async () => {
      await expect(
        useCase.updateDriver({ id: 'non-existent-id', name: 'New Name' }),
      ).rejects.toThrow(NotFound);
    });

    it('should throw BadRequest when name is empty', async () => {
      const driver = driverFactory.build();
      driverRepository.seed(driver);

      await expect(
        useCase.updateDriver({ id: driver.id, name: '' }),
      ).rejects.toThrow(BadRequest);
    });
  });
});
