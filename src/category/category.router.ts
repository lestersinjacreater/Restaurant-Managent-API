import{Hono} from 'hono';
import {getCategoriesController,getCategoryByIdController,createCategoryController,updateCategoryController,deleteCategoryController} from './category.controller';
export const categoryRouter = new Hono();

categoryRouter.get('/categories',getCategoriesController);
categoryRouter.post('/categories',createCategoryController);
categoryRouter.get('/categories/:id',getCategoryByIdController);
categoryRouter.put('/categories/:id',updateCategoryController);
categoryRouter.delete('/categories/:id',deleteCategoryController);
