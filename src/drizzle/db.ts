
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema"

export const client =  neon(process.env.Database_URL!)



const db = drizzle(client, { schema, logger: true })  //create a drizzle instance

export default db;  //export the drizzle instance
