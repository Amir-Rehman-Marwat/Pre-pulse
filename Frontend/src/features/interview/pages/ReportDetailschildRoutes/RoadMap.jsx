import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import styles from "./Roadmap.module.scss";
import { useParams } from "react-router";
import InterviewHook from "../../interviewHooks/interview.hook";
import AnalysisLoader from "../../components/reportDetailsLoading";
import { InterviewContext } from "../../interviewContexts/interview.context";
import { useContext } from "react";

const Roadmap = () => {
  const { id } = useParams();
 const context= useContext(InterviewContext)
   const {report}=context
InterviewHook("roadMap")
    return (
      <motion.div
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <h1>Preparation Roadmap</h1>
            <p>
              A step-by-step guide to mastering the requirements for this role.
            </p>
          </div>
          <div className={styles.metaBadge}>
            <Clock size={16} />
            <span>{report.preperationPlane.length} Day Schedule</span>
          </div>
        </header>

        <div className={styles.timeline}>
          {report.preperationPlane.map((item, index) => (
            <motion.div
              key={index}
              className={styles.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={styles.indicator}>
                <div className={styles.numberCircle}>{index + 1}</div>
                <div className={styles.verticalLine}></div>
              </div>

              <div className={styles.contentCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.dayLabel}>{item.day}</span>
                  <h3 className={styles.focusTitle}>{item.focus}</h3>
                </div>

                <ul className={styles.taskList}>
                  {item.Tasks.map((task, tIdx) => (
                    <li key={tIdx}>{task}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }
export default Roadmap;
