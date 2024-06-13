import { TIAuthOnUsers, TSAuthOnUsers, AuthOnUsersTable } from "../drizzle/schema";
import  db  from "../drizzle/db";
import { sql } from "drizzle-orm";

// Service to create a new authenticated user
// Takes a user object of type TIAuthOnUsers and inserts it into the AuthOnUsersTable
// Returns a success message upon completion
export const createAuthUserService = async (user: TIAuthOnUsers): Promise<string | null> => {
    await db.insert(AuthOnUsersTable).values(user);
    return "User created successfully";
}

// Service for user login
// Takes a user object of type TSAuthOnUsers and attempts to find a matching user in the AuthOnUsersTable
// Returns the user details if a match is found
export const userLoginService = async (user: TSAuthOnUsers) => {
    const { username } = user;

    // Query the database to find the first user that matches the provided username
    return await db.query.AuthOnUsersTable.findFirst({
        columns: {
            username: true, // Select the username column
            password: true, // Select the password column
            role: true,     // Select the role column
        }, 
        where: sql`${AuthOnUsersTable.username} = ${username}`, // SQL condition to match the username
        with: {
            user: {
                columns: {
                    name: true,         // Select the user's name
                    email: true,        // Select the user's email
                    contact_phone: true // Select the user's contact phone
                }
            }
        }
    })
}
