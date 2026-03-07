import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { 
  FileText, 
  UserPen, 
  BriefcaseBusiness, 
  RefreshCcw, 
  Send 
} from 'lucide-react';
import styles from './NewReport.module.scss';

const NewReport = () => {
  const [file, setFile] = useState("")
  const [sd, setSd] = useState("")
const [jd, setJd] = useState("")
 const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  // form submit fuction 
  const onSubmit = (data) => {
    console.log(data)
                         }
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
                console.log(e)
                setFile(`${e.target.value}`)
              }}
            />
            <label htmlFor="resumeUpload" className={styles.fileCustomBtn}>
              <FileText size={22} />
              Choose File
            </label>
             {file?<span className={styles.fileName}>{`${file} selected`}</span>:<span className={styles.fileName}>No file selected...</span>}
          </div>
        </div>

        {/* Step 2: Self Description */}
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>
            <UserPen size={20} />
            Step 2: Self Description (Skills, Experience, Goals)
          </label>
          <textarea 
            name="selfDescription" 
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
            name="jobDescription" 
            placeholder="Paste the full job description of the role you want..."
            className={styles.textArea}
            rows="8"
          />
        </div>

        {/* Form Action Buttons */}
        <div className={styles.formActions}>
          <button type="reset" className={styles.resetBtn} onClick={()=>{
setFile(null)
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
};

export default NewReport;