import { inject, injectable } from 'tsyringe';
import { DriverRepository } from '@domain/repositories/driver.repository';
import {
  DeleteDriverUseCase,
  DeleteDriverInput,
} from '@domain/use-cases/driver/delete-driver.use-case';
import { NotFound } from '@infra/protocols/http/exceptions/not-found.exception';

@injectable()
export class DeleteDriverUseCaseImpl implements DeleteDriverUseCase {
  constructor(
    @inject(DriverRepository)
    private readonly driverRepository: DriverRepository,
  ) {}

  async deleteDriver(input: DeleteDriverInput): Promise<void> {
    const driver = await this.driverRepository.findById(input.id);

    if (!driver) {
      throw new NotFound(`Driver with id ${input.id} not found`, 'DRIVER_NOT_FOUND');
    }

    await this.driverRepository.delete(input.id);
  }
}
