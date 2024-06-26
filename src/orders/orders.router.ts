import{Hono} from 'hono';
import { zValidator } from '@hono/zod-validator';
import {getOrdersController,getOrderByIdController,createOrderController,updateOrderController,deleteOrderController,getOrdersByRestaurantIdController} from './orders.controller';
export const ordersRouter = new Hono();
import { OrdersValidator } from '../validator';
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from '../middleware/bearAuth';

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
ordersRouter.get('/orders/restaurant/:id',getOrdersByRestaurantIdController);



