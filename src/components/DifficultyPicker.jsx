import React, { useState, useEffect } from 'react'
import styles from './DifficultyPicker.module.css'
import { useSounds } from '../hooks/useSounds'

const TITLE = "Typejack"

export default function DifficultyPicker({ onPick }) {
  const [typed, setTyped] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const { playKeyClick, playError, playSceneComplete } = useSounds()

  useEffect(() => {
    if (unlocked) return

    const handler = (e) => {
      const key = e.key
      if (key.length !== 1) return

      const next = typed + key
      const expected = TITLE[typed.length]

      if (key === expected) {
        setTyped(next)
        playKeyClick('phone')
        if (next === TITLE) {
          playSceneComplete()
          setTimeout(() => setUnlocked(true), 600)
        }
      } else {
        setTyped('')
        playError()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [typed, unlocked])

  if (unlocked) {
    return (
      <div className={styles.wrap}>
        <div className={styles.logoUnlocked}>
          {TITLE.split('').map((char, i) => (
            <span key={i} className={styles.logoCharUnlocked} style={{ animationDelay: `${i * 0.05}s` }}>
              {char}
            </span>
          ))}
        </div>
        <p className={styles.tagline}>Practice your typing skills by playing</p>
        <div className={styles.cards}>
          <button className={styles.card} onClick={() => onPick('easy')}>
            <div className={styles.cardIcon}>🟢</div>
            <div className={styles.cardTitle}>Easy</div>
            <div className={styles.cardDesc}>Short prompts.</div>
          </button>
          <button className={`${styles.card}`} onClick={() => onPick('hard')}>
            <div className={styles.cardIcon}>🔴</div>
            <div className={styles.cardTitle}>Hard</div>
            <div className={styles.cardDesc}>Longer prompts.</div>
          </button>
        </div>
        <p className={styles.hint}>made by <a href="https://finitesphere.com/" target="_blank" rel="norefeffer" style={{color: 'var(--success)', textDecoration: 'none'}}>@finitesphere</a></p>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.logo}>
        {TITLE.split('').map((char, i) => {
          const isCorrect = i < typed.length
          const isCurrent = i === typed.length
          return (
            <span
              key={i}
              className={`${styles.logoChar} ${isCorrect ? styles.logoCharCorrect : ''} ${isCurrent ? styles.logoCharCurrent : ''}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {char}
            </span>
          )
        })}
      </div>
      <p className={styles.typeHint}>
        {typed.length === 0 ? 'type the title to begin' : `${TITLE.length - typed.length} `}
      </p>
    </div>
  )
}