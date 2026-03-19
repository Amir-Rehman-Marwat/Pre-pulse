import generateAireport from "../services/report.ai.js";
import AiReportModel from "../models/AiReportModel.js";
import { PDFParse } from 'pdf-parse';
import { json } from "zod";
export const interviewReportController = async (req, res) => {
    console.log("creating the report for U ")
     const resume = req.file;
const parser = new PDFParse({ data:resume.buffer});
const result = await parser.getText();
const resumeText=result.text

    const {selfDescription,jobDescription}=req.body;
    const aiReport=await generateAireport(selfDescription,resumeText,jobDescription);
    if(!aiReport){
        return res 
        .status(500)
        .json({message:"Internal server error , try gain later "})
    }
    const savedReport=await AiReportModel.create({
        User:req.user.id,
        selfDescription,
        jobDescription,
        Resume:resumeText, 
        jobDescription,
        ...aiReport
    })
    if(!savedReport){
return res 
        .status(500)
        .json({message:"Internal server error , try gain later "})
    }
    return res
              .status(201) 
              .json({message:"Report generated successfully", responseData:savedReport})
}


 export const getHistoryController=async(req,res)=>{
    
    const user=req.user
    
    try {
        const history=await AiReportModel.find({User:user.id})
  if(history.length<1){
    return res 
                 .status(400)
                 .json({message:"No history found"})
  }else{
    return res  
               .status(200)
               .json({message:"history fetched successfully " ,history})
  }
    } catch (error) {
        return res 
                 .status(500)
                 .json({message:"Internal server error,please try again later",error})
    }

}


export const getDetails=async(req,res)=>{
const reportId=req.params.id
const user=req.user


try {
    const reportDetails=await AiReportModel.findOne({_id:reportId})
    if(reportDetails){
        return res
        .status(200)
        .json({message:"Report details fetched successfully",reportDetails})

    }else{ 
        return res
        .status(404)
        .json({message:"No details found for this report "})
    }
    
} catch (error) {
    return res
    .status(500)
    .json({message:"Internal servver error ",error})
}


}