import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { Vehicle, VehicleProps } from '@domain/entities/vehicle.entity';

export const vehiclePropsFactory = Factory.define<VehicleProps>(() => ({
  plate: faker.string.alphanumeric(7).toUpperCase(),
  color: faker.color.human(),
  brand: faker.vehicle.manufacturer(),
}));

export const vehicleFactory = Factory.define<Vehicle>(() => {
  const props = vehiclePropsFactory.build();
  const vehicle = Vehicle.create(props);

  Object.assign(vehicle, {
    id: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return vehicle;
});
