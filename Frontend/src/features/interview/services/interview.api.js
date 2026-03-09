import axios from "axios"


export const createReport=async(selfDescription,jobDescription,resumePdf)=>{
    const formData=new FormData()
    formData.append("selfDescription",selfDescription)
    formData.append("jobDescription",jobDescription)
    formData.append("resume",resumePdf)

    const response=await axios.post("http://localhost:3000/api/interview/createReport",formData,{withCredentials:true})
    return response
}

export const reportDetails=async (reportId)=>{
    const response=await axios.get(`http://localhost:3000/api/interview/details/${reportId}`,{withCredentials:true})
    console.log("request sent")
    return response
}

export const reportsHistory=async ()=>{
    const response=await axios.get(`http://localhost:3000/api/interview/history`)
    return response
}