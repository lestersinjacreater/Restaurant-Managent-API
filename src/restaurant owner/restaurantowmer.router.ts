import{Hono} from 'hono';
import { zValidator } from '@hono/zod-validator';
import {getRestaurantOwnersController,getRestaurantOwnerByIdController,createRestaurantOwnerController,updateRestaurantOwnerController,deleteRestaurantOwnerController} from './restaurantowner.controller';
export const restaurantOwnerRouter = new Hono();
import { RestaurantOwnerValidator } from '../validator';

restaurantOwnerRouter.get('/restaurantowners',getRestaurantOwnersController);
restaurantOwnerRouter.post('/restaurantowners', zValidator('json', RestaurantOwnerValidator),createRestaurantOwnerController);
restaurantOwnerRouter.get('/restaurantowners/:id',getRestaurantOwnerByIdController);
restaurantOwnerRouter.put('/restaurantowners/:id', zValidator('json', RestaurantOwnerValidator),updateRestaurantOwnerController);
restaurantOwnerRouter.delete('/restaurantowners/:id',deleteRestaurantOwnerController);
