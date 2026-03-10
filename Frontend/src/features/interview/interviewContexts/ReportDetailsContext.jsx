
import React, { createContext, useState } from 'react'
export  const ReportDetailsContext=createContext()

function ReportDetailsContextProvider({children}) {
    const [reportDetails, setReportDetails] = useState(null)
  
    return(
        <ReportDetailsContext.Provider value={{reportDetails,setReportDetails}}>
            {children}
        </ReportDetailsContext.Provider>
    )
}

export default ReportDetailsContextProvider