import { Context } from "hono";
import { getUsersService, getUserByIdService, createUserService, updateUserByidService, deleteUserByIdService  } from "./users.service";
import bcrypt from "bcrypt";
//get all users
export const getUsersController = async (c: Context) => {
    try {
        const users = await getUsersService();
        if (users == null || users.length == 0) {
            return c.text("No users found", 404);
        }
        return c.json(users, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);

    }

};

// get user by id
export const getUserByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const user = await getUserByIdService(id);
        if (user == null) {
            return c.text("User not found", 404);
        }
        return c.json(user, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create user
export const createUserController = async (c: Context) => {
    try {
        const user = await c.req.json();
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        const newUser = await createUserService(user);
        

        if (!newUser) return c.text("User not created", 400);
        return c.json({ message: newUser }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update user
export const updateUserController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const user = await c.req.json();

        // search for user by id
        const updatedUser = await getUserByIdService(id);
        if (!updatedUser) return c.text("User not found", 404);

        // get data to update
        const res = await updateUserByidService(id, user);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete user
export const deleteUserController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for user by id
        const user = await getUserByIdService(id);
        if (!user) return c.text("User not found", 404);

        // delete user
        const res = await deleteUserByIdService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};