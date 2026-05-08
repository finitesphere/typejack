import React, { useEffect, useRef } from 'react'
import styles from './MMOScene.module.css'

const SKILLS = [
  { icon: '⚔', lvl: 72 }, { icon: '🏹', lvl: 45 },
  { icon: '🛡', lvl: 68 }, { icon: '✨', lvl: 33 },
  { icon: '🍖', lvl: 55 }, { icon: '⛏', lvl: 61 },
  { icon: '🪵', lvl: 70 }, { icon: '🎣', lvl: 48 },
]

export default function RunescapeScene({ typed }) {
  const splatRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!splatRef.current) return
      const isHit = Math.random() > 0.3
      const el = document.createElement('div')
      if (isHit) {
        el.className = styles.hitSplat
        el.innerHTML = `<span>${Math.floor(Math.random() * 18) + 1}</span>`
        el.style.left = (255 + Math.random() * 60) + 'px'
        el.style.top  = (45  + Math.random() * 60) + 'px'
      } else {
        el.className = styles.xpDrop
        el.textContent = `+${Math.floor(Math.random() * 40) + 10} xp`
        el.style.left = (210 + Math.random() * 80) + 'px'
        el.style.top  = (75  + Math.random() * 40) + 'px'
      }
      splatRef.current.appendChild(el)
      setTimeout(() => el.remove(), 1900)
    }, 700)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.rsWrap}>
      <div className={styles.rsFrame}>

        {/* ── Viewport ── */}
        <div className={styles.viewport}>
          <div className={styles.grass} />

          {/* Trees */}
          {[[30,90],[55,100],[320,95],[390,110],[175,120]].map(([l,b],i) => (
            <div key={i} className={styles.tree} style={{ left: l, bottom: b }}>
              <div className={styles.treeTrunk} />
              <div className={styles.treeLeaves} />
            </div>
          ))}

          {/* Rocks */}
          {[[118,70],[345,75],[238,65]].map(([l,b],i) => (
            <div key={i} className={styles.rock} style={{ left: l, bottom: b }} />
          ))}

          {/* NPC goblin */}
          <div className={styles.npc} style={{ right: 90, bottom: 65 }}>
            <div className={styles.npcHpBar}><div className={styles.npcHpFill} /></div>
            <div className={styles.npcName}>Goblin</div>
            <div className={styles.npcHead} />
            <div className={styles.npcBody} />
            <div className={styles.legs}><div className={styles.leg} /><div className={styles.leg} /></div>
          </div>

          {/* Player */}
          <div className={styles.player}>
            <div className={styles.playerName}>Zezima</div>
            <div className={styles.playerHead} />
            <div className={styles.playerBody} />
            <div className={styles.legs}><div className={styles.playerLeg} /><div className={styles.playerLeg} /></div>
          </div>

          {/* Orbs */}
          <div className={styles.orbs}>
            {[['#880000',72],['#006666',88],['#006600',55]].map(([bg,val],i) => (
              <div key={i} className={styles.orb}>
                <div className={styles.orbFill} style={{ height: val+'%', background: bg }} />
                <span className={styles.orbVal}>{val}</span>
              </div>
            ))}
          </div>

          {/* Minimap */}
          <div className={styles.minimapWrap}>
            <div className={styles.minimapN}>N</div>
            <div className={styles.minimapCircle}>
              <div className={styles.mmDot} style={{ top:20,left:18,background:'#0f0',width:4,height:4 }} />
              <div className={styles.mmDot} style={{ top:30,left:38,background:'#0f0',width:4,height:4 }} />
              <div className={styles.mmDot} style={{ top:44,left:24,background:'#f60' }} />
              <div className={styles.mmDot} style={{ top:36,left:44,background:'#f60' }} />
              <div className={styles.mmSelf} />
            </div>
          </div>

          <div ref={splatRef} className={styles.splatContainer} />
        </div>

        {/* ── Bottom panel ── */}
        <div className={styles.bottomPanel}>
          <div className={styles.chatPanel}>
            <div className={styles.chatHeader}>* RuneScape *</div>
            <div className={styles.chatLog}>
              <div className={styles.chatLine}><span className={styles.cnSystem}>Welcome to RuneScape. Have fun!</span></div>
              <div className={styles.chatLine}><span className={styles.cnClan}>xXSlayer99: </span><span className={styles.cnPublic}>everyone stack on the boss NOW</span></div>
              <div className={styles.chatLine}><span className={styles.cnClan}>HealzOnly: </span><span className={styles.cnPublic}>my prayer is almost out</span></div>
              <div className={styles.chatLine}><span className={styles.cnSystem}>TankMode69 has been killed by a Goblin.</span></div>
              <div className={styles.chatLine}><span className={styles.cnClan}>xXSlayer99: </span><span className={styles.cnPublic}>NOOB lmaooo</span></div>
            </div>
            <div className={styles.chatInputRow}>
              <span className={styles.chatStar}>*</span>
              <div className={styles.chatTyped}>
                {typed}
                <span className={styles.rsCursor} />
              </div>
            </div>
          </div>

          <div className={styles.skillPanel}>
            {SKILLS.map((s, i) => (
              <div key={i} className={styles.skillSlot}>
                <span className={styles.skillIcon}>{s.icon}</span>
                <span className={styles.skillLvl}>{s.lvl}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
