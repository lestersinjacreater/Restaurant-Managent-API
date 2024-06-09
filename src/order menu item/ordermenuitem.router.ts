import{Hono} from 'hono';
import {getOrderMenuItemsController,getOrderMenuItemByIdController,createOrderMenuItemController,updateOrderMenuItemController,deleteOrderMenuItemByIdController} from './odermenuitem.controller';
export const ordermenuitemRouter = new Hono();

ordermenuitemRouter.get('/ordermenuitems',getOrderMenuItemsController);
ordermenuitemRouter.post('/ordermenuitems',createOrderMenuItemController);
ordermenuitemRouter.get('/ordermenuitems/:id',getOrderMenuItemByIdController);
ordermenuitemRouter.put('/ordermenuitems/:id',updateOrderMenuItemController);
ordermenuitemRouter.delete('/ordermenuitems/:id',deleteOrderMenuItemByIdController);

