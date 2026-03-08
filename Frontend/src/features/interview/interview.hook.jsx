import React, { useContext } from 'react'
import { createReport, reportDetails, reportsHistory } from './services/interview.api'
import { InterviewContext } from './interview.context'
function InterviewHook() {

 const context =useContext(InterviewContext)
  const {loading,setLoading,report,setReport,reports,setReports}=context
    const handleNewReport=async(selfDescription,jobDescription,resumePdf)=>{
        setLoading(true)
const response=await createReport(selfDescription,jobDescription,resumePdf)
setLoading(false)
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