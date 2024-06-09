import { Context } from "hono";
import { getrestaurantsService, getRestaurantByIdService, createRestaurantService, updateRestaurantByidService, deleteRestaurantByIdService } from "./restaurant.service";

//get all restaurants
export const getRestaurantsController = async (c: Context) => {
    try {
        const restaurants = await getrestaurantsService();
        if (restaurants == null || restaurants.length == 0) {
            return c.text("No restaurants found", 404);
        }
        return c.json(restaurants, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);

    }

};

// create restaurant
export const createRestaurantController = async (c: Context) => {
    try {
        const restaurant = await c.req.json();
        const newRestaurant = await createRestaurantService(restaurant);

        if (!newRestaurant) return c.text("Restaurant not created", 400);
        return c.json({ message: newRestaurant }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get restaurant by id
export const getRestaurantByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const restaurant = await getRestaurantByIdService(id);
        if (restaurant == null) {
            return c.text("Restaurant not found", 404);
        }
        return c.json(restaurant, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//update restaurant
export const updateRestaurantController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const restaurant = await c.req.json();

        // search for user by id
        const updatedRestaurant = await getRestaurantByIdService(id);
        if (!updatedRestaurant) return c.text("Restaurant not found", 404);
        await updateRestaurantByidService(id, restaurant);
        return c.text("Restaurant updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//delete restaurant
export const deleteRestaurantController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);

        // search for user by id
        const deletedRestaurant = await getRestaurantByIdService(id);
        if (!deletedRestaurant) return c.text("Restaurant not found", 404);
        await deleteRestaurantByIdService(id);
        return c.text("Restaurant deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};