export interface StartVehicleUsageInput {
  vehicleId: string;
  driverId: string;
  reason: string;
  startDate?: Date;
}

export interface StartVehicleUsageOutput {
  id: string;
  vehicleId: string;
  driverId: string;
  reason: string;
  startDate: Date;
  endDate: Date | null;
}

export interface StartVehicleUsageUseCase {
  startUsage(input: StartVehicleUsageInput): Promise<StartVehicleUsageOutput>;
}

export const StartVehicleUsageUseCase = Symbol.for('StartVehicleUsageUseCase');
