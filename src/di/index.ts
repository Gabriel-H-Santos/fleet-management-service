import { container } from 'tsyringe';
import { VehicleContainer } from './vehicle.container';
import { DriverContainer } from './driver.container';
import { VehicleUsageContainer } from './vehicle-usage.container';

VehicleContainer(container);
DriverContainer(container);
VehicleUsageContainer(container);
