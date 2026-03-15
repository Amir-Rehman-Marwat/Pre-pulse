import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({key:process.env.GEMINI_API_KEY});
const resumeContentSchema=z.object({
    HTML:z.string().describe("The html content of the new resume which will be used in new puppeter pdf ,keepinng inn view in old data of the user along with job description")
})
 export const generateResumeContent=async(selfDescription,jobDescription,resume)=>{
    console.log("generatinng the resume conntent")
const prompt=`generate the html content for the new modified resume of the user which will be used in puppetter pdf keeping inn vview the following data of the user;
selfDescription:${selfDescription},
jobDescription:${jobDescription},
resume:${resume}
`
const response=await  ai.models.generateContent({
    model:"gemini-3-flash-preview",
    contents:prompt,
    config:{
        responseMimeType:"application/json",
        responseSchema:z.toJSONSchema(resumeContentSchema)
    }
})
console.log(JSON.parse(response.text))
return JSON.parse(response.text)
}