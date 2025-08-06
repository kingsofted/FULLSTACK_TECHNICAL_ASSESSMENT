


export enum JOB_EVENTS {
  JOB_CREATED = "JOB_CREATED",
  JOB_UPDATED = "JOB_UPDATED",
  JOB_DELETED = "JOB_DELETED",
  JOB_SEARCHED = "JOB_SEARCHED",
}

export interface JobEventPayload {
  event : JOB_EVENTS;
  data: unknown;
}

export const EVENT_NAME = "ELASTIC_SEARCH_JOB_EVENT";

export const JOBTYPE = {
  ID: "id",
  TITLE: "title",
  COMPANY: "company",
  LOCATION: "location",
  INDUSTRY: "industry",
  EXPERIENCE_LEVEL: "experienceLevel",
  SALARY_RANGE: "salaryRange",
  REQUIRED_SKILLS: "requiredSkills",
  DETAILS: "details",
}
