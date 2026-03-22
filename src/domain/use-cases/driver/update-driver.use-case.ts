export interface UpdateDriverInput {
  id: string;
  name: string;
}

export interface UpdateDriverOutput {
  id: string;
  name: string;
  updatedAt: Date;
}

export interface UpdateDriverUseCase {
  updateDriver(input: UpdateDriverInput): Promise<UpdateDriverOutput>;
}

export const UpdateDriverUseCase = Symbol.for('UpdateDriverUseCase');
