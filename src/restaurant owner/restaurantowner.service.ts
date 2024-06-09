import { eq } from "drizzle-orm"; // Importing the "eq" function for querying
import db from "../drizzle/db"; // Importing the database connection
import { RestaurantOwnerTable } from "../drizzle/schema"; // Importing the RestaurantOwnertable schema
import { TIRestaurantOwner, TSRestaurantOwner } from "../drizzle/schema"; // Importing the RestaurantOwner types

//retrive all restaurant owners
export const getrestaurantownersService = async (): Promise<TSRestaurantOwner[] | null> => {
    return await db.query.RestaurantOwnerTable.findMany(); // Retrieving all restaurant owners
}
//retrive restaurant owner by id
export const getRestaurantOwnerByIdService = async (id: number): Promise< TSRestaurantOwner| undefined> => {
  return await db.query.RestaurantOwnerTable.findFirst({
    where: eq(RestaurantOwnerTable.restaurant_owner_id, id) // Querying the restaurant owner by its ID
  });
}
//create restaurant owner
export const createRestaurantOwnerService = async (restaurantowner: TIRestaurantOwner) => {
  await db.insert(RestaurantOwnerTable).values(restaurantowner); // Inserting the new restaurant owner into the database
  return "Restaurant Owner created successfully"; // Returning success message
}
//update restaurant owner by id
export const updateRestaurantOwnerByidService = async (id: number, restaurantowner: TIRestaurantOwner) => {
  await db.update(RestaurantOwnerTable).set(restaurantowner).where(eq(RestaurantOwnerTable.restaurant_owner_id, id)); // Updating the restaurant owner with the specified ID
  return "Restaurant Owner updated successfully"; // Returning success message
}
//delete restaurant owner by id
export const deleteRestaurantOwnerByIdService = async (id: number) => {
  await db.delete(RestaurantOwnerTable).where(eq(RestaurantOwnerTable.restaurant_owner_id, id)); // Deleting the restaurant owner with the specified ID
  return "Restaurant Owner deleted successfully"; // Returning success message
}
