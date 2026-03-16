import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import puppeteer from "puppeteer-core";
import { proffesionalZodSchema } from "./proffesionalZodSchema.js";
import ejs from "ejs"
const ai = new GoogleGenAI({key:process.env.GEMINI_API_KEY});
const resumeContentSchema=z.object({
    HTML:z.string().describe("The html content of the new resume which will be used in new puppeter pdf ,keepinng inn view in old data of the user along with job description")
})
 const generateResumeContent=async(selfDescription,jobDescription,resume,template)=>{
    console.log("generatinng the resume conntent")
const prompt=`generate the json content for the new modified resume of the user which will be used to create html and will be used in puppetter pdf keeping inn vview the following data of the user;
Note:Never fabricate dates, locations, or company names. If the user didn't provide a date for a project, the dateRange in your JSON must be null.
selfDescription:${selfDescription},
jobDescription:${jobDescription},
resume:${resume}
`
const response=await  ai.models.generateContent({
    model:"gemini-3-flash-preview",
    contents:prompt,
    config:{
        responseMimeType:"application/json",
        responseSchema:z.toJSONSchema(proffesionalZodSchema)
    }
})
console.log(JSON.parse(response.text))
return JSON.parse(response.text)
}

export const generateResumePdf=async(selfDescription,jobDescription,resume,template)=>{
   
  const content= await generateResumeContent(selfDescription,jobDescription,resume,template)
  return content

//   const browser = await puppeteer.launch({
//      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"
//   })

// const page = await browser.newPage();
// await page.setContent(html)
// const pdfBuffer= await page.pdf({
//   format: "A4",
  
// })
// console.log(pdfBuffer)
// await browser.close();
// return pdfBuffer

}