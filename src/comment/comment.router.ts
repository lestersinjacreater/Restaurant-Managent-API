import{Hono} from 'hono';
import { zValidator } from '@hono/zod-validator';
import {getCommentsController,getCommentByIdController,createCommentController,updateCommentController,deleteCommentController} from './comment.controller';
export const commentRouter = new Hono();
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from '../middleware/bearAuth';
import { CommentValidator } from '../validator';

commentRouter.get('/comments',getCommentsController); 
commentRouter.post('/comments',  zValidator('json', CommentValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),createCommentController);
commentRouter.get('/comments/:id',getCommentByIdController);
commentRouter.put('/comments/:id',  zValidator('json', CommentValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),updateCommentController);
commentRouter.delete('/comments/:id',deleteCommentController);
