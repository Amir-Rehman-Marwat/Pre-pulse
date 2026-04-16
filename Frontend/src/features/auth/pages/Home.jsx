import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  Zap, 
  ArrowRight, 
  Layers 
} from 'lucide-react';
import styles from './HomePage.module.scss';
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/auth.context';
import { getMe } from '../services/auth.api';

const HomePage = () => {
  const context = useContext(AuthContext);
  const [name, setName] = useState("USER");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        if (response?.data?.user?.userName) {
          setName(response.data.user.userName.split(" ")[0].toUpperCase());
        }
      } catch (e) {
        console.error("Session sync paused");
      }
    };
    fetchUser();
  }, []);

  const welcomeText = "Welcome,";

  const viewportConfig = { once: true, amount: 0.3 };

  return (
    <div className={styles.container}>
      <div className={styles.ambientGlow} />
      
      <nav className={styles.nav}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={styles.logoArea}
        >
          <div className={styles.iconBox}>
            <Layers size={22} color="#dc143c" />
          </div>
          <h1>Delta Hire</h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={styles.navActions}
        >
          <button onClick={() => navigate("/dashboard/new-report")} className={styles.dashboardLink}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
        </motion.div>
      </nav>

      <motion.main className={styles.mainContent}>
        <div className={styles.titleWrapper}>
          <div className={styles.row}>
            {welcomeText.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: i * 0.04, duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
                className={styles.letter}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          <div className={styles.row}>
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.8, type: "spring", bounce: 0.4 }}
                className={styles.nameLetter}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className={styles.subtitle}
        >
          Smart analysis. Gap detection. ATS-optimized resumes. 
          The complete toolkit for your next career move.
        </motion.p>

        <motion.div 
          className={styles.serviceGrid}
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: 1.2 } }
          }}
        >
          {[
            { icon: <Target size={18}/>, text: "Job Analysis" },
            { icon: <Zap size={18}/>, text: "Skill Mapping" },
            { icon: <FileText size={18}/>, text: "Resume Builder" }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              className={styles.serviceCard}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.cardText}>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.button 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)" }}
          whileTap={{ scale: 0.98 }}
          className={styles.continueBtn}
          onClick={() => navigate("/dashboard/new-report")}
        >
          EXPLORE DELTA HIRE <ArrowRight size={20} />
        </motion.button>
      </motion.main>
    </div>
  );
};

export default HomePage;