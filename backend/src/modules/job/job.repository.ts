import { AppDataSource } from "../../config/db";
import { Job } from "../../entities/Job";
import { JobFilterInput } from "./job.types";

(async () => {
  await AppDataSource.initialize();
})();

export const jobRepository = AppDataSource.getRepository(Job).extend({

  // getJobs by Filter
  async findByFilter(filter: JobFilterInput): Promise<Job[]> {
    const qb = this.createQueryBuilder("job");

    if (filter.title) {
      qb.andWhere(
        "LOWER(job.title) LIKE LOWER(:title)",
        { title: `%${filter.title.trim()}%` }
      );
    }
    if (filter.company) {
      qb.andWhere(
        "LOWER(job.company) LIKE LOWER(:company)",
        { company: `%${filter.company.trim()}%` }
      );
    }

    if (filter.location) {
      qb.andWhere(
        "LOWER(job.location) LIKE LOWER(:location)",
        { location: `%${filter.location.trim()}%` }
      );
    }

    if (filter.experienceLevel) {
      qb.andWhere("LOWER(job.experienceLevel) = LOWER(:experienceLevel)", { experienceLevel: filter.experienceLevel });
    }
    if (filter.salaryRange && filter.salaryRange.length === 2) {
      qb.andWhere("job.salaryRange >= :minSalary AND job.salaryRange <= :maxSalary", {
        minSalary: filter.salaryRange[0],
        maxSalary: filter.salaryRange[1],
      });
    }
    if (filter.industry) {
      qb.andWhere("LOWER(job.industry) = (:industry)", { industry: filter.industry });
    }
    if (filter.requiredSkills && filter.requiredSkills.length > 0) {
      filter.requiredSkills.forEach((skill, index) => {
        qb.andWhere(`LOWER(job.requiredSkills) LIKE :skill${index}`, {
          [`skill${index}`]: `%${skill.toLowerCase()}%`,
        });
      });
    }
    qb.orderBy(
      filter.sortBy ? `job.${filter.sortBy}` : "job.createdAt",
      filter.sortOrder === "desc" ? "DESC" : "ASC"
    );

    return qb.getMany();
  }
});
