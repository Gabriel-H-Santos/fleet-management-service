import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { Driver, DriverProps } from '@domain/entities/driver.entity';

export const driverPropsFactory = Factory.define<DriverProps>(() => ({
  name: faker.person.fullName(),
}));

export const driverFactory = Factory.define<Driver>(() => {
  const props = driverPropsFactory.build();
  const driver = Driver.create(props);

  Object.assign(driver, {
    id: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return driver;
});
