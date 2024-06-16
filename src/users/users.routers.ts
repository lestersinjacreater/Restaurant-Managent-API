import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { getUsersController, createUserController, getUserByIdController, updateUserController, deleteUserController } from './users.controller';
import { UsersValidator } from '../validator';
export const userRouter = new Hono();
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from '../middleware/bearAuth';

userRouter.get('/users', getUsersController);
userRouter.post('/users', zValidator('json', UsersValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createUserController);
userRouter.get('/users/:id', getUserByIdController);
userRouter.put('/users/:id', zValidator('json', UsersValidator), updateUserController);
userRouter.delete('/users/:id', deleteUserController);

