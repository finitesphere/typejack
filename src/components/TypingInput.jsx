import React, { useEffect, useRef } from 'react'
import styles from './TypingInput.module.css'

export default function TypingInput({ chars, onInput, value, disabled }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus()
    }
  }, [disabled, chars])

  return (
    <div className={styles.wrap}>
      <div
        className={styles.promptDisplay}
        onClick={() => inputRef.current?.focus()}
      >
        {chars.map((c, i) => (
          <span
            key={i}
            className={
              c.state === 'correct' ? styles.correct
              : c.state === 'error'  ? styles.error
              : c.state === 'current' ? styles.current
              : styles.pending
            }
          >
            {c.state === 'error' && c.ch === ' ' ? '·' : c.ch}
          </span>
        ))}
      </div>
      <input
        ref={inputRef}
        className={styles.hiddenInput}
        value={value}
        onChange={e => onInput(e.target.value)}
        disabled={disabled}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        aria-label="Type the prompt above"
      />
      <p className={styles.hint}>Click above or start typing</p>
    </div>
  )
}
