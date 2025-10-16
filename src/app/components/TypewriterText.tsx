'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'

interface TypewriterTextProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  fontFamily?: string
}

export default function TypewriterText({
  text,
  delay = 0,
  speed = 50,
  className = '',
  fontFamily = 'var(--font-caveat)'
}: TypewriterTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Pre-calculate all character positions for SSR compatibility
  const characters = useMemo(() => text.split(''), [text])

  useEffect(() => {
    // Simple timeout for initial delay
    const startTimeout = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [delay])

  return (
    <motion.div
      className={className}
      style={{
        fontFamily,
        color: '#d63384',
        opacity: isVisible ? 1 : 0
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{
            delay: isVisible ? delay + (index * 0.05) : 0,
            duration: 0.3
          }}
          style={{ display: 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
      {isVisible && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{
            marginLeft: '2px',
            color: '#d63384'
          }}
        >
          |
        </motion.span>
      )}
    </motion.div>
  )
}