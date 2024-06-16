import{Hono} from 'hono';
import { zValidator } from '@hono/zod-validator';
import {getStatusCatalogController,getStatusCatalogByIdController,createStatusCatalogController,updateStatusCatalogController,deleteStatusCatalogController} from './statsuscatalog.controller';
export const statsuscatalogRouter = new Hono();
import { StatusCatalogValidator } from '../validator';
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from '../middleware/bearAuth';

statsuscatalogRouter.get('/statuscatalog',getStatusCatalogController);
statsuscatalogRouter.post('/statuscatalog',zValidator('json', StatusCatalogValidator),createStatusCatalogController);
statsuscatalogRouter.get('/statuscatalog/:id',getStatusCatalogByIdController);
statsuscatalogRouter.put('/statuscatalog/:id',zValidator('json', StatusCatalogValidator),updateStatusCatalogController);
statsuscatalogRouter.delete('/statuscatalog/:id',deleteStatusCatalogController);


