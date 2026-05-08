import React from 'react'
import styles from './scenes.module.css'

export default function BrowserScene({ typed }) {
  return (
    <div className={styles.browserFrame}>
      <div className={styles.browserBar}>
        <div className={styles.windowDots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <div className={styles.urlBar}>
          <span className={styles.urlLock}>🔒</span>
          <span className={styles.urlText}>google.com</span>
        </div>
      </div>
      <div className={styles.browserBody}>
        <div className={styles.googleLogo}>
          <span style={{ color: '#4285f4' }}>G</span>
          <span style={{ color: '#ea4335' }}>o</span>
          <span style={{ color: '#fbbc05' }}>o</span>
          <span style={{ color: '#4285f4' }}>g</span>
          <span style={{ color: '#34a853' }}>l</span>
          <span style={{ color: '#ea4335' }}>e</span>
        </div>
        <div className={styles.searchBox}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={styles.searchIcon}>
            <circle cx="7.5" cy="7.5" r="5" stroke="#9aa0a6" strokeWidth="1.5" />
            <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="#9aa0a6" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className={styles.searchTyped}>
            {typed || <span className={styles.searchPlaceholder}>Search Google or type a URL</span>}
          </span>
          {typed && <span className={styles.blockCursorBlue} />}
        </div>
        <div className={styles.searchButtons}>
          <button className={styles.googleBtn}>Google Search</button>
          <button className={styles.googleBtn}>I'm Feeling Lucky</button>
        </div>
      </div>
    </div>
  )
}
