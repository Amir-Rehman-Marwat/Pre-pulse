import React, { useContext, useEffect } from 'react'
import {createReport, reportDetails, reportsHistory} from "../services/interview.api"
import { InterviewContext } from '../interviewContexts/interview.context'
import { useNavigate } from 'react-router'
function InterviewHook() {

 const context =useContext(InterviewContext)
  const {loading,setLoading,report,setReport,reports,setReports}=context
const navigate= useNavigate()

  useEffect(() => {
  if(report){
    navigate(`/reportDetails/${report._id}`)
  }  
  }, [report])
  
    const handleNewReport=async(selfDescription,jobDescription,resumePdf)=>{
        setLoading(true)
const response=await createReport(selfDescription,jobDescription,resumePdf)
if(response.status===201){
    setReport(response.data.aiReport)
    setLoading(false)

}
    }
    const handleReportDetails=async(reportId)=>{
const response=await reportDetails(reportId)
return response
    }
    const handleReportsHistory=async()=>{
        const response=await reportsHistory()
        return response
    }
    return {handleNewReport,handleReportDetails,handleReportsHistory}
}

export default InterviewHook