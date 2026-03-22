import { Router } from 'express';
import { container } from 'tsyringe';
import { VehicleController } from '@presentation/controllers/vehicle/vehicle.controller';

export const vehicleRouter = Router();

const ctrl = container.resolve(VehicleController);

vehicleRouter.post('/', ctrl.create.bind(ctrl));
vehicleRouter.patch('/:id', ctrl.update.bind(ctrl));
vehicleRouter.delete('/:id', ctrl.remove.bind(ctrl));
vehicleRouter.get('/:id', ctrl.getById.bind(ctrl));
vehicleRouter.get('/', ctrl.list.bind(ctrl));
