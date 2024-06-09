import { Context } from "hono";
import { getaddressesService,getAddressByIdService,createAddressService,updateAddressByidService,deleteAddressByIdService } from "./address.service"

//get all addresses
export const getAddressesController = async (c: Context) => {
    try {
        const addresses = await getaddressesService();
        if (addresses == null || addresses.length == 0) {
            return c.text("No addresses found", 404);
        }
        return c.json(addresses, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);

    }

};

// create address
export const createAddressController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createAddressService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get address by id
export const getAddressByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getAddressByIdService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//update address
export const updateAddressController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for user by id
        const updatedAddress = await getAddressByIdService(id);
        if (!updatedAddress) return c.text("Address not found", 404);
        await updateAddressByidService(id, address);
        return c.text("Address updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//delete address
export const deleteAddressController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await getAddressByIdService(id);
        if (!address) return c.text("Address not found", 404);
        await deleteAddressByIdService(id);
        return c.text("Address deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};