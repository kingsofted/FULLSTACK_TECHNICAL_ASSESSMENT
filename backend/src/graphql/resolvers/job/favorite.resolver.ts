import { Favorite } from "../../../entities/Favorite";
import { Job } from "../../../entities/Job";
import { favoriteService } from "../../../modules/favorite/favorite.service";


interface addFavoriteInput {
  input: {
    jobId: number
  }
}

interface removeFavoriteInput {
  input:{
    favoriteId: number
  }
}

export interface addFavoriteResponse{
  id: number,
  job: Job,
}

export const favoriteResolver = {
  Query: {
    favorites: async (): Promise<Favorite[]> => {
      try {
        return await favoriteService.getAllFavorites();
      
      } catch (error: any) {
        throw Error(error.message);
      }
    },
  },

  Mutation: {
    addFavorite: async (_: unknown, { input }: addFavoriteInput): Promise<addFavoriteResponse> => {
      try {
        return await favoriteService.addFavorite(input.jobId);
        
      } catch (error: any) {
        throw Error(error.message);
      }
    },

    removeFavorite: async (_: unknown, { input }: removeFavoriteInput): Promise<Boolean> => {
      try {
        return await favoriteService.removeFavorite(input.favoriteId);
  
      } catch (error:any) {
        throw Error(error.message);
      }
    },
  },
};
  