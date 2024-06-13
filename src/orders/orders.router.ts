import{Hono} from 'hono';
import { zValidator } from '@hono/zod-validator';
import {getOrdersController,getOrderByIdController,createOrderController,updateOrderController,deleteOrderController} from './orders.controller';
export const ordersRouter = new Hono();
import { OrdersValidator } from '../validator';

ordersRouter.get('/orders',getOrdersController);
ordersRouter.post('/orders', zValidator('json', OrdersValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createOrderController);
ordersRouter.get('/orders/:id',getOrderByIdController);
ordersRouter.put('/orders/:id', zValidator('json',OrdersValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),updateOrderController);
ordersRouter.delete('/orders/:id',deleteOrderController);



