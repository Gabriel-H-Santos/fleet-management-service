import { inject, injectable } from 'tsyringe';
import { DriverRepository } from '@domain/repositories/driver.repository';
import {
  UpdateDriverUseCase,
  UpdateDriverInput,
  UpdateDriverOutput,
} from '@domain/use-cases/driver/update-driver.use-case';
import { updateDriverSchema } from '@application/dtos/driver/update-driver.dto';
import { validateOrThrow } from '@application/helpers/validation.helper';
import { NotFound } from '@infra/protocols/http/exceptions/not-found.exception';

@injectable()
export class UpdateDriverUseCaseImpl implements UpdateDriverUseCase {
  constructor(
    @inject(DriverRepository)
    private readonly driverRepository: DriverRepository,
  ) {}

  async updateDriver(input: UpdateDriverInput): Promise<UpdateDriverOutput> {
    const { id, ...body } = input;
    const data = validateOrThrow(updateDriverSchema, body);

    const driver = await this.driverRepository.findById(id);

    if (!driver) {
      throw new NotFound(`Driver with id ${id} not found`, 'DRIVER_NOT_FOUND');
    }

    const updatedAt = new Date();
    await this.driverRepository.update(id, { name: data.name, updatedAt });

    return {
      id: driver.id,
      name: data.name,
      updatedAt,
    };
  }
}
