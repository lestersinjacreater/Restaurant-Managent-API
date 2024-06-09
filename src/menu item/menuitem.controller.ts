import { Context } from "hono";
import {getMenuItemsService,getMenuItemByIdService,createMenuItemService,updateMenuItemByidService,deleteMenuItemByIdService } from "./menuitem.service";

//get all menu items
export const getMenuItemsController = async (c: Context) => {
    try {
        const menuitems = await getMenuItemsService();
        if (menuitems == null || menuitems.length == 0) {
            return c.text("No menu item  found", 404);
        }
        return c.json(menuitems, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);

    }

};

// create menu item
export const createMenuItemController = async (c: Context) => {
    try {
        const menuitem = await c.req.json();
        const newMenuItem = await createMenuItemService(menuitem);

        if (!newMenuItem) return c.text("Menu item not created", 400);
        return c.json({ message: newMenuItem }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get menu item by id
export const getMenuItemByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const menuitem = await getMenuItemByIdService(id);
        if (menuitem == null) {
            return c.text("Menu item not found", 404);
        }
        return c.json(menuitem, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//update menu item
export const updateMenuItemController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const menuitem = await c.req.json();

        // search for user by id
        const updatedMenuItem = await getMenuItemByIdService(id);
        if (!updatedMenuItem) return c.text("Menu item not found", 404);
        await updateMenuItemByidService(id, menuitem);
        return c.text("Menu item updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//delete menu item
export const deleteMenuItemController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const menuitem = await getMenuItemByIdService(id);
        if (!menuitem) return c.text("Menu item not found", 404);
        await deleteMenuItemByIdService(id);
        return c.text("Menu item deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

