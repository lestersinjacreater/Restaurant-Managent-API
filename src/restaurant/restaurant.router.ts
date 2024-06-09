import{Hono} from 'hono';
import {getRestaurantsController,getRestaurantByIdController,createRestaurantController,updateRestaurantController,deleteRestaurantController} from './restaurant.controller';
export const restaurantRouter = new Hono();

restaurantRouter.get('/restaurants',getRestaurantsController); 
restaurantRouter.post('/restaurants',createRestaurantController);
restaurantRouter.get('/restaurants/:id',getRestaurantByIdController);
restaurantRouter.put('/restaurants/:id',updateRestaurantController);
restaurantRouter.delete('/restaurants/:id',deleteRestaurantController);
