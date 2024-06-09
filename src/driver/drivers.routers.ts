import{Hono} from 'hono';
import {getDriversController,getDriverByIdController,createDriverController,updateDriverController,deleteDriverController} from './driver.controller';
export const driverRouter = new Hono();

driverRouter.get('/drivers',getDriversController);
driverRouter.post('/drivers',createDriverController);
driverRouter.get('/drivers/:id',getDriverByIdController);
driverRouter.put('/drivers/:id',updateDriverController);
driverRouter.delete('/drivers/:id',deleteDriverController);
