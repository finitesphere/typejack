import React from 'react'
import styles from './scenes.module.css'

export default function TerminalScene({ typed }) {
  return (
    <div className={styles.terminalFrame}>
      <div className={styles.terminalTitleBar}>
        <div className={styles.windowDots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <span className={styles.windowTitle}>bash — 80×24</span>
      </div>
      <div className={styles.terminalBody}>
        <div className={styles.termLine}>
          <span className={styles.termUser}>user</span>
          <span className={styles.termAt}>@</span>
          <span className={styles.termHost}>macbox</span>
          <span className={styles.termSymbol}> ~ % </span>
          <span className={styles.termCmd}>ls -la</span>
        </div>
        <div className={styles.termOutput}>total 48&nbsp;&nbsp;drwxr-xr-x&nbsp;&nbsp;12 user&nbsp;&nbsp;staff</div>
        <div className={styles.termOutput}>-rw-r--r--&nbsp;&nbsp;&nbsp;1 user&nbsp;&nbsp;staff&nbsp;&nbsp;4096 Apr 17 09:22 README.md</div>
        <div className={styles.termLine}>
          <span className={styles.termUser}>user</span>
          <span className={styles.termAt}>@</span>
          <span className={styles.termHost}>macbox</span>
          <span className={styles.termSymbol}> ~ % </span>
          <span className={styles.termTyped}>{typed}</span>
          <span className={styles.termCursor} />
        </div>
      </div>
    </div>
  )
}
