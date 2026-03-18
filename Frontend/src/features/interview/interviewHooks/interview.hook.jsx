import React, { useContext, useEffect } from 'react'
import {createReport, newResume, reportDetails, reportsHistory} from "../services/interview.api"
import { InterviewContext } from '../interviewContexts/interview.context'
import { useNavigate } from 'react-router'
import { logOutUser } from '../../auth/services/auth.api'
import { AuthContext } from '../../auth/contexts/auth.context'
import { ReportDetailsContext } from '../interviewContexts/ReportDetailsContext'
function InterviewHook(props) {
    console.log(props)
  const authContext= useContext(AuthContext)
  const{setUser}=authContext

 const context =useContext(InterviewContext)
  const {loading,setLoading,report,setReport,reports,setReports,newResumeLoading,setNewResumeLoading,setTemplates}=context
   
const navigate= useNavigate()

  useEffect(() => {
  if(report){
    navigate(`/reportDetails/${report._id}/gaps` )
  }
  }, [report])
  
  
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
    const handleNewResume=async()=>{
        setNewResumeLoading(true)
        const response=await newResume()
        if(response.status===200){
            setNewResumeLoading(false)
 setTemplates(response.data.allTemplates)
return response
        }
    }
    return {handleNewReport,handleReportDetails,handleReportsHistory,handleLogOut,handleNewResume}
}

export default InterviewHook