import React from 'react'
import styles from './scenes.module.css'

export default function NotepadScene({ typed }) {
  return (
    <div className={styles.monitorWrap}>
      <div className={styles.monitorFrame}>
        <div className={styles.monitorTitleBar}>
          <div className={styles.windowDots}>
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </div>
          <span className={styles.windowTitle}>Untitled — Notepad</span>
        </div>
        <div className={styles.notepadBody}>
          <div className={styles.notepadRuledLine} style={{ color: '#888', fontSize: 11 }}>
            Meeting notes — {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <div className={styles.notepadRuledLine}>&nbsp;</div>
          <div className={styles.notepadRuledLine}>
            {typed
              ? <span>{typed}<span className={styles.blockCursor} /></span>
              : <span className={styles.notepadPlaceholder}>Start typing...</span>
            }
          </div>
          <div className={styles.notepadRuledLine}>&nbsp;</div>
          <div className={styles.notepadRuledLine}>&nbsp;</div>
          <div className={styles.notepadRuledLine}>&nbsp;</div>
        </div>
      </div>
      <div className={styles.monitorNeck} />
      <div className={styles.monitorBase} />
    </div>
  )
}
