import { Job } from "../../modals/job";

export interface FilterState {
  title: string;
  company: string;
  location: string;
  experienceLevel: Job["experienceLevel"];
  salaryRange?: [number, number]; 
  industry: string;
  requiredSkills: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export const filterInitialState: FilterState = {
  title: "",
  company: "",
  location: "",
  experienceLevel: "",
  salaryRange: [0,7000],
  industry: "",
  requiredSkills: "",
  sortBy: "",
  sortOrder: "asc",
};