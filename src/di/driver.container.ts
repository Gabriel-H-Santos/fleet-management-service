import { DependencyContainer } from 'tsyringe';
import { InMemoryDriverRepository } from '@infra/repositories/in-memory-driver.repository';
import { CreateDriverUseCaseImpl } from '@application/use-cases/driver/create-driver.use-case';
import { UpdateDriverUseCaseImpl } from '@application/use-cases/driver/update-driver.use-case';
import { DeleteDriverUseCaseImpl } from '@application/use-cases/driver/delete-driver.use-case';
import { GetDriverUseCaseImpl } from '@application/use-cases/driver/get-driver.use-case';
import { ListDriversUseCaseImpl } from '@application/use-cases/driver/list-drivers.use-case';
import { DriverRepository } from '@domain/repositories/driver.repository';
import { CreateDriverUseCase } from '@domain/use-cases/driver/create-driver.use-case';
import { UpdateDriverUseCase } from '@domain/use-cases/driver/update-driver.use-case';
import { DeleteDriverUseCase } from '@domain/use-cases/driver/delete-driver.use-case';
import { GetDriverUseCase } from '@domain/use-cases/driver/get-driver.use-case';
import { ListDriversUseCase } from '@domain/use-cases/driver/list-drivers.use-case';
import { DriverController } from '@presentation/controllers/driver/driver.controller';

export const DriverContainer = (container: DependencyContainer) => {
  container
    .registerSingleton<DriverRepository>(DriverRepository, InMemoryDriverRepository)
    .registerSingleton<CreateDriverUseCase>(CreateDriverUseCase, CreateDriverUseCaseImpl)
    .registerSingleton<UpdateDriverUseCase>(UpdateDriverUseCase, UpdateDriverUseCaseImpl)
    .registerSingleton<DeleteDriverUseCase>(DeleteDriverUseCase, DeleteDriverUseCaseImpl)
    .registerSingleton<GetDriverUseCase>(GetDriverUseCase, GetDriverUseCaseImpl)
    .registerSingleton<ListDriversUseCase>(ListDriversUseCase, ListDriversUseCaseImpl)
    .registerSingleton<DriverController>(DriverController, DriverController);
};
