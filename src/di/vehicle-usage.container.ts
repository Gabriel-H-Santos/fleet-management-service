import { DependencyContainer } from 'tsyringe';
import { InMemoryVehicleUsageRepository } from '@infra/repositories/in-memory-vehicle-usage.repository';
import { StartVehicleUsageUseCaseImpl } from '@application/use-cases/vehicle-usage/start-vehicle-usage.use-case';
import { FinishVehicleUsageUseCaseImpl } from '@application/use-cases/vehicle-usage/finish-vehicle-usage.use-case';
import { ListVehicleUsagesUseCaseImpl } from '@application/use-cases/vehicle-usage/list-vehicle-usages.use-case';
import { VehicleUsageRepository } from '@domain/repositories/vehicle-usage.repository';
import { StartVehicleUsageUseCase } from '@domain/use-cases/vehicle-usage/start-vehicle-usage.use-case';
import { FinishVehicleUsageUseCase } from '@domain/use-cases/vehicle-usage/finish-vehicle-usage.use-case';
import { ListVehicleUsagesUseCase } from '@domain/use-cases/vehicle-usage/list-vehicle-usages.use-case';
import { VehicleUsageController } from '@presentation/controllers/vehicle-usage/vehicle-usage.controller';

export const VehicleUsageContainer = (container: DependencyContainer) => {
  container
    .registerSingleton<VehicleUsageRepository>(VehicleUsageRepository, InMemoryVehicleUsageRepository)
    .registerSingleton<StartVehicleUsageUseCase>(StartVehicleUsageUseCase, StartVehicleUsageUseCaseImpl)
    .registerSingleton<FinishVehicleUsageUseCase>(FinishVehicleUsageUseCase, FinishVehicleUsageUseCaseImpl)
    .registerSingleton<ListVehicleUsagesUseCase>(ListVehicleUsagesUseCase, ListVehicleUsagesUseCaseImpl)
    .registerSingleton<VehicleUsageController>(VehicleUsageController, VehicleUsageController);
};
