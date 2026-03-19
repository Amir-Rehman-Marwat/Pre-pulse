import React, { useContext, useEffect } from 'react'
import {allTemplates, createReport, newResume, reportDetails, reportsHistory} from "../services/interview.api"
import { InterviewContext } from '../interviewContexts/interview.context'
import { useNavigate } from 'react-router'
import { logOutUser } from '../../auth/services/auth.api'
import { AuthContext } from '../../auth/contexts/auth.context'

function InterviewHook(props) {
  const authContext= useContext(AuthContext)
  const{setUser}=authContext

 const context =useContext(InterviewContext)
  const {loading,setLoading,report,setReport,reports,setReports,newResumeLoading,setNewResumeLoading,setTemplates,newResume,setNewResume}=context
   
const navigate= useNavigate()

 
  
  
    const handleNewReport=async(selfDescription,jobDescription,resumePdf)=>{
        setLoading(true)
const response=await createReport(selfDescription,jobDescription,resumePdf)
if(response.status===201){
    setReport(response.data.responseData)
    setLoading(false)

}
    }
    const handleReportDetails=async(reportId)=>{
const response=await reportDetails(reportId)
if(response.status===200){
    setLoading(false)
    setReport(response.data.reportDetails)
    return response
}
    }
    const handleReportsHistory=async()=>{
        setLoading(true)
        const response=await reportsHistory()
        if(response.status===200){
            setLoading(false)
            setReports(response.data.history)
        }else if(response.status===400){
            setLoading(false)
              setReports(null)

        }else{
            setLoading(false)
            setReports(null)
        }
    
    }
    const handleLogOut=async()=>{
        const response= await logOutUser()
       if(response.status===200){
       setTimeout(() => {
         setUser(null)
        navigate("/login")
       }, 1500);
       }
    }
    const handleAllTemplates=async()=>{
        
        const response=await allTemplates()
        if(response.status===200){
 setTemplates(response.data.allTemplates)
 setNewResumeLoading(false)
 
return response
        }
    }
     const handleNewResume=async(reportId,layoutId)=>{
setNewResumeLoading(true);
const response=await newResume(reportId,layoutId)
if(response.status===201){
setNewResume(response)
}
     }
    return {handleNewReport,handleReportDetails,handleReportsHistory,handleLogOut,handleAllTemplates,handleNewResume}
}

export default InterviewHook