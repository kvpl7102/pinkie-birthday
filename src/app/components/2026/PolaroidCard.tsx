'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BaseMediaItem } from '../../data/2026/montage'
import { getImagePath } from '@/app/utils/paths'

interface PolaroidCardProps {
  item: BaseMediaItem
  index: number
  onOpenLightbox: () => void
  isScatterMode?: boolean
}

// Deterministic rotation based on id (-3.2deg to +3.2deg)
function getRotation(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i)
    hash |= 0
  }
  return ((Math.abs(hash) % 65) - 32) / 10
}

// Preset pastel washi tapes
const WASHI_TAPES = [
  { bg: 'rgba(248, 194, 206, 0.82)', border: 'rgba(231, 111, 142, 0.35)', angle: -2.5 },
  { bg: 'rgba(253, 226, 198, 0.85)', border: 'rgba(223, 175, 120, 0.35)', angle: 1.8 },
  { bg: 'rgba(214, 234, 216, 0.85)', border: 'rgba(140, 195, 150, 0.35)', angle: -1.5 },
  { bg: 'rgba(230, 220, 248, 0.85)', border: 'rgba(180, 160, 220, 0.35)', angle: 2.2 },
]

export default function PolaroidCard({
  item,
  index,
  onOpenLightbox,
  isScatterMode = false
}: PolaroidCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [cardZIndex, setCardZIndex] = useState(index + 1)
  const isDraggingRef = useRef(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const rotation = getRotation(item.id)
  const washi = WASHI_TAPES[index % WASHI_TAPES.length]
  const isVideo = item.type === 'video'

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true)
    }
  }, [])

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    const nextMuted = !videoRef.current.muted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleClick = () => {
    // Only open lightbox if not dragging
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
        rotate: isScatterMode ? rotation * 0.7 : 0,
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
        maxWidth: '320px',
        margin: '0 auto',
        padding: '12px 12px 18px',
        borderRadius: '6px',
        background: '#FAF6F0', // warm creamy polaroid paper
        boxShadow: '0 12px 30px -6px rgba(110, 45, 70, 0.16), 0 3px 10px -2px rgba(110, 45, 70, 0.08)',
        border: '1px solid rgba(220, 195, 185, 0.55)',
        cursor: 'grab',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={handleClick}
    >
      {/* Decorative Washi Tape Strip at top */}
      <div
        style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: `translateX(-50%) rotate(${washi.angle}deg)`,
          width: '84px',
          height: '24px',
          background: washi.bg,
          border: `1px solid ${washi.border}`,
          borderRadius: '2px',
          boxShadow: '0 2px 6px rgba(110, 45, 70, 0.1)',
          zIndex: 15,
          pointerEvents: 'none',
          backdropFilter: 'blur(2px)',
          clipPath: 'polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)',
        }}
      />

      {/* Postal Stamp Badge on selected cards */}
      {index % 4 === 0 && (
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 14,
            padding: '3px 8px',
            borderRadius: '4px',
            background: 'rgba(255, 255, 255, 0.92)',
            border: '1px dashed #DFBA73',
            color: '#9C782E',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
            transform: `rotate(${rotation * -1.5}deg)`,
            pointerEvents: 'none',
          }}
        >
          POSTE • 24TH
        </div>
      )}

      {/* Polaroid Photo Frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: '3px',
          overflow: 'hidden',
          background: '#EDE4DC',
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.08)',
        }}
      >
        {!isLoaded && !isVideo && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, #F3ECE5 0%, #E8DFD7 50%, #F3ECE5 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.8s infinite',
            }}
          />
        )}

        {isVideo ? (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <video
              ref={videoRef}
              src={getImagePath(item.src)}
              poster={getImagePath(item.thumb || item.poster)}
              playsInline
              loop
              muted={isMuted}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* Video pill */}
            <span
              style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                padding: '3px 8px',
                borderRadius: '999px',
                background: 'rgba(20, 10, 16, 0.75)',
                color: '#FFFFFF',
                fontSize: '0.68rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                backdropFilter: 'blur(6px)',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#E76F8E',
                  animation: isPlaying ? 'pulse 1.5s infinite' : 'none',
                }}
              />
              Video
            </span>

            {/* Quick Play & Sound Controls */}
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                display: 'flex',
                gap: '6px',
              }}
            >
              <button
                onClick={handleTogglePlay}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {isPlaying ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>
              <button
                onClick={handleToggleSound}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: isMuted ? 'rgba(0, 0, 0, 0.65)' : 'rgba(231, 111, 142, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {isMuted ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ) : (
          <img
            ref={imgRef}
            src={getImagePath(item.thumb || item.src)}
            alt={item.alt}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.4s ease',
            }}
          />
        )}
      </div>

      {/* Polaroid Bottom Chin with Handwritten Caption */}
      <div
        style={{
          paddingTop: '12px',
          textAlign: 'center',
          minHeight: '44px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-kalam), var(--font-caveat), cursive',
            fontSize: '1.05rem',
            color: '#3A202A',
            lineHeight: 1.25,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            fontWeight: 500,
          }}
        >
          {item.title}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-caveat), cursive',
            fontSize: '0.85rem',
            color: '#9C7A86',
            marginTop: '2px',
          }}
        >
          {item.caption ? `“${item.caption.slice(0, 32)}...”` : 'Mùa thu dịu dàng'}
        </span>
      </div>
    </motion.div>
  )
}
