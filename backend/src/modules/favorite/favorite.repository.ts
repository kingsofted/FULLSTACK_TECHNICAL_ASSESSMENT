// repositories/favoriteRepository.ts

import { db } from "../../config/db";


export const favoriteRepository = {
  async findAllWithJobs() {
    return db("favorites")
      .join("jobs", "favorites.jobId", "jobs.id")
      .select(
        "favorites.*",
        "jobs.title as jobTitle",
        "jobs.description as jobDescription"
      );
  },

  async findById(id: number) {
    return db("favorites")
      .join("jobs", "favorites.jobId", "jobs.id")
      .where("favorites.id", id)
      .select(
        "favorites.*",
        "jobs.title as jobTitle",
        "jobs.description as jobDescription"
      )
      .first();
  },

  async addFavorite(jobId: number) {
    const [favorite] = await db("favorites")
      .insert({ jobId })
      .returning("*"); // PostgreSQL supports returning
    return favorite;
  },

  async removeById(id: number) {
    return db("favorites").where({ id }).del();
  }
};
