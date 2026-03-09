import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form"
import AiLoading from '../components/Loading';
import { 
  FileText, 
  UserPen, 
  BriefcaseBusiness, 
  RefreshCcw, 
  Send 
} from 'lucide-react';
import styles from './NewReport.module.scss';
import InterviewHook from '../interview.hook';
import { InterviewContext } from '../interview.context';
const NewReport = () => {

  const context=useContext(InterviewContext)
    const {loading,setLoading,report,setReport,reports,setReports}=context
  console.log()
  const {handleNewReport}=InterviewHook()
  const [fileName, setFileName] = useState("")
  const [pdfFile,setPdfFile] = useState(null)
 
 const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  // form submit fuction 
  const onSubmit = async (data) => {
    try {
      const {selfDescription,jobDescription,resume}=data
    const response=await handleNewReport(selfDescription,jobDescription,pdfFile)
    console.dir(response)
    } catch (error) {
      console.dir(error)
    }finally{
 reset()
 setFileName(null)
    }
    
                         }

                         if(loading){
                          return <AiLoading/>
                         }else{
  return (
    <div className={styles.newReportContainer}>
      {/* Header for the Outlet Section */}
      <header className={styles.sectionHeader}>
        <h2>Start New Job Analysis</h2>
        <p>Upload your resume and the job details to generate your AI-powered match report.</p>
      </header>

      {/* The form - ready for you to attach handleSubmit */}
      <form className={styles.reportForm} onSubmit={handleSubmit(onSubmit)}>
        
        {/* Step 1: Resume Upload */}
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>
            <FileText size={20} />
            Step 1: Upload your Resume (PDF, Max 4MB)
          </label>
          <div className={styles.fileUploadArea}>
            <input 
              type="file" 
              accept=".pdf" 
              className={styles.fileInput}
              id="resumeUpload"
              {...register("resume", { required: true })}
              onChange={(e)=>{
                 const files = e.target.files;
                setFileName(`${files[0].name}`)
                setPdfFile(files[0])
              }}
            />
            <label htmlFor="resumeUpload" className={styles.fileCustomBtn}>
              <FileText size={22} />
              {fileName?"Change file":"Choose file"}
            </label>
             {fileName?<span className={styles.fileName}>{`${fileName} selected`}</span>:<span className={styles.fileName}>No file selected...</span>}
          </div>
        </div>

        {/* Step 2: Self Description */}
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>
            <UserPen size={20} />
            Step 2: Self Description (Skills, Experience, Goals)
          </label>
          <textarea 
            {...register("selfDescription", { required: true })}
            placeholder="Write a brief overview of your professional self..."
            className={styles.textArea}
            rows="6"
          />
        </div>

        {/* Step 3: Job Description */}
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>
            <BriefcaseBusiness size={20} />
            Step 3: Paste the Target Job Description (J.D.)
          </label>
          <textarea 
           {...register("jobDescription", { required: true })}
            placeholder="Paste the full job description of the role you want..."
            className={styles.textArea}
            rows="8"
          />
        </div>

        {/* Form Action Buttons */}
        <div className={styles.formActions}>
          <button type="reset" className={styles.resetBtn} onClick={()=>{
setFileName(null)
          }}>
            <RefreshCcw size={18} />
            Reset Form
          </button>
          {/* Non-functional submit button as requested */}
          <button type="submit" className={styles.analyzeBtn} >
            <Send size={18} />
            Analyze Profile
          </button>
        </div>

      </form>
    </div>
  );
}
}

export default NewReport;