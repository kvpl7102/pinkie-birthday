'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import styles from '../page.module.css'

interface FloatingPetalsProps {
  count?: number
}

export default function FloatingPetals({ count = 12 }: FloatingPetalsProps) {
  // Generate deterministic animation values for SSR compatibility
  const petals = useMemo(() => Array.from({ length: count }, (_, i) => {
    // Use deterministic "random" values based on index to avoid hydration mismatch
    const seed = i * 0.618033988749 // Golden ratio for pseudo-random distribution
    const pseudoRandom = (n: number) => ((n * seed) % 1)

    return {
      id: i,
      delay: pseudoRandom(i) * 8,
      duration: 6 + (pseudoRandom(i + 1) * 4),
      x: pseudoRandom(i + 2) * 100,
      scale: 0.5 + (pseudoRandom(i + 3) * 0.8),
      rotation: pseudoRandom(i + 4) * 360
    }
  }), [count])

  return (
  <div className={styles.petalsContainer}>
    {petals.map((petal, i) => {
      // Layer: near/mid/far
      const layerClass =
        i % 3 === 0 ? styles.petalNear :
        i % 3 === 1 ? styles.petalMid  :
                       styles.petalFar;

      // Blend: luân phiên multiply/screen cho độ nổi ổn định trên nhiều nền
      const blendClass = i % 4 < 2 ? styles.petalMultiply : styles.petalScreen;

      return (
        <motion.div
          key={petal.id}
          className={`${styles.cherryPetal} ${layerClass} ${blendClass}`}
          style={{
            left: `${petal.x}%`,
            top: `-40px`,
            transform: `scale(${petal.scale}) rotate(${petal.rotation}deg)`
          }}
          animate={{
            y: ['-40px', '110vh'],
            x: [0, 14, -10, 18, 6],                
            rotate: [
              petal.rotation,
              petal.rotation + 120,
              petal.rotation + 240,
              petal.rotation + 360
            ],
            opacity: [0.95, 0.85, 0.8, 0.9, 0.95]
          }}
          transition={{
            duration: petal.duration * (i % 3 === 0 ? 0.9 : i % 3 === 1 ? 1 : 1.2), 
            delay: petal.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
        />
      );
    })}
  </div>
  )
}