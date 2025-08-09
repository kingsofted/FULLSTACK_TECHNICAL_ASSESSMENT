import { JOB_EVENTS } from "../../constant/constant";
import { errorMessages } from "../../error/errorMessage";
import { Job } from "../../modal/job";
import { jobElasticService } from "../../utils/elasticSearch/job.elasticSearch";
import { EventListener } from "../../utils/events/EventListener";
import { ResponseBase, successResponse } from "../../utils/response/ResponseBase";
import { createJobSchema } from "../../validations/validateModel";
import { favoriteService } from "../favorite/favorite.service";
import { jobRepository } from "./job.repository";
import { CreateJobInput, JobFilterInput, UpdateJobInput } from "./job.types";

export class JobService {
  async getAllJobs(filter: JobFilterInput): Promise<Job[]> {
    try {
      const jobs = await jobRepository.findByFilter(filter);
      const favorites = await favoriteService.getAllFavorites();

      const favoriteMap = new Map<number, number>();
      favorites.forEach(fav => {
        favoriteMap.set(Number(fav.job_id), Number(fav.id)); // use job_id
      });

      return jobs.map(job => ({
        ...job,
        isFavorite: favoriteMap.has(job.job_id),
        favoriteId: favoriteMap.get(job.job_id) || null,
      }));
    } catch (error) {
      throw new Error(errorMessages.FAILED_TO_GET_JOBS);
    }
  }

  async getJobById(id: number): Promise<Job & { isFavorite: boolean; favoriteId: number | null }> {
    try {
      const job = await jobRepository.findOneBy({ id });
      if (!job) throw new Error(errorMessages.JOB_NOT_FOUND);

      const favorites = await favoriteService.getAllFavorites();

      const favoriteMap = new Map<number, number>();
      favorites.forEach(fav => {
        favoriteMap.set(Number(fav.job_id), Number(fav.id));
      });

      return {
        ...job,
        isFavorite: favoriteMap.has(job.job_id),
        favoriteId: favoriteMap.get(job.job_id) || null,
      };
    } catch (error) {
      throw new Error(errorMessages.FAILED_TO_GET_JOBS);
    }
  }

  async createJob(input: CreateJobInput): Promise<Job | null> {
    let newJob: Job | null = null;

    try {
      const validatedData = createJobSchema.parse(input);

      const jobData: Partial<Job> = {
        job_title: validatedData.title,
        company: validatedData.company,
        location: validatedData.location,
        experience_level: validatedData.experienceLevel,
        salary_range: validatedData.salaryRange,
        industry: validatedData.industry,
        required_skills: validatedData.requiredSkills,
        details: validatedData.details,
      };

      newJob = await jobRepository.create(jobData);
    } catch (error: any) {
      if (error.errors) {
        const message = error.errors.map((e: any) => e.message).join(", ");
        throw new Error(message);
      }
      throw new Error(error.message || String(error));
    }

    try {
      EventListener.getInstance().notify({
        event: JOB_EVENTS.JOB_CREATED,
        data: newJob,
      });
    } catch (error: any) {
      throw Error(error.message);
    }
    console.log("JOB: ", newJob)
    return newJob;
  }

  async deleteJob(id: number): Promise<number> {
    const job = await this.getJobById(id);

    try {
      EventListener.getInstance().notify({
        event: JOB_EVENTS.JOB_DELETED,
        data: job,
      });
    } catch (error) {
      console.error(`Failed to dispatch job to Elasticsearch`, error);
    }
    return jobRepository.remove(job);
  }

  async updateJob(id: number, input: Partial<UpdateJobInput>): Promise<Job | null> {
    try {
      const job = await this.getJobById(id);

      const updatedData: Partial<Job> = {
        ...job,
        ...input,
        job_title: String(input.title) ?? job.job_title,
        company: String(input.company) ?? job.company,
        location: String(input.location) ?? job.location,
        experience_level: input.experienceLevel ?? job.experience_level,
        salary_range: input.salaryRange ?? job.salary_range,
        industry: String(input.industry) ?? job.industry,
        required_skills: String(input.requiredSkills) ?? job.required_skills,
        details: String(input.details) ?? job.details,
        created_at: job.created_at,  // Usually unchanged
        updated_at: new Date(),      // Updated to current time
      };


      const validatedData = createJobSchema.parse({
        title: updatedData.job_title,
        company: updatedData.company,
        location: updatedData.location,
        experienceLevel: updatedData.experience_level,
        salaryRange: updatedData.salary_range,
        industry: updatedData.industry,
        requiredSkills: updatedData.required_skills,
        details: updatedData.details,
      });

      const savedJob = await jobRepository.save({
        ...job,
        job_title: validatedData.title,
        company: validatedData.company,
        location: validatedData.location,
        experience_level: validatedData.experienceLevel,
        salary_range: validatedData.salaryRange,
        industry: validatedData.industry,
        required_skills: validatedData.requiredSkills,
        details: validatedData.details,
      });

      try {
        EventListener.getInstance().notify({
          event: JOB_EVENTS.JOB_UPDATED,
          data: savedJob,
        });
      } catch (error) {
        console.error(`Failed to dispatch job to Elasticsearch`, error);
      }

      return savedJob;
    } catch (error: any) {
      if (error.errors) {
        const message = error.errors.map((e: any) => e.message).join(", ");
        throw new Error(message);
      }
      throw new Error(error.message || String(error));
    }
  }

  // ElasticSearch related methods
  async searchJobs(query: string): Promise<Job[]> {
    return jobElasticService.searchJobs(query);
  }

  async getSimilarJobs(job: Job): Promise<Job[]> {
    return jobElasticService.recommendJobs(job);
  }
}

export const jobService = new JobService();
