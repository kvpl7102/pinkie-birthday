'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { NoteCardItem } from '../../data/2026/montage'

interface StationeryNoteCardProps {
  item: NoteCardItem
  index: number
  onOpenLightbox: () => void
  isScatterMode?: boolean
}

function getRotation(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i)
    hash |= 0
  }
  return ((Math.abs(hash) % 55) - 27) / 10
}

export default function StationeryNoteCard({
  item,
  index,
  onOpenLightbox,
  isScatterMode = false
}: StationeryNoteCardProps) {
  const isDraggingRef = useRef(false)
  const [cardZIndex, setCardZIndex] = useState(index + 2)
  const rotation = getRotation(item.id)

  const isRose = item.colorScheme === 'rose'
  const isChampagne = item.colorScheme === 'champagne'
  const isBlush = item.colorScheme === 'blush'

  const bgTone = isRose
    ? '#FFF7F8'
    : isChampagne
    ? '#FFFDF5'
    : isBlush
    ? '#FFF8FA'
    : '#FBF9F6'

  const accentColor = isRose ? '#C24D6F' : isChampagne ? '#9C782E' : '#A84868'

  const handleClick = () => {
    if (!isDraggingRef.current) {
      onOpenLightbox()
    }
  }

  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -80, bottom: 80 }}
      dragElastic={0.15}
      dragTransition={{ power: 0.12, timeConstant: 180 }}
      onDragStart={() => {
        isDraggingRef.current = true
        setCardZIndex(1000)
      }}
      onDragEnd={() => {
        setTimeout(() => {
          isDraggingRef.current = false
        }, 120)
      }}
      whileHover={{
        scale: 1.03,
        y: -4,
        zIndex: 50,
        transition: { type: 'spring', stiffness: 350, damping: 25 }
      }}
      whileDrag={{
        scale: 1.08,
        rotate: 0,
        cursor: 'grabbing',
        zIndex: 1000,
        boxShadow: '0 28px 60px -12px rgba(120, 45, 75, 0.38)',
      }}
      animate={{
        rotate: isScatterMode ? rotation : 0,
        zIndex: cardZIndex,
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '340px',
        margin: '0 auto',
        padding: '24px 22px 20px',
        borderRadius: '8px',
        background: bgTone,
        border: '1px solid rgba(225, 205, 195, 0.65)',
        boxShadow: '0 12px 30px -6px rgba(110, 45, 70, 0.14), 0 4px 12px -2px rgba(110, 45, 70, 0.08)',
        cursor: 'grab',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '260px',
      }}
      onClick={handleClick}
    >
      {/* Top Left Washi Tape */}
      <div
        style={{
          position: 'absolute',
          top: '-10px',
          left: '18px',
          width: '65px',
          height: '22px',
          background: 'rgba(244, 194, 206, 0.85)',
          border: '1px solid rgba(231, 111, 142, 0.35)',
          transform: 'rotate(-4deg)',
          borderRadius: '2px',
          zIndex: 15,
          pointerEvents: 'none',
          boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
        }}
      />

      {/* Top Right Vintage Stamp */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '14px',
          padding: '4px 8px',
          borderRadius: '4px',
          background: 'rgba(255, 255, 255, 0.9)',
          border: `1px dashed ${accentColor}`,
          color: accentColor,
          fontSize: '0.66rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          transform: 'rotate(3deg)',
          pointerEvents: 'none',
        }}
      >
        {item.stamp}
      </div>

      {/* Note Header */}
      <div>
        <span
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: accentColor,
            fontWeight: 700,
          }}
        >
          {item.tag}
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.35rem',
            fontWeight: 600,
            color: '#2C1820',
            marginTop: '6px',
            marginBottom: '10px',
          }}
        >
          {item.title}
        </h3>

        {/* Lined paper lines simulation */}
        <p
          style={{
            fontFamily: 'var(--font-kalam), var(--font-caveat), cursive',
            fontSize: '1.08rem',
            lineHeight: '1.65',
            color: '#3A202A',
            whiteSpace: 'pre-line',
            margin: '0 0 16px',
          }}
        >
          {item.content}
        </p>
      </div>

      {/* Note Footer */}
      <div
        style={{
          borderTop: '1px dashed rgba(220, 190, 185, 0.6)',
          paddingTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.82rem',
          color: '#7A5C67',
          fontFamily: 'var(--font-caveat), cursive',
        }}
      >
        <span>— {item.author}</span>
        <span style={{ fontSize: '0.75rem', color: accentColor, fontWeight: 600 }}>
          Chạm xem lớn →
        </span>
      </div>
    </motion.div>
  )
}
