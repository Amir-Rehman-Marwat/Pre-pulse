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
  const navigate=useNavigate()
  const context=useContext(InterviewContext)
  const {loading,reports}=context
  console.log(reports )
  const {handleReportsHistory}= InterviewHook()
  useEffect(() => {
 const run =async ()=>{
const response=await handleReportsHistory()
console.dir(response)
 } 
 run()

    
  }, [])
  if(!reports){
return <NoHistory/>
  }else{
    return (
    <div className={styles.container}>
      {/* Refined Stats Header */}
      <div className={styles.header}>
        <div className={styles.statsIcon}>
          <Sparkles size={16} />
        </div>
        <p>You have generated <span>{reports.length} reports</span></p>
      </div>

      <div className={styles.list}>
      {reports.map((report,idx)=>{
  return  <div key={idx} className={styles.card}>
          <div className={styles.mainInfo}>
            <h4 className={styles.title}>{report.jobTittle}</h4>
            <div className={styles.meta}>
              <Calendar size={12} />
              <span>Oct 24, 2025</span>
            </div>
          </div>
          
          <button className={styles.actionBtn} onClick={()=>{
navigate(`/reportDetails/${report._id}/gaps`)
          }}>
            View Details
            <ChevronRight size={14} />
          </button>
        </div>
      })}

      </div>
      </div>
    
  );
  }
};

export default History;