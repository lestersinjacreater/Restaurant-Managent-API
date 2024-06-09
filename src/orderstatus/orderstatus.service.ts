import { eq } from "drizzle-orm"; // Importing the "eq" function for querying
import db from "../drizzle/db"; // Importing the database connection
import { OrderStatusTable } from "../drizzle/schema"; // Importing the OrederstatusTable schema
import { TIOrderStatus, TSOrderStatus} from "../drizzle/schema"; // Importing the Orderstatus types

// Function to retrieve orderstatus
export const getOrderStatusService = async (): Promise<TSOrderStatus[] | null> => {
    return await db.query.OrderStatusTable.findMany(); // Retrieving all orderstatus
}

// Function to retrieve a specific orderstatus by ID
export const getOrderStatusByIdService = async (id: number): Promise< TSOrderStatus| undefined> => {
  return await db.query.OrderStatusTable.findFirst({
    where: eq(OrderStatusTable.order_status_id, id) // Querying the orderstatus by its ID
  });
}

// Function to create a new orderstatus
export const createOrderStatusService = async (orderstatus: TIOrderStatus) => {
  await db.insert(OrderStatusTable).values(orderstatus); // Inserting the new orderstatus into the database
  return "Orderstatus created successfully"; // Returning success message
}

// Function to update a specific orderstatus by ID
export const updateOrderStatusByidService = async (id: number, orderstatus: TIOrderStatus) => {
  await db.update(OrderStatusTable).set(orderstatus).where(eq(OrderStatusTable.order_status_id, id)); // Updating the orderstatus with the specified ID
  return "Orderstatus updated successfully"; // Returning success message
}

//fuction to delete orderstatus by id
export const deleteOrderStatusByIdService = async (id: number) => {
  await db.delete(OrderStatusTable).where(eq(OrderStatusTable.order_status_id, id)); // Deleting the orderstatus with the specified ID
  return "Orderstatus deleted successfully"; // Returning success message
}