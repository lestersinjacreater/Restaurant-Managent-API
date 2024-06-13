import "dotenv/config"; // Load environment variables from a .env file
import { verify } from "hono/jwt"; // Import JWT verify function from Hono framework
import { Context, Next } from "hono"; // Import Context and Next types from Hono framework

// Extend HonoRequest interface to include user property
interface HonoRequest<T, U> {
    user?: T;
    // Add other properties if needed
}

// Function to verify the JWT token
export const verifyToken = async (token: string, secret: string) => {
    try {
        // Verify the token using the secret key
        const decoded = await verify(token as string, secret);
        return decoded; // Return the decoded token
    } catch (error: any) {
        return null; // Return null if verification fails
    }
}

// Middleware for authentication
export const authMiddleware = async (c: Context & { req: HonoRequest<any, unknown> }, next: Next, requiredRole: string) => {
    // Get the token from the Authorization header
    const token = c.req.header("Authorization");

    // If no token is provided, return an error response
    if (!token) return c.json({ error: "Token is required" }, 401);

    // Verify the token using the secret key from environment variables
    const decoded = await verifyToken(token as string, process.env.JWT_SECRET as string);

    // If the token is invalid, return an error response
    if (!decoded) return c.json({ error: "Invalid token" }, 401);

    // Check if the user has the required role
    if (requiredRole === "both") {
        // If both roles are accepted, check for admin or user role
        if (decoded.role === "admin" || decoded.role === "user") {
            c.req.user = decoded; // Attach the decoded token to the request
            return next(); // Proceed to the next middleware or handler
        }
    } else if (decoded.role === requiredRole) {
        // If a specific role is required, check for that role
        c.req.user = decoded; // Attach the decoded token to the request
        return next(); // Proceed to the next middleware or handler
    }

    // If the user is not authorized, return an error response
    return c.json({ error: "Unauthorized" }, 401);
}

// Middleware for admin role authentication
export const adminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "admin");

// Middleware for user role authentication
export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "user");

// Middleware for both admin and user roles authentication
export const bothRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "both");
