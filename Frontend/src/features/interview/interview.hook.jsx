import React from 'react'
import { createReport, reportDetails, reportsHistory } from './services/interview.api'
function InterviewHook() {
  
    const handleNewReport=async(selfDescription,jobDescription,resumePdf)=>{
const response=await createReport(selfDescription,jobDescription,resumePdf)
return response
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