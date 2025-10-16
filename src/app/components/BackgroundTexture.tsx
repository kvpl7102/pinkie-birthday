'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import styles from '../page.module.css'

interface BackgroundTextureProps {
  sparkleCount?: number
}

export default function BackgroundTexture({ sparkleCount = 8 }: BackgroundTextureProps) {
  // Generate deterministic sparkle positions for SSR compatibility
  const sparkles = useMemo(() => Array.from({ length: sparkleCount }, (_, i) => {
    // Use deterministic "random" values based on index
    const seed = i * 0.618033988749 // Golden ratio for pseudo-random distribution
    const pseudoRandom = (n: number) => ((n * seed) % 1)

    return {
      id: i,
      x: pseudoRandom(i) * 100,
      y: pseudoRandom(i + 1) * 100,
      delay: pseudoRandom(i + 2) * 3,
      scale: 0.5 + (pseudoRandom(i + 3) * 0.5)
    }
  }), [sparkleCount])

  return (
    <>
      {/* Washi paper texture overlay */}
      <div className={styles.backgroundTexture} />

      {/* Floating sparkles */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden'
      }}>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className={styles.sparkle}
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              transform: `scale(${sparkle.scale})`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [sparkle.scale, sparkle.scale * 1.5, sparkle.scale]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </>
  )
}