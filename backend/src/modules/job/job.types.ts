export interface CreateJobInput {
  title: string;
  company: string;
  location: string;
  experienceLevel: "Entry-Level" | "Mid-Level" | "Senior-Level";
  salaryRange: number;
  industry: string;
  requiredSkills: string;
  details: string;
}

export interface JobDTO extends CreateJobInput {
  id: number;
}


export interface UpdateJobInput {
  title: String
  company: String
  location: String
  experienceLevel: "Entry-Level" | "Mid-Level" | "Senior-Level"
  salaryRange: number;
  industry: String
  requiredSkills: String
  details: String;
}

export interface JobFilterInput{ 
  title: String
  company: String
  location: String
  experienceLevel: String
  salaryRange?: [number, number];
  industry: String
  requiredSkills: [String]
  sortBy: String
  sortOrder: String
}
