import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, UserCircle, UploadCloud, Target, Zap, ArrowRight } from 'lucide-react';
import styles from './HomePage.module.scss';
import { Navigate, useNavigate } from 'react-router';

const HomePage = ({ userName = "Alex" }) => {
  const navigate=useNavigate()
  const welcomeText = "Welcome,";
  const nameText = `${userName}!`;

  // Faster, snappier stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 } // Reduced delay for speed
    }
  };

  // Snappy pop-in animation
  const letterVariants = {
    hidden: { opacity: 0, x: -10, filter: "blur(5px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", damping: 20, stiffness: 300 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.logoArea}>
          <div className={styles.iconBox}><Zap size={20} color="white" fill="white" /></div>
          <h1>Delta Hire</h1>
        </div>
        <div className={styles.navIcons}>
          <UserCircle size={26} />
          <LayoutDashboard size={26} />
        </div>
      </nav>

      <motion.main 
        className={styles.mainContent}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Perfectly Arranged Title */}
        <div className={styles.titleWrapper}>
          <motion.h2 className={styles.title}>
            <div className={styles.row}>
              {welcomeText.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants} className={styles.letter}>
                  {char}
                </motion.span>
              ))}
            </div>
            <div className={styles.row}>
              {nameText.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants} className={styles.nameLetter}>
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.h2>
        </div>
        
        <motion.p variants={itemVariants} className={styles.subtitle}>
          The elite AI engine to analyze, match, and prepare you for your dream role.
        </motion.p>

        <div className={styles.serviceList}>
          {[{ icon: <UploadCloud size={18}/>, text: "1. Upload Resume" },
            { icon: <Target size={18}/>, text: "2. Define Target Job" },
            { icon: <Zap size={18}/>, text: "3. Generate Path" }].map((step, i) => (
            <motion.div key={i} variants={itemVariants} className={styles.serviceCard} whileHover={{ scale: 1.02, x: 5 }}>
              <span className={styles.icon}>{step.icon}</span>
              <span className={styles.cardText}>{step.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.button 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className={styles.continueBtn}
          onClick={()=>{
          navigate("/baase")
          }}
        >
          CONTINUE TO DASHBOARD <ArrowRight size={20} />
        </motion.button>
      </motion.main>
    </div>
  );
};

export default HomePage;