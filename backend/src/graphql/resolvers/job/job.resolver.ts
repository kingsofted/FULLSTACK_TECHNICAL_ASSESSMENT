import { jobService } from "../../../modules/job/job.service";
import { CreateJobInput, JobFilterInput, UpdateJobInput } from "../../../modules/job/job.types";

export const jobResolver = {
  Query: {
    getJobs: async (_: unknown, { filter }: { filter: JobFilterInput }) => {
      try {
        return await jobService.getAllJobs(filter);
      } catch (err: any) {
        throw new Error(err.message);
      }
    },

    getJobById: async (_: unknown, { id }: { id: number }) => {
      try {
        return await jobService.getJobById(id);
      } catch (err: any) {
        throw new Error(err.message);
      }
    },

    searchJobs: async (_: unknown, { query }: { query: string }) => {
      try {
        return await jobService.searchJobs(query);
      } catch (err: any) {
        throw new Error(err.message);
      }
    },

    getSimilarJobs: async (_: unknown, { jobId }: { jobId: number }) => {
      try {
        const job = await jobService.getJobById(jobId);
        return await jobService.getSimilarJobs(job);
      } catch (err: any) {
        throw new Error(err.message);
      }
    },
  },

  Mutation: {
    createJob: async (_: unknown, { input }: { input: CreateJobInput }) => {
      try {
        return await jobService.createJob(input);
      } catch (err: any) {
        throw new Error(err.message);
      }
    },

    deleteJob: async (_: unknown, { id }: { id: number }) => {
      try {
        await jobService.deleteJob(id);
        return true;
      } catch (err: any) {
        throw new Error(err.message);
      }
    },

    updateJob: async (_: unknown, { id, input }: { id: number; input: UpdateJobInput }) => {
      try {
        return await jobService.updateJob(id, input);
      } catch (err: any) {
        throw new Error(err.message);
      }
    },
  },
};
