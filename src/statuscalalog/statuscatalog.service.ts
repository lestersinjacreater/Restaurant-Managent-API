import { eq } from "drizzle-orm"; // Importing the "eq" function for querying
import db from "../drizzle/db"; // Importing the database connection
import { StatusCatalogTable } from "../drizzle/schema"; // Importing the StatusCatalogTable schema
import { TIStatusCatalog, TSStatusCatalog} from "../drizzle/schema"; // Importing the StatusCatalog types

// Function to retrieve statuscatalog
export const getStatusCatalogService = async (): Promise<TSStatusCatalog[] | null> => {
    return await db.query.StatusCatalogTable.findMany(); // Retrieving all statuscatalog
}

// Function to retrieve a specific statuscatalog by ID
export const getStatusCatalogByIdService = async (id: number): Promise< TSStatusCatalog| undefined> => {
  return await db.query.StatusCatalogTable.findFirst({
    where: eq(StatusCatalogTable.status_catalog_id, id) // Querying the statuscatalog by its ID
  });
}

// Function to create a new statuscatalog
export const createStatusCatalogService = async (statuscatalog: TIStatusCatalog) => {
  await db.insert(StatusCatalogTable).values(statuscatalog); // Inserting the new statuscatalog into the database
  return "Statuscatalog created successfully"; // Returning success message
}

// Function to update a specific statuscatalog by ID
export const updateStatusCatalogByidService = async (id: number, statuscatalog: TIStatusCatalog) => {
  await db.update(StatusCatalogTable).set(statuscatalog).where(eq(StatusCatalogTable.status_catalog_id, id)); // Updating the statuscatalog with the specified ID
  return "Statuscatalog updated successfully"; // Returning success message
}

//fuction to delete statuscatalog by id
export const deleteStatusCatalogByIdService = async (id: number) => {
  await db.delete(StatusCatalogTable).where(eq(StatusCatalogTable.status_catalog_id, id)); // Deleting the statuscatalog with the specified ID
  return "Statuscatalog deleted successfully"; // Returning success message
}