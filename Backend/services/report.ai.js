
import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";


const technicalQuestionsSchema=z.object({
         Question:z.string().describe("This will be the technical question that an interviwer can ask from the user based on his a target job"),
         Inention:z.string().describe("the intention will describe the intention or mottivve of the interviewer behind the question he asked from the user "),
         Answer:z.string().describe("it will describe the suggestions for the user related o the question that what  aproach the user can follow and what points to  cover ")

    })
    const behavioralQuestionsSchema=z.object({
        Question:z.string().describe("This will be the behavioral question that an interviwer can ask from the user"),
         Inention:z.string().describe("the intention will describe the intention or mottive of the interviewer behind the question he asked from the user "),
         Answer:z.string().describe("it will describe the suggestions for the user related o the question that what  aproach the user can follow and what points to  cover ")
    })

    const skillGapsSchema=z.object({
        skill:z.string().describe("The skill that is no presentt in the resume of the user and which he should learn based on the job he is seeking for ."),
        severity: z.enum(["High", "Medium", "Low"]).describe("severity will describe the severity of te skill tha user can learn ,it must  be one of them [high ,medium ,low] if he can learn in short time it will be low and if it will take some time it will be medium and if i will take much more time then it will be high ")
    })
  const preperationPlaneSchema=z.object({
Day:z.number().describe("the number ,specify the day number from 1 "),
 Focus:z.string().describe("the topic ,point or skill the user should focus on that day"),
 Tasks: z.array(z.string()).describe("the array of strings which will contain the tasks that user will perform on that day according to the focus topic of that day")
    })
    const AiReportSchema=z.object({
    matchScore:z.number().describe("this will  be indicaing he score of the user from 1-100 based on the current capabilities and skills of the user and the skills and abilities required for the user targe job "),
    jobTittle:z.string().describe("The title of the job which user is seeking for "),
     technicalQuestions:z.array(technicalQuestionsSchema).describe("It will contain the technical questions that an intterviewer can ask from user related to the targeted job including questions , the motive of inerviewer behind ansking the question and answer  suggestions"),
     behavioralQuestions:z.array(behavioralQuestionsSchema).describe("this will contain the behavioral questions that an intterviewer can ask from user related to the targeted job including questions , the motive of inerviewer behind the question and aswer suggestions  "),
     skillGaps:z.array(skillGapsSchema).describe("this  will contain the skills that  the user dont have in its resume and descripion and which he should learn  and the severity of the skill based on how quick the user can learn it"),
     preperationPlane:z.array(preperationPlaneSchema)
});

const ai = new GoogleGenAI({key:process.env.GEMINI_API_KEY});

const generateAireport=async(selfDescription,resumeText,targetJobDescription)=>{
console.log("getting the data ...")
const prompt = `
Generate an interview report.

Return ONLY valid JSON.
Do not include explanations.
Follow the provided JSON schema strictly.

selfDescription: ${selfDescription}
resumeText: ${resumeText}
targetJobDescription: ${targetJobDescription}
`;
const response=await ai.models.generateContent({
    model:"gemini-3-pro-preview",
    contents:prompt,
    config:{
responseMimeType:"application/json",
responseSchema: zodToJsonSchema(AiReportSchema)
    }


}
)

 return JSON.parse(response.text)


}

export default  generateAireport;