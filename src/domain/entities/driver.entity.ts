export interface DriverProps {
  name: string;
}

export class Driver {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  static create(props: DriverProps): Driver {
    const driver = new Driver();
    driver.name = props.name;
    driver.createdAt = new Date();
    driver.updatedAt = new Date();

    return driver;
  }
}
