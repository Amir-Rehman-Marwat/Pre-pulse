import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Layers, User, Zap, BarChart, Globe } from 'lucide-react';
import styles from './About.module.scss';

const About = () => {
  const techStack = [
    { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Express", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.ambientGlow} />
      
      <motion.div 
        className={styles.mainContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <header className={styles.heroSection}>
          <motion.div className={styles.profileContainer} variants={fadeInUp}>
            <div className={styles.imageMask}>
              <img 
                src="https://res.cloudinary.com/djsmx24lx/image/upload/q_auto/f_auto/v1776490512/WhatsApp_Image_2026-04-17_at_10.33.01_PM_wdijsv.jpg" 
                alt="Amir Rehman Marwat" 
                className={styles.avatar}
              />
            </div>
          </motion.div>

          <motion.h1 className={styles.nameHeader} variants={fadeInUp}>
            Amir Rehman <span>Marwat</span>
          </motion.h1>
          
          <motion.p className={styles.introParagraph} variants={fadeInUp}>
           An under 18 Full-stack engineer specializing in MERN development and intelligent 
            automation. Dedicated to architecting scalable digital solutions that 
            leverage modern technology to solve real-world career challenges.
          </motion.p>

          <div className={styles.stackContainer}>
            {techStack.map((tech, i) => (
              <motion.div 
                key={i} 
                className={styles.techTile}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <img src={tech.url} alt={tech.name} />
                <span>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </header>

        <section className={styles.aboutProject}>
          <motion.div className={styles.projectContent} variants={fadeInUp}>
            <div className={styles.label}>PRODUCT OVERVIEW</div>
            <h2>Delta Hire</h2>
            <p>
              Delta Hire is a professional ecosystem designed to optimize the career transition 
              process. By integrating advanced analytical processing with full-stack 
              architecture, the platform provides users with high-precision tools to 
              standardize and elevate their professional profiles for the modern global market.
            </p>
          </motion.div>

          <div className={styles.capabilityGrid}>
            <motion.div className={styles.capabilityCard} variants={fadeInUp}>
              <Zap size={24} className={styles.icon} />
              <h4>Intelligent Optimization</h4>
              <p>Advanced algorithmic refinement of professional documentation.</p>
            </motion.div>
            <motion.div className={styles.capabilityCard} variants={fadeInUp}>
              <BarChart size={24} className={styles.icon} />
              <h4>Gap Assessment</h4>
              <p>Deep-layer analysis of technical skill compatibility.</p>
            </motion.div>
            <motion.div className={styles.capabilityCard} variants={fadeInUp}>
              <Layers size={24} className={styles.icon} />
              <h4>System Integration</h4>
              <p>Full-stack MERN architecture for seamless performance.</p>
            </motion.div>
          </div>
        </section>

        <motion.footer className={styles.corporateFooter} variants={fadeInUp}>
          <div className={styles.footerWrap}>
            <p>DEVELOPER: AMIR REHMAN MARWAT</p>
            <p>STATUS: DEPLOYED & OPERATIONAL</p>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default About;