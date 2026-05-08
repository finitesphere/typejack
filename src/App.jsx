import React, { useState, useEffect, useCallback, useRef } from 'react'
import { SCENES, getRandomPrompt } from './data/prompts'
import { useTyping } from './hooks/useTyping'
import { useSounds } from './hooks/useSounds'
import MMOScene from './scenes/MMOScene'

import DifficultyPicker from './components/DifficultyPicker'
import SceneSplash      from './components/SceneSplash'
import SceneDots        from './components/SceneDots'
import HUD              from './components/HUD'
import TypingInput      from './components/TypingInput'
import ScoreScreen      from './components/ScoreScreen'

import PhoneScene    from './scenes/PhoneScene'
import NotepadScene  from './scenes/NotepadScene'
import TerminalScene from './scenes/TerminalScene'
import BrowserScene  from './scenes/BrowserScene'
import EmailScene    from './scenes/EmailScene'
import VSCodeScene   from './scenes/VSCodeScene'

import styles from './App.module.css'

// Map scene id → component
const SCENE_COMPONENTS = {
  phone:    PhoneScene,
  notepad:  NotepadScene,
  terminal: TerminalScene,
  browser:  BrowserScene,
  email:    EmailScene,
  vscode:   VSCodeScene,
  mmo: MMOScene,
}

// Game states
const STATE = {
  MENU:    'menu',
  SPLASH:  'splash',
  PLAYING: 'playing',
  SCORE:   'score',
}

function buildRound(difficulty) {
  // Shuffle scenes and assign a random prompt to each
  const shuffled = [...SCENES].sort(() => Math.random() - 0.5)
  return shuffled.map(scene => ({
    scene,
    prompt: getRandomPrompt(scene.id, difficulty),
  }))
}

export default function App() {
  const [gameState, setGameState] = useState(STATE.MENU)
  const [difficulty, setDifficulty] = useState('easy')
  const [round, setRound]           = useState([])       // [{scene, prompt}]
  const [sceneIdx, setSceneIdx]     = useState(0)
  const [results, setResults]       = useState([])       // per-scene results
  const prevTypedLen                = useRef(0)
  const currentEntry = round[sceneIdx]
  const prompt       = currentEntry?.prompt ?? ''
  const { typed, handleInput, chars, errors, wpm, accuracy, isComplete, elapsedSeconds } = useTyping(prompt)
  const { playKeyClick, playError, playSceneComplete, playSceneSwitch, playGameOver } = useSounds()

  // Detect keystrokes for sound feedback
  useEffect(() => {
    if (gameState !== STATE.PLAYING) return
    if (typed.length > prevTypedLen.current) {
      // A character was added
      const lastIdx  = typed.length - 1
      const correct  = typed[lastIdx] === prompt[lastIdx]
      correct ? playKeyClick(currentEntry?.scene.id) : playError()
    }
    prevTypedLen.current = typed.length
  }, [typed, gameState])

  // Scene complete
  useEffect(() => {
    if (!isComplete || gameState !== STATE.PLAYING) return
    playSceneComplete()

    const result = { wpm, accuracy, errors, elapsedSeconds }
    const newResults = [...results, result]

    setTimeout(() => {
      playSceneSwitch()
      if (sceneIdx + 1 >= round.length) {
        setResults(newResults)
        setGameState(STATE.SCORE)
        setTimeout(playGameOver, 300)
      } else {
        setResults(newResults)
        setSceneIdx(i => i + 1)
        setGameState(STATE.SPLASH)
      }
    }, 200)
  }, [isComplete])

  const startGame = useCallback((diff) => {
    const d = diff || difficulty
    setDifficulty(d)
    const newRound = buildRound(d)
    setRound(newRound)
    setSceneIdx(0)
    setResults([])
    prevTypedLen.current = 0
    setGameState(STATE.SPLASH)
  }, [difficulty])

  const handleSplashDone = () => setGameState(STATE.PLAYING)

  const handleRestart = () => startGame(difficulty)

  const handleChangeDifficulty = () => setGameState(STATE.MENU)

  if (gameState === STATE.MENU) {
    return (
      <div className={styles.app}>
        <DifficultyPicker onPick={startGame} />
      </div>
    )
  }

  if (gameState === STATE.SCORE) {
    return (
      <div className={styles.app}>
        <ScoreScreen
          results={results}
          scenes={round.map(r => r.scene)}
          difficulty={difficulty}
          onRestart={handleRestart}
          onChangeDifficulty={handleChangeDifficulty}
        />
      </div>
    )
  }

  const SceneComponent = currentEntry ? SCENE_COMPONENTS[currentEntry.scene.id] : null

  return (
    <div className={styles.app}>
      <div className={styles.gameWrap}>

        {gameState === STATE.SPLASH && currentEntry && (
          <SceneSplash
            scene={currentEntry.scene}
            difficulty={difficulty}
            onDone={handleSplashDone}
          />
        )}

        {gameState === STATE.PLAYING && (
          <>
            <SceneDots
              total={round.length}
              current={sceneIdx}
              results={results}
            />

            <div className={styles.sceneArea}>
              {SceneComponent && (
                <SceneComponent
                  typed={typed}
                  prompt={prompt}
                />
              )}
            </div>

            <HUD
              wpm={wpm}
              accuracy={accuracy}
              elapsedSeconds={elapsedSeconds}
              sceneIndex={sceneIdx}
              totalScenes={round.length}
            />

            <TypingInput
              chars={chars}
              onInput={handleInput}
              value={typed}
              disabled={isComplete}
            />

            <div className={styles.sceneMeta}>
              {currentEntry.scene.label} · {difficulty}
            </div>
          </>
        )}

      </div>
    </div>
  )
}
