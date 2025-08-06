import { z } from "zod";
import { errorMessages } from "../error/errorMessage";

export const createJobSchema = z.object({
  title: z.string().max(255, errorMessages.TITLE_TOO_LONG).nonempty(errorMessages.TITLE_REQUIRED),
  company: z.string().max(255, errorMessages.COMPANY_TOO_LONG).nonempty(errorMessages.COMPANY_REQUIRED),
  location: z.string().max(100, errorMessages.LOCATION_TOO_LONG).nonempty(errorMessages.LOCATION_REQUIRED),
  experienceLevel: z.enum(["Entry-Level", "Mid-Level", "Senior-Level"], {
    errorMap: () => ({ message: errorMessages.EXPERIENCE_LEVEL_INVALID }),
  }),
  salaryRange: z.number().positive(errorMessages.SALARY_POSITIVE).optional(),
  industry: z.string().max(100, errorMessages.INDUSTRY_TOO_LONG).optional(),
  requiredSkills: z.string().optional(),
  details: z.string().optional(),
});

export const updateJobSchema = z
  .object({
    title: z.string().max(255, errorMessages.TITLE_TOO_LONG).optional(),
    company: z.string().max(255, errorMessages.COMPANY_TOO_LONG).optional(),
    location: z.string().max(100, errorMessages.LOCATION_TOO_LONG).optional(),
    experienceLevel: z.enum(["Entry-Level", "Mid-Level", "Senior-Level"]).optional(),
    salaryRange: z.number().positive(errorMessages.SALARY_POSITIVE).optional(),
    industry: z.string().max(100, errorMessages.INDUSTRY_TOO_LONG).optional(),
    requiredSkills: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: errorMessages.UPDATE_FIELD_REQUIRED,
  });
