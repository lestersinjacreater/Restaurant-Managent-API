import{Hono} from 'hono';
import { zValidator } from '@hono/zod-validator';
import {getRestaurantsController,getRestaurantByIdController,createRestaurantController,updateRestaurantController,deleteRestaurantController} from './restaurant.controller';
export const restaurantRouter = new Hono();
import { RestaurantValidator } from '../validator';

restaurantRouter.get('/restaurants',getRestaurantsController); 
restaurantRouter.post('/restaurants',  zValidator('json', RestaurantValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),createRestaurantController);
restaurantRouter.get('/restaurants/:id',getRestaurantByIdController);
restaurantRouter.put('/restaurants/:id', zValidator('json', RestaurantValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),updateRestaurantController);
restaurantRouter.delete('/restaurants/:id',deleteRestaurantController);
