export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  experienceLevel: "Entry-Level" | "Mid-Level" | "Senior-Level" | "";
  salaryRange?: number;
  industry?: string;
  requiredSkills?: string;
  details?: string; 
  createdAt?: string;
  updatedAt?: string; 
}
