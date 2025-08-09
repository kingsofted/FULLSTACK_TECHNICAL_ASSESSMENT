import type { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT || 5432),
      ssl: {
        rejectUnauthorized: false 
      }
    },
    migrations: {
      directory: "./src/migrations",
      extension: "ts"
    },
    seeds: {
      directory: "./seeds"
    }
  }
};

export default config;
