import { useState, useEffect, useRef, useCallback } from 'react'

export function useTyping(prompt) {
  const [typed, setTyped] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [elapsedMs, setElapsedMs] = useState(0)
  const intervalRef = useRef(null)

  // Reset when prompt changes
  useEffect(() => {
    setTyped('')
    setStartTime(null)
    setElapsedMs(0)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [prompt])

  // Timer
  useEffect(() => {
    if (startTime) {
      intervalRef.current = setInterval(() => {
        setElapsedMs(Date.now() - startTime)
      }, 100)
    }
    return () => clearInterval(intervalRef.current)
  }, [startTime])

  const handleInput = useCallback((value) => {
    if (!startTime && value.length > 0) {
      setStartTime(Date.now())
    }
    // Prevent typing past the prompt length
    const clamped = value.slice(0, prompt.length)
    setTyped(clamped)
  }, [startTime, prompt])

  // Per-character state: 'correct' | 'error' | 'current' | 'pending'
  const chars = prompt.split('').map((ch, i) => {
    if (i < typed.length) {
      return { ch, state: typed[i] === ch ? 'correct' : 'error' }
    }
    if (i === typed.length) return { ch, state: 'current' }
    return { ch, state: 'pending' }
  })

  const errors = chars.filter(c => c.state === 'error').length
  const correctChars = chars.filter(c => c.state === 'correct').length

  const wpm = (() => {
    if (!startTime || elapsedMs < 500) return 0
    const minutes = elapsedMs / 1000 / 60
    const words = correctChars / 5
    return Math.round(words / minutes)
  })()

  const accuracy = typed.length === 0
    ? 100
    : Math.round((correctChars / typed.length) * 100)

  const isComplete = typed.length === prompt.length

  const elapsedSeconds = Math.round(elapsedMs / 1000)

  return {
    typed,
    handleInput,
    chars,
    errors,
    wpm,
    accuracy,
    isComplete,
    elapsedSeconds,
    elapsedMs,
  }
}
