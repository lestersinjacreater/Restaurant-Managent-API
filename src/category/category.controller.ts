import { Context } from "hono";
import { getCategoriesService,getCategoryByIdService,createCategoryService,updateCategoryByidService,deleteCategoryByIdService} from "./category.service";

//get all categories
export const getCategoriesController = async (c: Context) => {
    try {
        const categories = await getCategoriesService();
        if (categories == null || categories.length == 0) {
            return c.text("No  categories  found", 404);
        }
        return c.json(categories, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);

    }

};

// create category
export const createCategoryController = async (c: Context) => {
    try {
        const category = await c.req.json();
        const newCategory = await createCategoryService(category);

        if (!newCategory) return c.text("Category not created", 400);
        return c.json({ message: newCategory }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get category by id
export const getCategoryByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const category = await getCategoryByIdService(id);
        if (category == null) {
            return c.text("Category not found", 404);
        }
        return c.json(category, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//update category
export const updateCategoryController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const category = await c.req.json();

        // search for user by id
        const updatedCategory = await getCategoryByIdService(id);
        if (!updatedCategory) return c.text("Category not found", 404);
        await updateCategoryByidService(id, category);
        return c.text("Category updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//delete category
export const deleteCategoryController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const category = await getCategoryByIdService(id);
        if (!category) return c.text("Category not found", 404);
        await deleteCategoryByIdService(id);
        return c.text("Category deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

