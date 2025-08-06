
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Job } from "../entities/Job";


dotenv.config();


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // use migrations instead
  logging: true,
  entities: [Job],
  migrations: ["src/migrations/**/*.ts"],
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

