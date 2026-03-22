import { Driver } from '@domain/entities/driver.entity';

export interface DriverFilters {
  name?: string;
}

export interface DriverRepository {
  create(driver: Driver): Promise<Driver>;
  update(id: string, data: Partial<Driver>): Promise<boolean>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Driver | null>;
  findAll(filters?: DriverFilters): Promise<Driver[]>;
}

export const DriverRepository = Symbol.for('DriverRepository');
