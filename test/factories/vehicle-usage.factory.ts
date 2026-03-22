import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { VehicleUsage, VehicleUsageProps } from '@domain/entities/vehicle-usage.entity';
import { vehicleFactory } from './vehicle.factory';
import { driverFactory } from './driver.factory';

export const vehicleUsagePropsFactory = Factory.define<VehicleUsageProps>(() => ({
  vehicle: vehicleFactory.build(),
  driver: driverFactory.build(),
  startDate: faker.date.past(),
  reason: faker.lorem.sentence(),
}));

export const vehicleUsageFactory = Factory.define<VehicleUsage>(() => {
  const props = vehicleUsagePropsFactory.build();
  const usage = VehicleUsage.create(props);

  Object.assign(usage, {
    id: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return usage;
});
