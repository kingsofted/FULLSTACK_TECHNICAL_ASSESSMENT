import { Job } from "../../modals/job";


export const jobInitialState: Job = {
    id: '',
    title: '',
    company: '',
    location: '',
    experienceLevel: "Entry-Level", // Default value
    salaryRange: undefined,
    industry: undefined,
    requiredSkills: '',
    details: '', 
    createdAt: undefined,
    updatedAt: undefined,
}; 

