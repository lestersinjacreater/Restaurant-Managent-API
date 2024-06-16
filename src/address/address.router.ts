import{Hono} from 'hono';
import {getAddressesController,getAddressByIdController,updateAddressController,createAddressController,deleteAddressController} from './address.controller';
import { zValidator } from "@hono/zod-validator";
import {AddressValidator} from "../validator";
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from '../middleware/bearAuth';

export const addressRouter = new Hono();

addressRouter.get('/addresses',getAddressesController);
addressRouter.post('/addresses', zValidator('json', AddressValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),    createAddressController);
addressRouter.get('/addresses/:id',getAddressByIdController);
addressRouter.put('/addresses/:id', zValidator('json', AddressValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), updateAddressController);
addressRouter.delete('/addresses/:id',deleteAddressController);