export interface DeleteVehicleInput {
  id: string;
}

export interface DeleteVehicleUseCase {
  deleteVehicle(input: DeleteVehicleInput): Promise<void>;
}

export const DeleteVehicleUseCase = Symbol.for('DeleteVehicleUseCase');
