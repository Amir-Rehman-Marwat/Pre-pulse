import generateAireport from "../services/report.ai.js";
import AiReportModel from "../models/AiReportSchema.js";
import { PDFParse } from 'pdf-parse';
export const interviewReportController = async (req, res) => {
    
     const resume = req.file;
const parser = new PDFParse({ data:resume.buffer});
const result = await parser.getText();
const resumeText=result.text

    const {selfDescription,jobDescription}=req.body;

    const user=req.user
    const aiReport=await generateAireport(selfDescription,resumeText,jobDescription);
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


 export const getHistoryController=async(req,res)=>{
    const user=req.user

    try {
        const history=await AiReportModel.aggregate([
        {
            $match:{
                
 "_id": "69a85c1ee67b0fd4d7cc1078"
            }
        }
            ,{
            $project:{
                jobTittle:1,
                _id:1
            }
        }
    ])

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
const reportId=req.params.reportId
const user=req.user


try {
    const reportDetails=await AiReportModel.findOneById({_id:reportId},{_id:0, selfDescription:0,Resume:0,jobDescription:0})
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