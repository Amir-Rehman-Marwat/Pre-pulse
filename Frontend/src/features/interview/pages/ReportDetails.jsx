import React, { useEffect, useState, useContext } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight,
  Home,
  LayoutDashboard, 
  Terminal, 
  Cpu, 
  Activity, 
  Compass,
  Fingerprint,
  Zap,
  Menu,
  X,
  FilePlus 
} from 'lucide-react';
import styles from './ReportDetails.module.scss';
import InterviewHook from '../interviewHooks/interview.hook';
import { getMe } from '../../auth/services/auth.api';
import { InterviewContext } from '../interviewContexts/interview.context';

const ReportDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleReportDetails } = InterviewHook();
  const context = useContext(InterviewContext);
  const { report } = context;
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        await handleReportDetails(id);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    run();
  }, [id]);

  

  if (loading) return <div className={styles.initialLoading}>SYSTEM_INITIALIZING...</div>;

  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (report.matchScore / 100) * circumference;

  return (
    <div className={styles.appContainer}>
      <header className={styles.commandHeader}>
        <div className={styles.headerSection}>
          <button className={styles.mobileToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className={styles.navGroup}>
            <button onClick={() => navigate(-1)} className={styles.glassBtn}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => navigate('/dashboard/history')} className={styles.glassBtn}>
              <LayoutDashboard size={18} />
            </button>
            <button onClick={() => navigate('/')} className={`${styles.glassBtn} ${styles.desktopOnly}`}>
              <Home size={18} />
            </button>
            <button onClick={() => window.history.forward()} className={`${styles.glassBtn} ${styles.desktopOnly}`}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className={`${styles.headerSection} ${styles.center}`}>
          <div className={styles.systemStatus}>
            <div className={styles.statusDot}></div>
            <span className={styles.statusText}>SYSTEM ACTIVE</span>
          </div>
        </div>

        <div className={`${styles.headerSection} ${styles.right}`}>
          <div className={styles.userPilot}>
            <div className={styles.pilotInfo}>
              <span className={styles.pilotRole}>CANDIDATE</span>
              <span className={styles.pilotName}>{report.candidateName.split(" ")[0] || "Guest"}</span>
            </div>
            <div className={styles.avatarHex}><Fingerprint size={18} /></div>
          </div>
        </div>
      </header>

      <div className={styles.mainContent}>
        <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarActive : ''}`}>
          <div className={styles.reportIdentity}>
            <h1 className={styles.mainJobTitle}>{report.jobTittle}</h1>
          </div>

          <div className={styles.scoreHub}>
            <div className={styles.circleContainer}>
              <svg className={styles.svgRing} width="170" height="170">
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#dc143c" />
                  </linearGradient>
                </defs>
                <circle className={styles.ringTrack} cx="85" cy="85" r={radius} />
                <motion.circle 
                  className={styles.ringIndicator} 
                  cx="85" cy="85" r={radius}
                  stroke="url(#scoreGradient)"
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: strokeDashoffset }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  style={{ strokeDasharray: circumference }}
                />
              </svg>
              <div className={styles.scoreContent}>
                <span className={styles.scoreNum}>{report.matchScore}%</span>
                <span className={styles.scoreLabel}>MATCH SCORE</span>
              </div>
            </div>
          </div>

          <nav className={styles.sideLinks}>
            {['technical', 'behavioral', 'gaps', 'roadmap'].map((path) => (
              <NavLink 
                key={path}
                to={`/reportDetails/${id}/${path}`} 
                onClick={() => setIsMenuOpen(false)}
                className={({isActive}) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}
              >
                {path === 'technical' && <Terminal size={18} />}
                {path === 'behavioral' && <Cpu size={18} />}
                {path === 'gaps' && <Activity size={18} />}
                {path === 'roadmap' && <Compass size={18} />}
                <span>{path.toUpperCase()}</span>
              </NavLink>
            ))}

            {/* --- COMPACT AI RESUME CTA --- */}
            <div className={styles.compactCta}>
              <NavLink 
                to={`/reportDetails/${id}/new-resume`} 
                onClick={() => setIsMenuOpen(false)}
                className={({isActive}) => isActive ? `${styles.miniResumeBtn} ${styles.miniActive}` : styles.miniResumeBtn}
              >
                <div className={styles.glowLayer} />
                <FilePlus size={16} />
                <span>AI RESUME GEN</span>
                <Zap size={12} className={styles.miniZap} />
              </NavLink>
            </div>
          </nav>
        </aside>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className={styles.mobileOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        <main className={styles.workspace}>
           <Outlet />
          <footer className={styles.workspaceFooter}>
            <div className={styles.footerTag}>
              <Zap size={12} fill="currentColor" />
              <span>POWERED BY DELTA AI 3.0</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default ReportDetails;