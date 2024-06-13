import "dotenv/config"; // Load environment variables from a .env file
import { Context } from "hono"; // Import the Context type from Hono framework
import { createAuthUserService, userLoginService } from "./auth.service"; // Import authentication services
import bycrpt from "bcrypt"; // Import bcrypt for password hashing
import { sign } from "hono/jwt"; // Import JWT sign function from Hono framework

// Controller to handle user registration
export const registerUserController = async (c: Context) => {
    try {
        // Extract user data from the request body
        const user = await c.req.json();
        const pass = user.password;

        // Hash the user's password with bcrypt
        const hashedPassword = await bycrpt.hash(pass, 10);
        user.password = hashedPassword;

        // Create a new user using the createAuthUserService
        const createUser = await createAuthUserService(user);

        // If user creation fails, return an error response
        if (!createUser) return c.text("User not created", 400);

        // Return success message if user is created
        return c.json({ message: createUser }, 201);
    } catch (error: any) {
        // Return error message in case of any exception
        return c.json({ error: error?.message }, 400);
    }
}

// Controller to handle user login
export const loginUserController = async (c: Context) => {
    try {
        // Extract user data from the request body
        const user = await c.req.json();

        // Check if the user exists in the database
        const userExists = await userLoginService(user);
        if (userExists === null) return c.json({ error: "User not found" }, 404); // User not found

        // Compare the provided password with the stored hashed password
        const userMatch = await bycrpt.compare(user.password, userExists?.password as string);
        if (!userMatch) {
            return c.json({ error: "Invalid Credentials" }, 400); // Invalid password
        } else {
            // Create a payload for the JWT
            const payload = {
                sub: userExists?.username, // Subject of the token (username)
                role: userExists?.role, // User role
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3) // Token expiry (3 days)
            }

            // Get the secret key from environment variables
            let secret = process.env.JWT_SECRET as string;

            // Generate a JWT token
            const token = await sign(payload, secret);

            // Extract user details
            let user = userExists?.user;
            let role = userExists?.role;

            // Return the token and user details in the response
            return c.json({ token, user: { role, ...user } }, 200);
        }
    } catch (error: any) {
        // Return error message in case of any exception
        return c.json({ error: error?.message }, 400);
    }
}













