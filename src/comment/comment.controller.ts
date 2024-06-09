import { Context } from "hono";
import { getcommentsService,getCommentByIdService,createCommentService,updateCommentByidService,deleteCommentByIdService } from "./comment.service"

//get all comments
export const getCommentsController = async (c: Context) => {
    try {
        const comments = await getcommentsService();
        if (comments == null || comments.length == 0) {
            return c.text("No comments found", 404);
        }
        return c.json(comments, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);

    }

};

// create comment
export const createCommentController = async (c: Context) => {
    try {
        const comment = await c.req.json();
        const newComment = await createCommentService(comment);

        if (!newComment) return c.text("Comment not created", 400);
        return c.json({ message: newComment }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get comment by id
export const getCommentByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const comment = await getCommentByIdService(id);
        if (comment == null) {
            return c.text("Comment not found", 404);
        }
        return c.json(comment, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//update comment
export const updateCommentController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const comment = await c.req.json();

        // search for user by id
        const updatedComment = await getCommentByIdService(id);
        if (!updatedComment) return c.text("Comment not found", 404);
        await updateCommentByidService(id, comment);
        return c.text("Comment updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//delete comment
export const deleteCommentController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const comment = await getCommentByIdService(id);
        if (!comment) return c.text("Comment not found", 404);
        await deleteCommentByIdService(id);
        return c.text("Comment deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};
