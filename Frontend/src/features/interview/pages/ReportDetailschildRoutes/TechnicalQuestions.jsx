import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb } from 'lucide-react';
import styles from './TechnicalQuestions.module.scss';
import { useParams } from 'react-router';
import InterviewHook from '../../interviewHooks/interview.hook';

const TechnicalQuestions = () => {

  const {id}=useParams()
  const {handleReportDetails}=InterviewHook()
  const [reportDetails, setReportDetails] = useState(null)
   const [loading, setLoading] = useState(true)
  
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

 if(loading){
  return <div>LOADING</div>
 }else{

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <header className={styles.header}>
        <h1>Technical Prep</h1>
        <p>Curated interview questions based on your profile and target JD.</p>
      </header>

      <div className={styles.list}>
        {reportDetails.technicalQuestions.map((item, index) => (
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
};

export default TechnicalQuestions;