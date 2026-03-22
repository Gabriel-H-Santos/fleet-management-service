import { inject, injectable } from 'tsyringe';
import { Driver } from '@domain/entities/driver.entity';
import { DriverRepository } from '@domain/repositories/driver.repository';
import {
  CreateDriverUseCase,
  CreateDriverInput,
  CreateDriverOutput,
} from '@domain/use-cases/driver/create-driver.use-case';
import { createDriverSchema } from '@application/dtos/driver/create-driver.dto';
import { validateOrThrow } from '@application/helpers/validation.helper';

@injectable()
export class CreateDriverUseCaseImpl implements CreateDriverUseCase {
  constructor(
    @inject(DriverRepository)
    private readonly driverRepository: DriverRepository,
  ) {}

  async createDriver(input: CreateDriverInput): Promise<CreateDriverOutput> {
    const data = validateOrThrow(createDriverSchema, input);

    const driver = await this.driverRepository.create(
      Driver.create({ name: data.name }),
    );

    return {
      id: driver.id,
      name: driver.name,
      createdAt: driver.createdAt,
    };
  }
}
