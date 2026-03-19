import React, { createContext, useState } from 'react'
export const InterviewContext=createContext()
function InterviewContextProvider({children}) {
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState(null)
    const [reports, setReports] = useState([])
     const [newResumeLoading, setNewResumeLoading] = useState(true)
        const [templates, setTemplates] = useState(null)
        const [newResume, setNewResume] = useState(null)
  return (
    <InterviewContext.Provider value={{loading,setLoading,report,setReport,reports,setReports,templates, setTemplates,newResumeLoading, setNewResumeLoading,newResume,setNewResume}}>
        {children}
    </InterviewContext.Provider>
  )
}

export default InterviewContextProvider