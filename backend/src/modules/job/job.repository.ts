import knex from "knex";
import { JobFilterInput } from "./job.types";
import { Job } from "../../modal/job";
import { db } from "../../config/db";

export const jobRepository = {
  async findByFilter(filter: JobFilterInput): Promise<Job[]> {
    const qb = db("jobs").select("*");

    if (filter.title) {
      qb.whereILike("job_title", `%${filter.title.trim()}%`);
    }
    if (filter.company) {
      qb.whereILike("company", `%${filter.company.trim()}%`);
    }
    if (filter.location) {
      qb.whereILike("location", `%${filter.location.trim()}%`);
    }
    if (filter.experienceLevel) {
      qb.whereRaw("LOWER(experience_level) = LOWER(?)", [filter.experienceLevel]);
    }
    if (filter.salaryRange && filter.salaryRange.length === 2) {
      qb.whereBetween("salary_range", [filter.salaryRange[0], filter.salaryRange[1]]);
    }
    if (filter.industry) {
      qb.whereRaw("LOWER(industry) = LOWER(?)", [filter.industry]);
    }
    if (filter.requiredSkills && filter.requiredSkills.length > 0) {
      filter.requiredSkills.forEach(skill => {
        qb.whereILike("required_skills", `%${skill.toLowerCase()}%`);
      });
    }

    const allowedSortFields = [
      "job_title", "company", "location", "experience_level",
      "salary_range", "industry", "created_at", "updated_at"
    ];

    const sortBy =
      filter.sortBy && allowedSortFields.includes(String(filter.sortBy))
        ? filter.sortBy
        : "created_at";

    const sortOrder =
      filter.sortOrder && filter.sortOrder.toLowerCase() === "desc"
        ? "desc"
        : "asc";

    qb.orderBy(String(sortBy), sortOrder);

    return qb;
  },

  async findOneBy(where: { id: number }): Promise<Job | undefined> {
    return db("jobs")
      .where("job_id", where.id)
      .first();
  },

  async create(data: Partial<Job>): Promise<Job> {
    // Insert and return inserted row
    const [job] = await db("jobs")
      .insert(data)
      .returning("*");
    return job;
  },

  async save(job: Partial<Job>): Promise<Job> {
    if (!job.job_id) {
      throw new Error("job_id is required for update");
    }
    const [updatedJob] = await db("jobs")
      .where("job_id", job.job_id)
      .update(job)
      .returning("*");
    return updatedJob;
  },

  async remove(job: Job): Promise<number> {
    return db("jobs")
      .where("job_id", job.job_id)
      .del();
  },
};
