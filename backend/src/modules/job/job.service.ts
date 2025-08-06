import { JOB_EVENTS } from "../../constant/constant";
import { Job } from "../../entities/Job";
import { errorMessages } from "../../error/errorMessage";
import { jobElasticService, JobElasticService } from "../../utils/elasticSearch/job.elasticSearch";
import { EventListener } from "../../utils/events/EventListener";
import { createJobSchema } from "../../validations/validateModel";
import { jobRepository } from "./job.repository";
import { CreateJobInput, UpdateJobInput } from "./job.types";

export class JobService {


  async getAllJobs(): Promise<Job[]> {
    const jobs: Job[] = await jobRepository.find();
    return jobs
  }

  async getJobById(id: number): Promise<Job> {
    const job = await jobRepository.findOneBy({ id });
    if (!job) throw new Error(errorMessages.JOB_NOT_FOUND);

    return job;
  }

  async createJob(input: CreateJobInput): Promise<Job> {

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

    const newJob = await jobRepository.save(job);

    try {
      // Save to elasticsearch asynchronously
      EventListener.getInstance().notify({
        event: JOB_EVENTS.JOB_CREATED,
        data: newJob,
      });
    } catch (error) {
      console.error(`Failed to dispatch job to Elasticsearch`, error);
    }

    return newJob;
  }

  async deleteJob(id: number): Promise<Job> {
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

  async updateJob(id: number, input: Partial<UpdateJobInput>): Promise<Job> {
    const job = await this.getJobById(id);

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
