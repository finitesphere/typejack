import { useRef, useCallback } from 'react'

// All sounds are via Web Audio API
export function useSounds() {
  const ctxRef = useRef(null)

  function getCtx() {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return ctxRef.current
  }

  //Short click for each correct keystroke
  const playKeyClick = useCallback((sceneId) => {
    try {
      const ctx = getCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      // Different ~timbre~ per scene
      const configs = {
        phone:    { freq: 1200, type: 'sine',     duration: 0.04, vol: 0.12 },
        notepad:  { freq: 800,  type: 'triangle', duration: 0.05, vol: 0.10 },
        terminal: { freq: 600,  type: 'square',   duration: 0.03, vol: 0.06 },
        browser:  { freq: 1000, type: 'sine',     duration: 0.04, vol: 0.10 },
        email:    { freq: 900,  type: 'triangle', duration: 0.05, vol: 0.10 },
        vscode:   { freq: 500,  type: 'square',   duration: 0.03, vol: 0.07 },
      }
      const c = configs[sceneId] || configs.notepad
      osc.type = c.type
      osc.frequency.setValueAtTime(c.freq, ctx.currentTime)
      gain.gain.setValueAtTime(c.vol, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + c.duration)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + c.duration)
    } catch (_) {}
  }, [])

  //Error buzz for wrong key
  const playError = useCallback(() => {
    try {
      const ctx = getCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(120, ctx.currentTime)
      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.08)
    } catch (_) {}
  }, [])

  // Chime on scene complete
  const playSceneComplete = useCallback(() => {
    try {
      const ctx = getCtx()
      const notes = [523, 659, 784, 1047] // C5 E5 G5 C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)
        const t = ctx.currentTime + i * 0.08
        gain.gain.setValueAtTime(0, t)
        gain.gain.linearRampToValueAtTime(0.18, t + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
        osc.start(t)
        osc.stop(t + 0.35)
      })
    } catch (_) {}
  }, [])

  // Woosh cut between scenes
  const playSceneSwitch = useCallback(() => {
    try {
      const ctx = getCtx()
      const bufSize = ctx.sampleRate * 0.12
      const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1)
      const source = ctx.createBufferSource()
      source.buffer = buffer
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(2000, ctx.currentTime)
      filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.12)
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.2, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
      source.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      source.start()
      source.stop(ctx.currentTime + 0.12)
    } catch (_) {}
  }, [])

  
  const playGameOver = useCallback(() => {
    try {
      const ctx = getCtx()
      const melody = [
        { freq: 523, t: 0 },
        { freq: 659, t: 0.1 },
        { freq: 784, t: 0.2 },
        { freq: 1047, t: 0.3 },
        { freq: 784, t: 0.5 },
        { freq: 1047, t: 0.65 },
      ]
      melody.forEach(({ freq, t }) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + t)
        gain.gain.setValueAtTime(0.001, ctx.currentTime + t)
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + t + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.2)
        osc.start(ctx.currentTime + t)
        osc.stop(ctx.currentTime + t + 0.25)
      })
    } catch (_) {}
  }, [])

  return { playKeyClick, playError, playSceneComplete, playSceneSwitch, playGameOver }
}
