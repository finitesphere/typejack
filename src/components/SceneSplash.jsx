import React, { useEffect, useState } from 'react'
import styles from './SceneSplash.module.css'

const SCENE_ICONS = {
  phone:   '📱',
  notepad: '📝',
  terminal:'⌨️',
  browser: '🔍',
  email:   '✉️',
  vscode:  '💻',
}

export default function SceneSplash({ scene, difficulty, onDone }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 200)
    }, 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`${styles.overlay} ${visible ? styles.in : styles.out}`}>
      <div className={styles.card}>
        <div className={styles.sceneNum}>incoming</div>
        <div className={styles.icon}>{SCENE_ICONS[scene.id]}</div>
        <div className={styles.label}>{scene.label}</div>
        <div className={`${styles.diff} ${styles[difficulty]}`}>{difficulty}</div>
      </div>
    </div>
  )
}
