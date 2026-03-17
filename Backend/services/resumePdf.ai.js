import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import puppeteer from "puppeteer-core";
import { professionalZodSchema } from "./templatesZodSchema.js";
import ejs from "ejs"
import path from "path"
import { fileURLToPath } from "url";


const ai = new GoogleGenAI({key:process.env.GEMINI_API_KEY});
 const generateResumeContent=async(selfDescription,jobDescription,resume,template)=>{
    let templateSchema={}
    if(template==="professional"){
 templateSchema=z.toJSONSchema(professionalZodSchema)
    }
    console.log("generatinng the resume conntent")
const prompt=`generate the json content for the new modified resume of the user ,keeping in view the following data of the user;
selfDescription:${selfDescription},
jobDescription:${jobDescription},
resume:${resume}
Note#1:You are strictly forbidden from inventing dates, locations, or descriptions. If a field in the JSON is marked as optional or nullable and the information is missing from the source, you MUST return null or "".Before finalizing the JSON, verify that every date and name matches the "Current Resume" exactly.
Note#2 :avoid repition of same words ,grammer and spelling mistakes strictly for ats passing 
Note#3:add quantifiable achievements from previous positions that user have held. this is must 
`
const response=await  ai.models.generateContent({
    model:"gemini-3-flash-preview",
    contents:prompt,
    config:{
        responseMimeType:"application/json",
        responseSchema:templateSchema
    }
})
console.log("content generatd ")
console.log(JSON.parse(response.text))
return JSON.parse(response.text)
}
// The pdf generator function;
export const generateResumePdf=async(selfDescription,jobDescription,Resume,template)=>{

  const content= await generateResumeContent(selfDescription,jobDescription,Resume,template)
  console.log(content)
   const __filename=fileURLToPath(import.meta.url)
  const __dirname=path.dirname(__filename)
  const templatePath=path.join(__dirname,`../templates/${template}.ejs`)
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
    path:`${template}.pdf`,
  format: "A4",
  printBackground:true
  
})
console.log(pdfBuffer)
await browser.close();
return pdfBuffer

}