import React from 'react';
import { Link, NavLink, Outlet } from 'react-router'; 
import { motion } from 'framer-motion';
import { useContext } from "react";
import { 
  Home, 
  Layers, 
  Info, 
  FilePlus, 
  History, 
  LogOut,
  Zap
} from 'lucide-react';
import styles from './Dashboard.module.scss';
import { InterviewContext } from '../interviewContexts/interview.context';

const Dashboard = ({ userName = "Alex" }) => {
  const context = useContext(InterviewContext);

  const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* --- TOP NAVBAR --- */}
      <nav className={styles.topNav}>
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            <Layers size={18} color="#dc143c" />
          </div>
          <h2>Delta Hire</h2>
        </div>
        
        <div className={styles.navLinks}>
          <Link to="/" className={styles.topLink}><Home size={18} /> Home</Link>
          <Link to="/services" className={styles.topLink}><Layers size={18} /> Services</Link>
          <Link to="/about" className={styles.topLink}><Info size={18} /> About</Link>
        </div>

        <div className={styles.profileArea}>
          <button className={styles.logoutBtn} aria-label="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <div className={styles.mainLayout}>
        {/* --- LEFT SIDEBAR --- */}
        <motion.aside 
          className={styles.sidebar}
          initial="hidden"
          animate="visible"
          variants={sidebarVariants}
        >
          <div className={styles.sidebarContent}>
            <p className={styles.sectionLabel}>ANALYTICS</p>
            
            <NavLink 
  to="new-report" 
  className={({ isActive }) => isActive ? `${styles.sideLink} ${styles.active}` : styles.sideLink}
>
  <FilePlus size={20} />
  <span className={styles.linkText}>New Report</span>
</NavLink>

<NavLink 
  to="history" 
  className={({ isActive }) => isActive ? `${styles.sideLink} ${styles.active}` : styles.sideLink}
>
  <History size={20} />
  <span className={styles.linkText}>History</span>
</NavLink>
          </div>
          
          <div className={styles.sidebarFooter}>
            <div className={styles.statusBadge}>
              <Zap size={12} />
              <span>System Operational</span>
            </div>
          </div>
        </motion.aside>

        {/* --- RIGHT CONTENT AREA --- */}
        <motion.section 
          className={styles.contentArea}
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          <header className={styles.welcomeHeader}>
            <h1 className={styles.welcomeTitle}>
              Welcome to the Dashboard, <span className={styles.userName}>{userName}</span>
            </h1>
            <p className={styles.welcomeSubtitle}>Select a tool from the left to begin your AI analysis.</p>
          </header>

          <div className={styles.outletWrapper}>
            <Outlet />
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Dashboard;