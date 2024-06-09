import { eq } from "drizzle-orm"; // Importing the "eq" function for querying
import db from "../drizzle/db"; // Importing the database connection
import { DriverTable } from "../drizzle/schema"; // Importing the DriverTable schema
import { TIDriver, TSDriver } from "../drizzle/schema"; // Importing the Driver types

// Function to retrieve drivers
export const getdriversService = async (): Promise<TSDriver[] | null> => {
    return await db.query.DriverTable.findMany(); // Retrieving all drivers
}

// Function to retrieve a specific driver by ID
export const getDriverByIdService = async (id: number): Promise< TSDriver| undefined> => {
  return await db.query.DriverTable.findFirst({
    where: eq(DriverTable.driver_id, id) // Querying the driver by its ID
  });
}

// Function to create a new driver
export const createDriverService = async (driver: TIDriver) => {
  await db.insert(DriverTable).values(driver); // Inserting the new driver into the database
  return "Driver created successfully"; // Returning success message
}

// Function to update a specific driver by ID
export const updateDriverByidService = async (id: number, driver: TIDriver) => {
  await db.update(DriverTable).set(driver).where(eq(DriverTable.driver_id, id)); // Updating the driver with the specified ID
  return "Driver updated successfully";
}

//fuction to delete driver by id
export const deleteDriverByIdService = async (id: number) => {
  await db.delete(DriverTable).where(eq(DriverTable.driver_id, id)); // Deleting the driver with the specified ID
  return "Driver deleted successfully";
}


