export interface CreateDriverInput {
  name: string;
}

export interface CreateDriverOutput {
  id: string;
  name: string;
  createdAt: Date;
}

export interface CreateDriverUseCase {
  createDriver(input: CreateDriverInput): Promise<CreateDriverOutput>;
}

export const CreateDriverUseCase = Symbol.for('CreateDriverUseCase');
