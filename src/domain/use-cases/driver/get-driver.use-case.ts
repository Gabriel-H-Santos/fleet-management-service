export interface GetDriverInput {
  id: string;
}

export interface GetDriverOutput {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetDriverUseCase {
  getDriver(input: GetDriverInput): Promise<GetDriverOutput>;
}

export const GetDriverUseCase = Symbol.for('GetDriverUseCase');
