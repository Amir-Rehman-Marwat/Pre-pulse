import { z } from "zod";

export const professionalZodSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().describe("The user's exact legal name as it appears in the source resume. DO NOT change spelling or casing."),
    contactBar: z.string().describe("Phone, Email, and Links formatted with pipes (e.g., +92-XXX | email@example.com | github.com/user). Use only provided contact details."),
  }),
  
  profile: z.string().describe("A professional summary. You may rewrite this for impact, but DO NOT invent facts, years of experience, or skills not found in the source documents."),
  
  education: z.array(z.object({
    institution: z.string().describe("The EXACT name of the university/school. Example: 'University of Lahore'. DO NOT change 'of' to 'in' or paraphrase."),
    location: z.string().optional().describe("City and Country. If not mentioned in the source, leave as null or empty string."),
    degree: z.string().describe("The exact title of the degree as provided. Do not abbreviate if the user didn't."),
    dateRange: z.string().optional().describe("The specific years. If no dates are provided in the source for this entry, leave as null. DO NOT ESTIMATE."),
    details: z.array(z.string()).optional().describe("Academic honors or coursework mentioned in the source.")
  })).describe("List of educational qualifications found in the source resume."),
  
  skills: z.object({
    technical: z.array(z.string()).describe("Hard skills and programming languages explicitly mentioned by the user."),
    tools: z.array(z.string()).describe("Software, IDEs, or platforms explicitly mentioned by the user.")
  }),
  
  certifications: z.array(z.string()).optional().describe("Professional certificates found in the source. If none exist, return an empty array."),
  
  experience: z.array(z.object({
    company: z.string().describe("The EXACT company name. Do not modify or guess the legal entity name."),
    role: z.string().describe("The exact job title held."),
    location: z.string().optional().describe("Office location. Leave null if not mentioned."),
    dateRange: z.string().optional().describe("Employment dates. If a job has no date in the source, set to null. DO NOT INVENT DATES."),
    bulletPoints: z.array(z.string()).describe("Rewrite these for impact based on the Job Description, but only using tools and tasks the user actually performed.")
  })),
  
  projects: z.array(z.object({
    title: z.string().describe("The name of the project as provided by the user."),
    dateRange: z.string().optional().nullable().describe("Project duration. Set to NULL if no date is found in the source. NEVER fabricate project dates."),
    details: z.array(z.string()).describe("Points describing the project. Use only technologies mentioned in the user's project description.")
  })).optional(),
  
  achievements: z.array(z.string()).optional().describe("Honors or awards explicitly mentioned. If none, return an empty array.")
});