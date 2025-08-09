import { Job } from "./job";

export interface Favorite {
  id: number;
  job_id: number;
  job?: Job; // optional if joined
}