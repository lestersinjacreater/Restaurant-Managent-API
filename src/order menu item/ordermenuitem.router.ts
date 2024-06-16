import{Hono} from 'hono';
import { zValidator } from '@hono/zod-validator';
import {getOrderMenuItemsController,getOrderMenuItemByIdController,createOrderMenuItemController,updateOrderMenuItemController,deleteOrderMenuItemByIdController} from './odermenuitem.controller';
export const ordermenuitemRouter = new Hono();
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from '../middleware/bearAuth';
import { OrderMenuItemValidator } from '../validator';

ordermenuitemRouter.get('/ordermenuitems',getOrderMenuItemsController);
ordermenuitemRouter.post('/ordermenuitems', zValidator('json', OrderMenuItemValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),
createOrderMenuItemController);
ordermenuitemRouter.get('/ordermenuitems/:id',getOrderMenuItemByIdController);
ordermenuitemRouter.put('/ordermenuitems/:id', zValidator('json', OrderMenuItemValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),
updateOrderMenuItemController);
ordermenuitemRouter.delete('/ordermenuitems/:id',deleteOrderMenuItemByIdController);


