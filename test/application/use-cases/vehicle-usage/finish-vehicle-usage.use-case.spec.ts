import { FinishVehicleUsageUseCaseImpl } from '@application/use-cases/vehicle-usage/finish-vehicle-usage.use-case';
import { FakeVehicleUsageRepository } from '@test/infra/repositories/fake-vehicle-usage.repository';
import { vehicleUsageFactory } from '@factories/vehicle-usage.factory';
import { NotFound } from '@infra/protocols/http/exceptions/not-found.exception';
import { UnprocessableContent } from '@infra/protocols/http/exceptions/unprocessable-content.exception';

describe('FinishVehicleUsageUseCase', () => {
  let useCase: FinishVehicleUsageUseCaseImpl;
  let vehicleUsageRepository: FakeVehicleUsageRepository;

  beforeEach(() => {
    vehicleUsageRepository = new FakeVehicleUsageRepository();
    useCase = new FinishVehicleUsageUseCaseImpl(vehicleUsageRepository);
  });

  afterEach(() => {
    vehicleUsageRepository.clear();
  });

  describe('finishUsage', () => {
    it('should finish a vehicle usage successfully', async () => {
      const usage = vehicleUsageFactory.build({ endDate: null });
      vehicleUsageRepository.seed(usage);

      const result = await useCase.finishUsage({ id: usage.id });

      expect(result.id).toBe(usage.id);
      expect(result.endDate).toBeInstanceOf(Date);
      expect(result.vehicleId).toBe(usage.vehicle.id);
      expect(result.driverId).toBe(usage.driver.id);
    });

    it('should throw NotFound when usage does not exist', async () => {
      await expect(
        useCase.finishUsage({ id: 'non-existent-id' }),
      ).rejects.toThrow(NotFound);
    });

    it('should throw UnprocessableContent when usage is already finished', async () => {
      const usage = vehicleUsageFactory.build({ endDate: new Date() });
      vehicleUsageRepository.seed(usage);

      await expect(
        useCase.finishUsage({ id: usage.id }),
      ).rejects.toThrow(UnprocessableContent);
    });
  });
});
