import { eq } from "drizzle-orm"; // Importing the "eq" function for querying
import db from "../drizzle/db"; // Importing the database connection
import { OrdersTable } from "../drizzle/schema"; // Importing the OredersTable schema
import { TIOrders, TSOrders} from "../drizzle/schema"; // Importing the Orders types

// Function to retrieve orders
export const getOrdersService = async (): Promise<TSOrders[] | null> => {
    return await db.query.OrdersTable.findMany(); // Retrieving all orders
}

// Function to retrieve a specific order by ID
export const getOrderByIdService = async (id: number): Promise< TSOrders| undefined> => {
  return await db.query.OrdersTable.findFirst({
    where: eq(OrdersTable.order_id, id) // Querying the order by its ID
  });
}

// Function to create a new order
export const createOrderService = async (order: TIOrders) => {
  await db.insert(OrdersTable).values(order); // Inserting the new order into the database
  return "Order created successfully"; // Returning success message
}

// Function to update a specific order by ID
export const updateOrderByidService = async (id: number, order: TIOrders) => {
  await db.update(OrdersTable).set(order).where(eq(OrdersTable.order_id, id)); // Updating the order with the specified ID
  return "Order updated successfully"; // Returning success message
}

//fuction to delete order by id
export const deleteOrderByIdService = async (id: number) => {
  await db.delete(OrdersTable).where(eq(OrdersTable.order_id, id)); // Deleting the order with the specified ID
  return "Order deleted successfully"; // Returning success message
}
