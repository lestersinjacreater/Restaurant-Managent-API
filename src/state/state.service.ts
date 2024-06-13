import { eq } from "drizzle-orm"; // Importing the "eq" function for querying
import db from "../drizzle/db"; // Importing the database connection
import { StateTable } from "../drizzle/schema"; // Importing the StateTable schema
import { TIState, TSState } from "../drizzle/schema"; // Importing the state types



// Function to retrieve states
export const getstatesService = async (): Promise<TSState[] | null> => {
    return await db.query.StateTable.findMany(); // Retrieving all states
}
// Function to retrieve a specific state by ID
export const getStateByIdService = async (id: number): Promise< TSState| undefined> => {
  return await db.query.StateTable.findFirst({
    where: eq(StateTable.state_id, id) // Querying the state by its ID
  });
}
// Function to create a new state
export const createStateService = async (state: TIState) => {
  await db.insert(StateTable).values(state); // Inserting the new state into the database
  return "State created successfully"; // Returning success message
}
// Function to update a specific state by ID
export const updateStateByidService = async (id: number, state: TIState) => {
  await db.update(StateTable).set(state).where(eq(StateTable.state_id, id)); // Updating the state with the specified ID
  return "State updated successfully";
}
//fuction to delete state by id
export const deleteStateByIdService = async (id: number) => {
  await db.delete(StateTable).where(eq(StateTable.state_id, id)); // Deleting the state with the specified ID
  return "State deleted successfully";
}

//function to get state cities
export const getStateCitiesService = async (id: number) => {
  return await db.query.StateTable.findFirst({
    where: eq(StateTable.state_id, id),
    with: {
      cities: true
    }
  });
}