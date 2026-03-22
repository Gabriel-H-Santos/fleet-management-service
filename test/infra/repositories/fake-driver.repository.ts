import { Driver } from '@domain/entities/driver.entity';
import { DriverFilters, DriverRepository } from '@domain/repositories/driver.repository';

export class FakeDriverRepository implements DriverRepository {
  private drivers: Driver[] = [];

  async create(driver: Driver): Promise<Driver> {
    driver.id = driver.id ?? crypto.randomUUID();
    this.drivers.push(driver);
    return driver;
  }

  async update(id: string, data: Partial<Driver>): Promise<boolean> {
    const index = this.drivers.findIndex((d) => d.id === id);
    if (index === -1) return false;
    this.drivers[index] = { ...this.drivers[index], ...data };
    return true;
  }

  async delete(id: string): Promise<void> {
    this.drivers = this.drivers.filter((d) => d.id !== id);
  }

  async findById(id: string): Promise<Driver | null> {
    return this.drivers.find((d) => d.id === id) ?? null;
  }

  async findAll(filters?: DriverFilters): Promise<Driver[]> {
    let result = [...this.drivers];

    if (filters?.name) {
      result = result.filter((d) =>
        d.name.toLowerCase().includes(filters.name!.toLowerCase()),
      );
    }

    return result;
  }

  seed(...drivers: Driver[]): void {
    this.drivers.push(...drivers);
  }

  clear(): void {
    this.drivers = [];
  }

  getAll(): Driver[] {
    return [...this.drivers];
  }
}
