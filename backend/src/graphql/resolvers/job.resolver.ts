import { jobService } from "../../modules/job/job.service";
import { CreateJobInput, UpdateJobInput } from "../../modules/job/job.types";

export const jobResolver = {
  Query: {
    getJobs: async () => {
      return jobService.getAllJobs();
    },
    getJobById: async (_: unknown, { id }: { id: number }) => {
      return jobService.getJobById(id);
    },
    searchJobs: async (_: unknown, { query }: { query: string }) => {
      return await jobService.searchJobs(query);
    },
    getSimilarJobs: async (_: unknown, { jobId }: { jobId: number }) => {
      const job = await jobService.getJobById(jobId);
      return jobService.getSimilarJobs(job);
    },
  },

  Mutation: {
    createJob: async (_: unknown, { input }: { input: CreateJobInput }) => {
      return jobService.createJob(input);
    },
    deleteJob: async (_: unknown, { id }: { id: number }) => {
      await jobService.deleteJob(id);
      return true;
    },
    updateJob: async (
      _: unknown,
      { id, input }: { id: number; input: UpdateJobInput }
    ) => {
      return jobService.updateJob(id, input);
    },
  },
};
