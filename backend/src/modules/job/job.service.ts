import { JOB_EVENTS } from "../../constant/constant";
import { Job } from "../../entities/Job";
import { errorMessages } from "../../error/errorMessage";
import { jobElasticService, JobElasticService } from "../../utils/elasticSearch/job.elasticSearch";
import { EventListener } from "../../utils/events/EventListener";
import { errorResponse, ResponseBase, successResponse } from "../../utils/response/ResponseBase";
import { createJobSchema } from "../../validations/validateModel";
import { favoriteService } from "../favorite/favorite.service";
import { jobRepository } from "./job.repository";
import { CreateJobInput, JobFilterInput, UpdateJobInput } from "./job.types";

export class JobService {


  async getAllJobs(filter: JobFilterInput): Promise<Job[]> {

    try {
      const jobs: Job[] = await jobRepository.findByFilter(filter);
      const favorites = await favoriteService.getAllFavorites();

      const favoriteMap = new Map<number, number>();
      favorites.forEach(fav => {
        favoriteMap.set(Number(fav.jobId), Number(fav.id));
      });

      return jobs.map(job => ({
        ...job,
        isFavorite: favoriteMap.has(job.id),
        favoriteId: favoriteMap.get(job.id) || null
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
        favoriteMap.set(Number(fav.jobId), Number(fav.id));
      });

      return {
        ...job,
        isFavorite: favoriteMap.has(job.id),   // Use job.job_id, not job.id (depending on your DB schema)
        favoriteId: favoriteMap.get(job.id) || null,
      };

    } catch (error) {
      throw new Error(errorMessages.FAILED_TO_GET_JOBS);
    }
  }



  async createJob(input: CreateJobInput): Promise<ResponseBase<Job | null>> {

    let newJob: Job | null = null;

    try {
      const validatedData = createJobSchema.parse(input);

      const job = jobRepository.create({
        title: validatedData.title,
        company: validatedData.company,
        location: validatedData.location,
        experienceLevel: validatedData.experienceLevel,
        salaryRange: validatedData.salaryRange,
        industry: validatedData.industry,
        requiredSkills: validatedData.requiredSkills,
        details: validatedData.details,
      });
      newJob = await jobRepository.save(job);
    } catch (error: any) {
      if (error.errors) {
        const message = error.errors.map((e: any) => e.message).join(", ");
        throw new Error(message);
      }
      throw new Error(error.message || String(error));
    }

    try {
      // Save to elasticsearch asynchronously
      EventListener.getInstance().notify({
        event: JOB_EVENTS.JOB_CREATED,
        data: newJob,
      });
    } catch (error: any) {
      throw Error(error.message)
    }

    return successResponse(newJob, "Job created successfully");
  }

  async deleteJob(id: number): Promise<any> {
    const job = await this.getJobById(id);

    try {
      // Delete asynchronously
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

    let job: Job;
    try {
      job = await this.getJobById(id);
      const updatedData = {
        ...job,
        ...input,
      };

      const validatedData = createJobSchema.parse(updatedData);

      job.title = validatedData.title;
      job.company = validatedData.company;
      job.location = validatedData.location;
      job.experienceLevel = validatedData.experienceLevel;
      job.salaryRange = validatedData.salaryRange;
      job.industry = validatedData.industry;
      job.requiredSkills = validatedData.requiredSkills;
      job.details = validatedData.details;


      try {
        // Update elasticSearch asynchronously
        EventListener.getInstance().notify({
          event: JOB_EVENTS.JOB_UPDATED,
          data: job,
        });
      } catch (error) {
        console.error(`Failed to dispatch job to Elasticsearch`, error);
      }

      return jobRepository.save(job);

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
