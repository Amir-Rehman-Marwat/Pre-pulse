import React, { useState } from 'react';
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
  X 
} from 'lucide-react';
import styles from './Dashboard.module.scss';

const Dashboard = ({ userName = "Alex" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <button 
            className={styles.menuBtn} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
          
          <button className={styles.logoutBtn} aria-label="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      {/* --- AESTHETIC MOBILE MENU --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className={styles.mobileOverlay}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          >
            <motion.div 
              className={styles.menuCard}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className={styles.mobileMenuLinks}>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                <div className={styles.menuDivider} />
                <button className={styles.mobileLogout}>
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
          <header className={styles.welcomeHeader}>
            <h1 className={styles.welcomeTitle}>Welcome, <span className={styles.userName}>{userName}</span></h1>
            <p className={styles.welcomeSubtitle}>Ready for your next analysis?</p>
          </header>
          <div className={styles.outletWrapper}><Outlet /></div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;