import{Hono} from 'hono';
import {getUsersController,createUserController,getUserByIdController,updateUserController,deleteUserController} from './users.controller';

export const userRouter = new Hono();

userRouter.get('/users', getUsersController);
userRouter.post('/users', createUserController);
userRouter.get('/users/:id', getUserByIdController);
userRouter.put('/users/:id', updateUserController);
userRouter.delete('/users/:id', deleteUserController);