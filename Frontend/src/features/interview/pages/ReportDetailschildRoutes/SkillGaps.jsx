import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert, Info, CheckCircle } from 'lucide-react';
import styles from './SkillGaps.module.scss';
import InterviewHook from '../../interviewHooks/interview.hook';
import { useParams } from 'react-router';

const SkillGaps = () => {
    const {handleReportDetails}=InterviewHook()
  const [reportDetails, setReportDetails] = useState(null)
   const [loading, setLoading] = useState(true)
  const {id}=useParams()
   useEffect(() => {
     const run=async()=>{
   try {
      const response=await handleReportDetails(id)
      if(response.status===200){
       setLoading(false)
       setReportDetails(response.data.reportDetails)
      }
    console.dir(response)
   } catch (error) {
     console.dir(error)
   }
     }
     run();
    }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { x: -15, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  // Helper to render correct icon based on severity
  const getIcon = (severity) => {
    switch (severity) {
      case 'high': return <ShieldAlert size={22} />;
      case 'medium': return <Info size={22} />;
      case 'low': return <CheckCircle size={22} />;
      default: return <Info size={22} />;
    }
  };

 if(loading){
  <div>LOADING</div>
 }else{
   return (
    <motion.div 
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h1>Skill Gap Analysis</h1>
          <p>Identified discrepancies between the job requirements and your current profile.</p>
        </div>
        <div className={styles.alertCount}>
          <AlertTriangle size={18} />
          <span>{reportDetails.skillGaps.length} Requirements Found</span>
        </div>
      </header>

      <div className={styles.gapList}>
        {reportDetails.skillGaps.map((item, index) => (
          <motion.div 
            key={index} 
            className={`${styles.gapCard} ${styles[item.severity]}`}
            variants={itemVariants}
          >
            <div className={styles.cardContent}>
              <div className={styles.iconArea}>
                {getIcon(item.severity)}
              </div>
              
              <div className={styles.textArea}>
                <span className={styles.severityTag}>{item.severity} Priority</span>
                <h3 className={styles.skillName}>{item.skill}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
 }
};

export default SkillGaps;