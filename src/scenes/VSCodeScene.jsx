import React from 'react'
import styles from './scenes.module.css'

function LineNum({ n }) {
  return <span className={styles.vsLineNum}>{n}</span>
}

export default function VSCodeScene({ typed }) {
  return (
    <div className={styles.vsFrame}>
      <div className={styles.vsTitleBar}>
        <div className={styles.windowDots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <span className={styles.windowTitle}>App.jsx — Typejack</span>
      </div>
      <div className={styles.vsTabBar}>
        <div className={styles.vsTabActive}>App.jsx</div>
        <div className={styles.vsTab}>index.css</div>
      </div>
      <div className={styles.vsBody}>
        <div className={styles.vsLine}>
          <LineNum n={1} />
          <span className={styles.vsImport}>import</span>
          <span className={styles.vsText}> React </span>
          <span className={styles.vsImport}>from</span>
          <span className={styles.vsString}> 'react'</span>
        </div>
        <div className={styles.vsLine}>
          <LineNum n={2} />
        </div>
        <div className={styles.vsLine}>
          <LineNum n={3} />
          <span className={styles.vsKeyword}>export default function </span>
          <span className={styles.vsFunction}>App</span>
          <span className={styles.vsText}>() {'{'}</span>
        </div>
        <div className={styles.vsLine}>
          <LineNum n={4} />
          <span className={styles.vsText}>&nbsp;&nbsp;</span>
          <span className={styles.vsKeyword}>return </span>
          <span className={styles.vsText}>(</span>
        </div>
        <div className={styles.vsActiveLine}>
          <LineNum n={5} />
          <span className={styles.vsText}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          {typed
            ? <span className={styles.vsTyped}>{typed}<span className={styles.vsCursor} /></span>
            : <span className={styles.vsCursor} />
          }
        </div>
        <div className={styles.vsLine}>
          <LineNum n={6} />
          <span className={styles.vsText}>&nbsp;&nbsp;)</span>
        </div>
        <div className={styles.vsLine}>
          <LineNum n={7} />
          <span className={styles.vsText}>{'}'}</span>
        </div>
      </div>
      <div className={styles.vsStatusBar}>
        <span>TypeSwitch</span>
        <span>JavaScript React</span>
        <span>Ln 5, Col {typed.length + 5}</span>
      </div>
    </div>
  )
}
