import { AppDataSource } from "../../config/db";
import { Favorite } from "../../entities/Favorite";


export const favoriteRepository = AppDataSource.getRepository(Favorite).extend({
  async findAllWithJobs() {
    return this.find({ relations: ["job"] });
  },

  async findById(id: number) {
    return this.findOne({ where: { id }, relations: ["job"] });
  },

  async addFavorite(jobId: number) {
    const favorite = this.create({ jobId });
    return this.save(favorite);
  },

  async removeById(id: number) {
    return this.delete(id);
  },
});
