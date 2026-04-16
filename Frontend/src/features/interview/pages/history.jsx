import React from 'react';
import { Sparkles, Calendar, ChevronRight } from 'lucide-react';
import styles from './History.module.scss';
import { useContext } from 'react';
import { InterviewContext } from '../interviewContexts/interview.context';
import InterviewHook from '../interviewHooks/interview.hook';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import NoHistory from '../components/NoHistory';

const History = () => {
  const navigate = useNavigate()
  const context = useContext(InterviewContext)
  const { loading, reports } = context
  const { handleReportsHistory } = InterviewHook()

  useEffect(() => {
    const run = async () => {
      await handleReportsHistory()
    }
    run()
  }, [])

  if (!reports) {
    return <NoHistory />
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.statsIcon}>
            <Sparkles size={16} />
          </div>
          {reports.length === 1 && <p>You have generated <span>{reports.length} report</span></p>}
          {reports.length !== 1 && <p>You have generated <span>{reports.length} reports</span></p>}
        </div>

        <div className={styles.list}>
          {reports.map((report, idx) => {
            const formattedDate = report.createdAt ? report.createdAt.split('T')[0] : "";
            const firstName = report.candidateName ? report.candidateName.split(" ")[0] : "";

            return <div key={idx} className={styles.card}>
              <div className={styles.section}>
                <h4 className={styles.title}>{report.jobTittle}</h4>
              </div>

              <div className={styles.section}>
                <div className={styles.meta}>
                  <Calendar size={12} />
                  <span>{formattedDate}</span>
                </div>
              </div>

              <div className={styles.section}>
                <span className={styles.candidateNameDisplay}>
                  {firstName || ""}
                </span>
              </div>

              <div className={styles.section}>
                <button className={styles.actionBtn} onClick={() => {
                  navigate(`/reportDetails/${report._id}/gaps`)
                }}>
                  View Details
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    );
  }
};

export default History;