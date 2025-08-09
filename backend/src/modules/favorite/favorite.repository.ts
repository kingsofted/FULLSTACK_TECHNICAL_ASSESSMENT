import { db } from "../../config/db";

export const favoriteRepository = {
  async findAllWithJobs() {
    return db("favorites")
      .join("jobs", "favorites.job_id", "jobs.job_id")
      .select(
        "favorites.*",
        "jobs.job_title as jobTitle",
        "jobs.details as jobDescription"
      );
  },


  async findOne(opts: { where: { jobId: number }; relations: string[] }) {

    const { jobId } = opts.where;
    return db("favorites")
      .join("jobs", "favorites.job_id", "jobs.job_id")
      .where("favorites.job_id", jobId)
      .select(
        "favorites.*",
        "jobs.job_title as jobTitle",
        "jobs.details as jobDescription"
      )
      .first();
  },

  async addFavorite(jobId: number) {
    const [favorite] = await db("favorites")
      .insert({ job_id: jobId })
      .returning("*");
    return favorite;
  },

  async removeById(id: number) {
    const deletedCount = await db("favorites").where({ id }).del();
    return { affected: deletedCount }; // match expected return shape
  },
};
