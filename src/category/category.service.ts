import { eq } from "drizzle-orm"; // Importing the "eq" function for querying
import db from "../drizzle/db"; // Importing the database connection
import { CategoryTable } from "../drizzle/schema"; // Importing the CategoryTable schema
import { TICategory, TSCategory} from "../drizzle/schema"; // Importing the Category types

// Function to retrieve categories
export const getCategoriesService = async (): Promise<TSCategory[] | null> => {
    return await db.query.CategoryTable.findMany(); // Retrieving all categories
}

// Function to retrieve a specific category by ID
export const getCategoryByIdService = async (id: number): Promise< TSCategory| undefined> => {
  return await db.query.CategoryTable.findFirst({
    where: eq(CategoryTable.category_id, id) // Querying the category by its ID
  });
}

// Function to create a new category
export const createCategoryService = async (category: TICategory) => {
  await db.insert(CategoryTable).values(category); // Inserting the new category into the database
  return "Category created successfully"; // Returning success message
}

// Function to update a specific category by ID
export const updateCategoryByidService = async (id: number, category: TICategory) => {
  await db.update(CategoryTable).set(category).where(eq(CategoryTable.category_id, id)); // Updating the category with the specified ID
  return "Category updated successfully";
}

//fuction to delete category by id
export const deleteCategoryByIdService = async (id: number) => {
  await db.delete(CategoryTable).where(eq(CategoryTable.category_id, id)); // Deleting the category with the specified ID
  return "Category deleted successfully";
}


