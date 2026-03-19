import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilePlus, Check, Zap, ArrowRight, MousePointer2 } from 'lucide-react';
import styles from './NewResume.module.scss';
import { InterviewContext } from '../interviewContexts/interview.context';
import InterviewHook from '../interviewHooks/interview.hook';
import { useParams } from 'react-router';

const NewResume = () => {
  const {id}=useParams()
  console.log(id)
const context=useContext (InterviewContext)
 const {handleAllTemplates}=InterviewHook()
const {templates,newResumeLoading}=context
  const [selectedLayout, setSelectedLayout] = useState(null);
useEffect(() => {
 const run =async()=>{
  const response= await handleAllTemplates()
 }
 run()
}, [])

  
if(newResumeLoading){
  return <div>LOADING ...</div>
}else{
   return (
    <div className={styles.container}>
      {/* --- CUTE COMPACT HEADER --- */}
      <header className={styles.miniHeader}>
        <div className={styles.titleSlot}>
          <div className={styles.dot} />
          <span>SELECT_INTERFACE</span>
        </div>
        <div className={styles.stats}>
          <span className={styles.count}>{templates.length} AVAILABLE</span>
        </div>
      </header>

      <div className={styles.templateGrid}>
        {templates.map((tpl) => (
          <div 
            key={tpl.layoutId}
            className={`${styles.card} ${selectedLayout === tpl.layoutId ? styles.active : ''}`}
            onClick={() => setSelectedLayout(prev => prev === tpl.layoutId ? null : tpl.layoutId)}
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
                <h3>{tpl.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- CUTE SLIM GENERATE AREA --- */}
      <footer className={styles.bottomBar}>
        <div className={styles.selectionInfo}>
          <MousePointer2 size={12} className={styles.cursorIcon} />
          <span className={styles.statusLabel}>SELECTED:</span>
          <span className={styles.statusValue}>{selectedLayout || 'NONE'}</span>
        </div>
        
        <button 
          className={styles.initBtn}
          disabled={!selectedLayout}
        >
          <span>BUILD_RESUME</span>
          <ArrowRight size={14} />
        </button>
      </footer>
    </div>
  );
}
 
};

export default NewResume;