import { inject, injectable } from 'tsyringe';
import { DriverRepository } from '@domain/repositories/driver.repository';
import {
  ListDriversUseCase,
  ListDriversInput,
  ListDriversOutput,
} from '@domain/use-cases/driver/list-drivers.use-case';

@injectable()
export class ListDriversUseCaseImpl implements ListDriversUseCase {
  constructor(
    @inject(DriverRepository)
    private readonly driverRepository: DriverRepository,
  ) {}

  async listDrivers(input?: ListDriversInput): Promise<ListDriversOutput[]> {
    const drivers = await this.driverRepository.findAll({ name: input?.name });

    return drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      createdAt: driver.createdAt,
      updatedAt: driver.updatedAt,
    }));
  }
}
