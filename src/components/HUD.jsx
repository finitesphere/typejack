import React from 'react'
import styles from './HUD.module.css'

export default function HUD({ wpm, accuracy, elapsedSeconds, sceneIndex, totalScenes }) {
  return (
    <div className={styles.hud}>
      <div className={styles.stat}>
        <span className={styles.val}>{wpm}</span>
        <span className={styles.lbl}>wpm</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.val}>{accuracy}%</span>
        <span className={styles.lbl}>accuracy</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.val}>{elapsedSeconds}s</span>
        <span className={styles.lbl}>time</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.val}>{sceneIndex + 1}/{totalScenes}</span>
        <span className={styles.lbl}>scene</span>
      </div>
    </div>
  )
}
