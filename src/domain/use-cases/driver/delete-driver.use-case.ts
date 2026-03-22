export interface DeleteDriverInput {
  id: string;
}

export interface DeleteDriverUseCase {
  deleteDriver(input: DeleteDriverInput): Promise<void>;
}

export const DeleteDriverUseCase = Symbol.for('DeleteDriverUseCase');
