export interface VehicleProps {
  plate: string;
  color: string;
  brand: string;
}

export class Vehicle {
  id: string;
  plate: string;
  color: string;
  brand: string;
  createdAt: Date;
  updatedAt: Date;

  static create(props: VehicleProps): Vehicle {
    const vehicle = new Vehicle();
    vehicle.plate = props.plate;
    vehicle.color = props.color;
    vehicle.brand = props.brand;
    vehicle.createdAt = new Date();
    vehicle.updatedAt = new Date();

    return vehicle;
  }
}
