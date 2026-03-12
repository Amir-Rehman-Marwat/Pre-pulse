import React from 'react';
import { History, PlusCircle } from 'lucide-react';
import styles from './NoHistory.module.scss';
import { Link } from 'react-router';

const NoHistory = () => {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.iconWrapper}>
        <History size={48} strokeWidth={1.5} />
        <div className={styles.pulse} />
      </div>
      
      <h3 className={styles.title}>No reports found</h3>
      <p className={styles.subtitle}>
        You haven't generated any AI analysis reports yet. 
        Start by creating your first one!
      </p>

      <Link to="../new-report" className={styles.createBtn}>
        <PlusCircle size={18} />
        Create New Report
      </Link>
    </div>
  );
};

export default NoHistory;