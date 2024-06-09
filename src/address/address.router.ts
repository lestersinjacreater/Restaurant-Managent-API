import{Hono} from 'hono';
import {getAddressesController,getAddressByIdController,updateAddressController,createAddressController,deleteAddressController} from './address.controller';
export const addressRouter = new Hono();

addressRouter.get('/addresses',getAddressesController);
addressRouter.post('/addresses',createAddressController);
addressRouter.get('/addresses/:id',getAddressByIdController);
addressRouter.put('/addresses/:id',updateAddressController);
addressRouter.delete('/addresses/:id',deleteAddressController);

