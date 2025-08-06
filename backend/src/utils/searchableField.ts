import { Job } from "../entities/Job";

type JobKeys = keyof Job;

type SearchableJobKeys = Exclude<JobKeys, "id" | "createdAt" | "updatedAt" | "salaryRange" | "experienceLevel">;


const searchableFields: SearchableJobKeys[] = [] as SearchableJobKeys[];

for (const key in {} as Job) {
  if (!["id", "createdAt", "updatedAt", "salaryRange", "experienceLevel"].includes(key)) {
    searchableFields.push(key as SearchableJobKeys);
  }
}

export { searchableFields};