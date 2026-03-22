export interface GetVehicleInput {
  id: string;
}

export interface GetVehicleOutput {
  id: string;
  plate: string;
  color: string;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetVehicleUseCase {
  getVehicle(input: GetVehicleInput): Promise<GetVehicleOutput>;
}

export const GetVehicleUseCase = Symbol.for('GetVehicleUseCase');
