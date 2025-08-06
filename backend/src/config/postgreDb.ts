import { errorMessages } from "../error/errorMessage";
import dotenv from "dotenv";


dotenv.config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? process.env.DB_PORT : 5432,
  ssl:{
    require: true,
  }
});


const initializeDatabase = async () => {
  try {
    const connection = await pool.connect();

    try {
      // Check if the table exists
      const result = await connection.query(
        "SELECT to_regclass('public.jobs') AS table_name;"
      );

      if (!result.rows[0].table_name) {
        console.log("Table 'jobs' does not exist. Creating...");
        const createTableSQL = `
        CREATE TABLE jobs (
            job_id SERIAL PRIMARY KEY, 
            job_title VARCHAR(255) NOT NULL, 
            company VARCHAR(255) NOT NULL,
            location VARCHAR(100) NOT NULL, 
            experience_level VARCHAR(50) CHECK (experience_level IN ('Entry-Level', 'Mid-Level', 'Senior-Level')),
            salary_range NUMERIC(8, 2),
            industry VARCHAR(100), 
            required_skills TEXT
        );

          CREATE INDEX idx_jobs_company ON jobs(company);
          CREATE INDEX idx_jobs_location ON jobs(location);
          CREATE INDEX idx_jobs_experience_level ON jobs(experience_level);
          CREATE INDEX idx_jobs_industry ON jobs(industry);
          CREATE INDEX idx_jobs_job_title ON jobs(job_title);

        `;
        try {
          await connection.query(createTableSQL);
          console.log("Table 'jobs' created successfully.");
        } catch (tableCreationError) {
          console.error(errorMessages.TABLE_CREATION_FAILED, tableCreationError);
          throw new Error(errorMessages.TABLE_CREATION_FAILED);
        }
      } else {
        console.log("Table 'jobs' already exists. Skipping creation.");
      }
    } catch (checkError) {
      console.error(errorMessages.TABLE_EXISTS_CHECK_FAILED, checkError);
      throw new Error(errorMessages.TABLE_EXISTS_CHECK_FAILED);
    } finally {
      connection.release();
    }
  } catch (connectionError) {
    console.error(errorMessages.DATABASE_CONNECTION_FAILED, connectionError);
    throw new Error(errorMessages.DATABASE_CONNECTION_FAILED);
  }
};

export { pool, initializeDatabase };

export default pool;
