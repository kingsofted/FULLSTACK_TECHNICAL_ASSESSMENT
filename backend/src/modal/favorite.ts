// types/job.ts
export interface Job {
  job_id: number;
  job_title: string;
  company: string;
  location: string;
  experience_level: string; 
  salary_range?: number; 
  industry?: string;      
  required_skills?: string;
  details?: string;
  created_at: Date;
  updated_at: Date;
}
