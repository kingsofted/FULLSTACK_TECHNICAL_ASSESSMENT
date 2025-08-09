// types/favorite.ts

import { Job } from "./favorite";


export interface Favorite {
  id: number;
  job_id: number;
  job?: Job; // optional if not joined
}
