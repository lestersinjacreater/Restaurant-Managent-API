import{Hono} from 'hono';
import {getOrdersController,getOrderByIdController,createOrderController,updateOrderController,deleteOrderController} from './orders.controller';
export const ordersRouter = new Hono();

ordersRouter.get('/orders',getOrdersController);
ordersRouter.post('/orders',createOrderController);
ordersRouter.get('/orders/:id',getOrderByIdController);
ordersRouter.put('/orders/:id',updateOrderController);
ordersRouter.delete('/orders/:id',deleteOrderController);
