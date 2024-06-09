import { Context } from "hono";
import {getOrdersService,getOrderByIdService,createOrderService,updateOrderByidService,deleteOrderByIdService } from "./orders.service";

//get all orders
export const getOrdersController = async (c: Context) => {
    try {
        const orders = await getOrdersService();
        if (orders == null || orders.length == 0) {
            return c.text("No order found", 404);
        }
        return c.json(orders, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);

    }

};

// create order
export const createOrderController = async (c: Context) => {
    try {
        const order = await c.req.json();
        const newOrder = await createOrderService(order);

        if (!newOrder) return c.text("Order not created", 400);
        return c.json({ message: newOrder }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get order by id
export const getOrderByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const order = await getOrderByIdService(id);
        if (order == null) {
            return c.text("Order not found", 404);
        }
        return c.json(order, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//update order
export const updateOrderController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const order = await c.req.json();

        // search for user by id
        const updatedOrder = await getOrderByIdService(id);
        if (!updatedOrder) return c.text("Order not found", 404);
        await updateOrderByidService(id, order);
        return c.text("Order updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//delate order
export const deleteOrderController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const order = await getOrderByIdService(id);
        if (!order) return c.text("Order not found", 404);
        await deleteOrderByIdService(id);
        return c.text("Order deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

