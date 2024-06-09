import { Context } from "hono";
import { getOrderStatusService,getOrderStatusByIdService,createOrderStatusService,updateOrderStatusByidService,deleteOrderStatusByIdService} from "./orderstatus.service";

//get all orderstatus
export const getOrderStatusController = async (c: Context) => {
    try {
        const orderstatus = await getOrderStatusService();
        if (orderstatus == null || orderstatus.length == 0) {
            return c.text("No orderstatus found", 404);
        }
        return c.json(orderstatus, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);

    }

};

// create orderstatus
export const createOrderStatusController = async (c: Context) => {
    try {
        const orderstatus = await c.req.json();
        const newOrderStatus = await createOrderStatusService(orderstatus);

        if (!newOrderStatus) return c.text("Orderstatus not created", 400);
        return c.json({ message: newOrderStatus }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get orderstatus by id
export const getOrderStatusByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const orderstatus = await getOrderStatusByIdService(id);
        if (orderstatus == null) {
            return c.text("Orderstatus not found", 404);
        }
        return c.json(orderstatus, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//update orderstatus
export const updateOrderStatusController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const orderstatus = await c.req.json();

        // search for user by id
        const updatedOrderStatus = await getOrderStatusByIdService(id);
        if (!updatedOrderStatus) return c.text("Orderstatus not found", 404);
        await updateOrderStatusByidService(id, orderstatus);
        return c.text("Orderstatus updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//delete orderstatus
export const deleteOrderStatusController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const orderstatus = await getOrderStatusByIdService(id);
        if (!orderstatus) return c.text("Orderstatus not found", 404);
        await deleteOrderStatusByIdService(id);
        return c.text("Orderstatus deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};
