export interface FinishVehicleUsageInput {
  id: string;
}

export interface FinishVehicleUsageOutput {
  id: string;
  vehicleId: string;
  driverId: string;
  reason: string;
  startDate: Date;
  endDate: Date;
}

export interface FinishVehicleUsageUseCase {
  finishUsage(input: FinishVehicleUsageInput): Promise<FinishVehicleUsageOutput>;
}

export const FinishVehicleUsageUseCase = Symbol.for('FinishVehicleUsageUseCase');
