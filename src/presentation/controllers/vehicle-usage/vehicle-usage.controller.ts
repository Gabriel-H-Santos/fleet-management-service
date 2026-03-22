import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import { StartVehicleUsageUseCase } from '@domain/use-cases/vehicle-usage/start-vehicle-usage.use-case';
import { FinishVehicleUsageUseCase } from '@domain/use-cases/vehicle-usage/finish-vehicle-usage.use-case';
import { ListVehicleUsagesUseCase } from '@domain/use-cases/vehicle-usage/list-vehicle-usages.use-case';
import { HTTPStatus } from '@infra/protocols/http/enums/status-code.enum';

@injectable()
export class VehicleUsageController {
  constructor(
    @inject(StartVehicleUsageUseCase)
    private readonly startVehicleUsageUseCase: StartVehicleUsageUseCase,
    @inject(FinishVehicleUsageUseCase)
    private readonly finishVehicleUsageUseCase: FinishVehicleUsageUseCase,
    @inject(ListVehicleUsagesUseCase)
    private readonly listVehicleUsagesUseCase: ListVehicleUsagesUseCase,
  ) {}

  async start(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.startVehicleUsageUseCase.startUsage(req.body);
      res.status(HTTPStatus.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  }

  async finish(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.finishVehicleUsageUseCase.finishUsage({
        id: req.params.id,
      });
      res.status(HTTPStatus.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.listVehicleUsagesUseCase.listUsages();
      res.status(HTTPStatus.OK).json(result);
    } catch (err) {
      next(err);
    }
  }
}
