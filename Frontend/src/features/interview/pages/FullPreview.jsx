import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ShieldCheck, 
  Printer, 
  ExternalLink,
  Info
} from 'lucide-react';
import { InterviewContext } from '../interviewContexts/interview.context';
import styles from './FullPreview.module.scss';

const FullPreview = () => {
  const navigate = useNavigate();
  const { NewResumeUrl } = useContext(InterviewContext);

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

  const handlePrint = () => {
    const printWindow = window.open(NewResumeUrl, '_blank');
    if (printWindow) printWindow.print();
  };

  return (
    <motion.div 
      className={styles.viewerContainer}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header className={styles.viewerHeader}>
        <div className={styles.left}>
          <button onClick={() => navigate(-1)} className={styles.backBtn}>
            <ChevronLeft size={18} />
            <span>EXIT_INSPECTOR</span>
          </button>
        </div>

        <div className={styles.center}>
          <div className={styles.docBadge}>
            <ShieldCheck size={14} />
            <span>SECURE_PREVIEW</span>
          </div>
        </div>

        <div className={styles.right}>
          <button onClick={handlePrint} className={styles.actionIcon} title="Print">
            <Printer size={18} />
          </button>
          <a href={NewResumeUrl} target="_blank" rel="noreferrer" className={styles.actionIcon} title="Full Screen">
            <ExternalLink size={18} />
          </a>
        </div>
      </header>

      <div className={styles.pdfViewport}>
        <div className={styles.scanline} />
        <embed
          key={NewResumeUrl}
          src={NewResumeUrl}
          type="application/pdf"
          className={styles.pdfContent}
        />
      </div>

      <footer className={styles.viewerFooter}>
        <div className={styles.footItem}>
          <div className={styles.pulse} />
          <span>ENCRYPTED_STREAM</span>
        </div>
        <div className={styles.footItem}>
          <span>READY_FOR_EXPORT</span>
        </div>
      </footer>
    </motion.div>
  );
};

export default FullPreview;