import React from 'react'
import styles from './scenes.module.css'

export default function PhoneScene({ typed, prompt }) {
  return (
    <div className={styles.phoneWrap}>
      <div className={styles.phoneFrame}>
        <div className={styles.phoneNotch} />
        <div className={styles.phoneScreen}>
          <div className={styles.phoneHeader}>
            <div className={styles.phoneAvatar}>J</div>
            <div>
              <div className={styles.phoneName}>Jack</div>
              <div className={styles.phoneStatus}>iMessage</div>
            </div>
          </div>
          <div className={styles.phoneMessages}>
            <div className={styles.msgIn}>hey are you going to park?</div>
            <div className={styles.msgIn}>also can you bring something to drink?</div>
            {typed && (
              <div className={styles.msgOut}>
                {typed}
                <span className={styles.msgCursor} />
              </div>
            )}
          </div>
          <div className={styles.phoneInputBar}>
            <div className={styles.phoneInputMock}>
              {typed || <span className={styles.phonePlaceholder}>iMessage</span>}
            </div>
          </div>
        </div>
        <div className={styles.phoneHome} />
      </div>
    </div>
  )
}
