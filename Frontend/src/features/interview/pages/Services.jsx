import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { 
  Cpu, 
  FileCheck, 
  Map, 
  Target, 
  Zap, 
  Search,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import styles from './Services.module.scss';

const Services = () => {
  const serviceList = [
    {
      icon: <Cpu size={28} />,
      title: "Smart Interview Prep",
      description: "Our advanced neural engine predicts the exact technical and soft-skill questions you'll face based on your resume and the job role."
    },
    {
      icon: <Target size={28} />,
      title: "Skill Gap Detection",
      description: "We compare your profile against job requirements to highlight exactly which skills you need to mention to impress the hiring team."
    },
    {
      icon: <Map size={28} />,
      title: "Career Path Mapping",
      description: "Get a clear, step-by-step plan that shows you how to grow from your current level to your dream senior position."
    },
    {
      icon: <Zap size={28} />,
      title: "ATS-Ready Resumes",
      description: "Build a professional resume using templates designed specifically to pass through automated screening systems and reach human eyes."
    },
    {
      icon: <Search size={28} />,
      title: "Powerful Word Choice",
      description: "We automatically suggest the best action words and industry terms to make your experience stand out to recruiters."
    },
    {
      icon: <FileCheck size={28} />,
      title: "Easy PDF Export",
      description: "Create, preview, and download your finished resume as a high-quality PDF that looks perfect on any device or screen."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className={styles.servicesPage}>
      <header className={styles.heroSection}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.topBadge}
        >
          <ShieldCheck size={14} />
          <span>PROFESSIONAL TOOLS</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Everything you need to <br /> <span>Get Hired Faster</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Delta Hire uses modern technology to help you bridge the gap between your current skills and your next big career move.
        </motion.p>
      </header>

      <motion.div 
        className={styles.featureGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {serviceList.map((item, idx) => (
          <motion.div 
            key={idx} 
            className={styles.featureCard}
            variants={cardVariants}
          >
            <div className={styles.iconContainer}>
              {item.icon}
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.footer 
        className={styles.ctaWrapper}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className={styles.ctaCard}>
          <div className={styles.ctaText}>
            <h2>Ready to see the results?</h2>
            <p>Start your first profile analysis today and boost your chances.</p>
          </div>
          <Link to="/dashboard/new-report" className={styles.startBtn}>
            Start New Report <ArrowRight size={20} />
          </Link>
        </div>
      </motion.footer>
    </div>
  );
};

export default Services;