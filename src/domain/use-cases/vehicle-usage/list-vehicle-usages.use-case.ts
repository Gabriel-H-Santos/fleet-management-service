export interface VehicleUsageListItem {
  id: string;
  reason: string;
  startDate: Date;
  endDate: Date | null;
  driver: {
    id: string;
    name: string;
  };
  vehicle: {
    id: string;
    plate: string;
    color: string;
    brand: string;
  };
}

export interface ListVehicleUsagesUseCase {
  listUsages(): Promise<VehicleUsageListItem[]>;
}

export const ListVehicleUsagesUseCase = Symbol.for('ListVehicleUsagesUseCase');
