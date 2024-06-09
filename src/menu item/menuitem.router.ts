import{Hono} from 'hono';
import {getMenuItemsController,getMenuItemByIdController,createMenuItemController,updateMenuItemController,deleteMenuItemController} from './menuitem.controller';
export const menuitemRouter = new Hono();

menuitemRouter.get('/menuitems',getMenuItemsController);
menuitemRouter.post('/menuitems',createMenuItemController);
menuitemRouter.get('/menuitems/:id',getMenuItemByIdController);
menuitemRouter.put('/menuitems/:id',updateMenuItemController);
menuitemRouter.delete('/menuitems/:id',deleteMenuItemController);



