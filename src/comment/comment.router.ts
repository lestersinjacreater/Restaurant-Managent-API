import{Hono} from 'hono';
import {getCommentsController,getCommentByIdController,createCommentController,updateCommentController,deleteCommentController} from './comment.controller';
export const commentRouter = new Hono();

commentRouter.get('/comments',getCommentsController); 
commentRouter.post('/comments',createCommentController);
commentRouter.get('/comments/:id',getCommentByIdController);
commentRouter.put('/comments/:id',updateCommentController);
commentRouter.delete('/comments/:id',deleteCommentController);
