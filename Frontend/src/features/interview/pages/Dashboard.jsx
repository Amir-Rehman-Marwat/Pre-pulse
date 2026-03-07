import React from 'react';
import { Link, Outlet } from 'react-router'; // v7 uses 'react-router'
import { motion } from 'framer-motion';
import { useContext ,useEffect} from "react";
import { AuthContext } from "../../../contexts/auth.context";

import { 
  Home, 
  Layers, 
  Info, 
  User, 
  FilePlus, 
  History, 
  LayoutDashboard,
  LogOut
} from 'lucide-react';
import styles from './Dashboard.module.scss';
import AuthHook from '../../../hooks/auth.hooks';
import { InterviewContext } from '../interview.context';


const Dashboard = ({ userName = "Alex" }) => {
 const context= useContext(InterviewContext);
 console.log(context)
const {handleLogOut}=AuthHook({route:"/dashboard"})
  const logOutClick=async()=>{
       const response=handleLogOut()
  }
  // Entrance animation variants
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
          <div className={styles.logoIcon}><LayoutDashboard size={18} /></div>
          <h2>Delta Hire</h2>
        </div>
        
        <div className={styles.navLinks}>
          <Link to="/" className={styles.topLink}><Home size={18} /> Home</Link>
          <Link to="/services" className={styles.topLink}><Layers size={18} /> Services</Link>
          <Link to="/about" className={styles.topLink}><Info size={18} /> About</Link>
        </div>

        <div className={styles.profileArea}>
          <button className={styles.logoutBtn} onClick={()=>{
            logOutClick()
          }} ><LogOut size={18} /></button>
          <div className={styles.profileCircle}>
            <User size={20} color="white" />
          </div>
        </div>
      </nav>

      <div className={styles.mainLayout}>
        {/* --- LEFT SIDEBAR (SIDE DOCK) --- */}
        <motion.aside 
          className={styles.sidebar}
          initial="hidden"
          animate="visible"
          variants={sidebarVariants}
        >
          <div className={styles.sidebarContent}>
            <p className={styles.sectionLabel}>ANALYTICS</p>
            <Link to="new-report" className={styles.sideLink}>
              <FilePlus size={20} />
              <span>New Report</span>
            </Link>
            <Link to="history" className={styles.sideLink}>
              <History size={20} />
              <span>History</span>
            </Link>
          </div>
          
          <div className={styles.sidebarFooter}>
            <span>v1.0.4 Stable</span>
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
            {/* React Router 7 Outlet for sub-routes */}
            <Outlet />
            
            {/* This is the empty state before a child route is picked */}
           
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Dashboard;