import { Router } from 'express';
import { vehicleRouter } from './vehicle.router';
import { driverRouter } from './driver.router';
import { vehicleUsageRouter } from './vehicle-usage.router';

export const router = Router();

router.use('/vehicles', vehicleRouter);
router.use('/drivers', driverRouter);
router.use('/vehicle-usages', vehicleUsageRouter);
