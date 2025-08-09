import { errorMessages } from "../../error/errorMessage";
import { addFavoriteResponse } from "../../graphql/resolvers/job/favorite.resolver";
import { Favorite } from "../../modal/favorite";
import { jobService } from "../job/job.service";
import { favoriteRepository } from "./favorite.repository";

export const favoriteService = {
  async getAllFavorites(): Promise<Favorite[]> {
    try {
      const test = await favoriteRepository.findAllWithJobs();    

      return favoriteRepository.findAllWithJobs();    
    } catch (error) {
      throw new Error(errorMessages.FAILED_TO_GET_FAVORITE);
    }
  },

  async addFavorite(jobId: number): Promise<addFavoriteResponse> {
    try {
      const job = await jobService.getJobById(jobId);
  
      if (!job) throw new Error("Job not found");
  
      //Prevent duplicate favorites for the same job
      const existing = await favoriteRepository.findOne({ where: { jobId },relations:['job'] });
      if (existing) return existing;
  
      const response: addFavoriteResponse = {
        id: jobId,
        job: job
      }
      await favoriteRepository.addFavorite(jobId);

      return response;
      
    } catch (error) {
      throw new Error(errorMessages.FAILED_TO_ADD_FAVORITE)
    }
  },

  async removeFavorite(id: number): Promise<Boolean>{
    try {
      const result = await favoriteRepository.removeById(id);
      return result.affected !== 0;
      
    } catch (error) {
      throw new Error(errorMessages.FAILED_TO_REMOVE_FAVORITE);
    }
  },
};
