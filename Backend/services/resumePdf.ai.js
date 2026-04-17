import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import puppeteer from "puppeteer-core";
import { Pro_v1ZodSchema } from "./templatesZodSchema.js";
import ejs from "ejs"
import path from "path"
import { fileURLToPath } from "url";


const ai = new GoogleGenAI({key:process.env.GEMINI_API_KEY});
 const generateResumeContent=async(selfDescription,jobDescription,resume,layoutId)=>{
    let templateSchema={}
    if(layoutId==="Pro_v1"){
 templateSchema=z.toJSONSchema(Pro_v1ZodSchema)
    }
    console.log("generatinng the resume conntent")
const prompt=`generate the json resume content for the new modified resume of the user for the target job of the user  without grammer and spelling mistakes  ,
Note#1:You are strictly forbidden from inventing dates, locations, or descriptions. If a field in the JSON is marked as optional or nullable and the information is missing from the source(old resume or self description), you MUST return null or "" .Before finalizing the JSON, verify that every date and name matches the "Current Resume i-e old resume of the user " exactly.
Note#2 : strickly avoid repition of same words , also avoid the grammer and spelling mistakes strictly for a best ats score .
NOTE#3:Use specific numbers like 'Improved performance by 40%' or 'Managed 10+ modules' to ensure a high ATS score and .
NOTE#4: The profile summary must be of maximum 2 lines not too long. 
,keeping in view the following data of the user;
selfDescription:${selfDescription},
jobDescription:${jobDescription},
old resume:${resume}
`
const response=await  ai.models.generateContent({
    model:"gemini-3-flash-preview",
    contents:prompt,
    config:{
        responseMimeType:"application/json",
        responseSchema:templateSchema
    }
})
console.log(JSON.parse(response.text))
return JSON.parse(response.text)
}
// The pdf generator function;
export const generateResumePdf=async(selfDescription,jobDescription,Resume,layoutId)=>{

  const content= await generateResumeContent(selfDescription,jobDescription,Resume,layoutId)
  console.log(content)
   const __filename=fileURLToPath(import.meta.url)
  const __dirname=path.dirname(__filename)
  const templatePath=path.join(__dirname,`../templates/${layoutId}.ejs`)
 const html=await ejs.renderFile(
    templatePath,
    content
)
 console.log(html)


  const browser = await puppeteer.launch({
     executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"
  })

const page = await browser.newPage();
await page.setContent(html)
const pdfBuffer= await page.pdf({
  format: "A4",
  printBackground:true
  
})
console.log(pdfBuffer)
await browser.close();
return pdfBuffer

}