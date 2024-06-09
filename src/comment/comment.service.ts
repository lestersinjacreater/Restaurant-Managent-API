import { eq } from "drizzle-orm"; // Importing the "eq" function for querying
import db from "../drizzle/db"; // Importing the database connection
import { CommentTable } from "../drizzle/schema"; // Importing the CommentTable schema
import { TIComment, TSComment } from "../drizzle/schema"; // Importing the Comment types

//retrive all comments
export const getcommentsService = async (): Promise<TSComment[] | null> => {
    return await db.query.CommentTable.findMany(); // Retrieving all comments
}

//retrive comment by id
export const getCommentByIdService = async (id: number): Promise< TSComment| undefined> => {
  return await db.query.CommentTable.findFirst({
    where: eq(CommentTable.comment_id, id) // Querying the comment by its ID
  });
}

//create comment
export const createCommentService = async (comment: TIComment) => {
  await db.insert(CommentTable).values(comment); // Inserting the new comment into the database
  return "Comment created successfully"; // Returning success message
}

//update comment by id
export const updateCommentByidService = async (id: number, comment: TIComment) => {
  await db.update(CommentTable).set(comment).where(eq(CommentTable.comment_id, id)); // Updating the comment with the specified ID
  return "Comment updated successfully"; // Returning success message
}

//delete comment by id
export const deleteCommentByIdService = async (id: number) => {
  await db.delete(CommentTable).where(eq(CommentTable.comment_id, id)); // Deleting the comment with the specified ID
  return "Comment deleted successfully"; // Returning success message
}


