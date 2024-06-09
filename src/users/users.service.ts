import { eq } from "drizzle-orm"; // Importing the "eq" function for querying
import db from "../drizzle/db"; // Importing the database connection
import { UsersTable } from "../drizzle/schema"; // Importing the usersTable schema
import { TIUsers, TSUsers } from "../drizzle/schema"; // Importing the users types

// Function to retrieve users
export const getUsersService = async (): Promise<TSUsers[] | null> => {
    return await db.query.UsersTable.findMany(); // Retrieving all users
}

// Function to retrieve a specific user by ID
export const getUserByIdService = async (id: number): Promise< TSUsers| undefined> => {
  return await db.query.UsersTable.findFirst({
    where: eq(UsersTable.user_id, id) // Querying the user by its ID
  });
}

// Function to create a new user
export const createUserService = async (user: TIUsers) => {
  await db.insert(UsersTable).values(user); // Inserting the new user into the database
  return "User created successfully"; // Returning success message
}

// Function to update a specific user by ID
export const updateUserByidService = async (id: number, user: TIUsers) => {
  await db.update(UsersTable).set(user).where(eq(UsersTable.user_id, id)); // Updating the user with the specified ID
  return "User updated successfully"; // Returning success message
}

//fuction to delete user by id
export const deleteUserByIdService = async (id: number) => {
  await db.delete(UsersTable).where(eq(UsersTable.user_id, id)); // Deleting the user with the specified ID
  return "User deleted successfully"; // Returning success message
}
//