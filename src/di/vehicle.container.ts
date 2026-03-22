import { DependencyContainer } from 'tsyringe';
import { InMemoryVehicleRepository } from '@infra/repositories/in-memory-vehicle.repository';
import { CreateVehicleUseCaseImpl } from '@application/use-cases/vehicle/create-vehicle.use-case';
import { UpdateVehicleUseCaseImpl } from '@application/use-cases/vehicle/update-vehicle.use-case';
import { DeleteVehicleUseCaseImpl } from '@application/use-cases/vehicle/delete-vehicle.use-case';
import { GetVehicleUseCaseImpl } from '@application/use-cases/vehicle/get-vehicle.use-case';
import { ListVehiclesUseCaseImpl } from '@application/use-cases/vehicle/list-vehicles.use-case';
import { VehicleRepository } from '@domain/repositories/vehicle.repository';
import { CreateVehicleUseCase } from '@domain/use-cases/vehicle/create-vehicle.use-case';
import { UpdateVehicleUseCase } from '@domain/use-cases/vehicle/update-vehicle.use-case';
import { DeleteVehicleUseCase } from '@domain/use-cases/vehicle/delete-vehicle.use-case';
import { GetVehicleUseCase } from '@domain/use-cases/vehicle/get-vehicle.use-case';
import { ListVehiclesUseCase } from '@domain/use-cases/vehicle/list-vehicles.use-case';
import { VehicleController } from '@presentation/controllers/vehicle/vehicle.controller';

export const VehicleContainer = (container: DependencyContainer) => {
  container
    .registerSingleton<VehicleRepository>(VehicleRepository, InMemoryVehicleRepository)
    .registerSingleton<CreateVehicleUseCase>(CreateVehicleUseCase, CreateVehicleUseCaseImpl)
    .registerSingleton<UpdateVehicleUseCase>(UpdateVehicleUseCase, UpdateVehicleUseCaseImpl)
    .registerSingleton<DeleteVehicleUseCase>(DeleteVehicleUseCase, DeleteVehicleUseCaseImpl)
    .registerSingleton<GetVehicleUseCase>(GetVehicleUseCase, GetVehicleUseCaseImpl)
    .registerSingleton<ListVehiclesUseCase>(ListVehiclesUseCase, ListVehiclesUseCaseImpl)
    .registerSingleton<VehicleController>(VehicleController, VehicleController);
};
