import{Hono} from 'hono';
import {getOrderStatusController,getOrderStatusByIdController,createOrderStatusController,updateOrderStatusController} from './orderstatus.controller';
export const orderSRouter = new Hono();

orderSRouter.get('/orderstatus',getOrderStatusController);
orderSRouter.post('/orderstatus',createOrderStatusController);
orderSRouter.get('/orderstatus/:id',getOrderStatusByIdController);
orderSRouter.put('/orderstatus/:id',updateOrderStatusController);

