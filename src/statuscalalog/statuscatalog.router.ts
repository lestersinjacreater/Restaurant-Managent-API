import{Hono} from 'hono';
import {getStatusCatalogController,getStatusCatalogByIdController,createStatusCatalogController,updateStatusCatalogController,deleteStatusCatalogController} from './statsuscatalog.controller';
export const statsuscatalogRouter = new Hono();

statsuscatalogRouter.get('/statuscatalog',getStatusCatalogController);
statsuscatalogRouter.post('/statuscatalog',createStatusCatalogController);
statsuscatalogRouter.get('/statuscatalog/:id',getStatusCatalogByIdController);
statsuscatalogRouter.put('/statuscatalog/:id',updateStatusCatalogController);
statsuscatalogRouter.delete('/statuscatalog/:id',deleteStatusCatalogController);


