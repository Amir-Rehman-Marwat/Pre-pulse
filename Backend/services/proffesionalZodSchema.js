import { z } from "zod";

export const proffesionalZodSchema  = z.object({
  personalInfo: z.object({
    fullName: z.string(),
    contactBar: z.string(),
  }),
  profile: z.string(),
  education: z.array(z.object({
    institution: z.string(),
    location: z.string().optional(), // AI can leave empty if unknown
    degree: z.string(),
    dateRange: z.string().optional(), // AI can leave empty if unknown
    details: z.array(z.string()).optional()
  })),
  skills: z.object({
    technical: z.array(z.string()),
    tools: z.array(z.string())
  }),
  certifications: z.array(z.string()).optional(),
  experience: z.array(z.object({
    company: z.string(),
    role: z.string(),
    location: z.string().optional(),
    dateRange: z.string().optional(),
    bulletPoints: z.array(z.string())
  })),
  projects: z.array(z.object({
    title: z.string(),
    dateRange: z.string().optional().nullable(), // Key fix for your issue
    details: z.array(z.string())
  })).optional(),
  achievements: z.array(z.string()).optional()
});