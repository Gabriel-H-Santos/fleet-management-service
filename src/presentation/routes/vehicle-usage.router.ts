import { Router } from 'express';
import { container } from 'tsyringe';
import { VehicleUsageController } from '@presentation/controllers/vehicle-usage/vehicle-usage.controller';

export const vehicleUsageRouter = Router();

const ctrl = container.resolve(VehicleUsageController);

vehicleUsageRouter.post('/', ctrl.start.bind(ctrl));
vehicleUsageRouter.patch('/:id/finish', ctrl.finish.bind(ctrl));
vehicleUsageRouter.get('/', ctrl.list.bind(ctrl));
