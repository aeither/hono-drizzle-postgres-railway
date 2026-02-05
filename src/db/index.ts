import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "development"
      ? process.env.DATABASE_PUBLIC_URL
      : process.env.DATABASE_URL,
});

export const db = drizzle(pool);
