'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { photos } from '@/app/data/photos'
import type { Era } from '@/app/data/photos'
import { motion } from 'framer-motion'

export default function HorizontalCarousel({ era }: { era: Era }) {
  // Lọc đúng giai đoạn & giữ thứ tự như trong photos.ts
  const originalData = useMemo(() => photos.filter(p => p.era === era), [era])
  
  // Clone data 3 lần để tạo infinite scroll: [clone, original, clone]
  const data = useMemo(() => {
    return [...originalData, ...originalData, ...originalData]
  }, [originalData])

  const scrollerRef = useRef<HTMLDivElement>(null)
  const isResettingRef = useRef(false)
  const [isResetting, setIsResetting] = useState(false)

  // Initialize scroll position to middle section
  useEffect(() => {
    const el = scrollerRef.current
    if (!el || originalData.length === 0) return
    
    // Scroll to start of middle section without triggering scroll event
    requestAnimationFrame(() => {
      const itemWidth = el.scrollWidth / data.length
      const middleStart = itemWidth * originalData.length
      el.scrollLeft = middleStart
    })
  }, [originalData.length, data.length])

  // Track scroll and implement infinite loop
  useEffect(() => {
    const el = scrollerRef.current
    if (!el || originalData.length === 0) return
    
    const onScroll = () => {
      if (isResettingRef.current) return
      
      const itemWidth = el.scrollWidth / data.length
      const firstSectionEnd = itemWidth * originalData.length
      const secondSectionEnd = itemWidth * originalData.length * 2
      
      // Reset to middle section when reaching boundaries
      if (el.scrollLeft < firstSectionEnd * 0.05) {
        // Near start of first section → jump to start of second section
        isResettingRef.current = true
        setIsResetting(true)
        
        requestAnimationFrame(() => {
          el.scrollLeft = el.scrollLeft + (itemWidth * originalData.length)
          requestAnimationFrame(() => {
            setTimeout(() => {
              isResettingRef.current = false
              setIsResetting(false)
            }, 100)
          })
        })
      } else if (el.scrollLeft > secondSectionEnd * 0.95) {
        // Near end of third section → jump back to second section
        isResettingRef.current = true
        setIsResetting(true)
        
        requestAnimationFrame(() => {
          el.scrollLeft = el.scrollLeft - (itemWidth * originalData.length)
          requestAnimationFrame(() => {
            setTimeout(() => {
              isResettingRef.current = false
              setIsResetting(false)
            }, 100)
          })
        })
      }
    }
    
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [data.length, originalData.length])

  return (
    <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 15 }}>
      <div
        ref={scrollerRef}
        tabIndex={0}
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: 'min(78vw, 520px)',
          gap: 18,
          overflowX: 'auto',
          overflowY: 'hidden',
          padding: '0 6vw',
          scrollSnapType: isResetting ? 'none' : 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          outline: 'none',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          willChange: isResetting ? 'scroll-position' : 'auto',
        } as React.CSSProperties}
        className="hide-scrollbar"
      >
        {data.map((p, i) => {
          return <PhotoCard key={`${p.src}-${i}`} photo={p} index={i} />
        })}
      </div>

      {/* hint swipe - stays visible longer */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          textAlign: 'center',
          fontSize: 12,
          color: '#d63384',
          marginTop: 12,
          fontWeight: 500
        }}
      >
        💗 Double-tap to like • Swipe for more →
      </motion.div>
    </div>
  )
}

// Separate component for each photo card with double-tap like feature
function PhotoCard({ photo: p, index: i }: { photo: typeof photos[0]; index: number }) {
  const [hearts, setHearts] = useState<number[]>([])
  const [showHint, setShowHint] = useState(true)
  const lastTapRef = useRef(0)
  const heartIdRef = useRef(0)
  
  // Hide hint after first interaction or after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 8000)
    return () => clearTimeout(timer)
  }, [])

  const handleDoubleTap = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const now = Date.now()
    const timeSinceLastTap = now - lastTapRef.current
    
    // Hide hint on any interaction
    setShowHint(false)
    
    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      // Double tap detected - create multiple hearts
      const newHearts: number[] = []
      for (let i = 0; i < 5; i++) {
        newHearts.push(heartIdRef.current++)
      }
      setHearts(prev => [...prev, ...newHearts])
      
      // Remove hearts after animation completes
      setTimeout(() => {
        setHearts(prev => prev.filter(id => !newHearts.includes(id)))
      }, 1500)
    }
    
    lastTapRef.current = now
  }, [])

  return (
    <figure
      style={{ margin: 0, scrollSnapAlign: 'center', position: 'relative', cursor: 'pointer' }}
      onClick={handleDoubleTap}
      onTouchEnd={handleDoubleTap}
    >
      {/* khung ảnh */}
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.45 }}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3/4',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(179,0,89,.12)',
        }}
      >
        {/* Ken Burns rất nhẹ */}
        <motion.div
          initial={{ scale: 1.05, x: 0, y: 0 }}
          whileInView={{ scale: 1.12, x: -6, y: -4 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 6, ease: 'linear' }}
          style={{ position: 'absolute', inset: 0, willChange: 'transform' }}
        >
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes="(max-width:768px) 80vw, 520px"
            style={{
              objectFit: 'cover',
              objectPosition: p.objectPosition || 'center'
            }}
            priority={i < 2}
          />
        </motion.div>

        {/* caption */}
        {p.caption && (
          <div
            style={{
              position: 'absolute',
              left: 0, right: 0, bottom: 0,
              padding: '10px 12px',
              color: '#fff',
              fontSize: 14,
              lineHeight: 1.35,
              textAlign: 'center',
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.35) 60%, rgba(0,0,0,.55) 100%)',
              textShadow: '0 1px 2px rgba(0,0,0,.35)'
            }}
          >
            {p.caption}
          </div>
        )}
      </motion.div>

      {/* Flying hearts particles */}
      {hearts.map((heartId, idx) => {
        const delay = idx * 0.08
        const rotation = (Math.random() - 0.5) * 30
        const xOffset = (Math.random() - 0.5) * 60
        const scale = 0.6 + Math.random() * 0.4
        
        return (
          <div
            key={heartId}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              pointerEvents: 'none',
              animation: `heartFloat 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              animationDelay: `${delay}s`,
              ['--heart-x-offset' as any]: `${xOffset}px`,
              ['--heart-rotation' as any]: `${rotation}deg`,
              ['--heart-scale' as any]: scale,
            } as React.CSSProperties}
          >
            <svg
              width={Math.round(60 * scale)}
              height={Math.round(60 * scale)}
              viewBox="0 0 24 24"
              fill="none"
              style={{
                filter: 'drop-shadow(0 2px 8px rgba(255,20,147,0.4))',
              }}
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="#ff1744"
                stroke="#fff"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        )
      })}
      
      {/* Subtle hint - fades out after 8s or on first tap */}
      {showHint && (
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            zIndex: 11,
            pointerEvents: 'none',
            animation: 'hintPulse 2s ease-in-out infinite, hintFadeOut 1s ease-out 7s forwards',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#ff1744"
              stroke="#fff"
              strokeWidth="1.5"
              opacity="0.7"
            />
          </svg>
        </div>
      )}
    </figure>
  )
}