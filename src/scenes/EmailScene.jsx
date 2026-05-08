import React from 'react'
import styles from './scenes.module.css'

export default function EmailScene({ typed }) {
  return (
    <div className={styles.emailFrame}>
      <div className={styles.emailTitleBar}>
        <div className={styles.windowDots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <span className={styles.windowTitle}>New Message</span>
      </div>
      <div className={styles.emailHeader}>
        <div className={styles.emailRow}>
          <span className={styles.emailLabel}>To:</span>
          <span className={styles.emailValue}>gaben@valvesoftware.com</span>
        </div>
        <div className={styles.emailRow}>
          <span className={styles.emailLabel}>From:</span>
          <span className={styles.emailValue}>finitesphere@proton.me</span>
        </div>
        <div className={styles.emailRow}>
          <span className={styles.emailLabel}>Subject:</span>
          <span className={styles.emailValue}>Re: VACv2.1 review</span>
        </div>
      </div>
      <div className={styles.emailBody}>
        <div className={styles.emailQuote}>On Apr 20, GabeN wrote:</div>
        <div className={styles.emailQuoteText}>&gt; We're currently working on making cheats now, it's more fun.</div>
        <div className={styles.emailReply}>
          {typed
            ? <span>{typed}<span className={styles.blockCursor} /></span>
            : <span className={styles.notepadPlaceholder}>Type your reply...</span>
          }
        </div>
      </div>
    </div>
  )
}
