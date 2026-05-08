import React from 'react'
import styles from './ScoreScreen.module.css'

const GRADE_THRESHOLDS = [
  { min: 80, grade: 'S', color: '#f59e0b' },
  { min: 60, grade: 'A', color: '#22c55e' },
  { min: 40, grade: 'B', color: '#6366f1' },
  { min: 20, grade: 'C', color: '#64748b' },
  { min: 0,  grade: 'D', color: '#ef4444' },
]

function getGrade(wpm) {
  return GRADE_THRESHOLDS.find(t => wpm >= t.min) || GRADE_THRESHOLDS.at(-1)
}

export default function ScoreScreen({ results, scenes, difficulty, onRestart, onChangeDifficulty }) {
  const avgWpm      = Math.round(results.reduce((s, r) => s + r.wpm, 0) / results.length)
  const avgAccuracy = Math.round(results.reduce((s, r) => s + r.accuracy, 0) / results.length)
  const totalTime   = results.reduce((s, r) => s + r.elapsedSeconds, 0)
  const totalErrors = results.reduce((s, r) => s + r.errors, 0)
  const { grade, color } = getGrade(avgWpm)

  return (
    <div className={styles.wrap}>
      <div className={styles.gradeCircle} style={{ borderColor: color, color }}>
        {grade}
      </div>
      <h2 className={styles.title}>round complete</h2>
      <p className={styles.sub}>{difficulty} difficulty · {scenes.length} scenes</p>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statVal}>{avgWpm}</div>
          <div className={styles.statLbl}>avg wpm</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statVal}>{avgAccuracy}%</div>
          <div className={styles.statLbl}>accuracy</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statVal}>{totalTime}s</div>
          <div className={styles.statLbl}>total time</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statVal}>{totalErrors}</div>
          <div className={styles.statLbl}>errors</div>
        </div>
      </div>

      <div className={styles.breakdown}>
        <div className={styles.breakdownTitle}>scene breakdown</div>
        {results.map((r, i) => (
          <div key={i} className={styles.breakdownRow}>
            <span className={styles.breakdownScene}>{scenes[i]?.label}</span>
            <span className={styles.breakdownStats}>
              <span className={styles.breakdownWpm}>{r.wpm} wpm</span>
              <span className={styles.breakdownAcc}>{r.accuracy}%</span>
              <span className={styles.breakdownTime}>{r.elapsedSeconds}s</span>
            </span>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.btnPrimary} onClick={onRestart}>
          play again
        </button>
        <button className={styles.btnSecondary} onClick={onChangeDifficulty}>
          change difficulty
        </button>
      </div>
    </div>
  )
}
