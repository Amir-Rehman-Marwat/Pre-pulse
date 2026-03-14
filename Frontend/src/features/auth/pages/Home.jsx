import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, UploadCloud, Target, Zap, ArrowRight, Layers } from 'lucide-react';
import styles from './HomePage.module.scss';
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/auth.context';
import { getMe } from '../services/auth.api';

const HomePage = () => {
  const context=useContext(AuthContext)
  const [name, setName] = useState(".")
console.log(name)
  useEffect(() => {
    const run=async()=>{
const response=await getMe()
const lowerCaseName=response.data.user.userName
setName(lowerCaseName.split(" ")[0].toUpperCase())
console.log(response)

    }
    run()
  }, [])
  
  const navigate = useNavigate();
  const welcomeText = "Welcome,";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 }
    }
  };

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
  <div className={styles.iconBox}>
    <Layers size={22} color="#dc143c" />
  </div>
  <h1>Delta Hire</h1>
</div>
        
        {/* Profile removed, Dashboard made attractive */}
        <div className={styles.navActions}>
          <button 
            className={styles.dashboardLink} 
            onClick={() => navigate("/dashboard/new-report")}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
        </div>
      </nav>

      <motion.main 
        className={styles.mainContent}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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
              {name.split("").map((char, index) => (
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
          onClick={() => navigate("/dashboard/new-report")}
        >
          CONTINUE TO DASHBOARD <ArrowRight size={20} />
        </motion.button>
      </motion.main>
    </div>
  );
};

export default HomePage;