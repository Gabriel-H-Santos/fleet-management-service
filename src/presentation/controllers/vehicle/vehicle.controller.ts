import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import { CreateVehicleUseCase } from '@domain/use-cases/vehicle/create-vehicle.use-case';
import { UpdateVehicleUseCase } from '@domain/use-cases/vehicle/update-vehicle.use-case';
import { DeleteVehicleUseCase } from '@domain/use-cases/vehicle/delete-vehicle.use-case';
import { GetVehicleUseCase } from '@domain/use-cases/vehicle/get-vehicle.use-case';
import { ListVehiclesUseCase } from '@domain/use-cases/vehicle/list-vehicles.use-case';
import { HTTPStatus } from '@infra/protocols/http/enums/status-code.enum';

@injectable()
export class VehicleController {
  constructor(
    @inject(CreateVehicleUseCase)
    private readonly createVehicleUseCase: CreateVehicleUseCase,
    @inject(UpdateVehicleUseCase)
    private readonly updateVehicleUseCase: UpdateVehicleUseCase,
    @inject(DeleteVehicleUseCase)
    private readonly deleteVehicleUseCase: DeleteVehicleUseCase,
    @inject(GetVehicleUseCase)
    private readonly getVehicleUseCase: GetVehicleUseCase,
    @inject(ListVehiclesUseCase)
    private readonly listVehiclesUseCase: ListVehiclesUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.createVehicleUseCase.createVehicle(req.body);
      res.status(HTTPStatus.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.updateVehicleUseCase.updateVehicle({
        id: req.params.id,
        ...req.body,
      });
      res.status(HTTPStatus.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.deleteVehicleUseCase.deleteVehicle({ id: req.params.id });
      res.status(HTTPStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.getVehicleUseCase.getVehicle({ id: req.params.id });
      res.status(HTTPStatus.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { color, brand } = req.query;
      const result = await this.listVehiclesUseCase.listVehicles({
        color: color as string | undefined,
        brand: brand as string | undefined,
      });
      res.status(HTTPStatus.OK).json(result);
    } catch (err) {
      next(err);
    }
  }
}
