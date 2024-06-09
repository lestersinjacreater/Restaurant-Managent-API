import{Hono} from 'hono';
import {getRestaurantOwnersController,getRestaurantOwnerByIdController,createRestaurantOwnerController,updateRestaurantOwnerController,deleteRestaurantOwnerController} from './restaurantowner.controller';

export const restaurantOwnerRouter = new Hono();

restaurantOwnerRouter.get('/restaurantowners',getRestaurantOwnersController);
restaurantOwnerRouter.post('/restaurantowners',createRestaurantOwnerController);
restaurantOwnerRouter.get('/restaurantowners/:id',getRestaurantOwnerByIdController);
restaurantOwnerRouter.put('/restaurantowners/:id',updateRestaurantOwnerController);
restaurantOwnerRouter.delete('/restaurantowners/:id',deleteRestaurantOwnerController);
