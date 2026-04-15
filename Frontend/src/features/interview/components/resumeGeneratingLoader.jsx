import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Loader2, Zap } from 'lucide-react';
import styles from './ResumeGeneratingLoader.module.scss';

const STATUS_MESSAGES = [
  "INITIALIZING_AI_ENGINE...",
  "EXTRACTING_KEY_METRICS...",
  "STRUCTURING_MERN_STACK_DATA...",
  "OPTIMIZING_LAYOUT_SCHEMAS...",
  "FINALIZING_PDF_BUFFER..."
];

const ResumeGeneratingLoader = () => {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.absoluteOverlay}>
      <div className={styles.wrapper}>
        <div className={styles.gridOverlay} />
        
        <div className={styles.centralHub}>
          <div className={styles.coreContainer}>
            <motion.div 
              className={styles.outerRing}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className={styles.innerRing}
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <div className={styles.centerIcon}>
              <Cpu size={40} />
            </div>
            
            <motion.div 
              className={styles.orbitItem}
              animate={{ x: [0, 50, 0, -50, 0], y: [50, 0, -50, 0, 50] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <Zap size={12} fill="currentColor" />
            </motion.div>
          </div>

          <div className={styles.textContainer}>
            <motion.h2 
              className={styles.glitchText}
              data-text="GENERATING_RESUME"
            >
              GENERATING_RESUME
            </motion.h2>

            <div className={styles.statusBox}>
              <Loader2 className={styles.spinner} size={14} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={statusIndex}
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  className={styles.statusText}
                >
                  {STATUS_MESSAGES[statusIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className={styles.progressTrack}>
            <motion.div 
              className={styles.progressBar}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 10, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeGeneratingLoader;