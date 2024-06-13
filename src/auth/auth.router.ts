import { Hono } from 'hono'; // Importing Hono framework for routing
import { zValidator } from '@hono/zod-validator'; // Importing Zod validator for schema validation
import { registerUserValidator, loginUservalidator } from '../validator'; // Importing validation schemas
import { registerUserController, loginUserController } from './auth.controller'; // Importing controller functions

// Creating a new instance of Hono router
export const authRouter = new Hono();

// Endpoint for user registration
authRouter.post('register', zValidator('json',registerUserValidator , (result, c) => {
    // Validation callback function for register endpoint
    if (!result.success) {
        // If validation fails, return error response
        return c.json(result.error, 400);
    }
}), registerUserController); // Route to registerUserController function

// Endpoint for user login
authRouter.post('login', zValidator('json',loginUservalidator, (result, c) => {
    // Validation callback function for login endpoint
    if (!result.success) {
        // If validation fails, return error response
        return c.json(result.error, 400);
    }
}), loginUserController); // Route to loginUserController function
