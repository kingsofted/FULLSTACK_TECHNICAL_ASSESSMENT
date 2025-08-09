import { Favorite } from "../../entities/Favorite";
import { jobService } from "../job/job.service";
import { favoriteRepository } from "./favorite.repository";

export const favoriteService = {
  async getAllFavorites() {
    return favoriteRepository.findAllWithJobs();
  },

  async addFavorite(jobId: number): Promise<Favorite> {

    const job = await jobService.getJobById(jobId);

    if (!job) throw new Error("Job not found");

    //Prevent duplicate favorites for the same job
    const existing = await favoriteRepository.findOne({ where: { jobId },relations:['job'] });
    console.log("ES: ", existing);
    if (existing) return existing;

    return favoriteRepository.addFavorite(jobId);
  },

  async removeFavorite(id: number) {
    const result = await favoriteRepository.removeById(id);
    return result.affected !== 0;
  },
};
