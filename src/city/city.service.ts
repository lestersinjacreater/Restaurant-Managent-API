import { eq } from "drizzle-orm"; // Importing the "eq" function for querying
import db from "../drizzle/db"; // Importing the database connection
import { CityTable } from "../drizzle/schema"; // Importing the CityTable schema
import { TICity, TSCity } from "../drizzle/schema"; // Importing the City types

//retrive all cities
export const getcitiesService = async (): Promise<TSCity[] | null> => {
    return await db.query.CityTable.findMany(); // Retrieving all cities
}

//retrive city by id
export const getCityByIdService = async (id: number): Promise< TSCity| undefined> => {
  return await db.query.CityTable.findFirst({
    where: eq(CityTable.city_id, id) // Querying the city by its ID
  });
}

//create city
export const createCityService = async (city: TICity) => {
  await db.insert(CityTable).values(city); // Inserting the new city into the database
  return "City created successfully"; // Returning success message
}

//update city by id
export const updateCityByidService = async (id: number, city: TICity) => {
  await db.update(CityTable).set(city).where(eq(CityTable.city_id, id)); // Updating the city with the specified ID
  return "City updated successfully"; // Returning success message
}

//delete city by id
export const deleteCityByIdService = async (id: number) => {
  await db.delete(CityTable).where(eq(CityTable.city_id, id)); // Deleting the city with the specified ID
  return "City deleted successfully"; // Returning success message
}

//get city restaurants
export const getCityRestaurantsService = async (id: number) => {
  return await db.query.CityTable.findFirst({
    where: eq(CityTable.city_id, id),
    with: {
      restaurants: true
    }
  });
}
