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
    console.log("complete response details",response)
    setReport(response.data.responseData)
    setLoading(false)

}
    }
    const handleReportDetails=async(reportId)=>{
const response=await reportDetails(reportId)
return response
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
        return response
    }
    return {handleNewReport,handleReportDetails,handleReportsHistory}
}

export default InterviewHook