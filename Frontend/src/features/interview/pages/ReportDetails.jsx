import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  LayoutDashboard, 
  Terminal, 
  Cpu, 
  Activity, 
  Compass,
  Globe,
  Fingerprint,
  Zap
} from 'lucide-react';
import styles from './ReportDetails.module.scss';

const ReportDetails = ({ 
  jobTitle = "Senior MERN Stack Developer", 
  matchScore = 72,
  userName = "Ahmed Raza"
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.appContainer}>
      {/* --- ELITE COMMAND TOP BAR --- */}
      <header className={styles.commandHeader}>
        <div className={styles.headerLeft}>
          <button onClick={() => navigate(-1)} className={styles.glassBackBtn}>
            <ChevronLeft size={18} />
          </button>
          <div className={styles.verticalDivider}></div>
          <div className={styles.systemStatus}>
            <div className={styles.statusDot}></div>
            <span className={styles.statusText}>SYSTEM ACTIVE // ANALYSIS COMPLETE</span>
          </div>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.userPilot}>
            <div className={styles.pilotInfo}>
              <span className={styles.pilotRole}>CANDIDATE</span>
              <span className={styles.pilotName}>{userName}</span>
            </div>
            <div className={styles.avatarHex}>
              <Fingerprint size={20} />
            </div>
          </div>
        </div>
      </header>

      <div className={styles.mainContent}>
        {/* --- THE SIDEBAR NAVIGATOR --- */}
        <aside className={styles.sidebar}>
          <div className={styles.reportIdentity}>
            <div className={styles.jobBadge}>
              <Globe size={12} /> <span>CORE_ANALYSIS_01</span>
            </div>
            <h1 className={styles.mainJobTitle}>{jobTitle}</h1>
          </div>

          <div className={styles.scoreHub}>
            <div className={styles.scoreWrapper}>
              <div className={styles.scoreNumber}>{matchScore}%</div>
              <div className={styles.scoreLabel}>MATCH INDEX</div>
              {/* Animated Progress Bar */}
              <div className={styles.progressTrack}>
                <motion.div 
                  className={styles.progressFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${matchScore}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          <nav className={styles.sideLinks}>
            <NavLink to="technical" className={({isActive}) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
              <Terminal size={18} /> <span>TECHNICAL_QUESTIONS</span>
            </NavLink>
            <NavLink to="behavioral" className={({isActive}) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
              <Cpu size={18} /> <span>BEHAVIORAL_INSIGHTS</span>
            </NavLink>
            <NavLink to="gaps" className={({isActive}) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
              <Activity size={18} /> <span>SKILL_GAP_MATRIX</span>
            </NavLink>
            <NavLink to="roadmap" className={({isActive}) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
              <Compass size={18} /> <span>PREPARATION_ROADMAP</span>
            </NavLink>
          </nav>
          
          <div className={styles.sidebarBottom}>
            <Zap size={14} /> <span>POWERED BY DELTA AI 3.0</span>
          </div>
        </aside>

        {/* --- DYNAMIC WORKSPACE --- */}
        <main className={styles.workspace}>
          <div className={styles.viewPort}>
            <Outlet />
            
            {/* Initial Welcome/Empty State */}
            <div className={styles.welcomeState}>
               <div className={styles.cyberCircle}></div>
               <h2>Awaiting Selection...</h2>
               <p>Initialize a module from the sidebar to begin deep-diving into your report.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportDetails;