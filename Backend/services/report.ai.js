
import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { aiReportResponseSchema } from "./zodSchemas.js";

const ai = new GoogleGenAI({key:process.env.GEMINI_API_KEY});

const generateAireport=async(selfDescription,resumeText,targetJobDescription)=>{

const prompts = `
Role: Expert career coach for kids.

Task: Generate an interview report and 7-day preparation plan in JSON.

Data:
selfDescription: ${selfDescription}
resumeText: ${resumeText}
targetJobDescription: ${targetJobDescription}

Rules:
1. Use very simple English (5th-grade level).
2. Follow the JSON schema strictly.
3. Include:
   - Gaps (missing skills in simple words)
   - Questions (10 easy interview questions)
   - DayPlan (7 small daily tasks)
4. Return ONLY JSON.
`;

const response=await ai.models.generateContent({
    model:"gemini-3-flash-preview",
    contents:prompt,
    config:{
responseMimeType:"application/json",
responseSchema: z.toJSONSchema(aiReportResponseSchema) 
    }


}
)
console.log(JSON.parse(response.text))
 return JSON.parse(response.text)

}

export default  generateAireport;