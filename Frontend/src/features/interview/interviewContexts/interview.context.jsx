import React, { createContext, useState } from 'react'
export const InterviewContext=createContext()
function InterviewContextProvider({children}) {
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState(null)
    const [reports, setReports] = useState([])
     const [newResumeLoading, setNewResumeLoading] = useState(false)
        const [templates, setTemplates] = useState(null)
        const [NewResumeUrl, setNewResumeUrl] = useState(null)
        const [errorMessage, setErrorMessage] = useState(null)
  return (
    <InterviewContext.Provider value={{loading,setLoading,report,setReport,reports,setReports,templates, setTemplates,newResumeLoading, setNewResumeLoading,NewResumeUrl,setNewResumeUrl,errorMessage, setErrorMessage}}>
        {children}
    </InterviewContext.Provider>
  )
}

export default InterviewContextProvider