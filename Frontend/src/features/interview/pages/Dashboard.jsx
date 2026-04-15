import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router'; 
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Layers, 
  Info, 
  FilePlus, 
  History, 
  LogOut, 
  Menu, 
  X,
  Fingerprint,
  AlertTriangle
} from 'lucide-react';
import styles from './Dashboard.module.scss';
import { getMe } from '../../auth/services/auth.api';
import InterviewHook from '../interviewHooks/interview.hook';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [userName, setuserName] = useState(".");
  const { handleLogOut } = InterviewHook();

  useEffect(() => {
    const run = async () => {
      try {
        const response = await getMe();
        const lowerCaseName = response.data.user.userName;
        setuserName(lowerCaseName.split(" ")[0].toUpperCase());
      } catch (e) {
        setuserName("GUEST_PILOT");
      }
    };
    run();
  }, []);

  const executeLogout = async () => {
    await handleLogOut();
  };

  return (
    <div className={styles.dashboardContainer}>
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div 
            className={styles.confirmOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.confirmBox}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <AlertTriangle color="#dc143c" size={32} />
              <h3>Terminate Session?</h3>
              <p>Are you sure you want to exit the Delta interface?</p>
              <div className={styles.confirmActions}>
                <button className={styles.cancelBtn} onClick={() => setShowLogoutConfirm(false)}>Stay</button>
                <button className={styles.confirmBtn} onClick={executeLogout}>Exit</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <div className={styles.userPilot}>
            <div className={styles.pilotInfo}>
              <span className={styles.pilotRole}>CANDIDATE</span>
              <span className={styles.pilotName}>{userName}</span>
            </div>
            <div className={styles.avatarHex}><Fingerprint size={18} /></div>
          </div>

          <button 
            className={styles.menuBtn} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
          
          <button 
            className={styles.logoutBtn} 
            aria-label="Logout" 
            onClick={() => setShowLogoutConfirm(true)}
          >
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className={styles.mobileOverlay}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div 
              className={styles.menuCard}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.mobileMenuLinks}>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                <div className={styles.menuDivider} />
                <button 
                  className={styles.mobileLogout}  
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowLogoutConfirm(true);
                  }}
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.mainLayout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <p className={styles.sectionLabel}>ANALYTICS</p>
            <NavLink to="new-report" className={({ isActive }) => isActive ? `${styles.sideLink} ${styles.active}` : styles.sideLink}>
              <FilePlus size={22} /><span className={styles.linkText}>New Report</span>
            </NavLink>
            <NavLink to="history" className={({ isActive }) => isActive ? `${styles.sideLink} ${styles.active}` : styles.sideLink}>
              <History size={22} /><span className={styles.linkText}>History</span>
            </NavLink>
          </div>
        </aside>

        <section className={styles.contentArea}>
          <div className={styles.outletWrapper}><Outlet /></div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;