import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Eye, 
  Download, 
  Zap, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import styles from './PreviewDownload.module.scss';

const PreviewDownload = () => {
  // Animation Orchestration
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className={styles.container}
      variants={containerVars}
      initial="hidden"
      animate="visible"
    >
      {/* --- GLOWING SUCCESS SECTION --- */}
      <motion.section variants={itemVars} className={styles.heroSection}>
        <div className={styles.iconContainer}>
          <div className={styles.ring} />
          <CheckCircle size={48} className={styles.mainCheck} />
          <Sparkles size={20} className={styles.sparkle} />
        </div>
        <div className={styles.heroText}>
          <span className={styles.badge}>SUCCESS_CONFIRMED</span>
          <h1>Resume Ready for Action</h1>
          <p>Your professional profile has been optimized and is ready for deployment.</p>
        </div>
      </motion.section>

      {/* --- ACTION GRID --- */}
      <div className={styles.actionGrid}>
        
        {/* PREVIEW CARD */}
        <motion.div 
          className={`${styles.card} ${styles.previewCard}`}
          variants={itemVars}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.97 }}
        >
          <div className={styles.glow} />
          <div className={styles.cardHeader}>
            <div className={styles.miniIcon}>
              <Eye size={24} />
            </div>
            <div className={styles.titleArea}>
              <h3>Quick Preview</h3>
              <span>Check the layout</span>
            </div>
          </div>
          <div className={styles.cardAction}>
            <span>OPEN_VIEWER</span>
            <ArrowRight size={16} />
          </div>
        </motion.div>

        {/* DOWNLOAD CARD */}
        <motion.div 
          className={`${styles.card} ${styles.downloadCard}`}
          variants={itemVars}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.97 }}
        >
          <div className={styles.glow} />
          <div className={styles.cardHeader}>
            <div className={styles.miniIcon}>
              <Download size={24} />
            </div>
            <div className={styles.titleArea}>
              <h3>Get PDF File</h3>
              <span>Save to device</span>
            </div>
          </div>
          <div className={styles.cardAction}>
            <span>START_EXPORT</span>
            <Zap size={16} fill="currentColor" />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default PreviewDownload;