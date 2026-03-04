import generateAireport from "../services/report.ai.js";
import AiReportModel from "../models/AiReportSchema.js";
import { PDFParse } from 'pdf-parse';
export const interviewReportController = async (req, res) => {
    
     const resume = req.file;
const parser = new PDFParse({ data:resume.buffer});
const result = await parser.getText();
const resumeText=result.text
console.log(resumeText)
res.json({baw:resumeText})


    // const {selfDescription,jobDescription}=req.body;

    // const user=req.user
    // const aiReport=await generateAireport(selfDescription,resumeText,jobDescription)
    // const savedReport=await AiReportModel.create({
    //     User:user.id,
    //     selfDescription,
    //     Resume:resumeText, 
    //     jobDescription,
    //     ...aiReport
    // })

    // return res
    //           .status(201) 
    //           .json({message:"Report generated successfully",aiReport})
}