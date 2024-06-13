import{Hono} from 'hono';
import { zValidator } from '@hono/zod-validator';
import {getOrderStatusController,getOrderStatusByIdController,createOrderStatusController,updateOrderStatusController} from './orderstatus.controller';
export const orderStatusRouter = new Hono();
import { OrderStatusValidator } from '../validator';

orderStatusRouter.get('/orderstatus',getOrderStatusController);
orderStatusRouter.post('/orderstatus',  zValidator('json', OrderStatusValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),createOrderStatusController);
orderStatusRouter.get('/orderstatus/:id',getOrderStatusByIdController);
orderStatusRouter.put('/orderstatus/:id', zValidator('json', OrderStatusValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),updateOrderStatusController);
orderStatusRouter.delete('/orderstatus/:id',updateOrderStatusController);

