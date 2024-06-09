import { eq } from "drizzle-orm"; // Importing the "eq" function for querying
import db from "../drizzle/db"; // Importing the database connection
import { OrderMenuItemTable } from "../drizzle/schema"; // Importing the OrederMenuItemTable schema
import { TIOrderMenuItem, TSOrderMenuItem} from "../drizzle/schema"; // Importing the OrderMenuItem types

// Function to retrieve order menu items
export const getOrderMenuItemsService = async (): Promise<TSOrderMenuItem[] | null> => {
    return await db.query.OrderMenuItemTable.findMany(); // Retrieving all order menu items
}

// Function to retrieve a specific order menu item by ID
export const getOrderMenuItemByIdService = async (id: number): Promise< TSOrderMenuItem| undefined> => {
  return await db.query.OrderMenuItemTable.findFirst({
    where: eq(OrderMenuItemTable.order_menu_item_id, id) // Querying the order menu item by its ID
  });
}

// Function to create a new order menu item
export const createOrderMenuItemService = async (orderMenuItem: TIOrderMenuItem) => {
  await db.insert(OrderMenuItemTable).values(orderMenuItem); // Inserting the new order menu item into the database
  return "Order menu item created successfully"; // Returning success message
}

// Function to update a specific order menu item by ID
export const updateOrderMenuItemByidService = async (id: number, orderMenuItem: TIOrderMenuItem) => {
  await db.update(OrderMenuItemTable).set(orderMenuItem).where(eq(OrderMenuItemTable.order_menu_item_id, id)); // Updating the order menu item with the specified ID
  return "Order menu item updated successfully"; // Returning success message
}

//fuction to delete order menu item by id
export const deleteOrderMenuItemByIdService = async (id: number) => {
  await db.delete(OrderMenuItemTable).where(eq(OrderMenuItemTable.order_menu_item_id, id)); // Deleting the order menu item with the specified ID
  return "Order menu item deleted successfully"; // Returning success message
}

