import React from 'react'
import styles from './DetailsIndex.module.scss';
export default function DetailsIndex() {
  return (
    <>
    <div className={styles.welcomeState}>
                   <div className={styles.cyberCircle}></div>
                   <h2>Awaiting Selection...</h2>
                   <p>Initialize a module from the sidebar to begin deep-diving into your report.</p>
                </div>
    </>
  )
}
