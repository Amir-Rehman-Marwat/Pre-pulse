import React, { useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import AiLoading from '../components/Loading';
import { toast, Toaster } from "react-hot-toast";
import { 
  FileText, UserPen, BriefcaseBusiness, 
  RefreshCcw, Send, AlertCircle 
} from 'lucide-react';
import styles from './NewReport.module.scss';
import InterviewHook from '../interviewHooks/interview.hook';
import { InterviewContext } from '../interviewContexts/interview.context';

const NewReport = () => {
  const { loading, errorMessage, setErrorMessage } = useContext(InterviewContext);
  const { handleNewReport } = InterviewHook();
  
  const [fileName, setFileName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm({
    mode: "onChange"
  });

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        icon: <AlertCircle size={18} color="#dc143c" />,
        style: {
          background: '#020617',
          color: '#fff',
          border: '1px solid #dc143c',
          fontSize: '0.85rem'
        }
      });
      setErrorMessage(null);
    }
  }, [errorMessage, setErrorMessage]);

  const wordLimitValidation = (val) => {
    const count = val.trim().split(/\s+/).filter(Boolean).length;
    if (count < 5) return "Please provide at least 5 words";
    if (count > 100) return "Keep it under 100 words";
    return true;
  };

  const onSubmit = async (data) => {
    if (!pdfFile) {
      toast.error("Resume upload is required");
      return;
    }
    await handleNewReport(data.selfDescription, data.jobDescription, pdfFile);
    reset();
    setFileName(null);
    setPdfFile(null);
  };

  if (loading) return <AiLoading />;

  return (
    <div className={styles.newReportContainer}>
      <Toaster 
        position="top-right" 
        containerStyle={{ 
          position: 'absolute',
          top: 20,
          right: 20 
        }} 
      />
      
      <header className={styles.sectionHeader}>
        <h2>Start New Job Analysis</h2>
        <p>Upload your resume and the job details to generate your AI-powered match report.</p>
      </header>

      <form className={styles.reportForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>
            <FileText size={20} />
            Step 1: Upload your Resume (PDF)
          </label>
          <div className={styles.fileUploadArea}>
            <input 
              type="file" 
              accept=".pdf" 
              className={styles.fileInput}
              id="resumeUpload"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFileName(file.name);
                  setPdfFile(file);
                }
              }}
            />
            <label htmlFor="resumeUpload" className={styles.fileCustomBtn}>
              <FileText size={20} />
              <span>{fileName ? "Change" : "Choose"}</span>
            </label>
            <div className={styles.fileNameWrapper}>
              <span className={fileName ? styles.fileName : styles.filePlaceholder}>
                {fileName || "No file selected..."}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}><UserPen size={20} /> Step 2: Self Description</label>
          <textarea 
            {...register("selfDescription", { 
              required: "This field is required",
              validate: wordLimitValidation
            })}
            placeholder="Tell us about yourself (5-100 words)..."
            className={`${styles.textArea} ${errors.selfDescription ? styles.inputError : ""}`}
            rows="5"
          />
          {errors.selfDescription && <span className={styles.errorText}>{errors.selfDescription.message}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}><BriefcaseBusiness size={20} /> Step 3: Job Description</label>
          <textarea 
            {...register("jobDescription", { 
              required: "J.D. is required",
              validate: wordLimitValidation
            })}
            placeholder="Paste target job requirements (5-100 words)..."
            className={`${styles.textArea} ${errors.jobDescription ? styles.inputError : ""}`}
            rows="7"
          />
          {errors.jobDescription && <span className={styles.errorText}>{errors.jobDescription.message}</span>}
        </div>

        <div className={styles.formActions}>
          <button type="reset" className={styles.resetBtn} onClick={() => { setFileName(null); setPdfFile(null); }}>
            <RefreshCcw size={18} /> Reset
          </button>
          <button type="submit" className={styles.analyzeBtn}>
            <Send size={18} /> Analyze Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewReport;