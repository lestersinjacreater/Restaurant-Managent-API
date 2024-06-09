import { Context } from "hono";
import { getrestaurantownersService,getRestaurantOwnerByIdService,createRestaurantOwnerService,updateRestaurantOwnerByidService,deleteRestaurantOwnerByIdService } from "./restaurantowner.service"


//get all restaurant owners
export const getRestaurantOwnersController = async (c: Context) => {
    try {
        const restaurantowners = await getrestaurantownersService();
        if (restaurantowners == null || restaurantowners.length == 0) {
            return c.text("No restaurant owners found", 404);
        }
        return c.json(restaurantowners, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);

    }

};

// create restaurant owner
export const createRestaurantOwnerController = async (c: Context) => {
    try {
        const restaurantowner = await c.req.json();
        const newRestaurantOwner = await createRestaurantOwnerService(restaurantowner);

        if (!newRestaurantOwner) return c.text("Restaurant Owner not created", 400);
        return c.json({ message: newRestaurantOwner }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get restaurant owner by id
export const getRestaurantOwnerByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const restaurantowner = await getRestaurantOwnerByIdService(id);
        if (restaurantowner == null) {
            return c.text("Restaurant Owner not found", 404);
        }
        return c.json(restaurantowner, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


//update restaurant owner
export const updateRestaurantOwnerController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const restaurantowner = await c.req.json();

        // search for user by id
        const updatedRestaurantOwner = await getRestaurantOwnerByIdService(id);
        if (!updatedRestaurantOwner) return c.text("Restaurant Owner not found", 404);

        // get data to update
        const data = await updateRestaurantOwnerByidService(id, restaurantowner);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//delete restaurant owner
export const deleteRestaurantOwnerController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    const data = await deleteRestaurantOwnerByIdService(id);
    return c.json({ message: data }, 200);
};