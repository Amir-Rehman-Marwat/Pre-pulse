import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert, Info, CheckCircle } from 'lucide-react';
import styles from './SkillGaps.module.scss';
import InterviewHook from '../../interviewHooks/interview.hook';
import { useParams } from 'react-router';
import AnalysisLoader from '../../components/reportDetailsLoading';
import { useContext } from 'react';
import { InterviewContext } from '../../interviewContexts/interview.context';

const SkillGaps = () => {
   const context= useContext(InterviewContext)
 const {report}=context
  const {id}=useParams()
InterviewHook("gaps")
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
          <span>{report.skillGaps.length} Requirements Found</span>
        </div>
      </header>

      <div className={styles.gapList}>
        {report.skillGaps.map((item, index) => (
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
export default SkillGaps;