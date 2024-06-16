import{Hono} from 'hono';
import { zValidator } from '@hono/zod-validator';
import {getDriversController,getDriverByIdController,createDriverController,updateDriverController,deleteDriverController} from './driver.controller';
export const driverRouter = new Hono();
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from '../middleware/bearAuth';
import { DriverValidator } from '../validator';

driverRouter.get('/drivers',getDriversController);
driverRouter.post('/drivers', zValidator('json', DriverValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createDriverController);
driverRouter.get('/drivers/:id',getDriverByIdController);
driverRouter.put('/drivers/:id', zValidator('json', DriverValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),updateDriverController);
driverRouter.delete('/drivers/:id',deleteDriverController);


