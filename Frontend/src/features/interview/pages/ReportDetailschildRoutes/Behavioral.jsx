import React from 'react';
import { motion } from 'framer-motion';
import { Target, Sparkles} from 'lucide-react';
import styles from './BehavioralPrep.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import InterviewHook from "../../interviewHooks/interview.hook";
import { useParams } from "react-router";
import AnalysisLoader from '../../components/reportDetailsLoading';
import { useContext } from 'react';
import { InterviewContext } from '../../interviewContexts/interview.context';
const BehavioralPrep = () => {
  
 const { id } = useParams();
  const context= useContext(InterviewContext)
   const {report}=context

   return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h1>Behavioral Strategy</h1>
          <p>Structured situational questions to evaluate your soft skills and leadership.</p>
        </div>
        
      </header>

      <div className={styles.list}>
        {report.behavioralQuestions.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.count}>Question {index + 1}</span>
              <h3 className={styles.questionTitle}>{item.Question}</h3>
            </div>

            <div className={styles.cardBody}>
              {/* Interviewer's Intent */}
              <div className={styles.infoRow}>
                <div className={styles.label}>
                  <Target size={16} /> <span>Interviewer's Objective</span>
                </div>
                <p className={styles.description}>{item.Intention}</p>
              </div>

              {/* Strategy Answer */}
              <div className={styles.strategyBox}>
                <div className={styles.label}>
                  <Sparkles size={16} /> <span>Preparation Strategy</span>
                </div>
                <p className={styles.description}>{item.Answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
 }

export default BehavioralPrep;