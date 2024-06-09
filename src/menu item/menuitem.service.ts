import { eq } from "drizzle-orm"; // Importing the "eq" function for querying
import db from "../drizzle/db"; // Importing the database connection
import { MenuItemTable } from "../drizzle/schema"; // Importing the MenuItemTable schema
import { TIMenuItem, TSMenuItem } from "../drizzle/schema"; // Importing the MenuItem types

// Function to retrieve menuitems
export const getMenuItemsService = async (): Promise<TSMenuItem[] | null> => {
    return await db.query.MenuItemTable.findMany(); // Retrieving all menuitems
}

// Function to retrieve a specific menuitem by ID
export const getMenuItemByIdService = async (id: number): Promise< TSMenuItem| undefined> => {
  return await db.query.MenuItemTable.findFirst({
    where: eq(MenuItemTable.menu_item_id, id) // Querying the menuitem by its ID
  });
}

// Function to create a new menuitem
export const createMenuItemService = async (menuitem: TIMenuItem) => {
  await db.insert(MenuItemTable).values(menuitem); // Inserting the new menuitem into the database
  return "MenuItem created successfully"; // Returning success message
}

// Function to update a specific menuitem by ID
export const updateMenuItemByidService = async (id: number, menuitem: TIMenuItem) => {
  await db.update(MenuItemTable).set(menuitem).where(eq(MenuItemTable.menu_item_id, id)); // Updating the menuitem with the specified ID
  return "MenuItem updated successfully";
}

//fuction to delete menuitem by id
export const deleteMenuItemByIdService = async (id: number) => {
  await db.delete(MenuItemTable).where(eq(MenuItemTable.menu_item_id, id)); // Deleting the menuitem with the specified ID
  return "MenuItem deleted successfully";
}



