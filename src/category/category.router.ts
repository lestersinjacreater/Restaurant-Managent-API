import{Hono} from 'hono';
import {getCategoriesController,getCategoryByIdController,createCategoryController,updateCategoryController,deleteCategoryController} from './category.controller';
export const categoryRouter = new Hono();
import { zValidator } from "@hono/zod-validator";
import {CategoryValidator} from "../validator";
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from '../middleware/bearAuth';

categoryRouter.get('/categories',getCategoriesController);
categoryRouter.post('/categories', zValidator('json', CategoryValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),  createCategoryController);
categoryRouter.get('/categories/:id',getCategoryByIdController);
categoryRouter.put('/categories/:id',  zValidator('json', CategoryValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),  updateCategoryController);
categoryRouter.delete('/categories/:id',deleteCategoryController);