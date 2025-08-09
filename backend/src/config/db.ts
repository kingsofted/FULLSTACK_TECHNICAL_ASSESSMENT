// src/db.ts
import knex, { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

export const db: Knex = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: false,  
    },
  },
  pool: { min: 2, max: 10 },
});
