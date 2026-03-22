import { Driver } from './driver.entity';
import { Vehicle } from './vehicle.entity';

export interface VehicleUsageProps {
  vehicle: Vehicle;
  driver: Driver;
  startDate: Date;
  reason: string;
  endDate?: Date | null;
}

export class VehicleUsage {
  id: string;
  vehicle: Vehicle;
  driver: Driver;
  startDate: Date;
  endDate: Date | null;
  reason: string;
  createdAt: Date;
  updatedAt: Date;

  static create(props: VehicleUsageProps): VehicleUsage {
    const usage = new VehicleUsage();
    usage.vehicle = props.vehicle;
    usage.driver = props.driver;
    usage.startDate = props.startDate;
    usage.endDate = props.endDate ?? null;
    usage.reason = props.reason;
    usage.createdAt = new Date();
    usage.updatedAt = new Date();

    return usage;
  }
}
