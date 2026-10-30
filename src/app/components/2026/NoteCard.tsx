'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { NoteCardItem } from '../../data/2026/montage'

interface NoteCardProps {
  item: NoteCardItem
  index: number
  onOpenLightbox: () => void
}

export default function NoteCard({ item, index, onOpenLightbox }: NoteCardProps) {
  // Varying subtle tilt for authentic organic card scatter feeling
  const tilts = [-1.2, 0.8, -0.6, 1.4, -1.0, 0.9]
  const tilt = tilts[index % tilts.length]

  const isChampagne = item.colorScheme === 'champagne'
  const isBlush = item.colorScheme === 'blush'
  const isRose = item.colorScheme === 'rose'

  const bgGradient = isRose
    ? 'linear-gradient(135deg, #FFF5F7 0%, #FEECEF 100%)'
    : isBlush
    ? 'linear-gradient(135deg, #FCF5F7 0%, #F8EFF1 100%)'
    : 'linear-gradient(135deg, #FCF8F7 0%, #F7EFE9 100%)'

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015, rotate: 0 }}
      initial={{ rotate: tilt }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      style={{
        position: 'relative',
        borderRadius: '24px',
        padding: '32px 28px',
        background: bgGradient,
        border: '1px solid rgba(231, 111, 142, 0.22)',
        boxShadow: '0 16px 36px -10px rgba(120, 50, 75, 0.1)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: '260px',
        overflow: 'hidden',
      }}
      onClick={onOpenLightbox}
    >
      {/* Corner Stamp / Wax Seal */}
      <div
        style={{
          position: 'absolute',
          top: '18px',
          right: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <div
          style={{
            padding: '4px 10px',
            borderRadius: '999px',
            background: 'rgba(223, 186, 115, 0.16)',
            border: '1px solid rgba(223, 186, 115, 0.6)',
            color: '#9C782E',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>{item.stamp}</span>
        </div>
      </div>

      {/* Decorative Quotation Mark in Cormorant */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '20px',
          fontFamily: 'var(--font-serif)',
          fontSize: '4.5rem',
          lineHeight: '1',
          color: 'rgba(231, 111, 142, 0.14)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        “
      </div>

      {/* Top Header */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#C24D6F',
            display: 'block',
            marginBottom: '10px',
          }}
        >
          {item.tag}
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#2C1820',
            lineHeight: '1.3',
            margin: 0,
          }}
        >
          {item.title}
        </h3>
      </div>

      {/* Body Content */}
      <div style={{ position: 'relative', zIndex: 2, margin: '20px 0' }}>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.18rem',
            lineHeight: '1.7',
            color: '#422732',
            fontStyle: 'italic',
            whiteSpace: 'pre-line',
            margin: 0,
          }}
        >
          {item.content}
        </p>
      </div>

      {/* Footer / Author Sign-off */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '16px',
          borderTop: '1px dashed rgba(231, 111, 142, 0.25)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.95rem',
            color: '#7A5C67',
            fontStyle: 'italic',
          }}
        >
          — {item.author}
        </span>
        <span
          style={{
            fontSize: '0.78rem',
            color: '#E76F8E',
            fontWeight: 600,
          }}
        >
          Đọc thư →
        </span>
      </div>
    </motion.div>
  )
}
