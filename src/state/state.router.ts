import{Hono} from 'hono';
import { zValidator } from '@hono/zod-validator';
import {getStatesController,createStateController,getStateByIdController,updateStateController,deleteStateController,getStateCitiesController} from './states.controller';
import { StateValidator } from '../validator';
export const stateRouter = new Hono();
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from '../middleware/bearAuth';


stateRouter.get('/state', getStatesController);
stateRouter.post('/state',zValidator('json', StateValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createStateController);
stateRouter.get('/state/:id', getStateByIdController);
stateRouter.put('/state/:id',zValidator('json', StateValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), updateStateController);
stateRouter.delete('/state/:id', deleteStateController);
stateRouter.get('/state/:id/cities', getStateCitiesController);
