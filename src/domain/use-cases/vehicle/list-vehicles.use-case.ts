export interface ListVehiclesInput {
  color?: string;
  brand?: string;
}

export interface ListVehiclesOutput {
  id: string;
  plate: string;
  color: string;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListVehiclesUseCase {
  listVehicles(input?: ListVehiclesInput): Promise<ListVehiclesOutput[]>;
}

export const ListVehiclesUseCase = Symbol.for('ListVehiclesUseCase');
