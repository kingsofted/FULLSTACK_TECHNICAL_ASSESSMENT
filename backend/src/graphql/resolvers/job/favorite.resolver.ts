import { favoriteService } from "../../../modules/favorite/favorite.service";


interface addFavoriteInput {
  input: {
    jobId: number
  }
}

interface removeFavoriteInput {
  input:{
    jobId: number
  }
}

export const favoriteResolver = {
  Query: {
    favorites: async () => {
      return favoriteService.getAllFavorites();
    },
  },

  Mutation: {
    addFavorite: async (_: unknown, { input }: addFavoriteInput) => {
      return favoriteService.addFavorite(input.jobId);
    },

    removeFavorite: async (_: unknown, { input }: removeFavoriteInput) => {
      return favoriteService.removeFavorite(input.jobId);
    },
  },
};
