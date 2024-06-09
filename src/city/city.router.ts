import{Hono} from 'hono';
import {getCitiesController,getCityByIdController,createCityController,updateCityController,deleteCityController} from './city.controller';

export const cityRouter = new Hono();

cityRouter.get('/cities',getCitiesController);
cityRouter.post('/cities',createCityController);
cityRouter.get('/cities/:id',getCityByIdController);
cityRouter.put('/cities/:id',updateCityController);
cityRouter.delete('/cities/:id',deleteCityController);