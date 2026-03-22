export interface CreateVehicleInput {
  plate: string;
  color: string;
  brand: string;
}

export interface CreateVehicleOutput {
  id: string;
  plate: string;
  color: string;
  brand: string;
  createdAt: Date;
}

export interface CreateVehicleUseCase {
  createVehicle(input: CreateVehicleInput): Promise<CreateVehicleOutput>;
}

export const CreateVehicleUseCase = Symbol.for('CreateVehicleUseCase');
