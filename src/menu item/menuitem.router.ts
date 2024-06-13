import{Hono} from 'hono';
import { zValidator } from '@hono/zod-validator';
import {getMenuItemsController,getMenuItemByIdController,createMenuItemController,updateMenuItemController,deleteMenuItemController} from './menuitem.controller';
export const menuitemRouter = new Hono();
import { MenuItemValidator } from '../validator';

menuitemRouter.get('/menuitems',getMenuItemsController);
menuitemRouter.post('/menuitems', zValidator('json', MenuItemValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),createMenuItemController);
menuitemRouter.get('/menuitems/:id',getMenuItemByIdController);
menuitemRouter.put('/menuitems/:id', zValidator('json', MenuItemValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),updateMenuItemController);
menuitemRouter.delete('/menuitems/:id',deleteMenuItemController);




