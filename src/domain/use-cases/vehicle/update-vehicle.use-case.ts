export interface UpdateVehicleInput {
  id: string;
  plate?: string;
  color?: string;
  brand?: string;
}

export interface UpdateVehicleOutput {
  id: string;
  plate: string;
  color: string;
  brand: string;
  updatedAt: Date;
}

export interface UpdateVehicleUseCase {
  updateVehicle(input: UpdateVehicleInput): Promise<UpdateVehicleOutput>;
}

export const UpdateVehicleUseCase = Symbol.for('UpdateVehicleUseCase');
