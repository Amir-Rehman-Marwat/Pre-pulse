import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Eye, 
  Download, 
  Zap, 
  Sparkles,
  ArrowRight,
  Info // Added Info icon for empty state
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router'; // Added useNavigate
import { toast, Toaster } from 'react-hot-toast'; 
import { InterviewContext } from '../interviewContexts/interview.context';
import styles from './PreviewDownload.module.scss';

const PreviewDownload = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // For the back button
  const { NewResumeUrl, report } = useContext(InterviewContext);

  // --- NULL CHECK GUARD ---
  if (!NewResumeUrl) {
    return (
      <div className={styles.emptyState}>
        <Info size={40} />
        <h2>DOCUMENT_VOID</h2>
        <p>No active document buffer found in system memory.</p>
        <button onClick={() => navigate(-1)}>RETURN_TO_BASE</button>
      </div>
    );
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = NewResumeUrl;
    link.setAttribute('download', `${report?.jobTittle || 'Resume'}_Optimized.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('EXPORT_SUCCESSFUL', {
      icon: <Zap size={16} color="#22d3ee" />,
      style: {
        background: '#020617',
        color: '#22d3ee',
        border: '1px solid #22d3ee',
        fontFamily: 'JetBrains Mono',
        fontSize: '0.7rem',
        letterSpacing: '1px'
      }
    });
  };

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className={styles.container}
      variants={containerVars}
      initial="hidden"
      animate="visible"
    >
      <Toaster position="bottom-right" />

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
          className={styles.cardWrapper}
          variants={itemVars}
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link to={`/reportDetails/${id}/full-preview`} className={styles.cardLink}>
            <div className={`${styles.card} ${styles.previewCard}`}>
              <div className={styles.glow} />
              <div className={styles.cardHeader}>
                <div className={styles.miniIcon}><Eye size={24} /></div>
                <div className={styles.titleArea}>
                  <h3>Quick Preview</h3>
                  <span>Check the layout</span>
                </div>
              </div>
              <div className={styles.cardAction}>
                <span>OPEN_VIEWER</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* DOWNLOAD CARD */}
        <motion.div 
          className={`${styles.card} ${styles.downloadCard}`}
          variants={itemVars}
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownload}
        >
          <div className={styles.glow} />
          <div className={styles.cardHeader}>
            <div className={styles.miniIcon}><Download size={24} /></div>
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