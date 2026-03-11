import React from 'react';
import { motion } from 'framer-motion';
import { Target, Sparkles} from 'lucide-react';
import styles from './BehavioralPrep.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import InterviewHook from "../../interviewHooks/interview.hook";
import { useParams } from "react-router";
import AnalysisLoader from '../../components/reportDetailsLoading';
const BehavioralPrep = () => {
  const behavioralQuestions = [
    {
      Question: 'Describe a time you had to deal with a significant technical debt.',
      Intention: 'To see if you prioritize long-term code health over quick fixes and how you communicate trade-offs to stakeholders.',
      Strategy: 'Use the STAR method. Focus on the impact the debt had on the team and the specific steps you took to refactor without breaking existing features.'
    },
    {
      Question: 'Tell me about a conflict you had with a teammate or manager.',
      Intention: 'To assess your emotional intelligence, conflict resolution skills, and professionalism under pressure.',
      Strategy: 'Avoid blaming others. Focus on the objective disagreement, how you initiated a conversation, and the collaborative solution you reached.'
    },
    {
      Question: 'Give an example of a time you had to learn a new technology quickly.',
      Intention: 'To evaluate your adaptability and self-driven learning process.',
      Strategy: 'Mention a specific project (like React 19 or Redis). Discuss your resource gathering, building a POC, and eventually implementing it in production.'
    }
  ];

 const { id } = useParams();
  const { handleReportDetails } = InterviewHook();
  const [reportDetails, setReportDetails] = useState(null);
  const [loading, setLoading] = useState(true);
   useEffect(() => {
      const run = async () => {
        try {
          const response = await handleReportDetails(id);
          if (response.status === 200) {
            setLoading(false);
            setReportDetails(response.data.reportDetails);
          }
          console.dir(response);
        } catch (error) {
          console.dir(error);
        }
      };
      run();
    }, []);
 if(loading){
  return <AnalysisLoader/>
 }else{
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
        {reportDetails.behavioralQuestions.map((item, index) => (
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
                <p className={styles.description}>{item.Strategy}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
 }
};

export default BehavioralPrep;