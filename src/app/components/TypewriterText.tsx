'use client'

import React, { useEffect, useState } from 'react'
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
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Initial delay before starting the animation
    const startTimeout = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (isVisible && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [isVisible, currentIndex, text, speed])

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
      {displayText}
      {isVisible && currentIndex < text.length && (
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