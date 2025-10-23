'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from '../page.module.css'

interface ScrollSectionProps {
  children: React.ReactNode
  background?: string
  style?: React.CSSProperties
}

export default function ScrollSection({
  children,
  background = '#fff5f8',
  style
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.5, margin: '-10% 0px' })

  return (
    <motion.section
      ref={ref}
      className={styles.smoothSection}
      style={{
        background,
        minHeight: '100svh',
        position: 'relative',
        ...style
      }}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: isInView ? 1 : 0.6, scale: isInView ? 1 : 0.98 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={styles.contentWrapper}>{children}</div>
    </motion.section>
  )
}
