import { Context } from "hono";
import {getOrderMenuItemsService,getOrderMenuItemByIdService,createOrderMenuItemService,updateOrderMenuItemByidService,deleteOrderMenuItemByIdService } from "./ordermenuitem.service";

//get all order menu items
export const getOrderMenuItemsController = async (c: Context) => {
    try {
        const ordermenuitems = await getOrderMenuItemsService();
        if (ordermenuitems == null || ordermenuitems.length == 0) {
            return c.text("No order menu item  found", 404);
        }
        return c.json(ordermenuitems, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);

    }

};

// create order menu item
export const createOrderMenuItemController = async (c: Context) => {
    try {
        const ordermenuitem = await c.req.json();
        const newOrderMenuItem = await createOrderMenuItemService(ordermenuitem);

        if (!newOrderMenuItem) return c.text("Order menu item not created", 400);
        return c.json({ message: newOrderMenuItem }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get order menu item by id
export const getOrderMenuItemByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const ordermenuitem = await getOrderMenuItemByIdService(id);
        if (ordermenuitem == null) {
            return c.text("Order menu item not found", 404);
        }
        return c.json(ordermenuitem, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//update order menu item
export const updateOrderMenuItemController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const ordermenuitem = await c.req.json();

        // search for user by id
        const updatedOrderMenuItem = await getOrderMenuItemByIdService(id);
        if (!updatedOrderMenuItem) return c.text("Order menu item not found", 404);
        await updateOrderMenuItemByidService(id, ordermenuitem);
        return c.text("Order menu item updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//delete order menu item
export const deleteOrderMenuItemByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const ordermenuitem = await getOrderMenuItemByIdService(id);

        if (!ordermenuitem) return c.text("Order menu item not found", 404);
        await deleteOrderMenuItemByIdService(id);
        return c.text("Order menu item deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};