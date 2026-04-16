import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const aiReportResponseSchema = z.object({
  candidateName:z
  .string()
  .describe(
    "The name of the candidate who is seeking for the report ,from the resume text or self description"
  )
  ,

  matchScore: z
    .number()
    .describe(
      "Indicates the score of the user from 1-100 based on the current capabilities and skills of the user and the skills required for the target job."
    ),

  jobTittle: z
    .string()
    .describe("The title of the job which the user is seeking."),

  technicalQuestions: z
    .array(
      z.object({
        Question: z
          .string()
          .describe(
            "The technical question that an interviewer can ask based on the target job."
          ),

        Intention: z
          .string()
          .describe(
            "The motive of the interviewer behind asking the question."
          ),

        Answer: z
          .string()
          .describe(
            "Suggestions for how the user should approach the answer and what key points to cover."
          )
      })
    )
    .describe(
      "Technical questions related to the target job including question, interviewer intention, and answer suggestions."
    ),

  behavioralQuestions: z
    .array(
      z.object({
        Question: z
          .string()
          .describe(
            "The behavioral question that an interviewer can ask."
          ),

        Intention: z
          .string()
          .describe(
            "The motive of the interviewer behind asking the question."
          ),

        Answer: z
          .string()
          .describe(
            "Suggestions for how the user should approach the answer and what key points to cover."
          )
      })
    )
    .describe(
      "Behavioral interview questions including the question, interviewer intention, and suggested answers."
    ),

  skillGaps: z
    .array(
      z.object({
        skill: z
          .string()
          .describe(
            "The skill missing from the user's resume that should be learned."
          ),

        severity: z
          .enum(["high", "medium", "low"])
          .describe(
            "Indicates how long the skill may take to learn: low = quick, medium = moderate time, high = long time."
          )
      })
    )
    .describe(
      "Skills the user is missing and should learn, with severity levels."
    ),

  preperationPlane: z.array(
    z.object({
      Day: z
        .number()
        .describe("Day number starting from 1."),

      Focus: z
        .string()
        .describe("Topic or skill the user should focus on that day."),

      Tasks: z
        .array(z.string())
        .describe(
          "Tasks the user should perform on that day related to the focus topic."
        )
    })
  )
});


