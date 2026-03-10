import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Quote, ShieldQuestion, Sparkles } from 'lucide-react';
import styles from './BehavioralPrep.module.scss';

const BehavioralPrep = () => {
  // Common behavioral schema based on typical AI analysis outputs
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

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1>Behavioral Strategy</h1>
          <p>Prepare your stories using the STAR method to demonstrate soft skills and leadership.</p>
        </div>
        <div className={styles.badge}>
          <MessageSquare size={16} />
          <span>Soft Skills Focus</span>
        </div>
      </header>

      <div className={styles.questionList}>
        {behavioralQuestions.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.qIcon}><ShieldQuestion size={20} /></div>
              <h3>{item.Question}</h3>
            </div>

            <div className={styles.content}>
              <div className={styles.section}>
                <span className={styles.label}>Interviewer's Objective</span>
                <p>{item.Intention}</p>
              </div>

              <div className={styles.strategyBox}>
                <div className={styles.label}>
                  <Sparkles size={16} /> <span>Recommended Strategy</span>
                </div>
                <p>{item.Strategy}</p>
              </div>
            </div>

            <div className={styles.quoteDecoration}>
              <Quote size={40} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BehavioralPrep;