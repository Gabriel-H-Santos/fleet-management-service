export interface ListDriversInput {
  name?: string;
}

export interface ListDriversOutput {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListDriversUseCase {
  listDrivers(input?: ListDriversInput): Promise<ListDriversOutput[]>;
}

export const ListDriversUseCase = Symbol.for('ListDriversUseCase');
