import { eq } from "drizzle-orm"; // Importing the "eq" function for querying
import db from "../drizzle/db"; // Importing the database connection
import { AddressTable } from "../drizzle/schema"; // Importing the AddressTable schema
import { TIAddress, TSAddress } from "../drizzle/schema"; // Importing the Address types

// Function to retrieve addresses
export const getaddressesService = async (): Promise<TSAddress[] | null> => {
    return await db.query.AddressTable.findMany(); // Retrieving all addresses
}

// Function to retrieve a specific address by ID
export const getAddressByIdService = async (id: number): Promise< TSAddress| undefined> => {
  return await db.query.AddressTable.findFirst({
    where: eq(AddressTable.address_id, id) // Querying the address by its ID
  });
}

// Function to create a new address
export const createAddressService = async (address: TIAddress) => {
  await db.insert(AddressTable).values(address); // Inserting the new address into the database
  return "Address created successfully"; // Returning success message
}

// Function to update a specific address by ID
export const updateAddressByidService = async (id: number, address: TIAddress) => {
  await db.update(AddressTable).set(address).where(eq(AddressTable.address_id, id)); // Updating the address with the specified ID
  return "Address updated successfully";
}

//fuction to delete address by id
export const deleteAddressByIdService = async (id: number) => {
  await db.delete(AddressTable).where(eq(AddressTable.address_id, id)); // Deleting the address with the specified ID
  return "Address deleted successfully";
}