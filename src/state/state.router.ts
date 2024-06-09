import{Hono} from 'hono';
import {getStatesController,createStateController,getStateByIdController,updateStateController,deleteStateController} from './states.controller';

export const stateRouter = new Hono();


stateRouter.get('/state', getStatesController);
stateRouter.post('/state', createStateController);
stateRouter.get('/state/:id', getStateByIdController);
stateRouter.put('/state/:id', updateStateController);
stateRouter.delete('/state/:id', deleteStateController);
