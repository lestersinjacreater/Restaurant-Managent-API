import{Hono} from 'hono';
import { zValidator } from '@hono/zod-validator';
import {getCitiesController,getCityByIdController,createCityController,updateCityController,deleteCityController,getCityRestaurantsController } from './city.controller';
import { CityValidator } from '../validator';
export const cityRouter = new Hono();

cityRouter.get('/cities',getCitiesController);
cityRouter.post('/cities',zValidator('json', CityValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),createCityController);
cityRouter.get('/cities/:id',getCityByIdController);
cityRouter.put('/cities/:id', zValidator('json', CityValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),   updateCityController);
cityRouter.delete('/cities/:id',deleteCityController);

cityRouter.get('/cities/:id/restaurants',getCityRestaurantsController);
