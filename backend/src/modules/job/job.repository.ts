import { AppDataSource } from "../../config/db";
import { Job } from "../../entities/Job";

(async () => {
  await AppDataSource.initialize();
})();

export const jobRepository = AppDataSource.getRepository(Job);
