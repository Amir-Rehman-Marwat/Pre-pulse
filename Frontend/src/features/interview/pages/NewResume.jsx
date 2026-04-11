import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilePlus, Check, Zap, ArrowRight, MousePointer2, Info } from 'lucide-react';
import styles from './NewResume.module.scss';
import { InterviewContext } from '../interviewContexts/interview.context';
import InterviewHook from '../interviewHooks/interview.hook';
import { useParams } from 'react-router';
import ResumeGeneratingLoader from '../components/resumeGeneratingLoader';

const NewResume = () => {
  const { id } = useParams();
  const context = useContext(InterviewContext);
  const { handleAllTemplates,handleNewResume } = InterviewHook();
  const { templates, newResumeLoading ,NewResumeUrl} = context;
  const [selectedLayout, setSelectedLayout] = useState(null);
console.log(NewResumeUrl)
  useEffect(() => {
    const run = async () => {
      await handleAllTemplates();
    };
    run();
  }, []);

  const generateNewPdf=async ()=>{
 try {
  const response =await handleNewResume(id,selectedLayout)
 console.dir(response)
 } catch (error) {
  console.dir(error)
 }
  }

  if (newResumeLoading) {
    return (
      <ResumeGeneratingLoader/>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.miniHeader}>
        <div className={styles.titleSlot}>
          <div className={styles.dot} />
          <span>SELECT_INTERFACE</span>
        </div>
        <div className={styles.stats}>
          <span className={styles.count}>{templates?.length || 0} AVAILABLE</span>
        </div>
      </header>

      <div className={styles.templateGrid}>
        {templates?.map((tpl) => (
          <div
            key={tpl.layoutId}
            className={`${styles.card} ${selectedLayout === tpl.layoutId ? styles.active : ''}`}
            onClick={() => setSelectedLayout(prev => (prev === tpl.layoutId ? null : tpl.layoutId))}
          >
            <div className={styles.imgFrame}>
              <img src={tpl.thumbnail} alt={tpl.name} />
              <AnimatePresence>
                {selectedLayout === tpl.layoutId && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.activeOverlay}
                  >
                    <div className={styles.checkCircle}>
                      <Check size={16} strokeWidth={3} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={styles.cardInfo}>
              <div className={styles.labelRow}>
                <span className={styles.version}>{tpl.layoutId}</span>
                <h3>{tpl.name.replace('_', ' ')}</h3>
              </div>
              
              {/* --- ADDED DESCRIPTION SECTION --- */}
              <div className={styles.descriptionArea}>
                <p>{tpl.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className={styles.bottomBar}>
        <div className={styles.selectionInfo}>
          <MousePointer2 size={12} className={styles.cursorIcon} />
          <div className={styles.textGroup}>
            <span className={styles.statusLabel}>SELECTED_LAYOUT</span>
            <span className={styles.statusValue}>{selectedLayout || 'NULL_PTR'}</span>
          </div>
        </div>

        <button
          className={styles.initBtn}
          disabled={!selectedLayout}
          onClick={()=>{
           generateNewPdf()
          }}
        >
          <span>BUILD_PDF</span>
          <Zap size={14} fill={selectedLayout ? "currentColor" : "none"} />
          <ArrowRight size={14} />
        </button>
      </footer>
    </div>
  );
};

export default NewResume;