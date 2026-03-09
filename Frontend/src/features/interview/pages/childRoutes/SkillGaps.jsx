import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert, Info, ArrowUpRight } from 'lucide-react';
import styles from './SkillGaps.module.scss';

const SkillGaps = () => {
  // Your provided data array
  const gaps = [
    { skill: 'Redis Caching', severity: 'high' },
    { skill: 'System Design & Scalable Architecture', severity: 'high' },
    { skill: 'Microservices Architecture', severity: 'medium' },
    { skill: 'AWS Fundamentals', severity: 'medium' },
    { skill: 'Automated Testing with Jest', severity: 'medium' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
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
          <p>Key requirements found in the Job Description that appear missing from your profile.</p>
        </div>
        <div className={styles.alertCount}>
          <AlertTriangle size={18} />
          <span>{gaps.length} Gaps Identified</span>
        </div>
      </header>

      <div className={styles.gapGrid}>
        {gaps.map((item, index) => (
          <motion.div 
            key={index} 
            className={`${styles.gapCard} ${styles[item.severity]}`}
            variants={itemVariants}
          >
            <div className={styles.cardContent}>
              <div className={styles.iconArea}>
                {item.severity === 'high' ? <ShieldAlert size={24} /> : <Info size={24} />}
              </div>
              
              <div className={styles.textArea}>
                <span className={styles.severityTag}>{item.severity} Priority</span>
                <h3 className={styles.skillName}>{item.skill}</h3>
              </div>
            </div>

            <button className={styles.resourceBtn}>
              Find Resources <ArrowUpRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillGaps;