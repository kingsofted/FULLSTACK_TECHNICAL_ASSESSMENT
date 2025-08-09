
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Job } from "../entities/Job";
import { Favorite } from "../entities/Favorite";


dotenv.config();


const isCompiled = __filename.endsWith(".js");

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [Job, Favorite],
  migrations: [
    isCompiled ? "dist/migrations/**/*.js" : "src/migrations/**/*.ts"
  ],
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});


(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
})();
