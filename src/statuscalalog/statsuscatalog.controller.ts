import { Context } from "hono";
import {getStatusCatalogService,getStatusCatalogByIdService,createStatusCatalogService,updateStatusCatalogByidService,deleteStatusCatalogByIdService } from "./statuscatalog.service";

//get all statuscatalog
export const getStatusCatalogController = async (c: Context) => {
    try {
        const statuscatalog = await getStatusCatalogService();
        if (statuscatalog == null || statuscatalog.length == 0) {
            return c.text("No statuscatalog found", 404);
        }
        return c.json(statuscatalog, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);

    }

};

// create statuscatalog
export const createStatusCatalogController = async (c: Context) => {
    try {
        const statuscatalog = await c.req.json();
        const newStatusCatalog = await createStatusCatalogService(statuscatalog);

        if (!newStatusCatalog) return c.text("Statuscatalog not created", 400);
        return c.json({ message: newStatusCatalog }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get statuscatalog by id
export const getStatusCatalogByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const statuscatalog = await getStatusCatalogByIdService(id);
        if (statuscatalog == null) {
            return c.text("Statuscatalog not found", 404);
        }
        return c.json(statuscatalog, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//update statuscatalog

export const updateStatusCatalogController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.json({ error: "Invalid id" }, 400);
        }

        const statuscatalog = await c.req.json();

        // Search for the status catalog by id
        const existingStatusCatalog = await getStatusCatalogByIdService(id);
        if (!existingStatusCatalog) {
            return c.json({ error: "Status catalog not found" }, 404);
        }

        await updateStatusCatalogByidService(id, statuscatalog);
        return c.json({ message: "Status catalog updated successfully" }, 200);
    } catch (error) {
        console.error('Error updating status catalog:', error);
        return c.json({ error: "Internal server error" }, 500);
    }
};


//delete statuscatalog
export const deleteStatusCatalogController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const statuscatalog = await getStatusCatalogByIdService(id);

        if (!statuscatalog) return c.text("Statuscatalog not found", 404);
        await deleteStatusCatalogByIdService(id);
        return c.text("Statuscatalog deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


