import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb } from 'lucide-react';
import styles from './TechnicalQuestions.module.scss';
import { useParams } from 'react-router';
import InterviewHook from '../../interviewHooks/interview.hook';
import AnalysisLoader from '../../components/reportDetailsLoading';
import { useContext } from 'react';
import { InterviewContext } from '../../interviewContexts/interview.context';

const TechnicalQuestions = () => {

  const {id}=useParams()
  const context= useContext(InterviewContext)
     const {report}=context
InterviewHook("technical")


  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <header className={styles.header}>
        <h1>Technical Preparation</h1>
        <p>Practice technical questions specifically tailored to your expertise and the target job description.</p>
      </header>

      <div className={styles.list}>
        {report.technicalQuestions.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.count}>Question {index + 1}</span>
              <h3 className={styles.questionTitle}>{item.Question}</h3>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.infoRow}>
                <div className={styles.label}>
                  <Target size={16} /> <span>Strategic Intent</span>
                </div>
                <p className={styles.description}>{item.Intention}</p>
              </div>

              <div className={styles.answerBox}>
                <div className={styles.label}>
                  <Lightbulb size={16} /> <span>Key Discussion Points</span>
                </div>
                <p className={styles.description}>{item.Answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );}

export default TechnicalQuestions;