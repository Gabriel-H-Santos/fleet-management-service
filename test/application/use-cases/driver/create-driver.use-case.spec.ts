import { CreateDriverUseCaseImpl } from '@application/use-cases/driver/create-driver.use-case';
import { FakeDriverRepository } from '@test/infra/repositories/fake-driver.repository';
import { BadRequest } from '@infra/protocols/http/exceptions/bad-request.exception';

describe('CreateDriverUseCase', () => {
  let useCase: CreateDriverUseCaseImpl;
  let driverRepository: FakeDriverRepository;

  beforeEach(() => {
    driverRepository = new FakeDriverRepository();
    useCase = new CreateDriverUseCaseImpl(driverRepository);
  });

  afterEach(() => {
    driverRepository.clear();
  });

  describe('createDriver', () => {
    it('should create a driver successfully', async () => {
      const result = await useCase.createDriver({ name: 'John Doe' });

      expect(result.id).toBeDefined();
      expect(result.name).toBe('John Doe');
      expect(result.createdAt).toBeInstanceOf(Date);
    });

    it('should persist the driver in the repository', async () => {
      await useCase.createDriver({ name: 'Jane Doe' });

      expect(driverRepository.getAll()).toHaveLength(1);
      expect(driverRepository.getAll()[0].name).toBe('Jane Doe');
    });

    it('should throw BadRequest when name is empty', async () => {
      await expect(
        useCase.createDriver({ name: '' }),
      ).rejects.toThrow(BadRequest);
    });
  });
});
