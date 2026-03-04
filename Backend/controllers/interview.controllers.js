
import pdfparser from "pdf-parser"
import generateAireport from "../services/report.ai.js";
import AiReportModel from "../models/AiReportSchema.js";
import pdfParser from "pdf-parser";
export const interviewReportController =async(req,res)=>{
    
const resume=req.file
const resumeText= new pdfParser
const {selfDescription,jobDescription}=req.body;
const user=req.user
const aiReport=await generateAireport(selfDescription,resumeText,jobDescription)
const savedReport=await AiReportModel.create({
    User:user.id,
    selfDescription,
    Resume:resumeText,
    jobDescription,
    ...aiReport
})

return res
          .status(201) 
          .json({message:"Report generated successfully",aiReport})
}