import { Router } from 'express';
import { container } from 'tsyringe';
import { DriverController } from '@presentation/controllers/driver/driver.controller';

export const driverRouter = Router();

const ctrl = container.resolve(DriverController);

driverRouter.post('/', ctrl.create.bind(ctrl));
driverRouter.put('/:id', ctrl.update.bind(ctrl));
driverRouter.delete('/:id', ctrl.remove.bind(ctrl));
driverRouter.get('/:id', ctrl.getById.bind(ctrl));
driverRouter.get('/', ctrl.list.bind(ctrl));
