
import knex from "knex";
import { JobFilterInput } from "./job.types";

export const jobRepository = {
  async findByFilter(filter: JobFilterInput) {
    const qb = knex("job").select("*");

    if (filter.title) {
      qb.whereILike("job.title", `%${filter.title.trim()}%`);
    }
    if (filter.company) {
      qb.whereILike("job.company", `%${filter.company.trim()}%`);
    }
    if (filter.location) {
      qb.whereILike("job.location", `%${filter.location.trim()}%`);
    }
    if (filter.experienceLevel) {
      qb.whereRaw("LOWER(job.experienceLevel) = LOWER(?)", [filter.experienceLevel]);
    }
    if (filter.salaryRange && filter.salaryRange.length === 2) {
      qb.whereBetween("job.salaryRange", [filter.salaryRange[0], filter.salaryRange[1]]);
    }
    if (filter.industry) {
      qb.whereRaw("LOWER(job.industry) = LOWER(?)", [filter.industry]);
    }
    if (filter.requiredSkills && filter.requiredSkills.length > 0) {
      filter.requiredSkills.forEach((skill) => {
        qb.whereILike("job.requiredSkills", `%${skill.toLowerCase()}%`);
      });
    }

    // ✅ Ensure sortBy is a string
    const sortBy = filter.sortBy ? `job.${filter.sortBy}` : "job.createdAt";
    const sortOrder = filter.sortOrder === "desc" ? "desc" : "asc";

    qb.orderBy(sortBy, sortOrder);

    return qb;
  }
};
