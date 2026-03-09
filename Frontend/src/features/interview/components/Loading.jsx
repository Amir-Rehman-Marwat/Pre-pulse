import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';
import styles from './AiLoading.module.scss';

const AiLoading = ({ message = "Delta AI is synthesizing your report..." }) => {
  // Animation variants for the core pulse
  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Variants for the rotating data rings
  const ringVariants = {
    animate: (custom) => ({
      rotate: custom.rotate,
      transition: {
        duration: custom.duration,
        repeat: Infinity,
        ease: "linear"
      }
    })
  };

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.animationStage}>
        {/* --- LAYER 1: Background Aura --- */}
        <div className={styles.deepGlow}></div>

        {/* --- LAYER 2: Orbiting Data Rings --- */}
        {/* Slow Outer Ring */}
        <motion.div 
          className={styles.dataRing}
          custom={{ rotate: 360, duration: 10 }}
          animate="animate"
          variants={ringVariants}
        ></motion.div>
        
        {/* Faster Inner Ring (Counter-clockwise) */}
        <motion.div 
          className={`${styles.dataRing} ${styles.innerRing}`}
          custom={{ rotate: -360, duration: 6 }}
          animate="animate"
          variants={ringVariants}
        ></motion.div>

        {/* --- LAYER 3: Core Synthesis Orb --- */}
        <motion.div 
          className={styles.coreOrb}
          animate="animate"
          variants={pulseVariants}
        >
          <div className={styles.orbContent}>
            <BrainCircuit size={40} className={styles.aiIcon} />
            <div className={styles.orbScanLine}></div>
          </div>
          {/* Neon Glow Layer */}
          <div className={styles.orbGlow}></div>
        </motion.div>
      </div>

      {/* --- MESSAGE AREA --- */}
      <footer className={styles.messageArea}>
        <h3>AI ANALYSIS IN PROGRESS</h3>
        <p>{message}</p>
        <div className={styles.loadingBar}>
          <div className={styles.barProgress}></div>
        </div>
      </footer>
    </div>
  );
};

export default AiLoading;