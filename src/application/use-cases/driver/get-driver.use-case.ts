import { inject, injectable } from 'tsyringe';
import { DriverRepository } from '@domain/repositories/driver.repository';
import {
  GetDriverUseCase,
  GetDriverInput,
  GetDriverOutput,
} from '@domain/use-cases/driver/get-driver.use-case';
import { NotFound } from '@infra/protocols/http/exceptions/not-found.exception';

@injectable()
export class GetDriverUseCaseImpl implements GetDriverUseCase {
  constructor(
    @inject(DriverRepository)
    private readonly driverRepository: DriverRepository,
  ) {}

  async getDriver(input: GetDriverInput): Promise<GetDriverOutput> {
    const driver = await this.driverRepository.findById(input.id);

    if (!driver) {
      throw new NotFound(`Driver with id ${input.id} not found`, 'DRIVER_NOT_FOUND');
    }

    return {
      id: driver.id,
      name: driver.name,
      createdAt: driver.createdAt,
      updatedAt: driver.updatedAt,
    };
  }
}
