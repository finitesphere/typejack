import React from 'react'
import styles from './SceneDots.module.css'

export default function SceneDots({ total, current, results }) {
  return (
    <div className={styles.dots}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`${styles.dot}
            ${i < current ? styles.done : ''}
            ${i === current ? styles.active : ''}
          `}
          title={results[i] ? `${results[i].wpm} wpm` : ''}
        />
      ))}
    </div>
  )
}
