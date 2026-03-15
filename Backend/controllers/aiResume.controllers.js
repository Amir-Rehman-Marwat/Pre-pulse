import AiReportModel from "../models/AiReportModel.js";
export const aiResumeController=async(req,res)=>{
    const{id}=req.params;
    const user=req.user;
    const report=await AiReportModel.findById({_id:id})
   if(!report){
    return res
    .status(404)
    .json({message:"No such report founded"})
   }else{
    const {selfDescription,jobDescriptions,resume}=report
    // ai content generating function and pdf generating function
try {
    // const pdfBuffer=await function (selfDescription,jobDescription,resume)

}catch (error) {
    return res
    .status(500)
    .json({message:"There is an error in the server while generating Resume ,please try again later."})
}




   }

}