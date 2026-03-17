// Some required modules:
import AiReportModel from "../models/AiReportModel.js";
import {  generateResumePdf } from "../services/resumePdf.ai.js";
// The controller:
export const aiResumeController=async(req,res)=>{

    const{id}=req.params;
    const user=req.user;
    const template=req.body.template
    console.log(template)
    const report=await AiReportModel.findById({_id:id})
   if(!report){
    return res
    .status(404)
    .json({message:"No such report founded"})
   }else{
    const {selfDescription,jobDescription,Resume}=report
    // ai content generating function and pdf generating function
try {
    
    const pdfBuffer=await generateResumePdf(selfDescription,jobDescription,Resume,template)
    res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': "inline",
    'Content-Length': pdfBuffer.length
  });
return res
.send(pdfBuffer)
}catch  (error) {
   
    return res
    .status(500)
    .json({message:"There is an error in the server while generating Resume ,please try again later." ,error})
}




   }

}