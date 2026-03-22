import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import { CreateDriverUseCase } from '@domain/use-cases/driver/create-driver.use-case';
import { UpdateDriverUseCase } from '@domain/use-cases/driver/update-driver.use-case';
import { DeleteDriverUseCase } from '@domain/use-cases/driver/delete-driver.use-case';
import { GetDriverUseCase } from '@domain/use-cases/driver/get-driver.use-case';
import { ListDriversUseCase } from '@domain/use-cases/driver/list-drivers.use-case';
import { HTTPStatus } from '@infra/protocols/http/enums/status-code.enum';

@injectable()
export class DriverController {
  constructor(
    @inject(CreateDriverUseCase)
    private readonly createDriverUseCase: CreateDriverUseCase,
    @inject(UpdateDriverUseCase)
    private readonly updateDriverUseCase: UpdateDriverUseCase,
    @inject(DeleteDriverUseCase)
    private readonly deleteDriverUseCase: DeleteDriverUseCase,
    @inject(GetDriverUseCase)
    private readonly getDriverUseCase: GetDriverUseCase,
    @inject(ListDriversUseCase)
    private readonly listDriversUseCase: ListDriversUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.createDriverUseCase.createDriver(req.body);
      res.status(HTTPStatus.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.updateDriverUseCase.updateDriver({
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
      await this.deleteDriverUseCase.deleteDriver({ id: req.params.id });
      res.status(HTTPStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.getDriverUseCase.getDriver({ id: req.params.id });
      res.status(HTTPStatus.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name } = req.query;
      const result = await this.listDriversUseCase.listDrivers({
        name: name as string | undefined,
      });
      res.status(HTTPStatus.OK).json(result);
    } catch (err) {
      next(err);
    }
  }
}
