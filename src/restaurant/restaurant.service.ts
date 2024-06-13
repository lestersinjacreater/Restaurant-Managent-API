import { eq } from "drizzle-orm"; // Importing the "eq" function for querying
import db from "../drizzle/db"; // Importing the database connection
import { RestaurantTable } from "../drizzle/schema"; // Importing the RestaurantTable schema
import { TIRestaurant, TSRestaurant } from "../drizzle/schema"; // Importing the Restaurant types

// Function to retrieve restaurants
export const getrestaurantsService = async (): Promise<TSRestaurant[] | null> => {
    return await db.query.RestaurantTable.findMany(); // Retrieving all restaurants
}

// Function to retrieve a specific restaurant by ID
export const getRestaurantByIdService = async (id: number): Promise< TSRestaurant| undefined> => {
  return await db.query.RestaurantTable.findFirst({
    where: eq(RestaurantTable.restaurant_id, id) // Querying the restaurant by its ID
  });
}

// Function to create a new restaurant
export const createRestaurantService = async (restaurant: TIRestaurant) => {
  await db.insert(RestaurantTable).values(restaurant); // Inserting the new restaurant into the database
  return "Restaurant created successfully"; // Returning success message
}

// Function to update a specific restaurant by ID
export const updateRestaurantByidService = async (id: number, restaurant: TIRestaurant) => {
  await db.update(RestaurantTable).set(restaurant).where(eq(RestaurantTable.restaurant_id, id)); // Updating the restaurant with the specified ID
  return "Restaurant updated successfully";
}


//fuction to delete restaurant by id
export const deleteRestaurantByIdService = async (id: number) => {
  await db.delete(RestaurantTable).where(eq(RestaurantTable.restaurant_id, id)); // Deleting the restaurant with the specified ID
  return "Restaurant deleted successfully";
}
