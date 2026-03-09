import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, CheckCircle2 } from 'lucide-react';
import styles from './TechnicalQuestions.module.scss';

const TechnicalQuestions = () => {
  // Your data array
  const questions = [
    {
      Question: 'How do you optimize performance in a large React application?',
      Intention: 'The interviewer wants to assess your understanding of optimization techniques and real-world problem-solving experience.',
      Answer: 'Explain techniques such as memoization using React.memo, useCallback, useMemo, code splitting with React.lazy, avoiding unnecessary re-renders, optimizing state structure, and using virtualization for large lists.'
    },
    {
      Question: 'Explain MongoDB indexing and how it improves query performance.',
      Intention: 'To evaluate your database optimization knowledge and ability to design performant schemas.',
      Answer: 'Discuss single-field and compound indexes, how indexes reduce collection scans, trade-offs between read and write performance, and real examples where indexing improved response time.'
    },
    {
      Question: 'How do you design scalable REST APIs using Node.js and Express?',
      Intention: 'To understand your backend architecture skills and best practices.',
      Answer: 'Cover layered architecture, separation of concerns, proper routing, middleware usage, centralized error handling, validation, logging, and versioning APIs.'
    },
    {
      Question: 'What is JWT authentication and how do you secure APIs?',
      Intention: 'To assess your understanding of authentication and API security.',
      Answer: 'Explain JWT flow, access vs refresh tokens, token expiration, storing tokens securely, protecting routes with middleware, and preventing common vulnerabilities.'
    }
  ];

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <header className={styles.header}>
        <h1>Technical Prep</h1>
        <p>A list of potential questions tailored to this job role.</p>
      </header>

      <div className={styles.list}>
        {questions.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.count}>Question {index + 1}</span>
              <h3 className={styles.questionTitle}>{item.Question}</h3>
            </div>

            <div className={styles.cardBody}>
              {/* Interviewer's Intent */}
              <div className={styles.infoRow}>
                <div className={styles.label}>
                  <Target size={16} /> <span>Interviewer's Goal</span>
                </div>
                <p className={styles.description}>{item.Intention}</p>
              </div>

              {/* Suggested Answer */}
              <div className={styles.answerBox}>
                <div className={styles.label}>
                  <Lightbulb size={16} /> <span>Suggested Answer</span>
                </div>
                <p className={styles.description}>{item.Answer}</p>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <button className={styles.masteredBtn}>
                <CheckCircle2 size={16} /> <span>Mark as Mastered</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TechnicalQuestions;