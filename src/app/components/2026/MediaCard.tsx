'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BaseMediaItem } from '../../data/2026/montage'
import { getImagePath } from '@/app/utils/paths'

interface MediaCardProps {
  item: BaseMediaItem
  index: number
  onOpenLightbox: () => void
}

export default function MediaCard({ item, onOpenLightbox }: MediaCardProps) {
  const [inView, setInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const isLandscape = item.aspectRatio === 'landscape'
  const isTall = item.aspectRatio === 'tall'

  // Scroll-triggered lazy loading: only load media when scrolled into view
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scrollParent = el.closest('.album-scroll-container') || null

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setInView(true)
              observer.disconnect()
            }
          })
        },
        {
          root: scrollParent,
          rootMargin: '350px 0px 350px 0px',
          threshold: 0.01,
        }
      )
      observer.observe(el)
      return () => observer.disconnect()
    } else {
      setInView(true)
    }
  }, [])

  useEffect(() => {
    if (inView && imgRef.current && imgRef.current.complete) {
      setIsLoaded(true)
    }
  }, [inView])

  return (
    <motion.div
      ref={containerRef}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#FAF1F3',
        border: '1px solid rgba(231, 111, 142, 0.18)',
        boxShadow: '0 12px 30px -8px rgba(120, 50, 75, 0.1)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      onClick={onOpenLightbox}
    >
      {/* Media container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: isLandscape ? '16/10' : isTall ? '3/4' : '4/5',
          background: 'linear-gradient(135deg, #F9EEF1 0%, #F5E5EA 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Soft static placeholder until image is in view and decoded */}
        {!isLoaded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#F7EFF1',
            }}
          />
        )}

        {inView ? (
          <img
            ref={imgRef}
            src={getImagePath(item.thumb || item.src)}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'opacity 0.25s ease, transform 0.3s ease',
              opacity: isLoaded ? 1 : 0,
              transform: 'translateZ(0)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03) translateZ(0)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateZ(0)'
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#F8EFF1' }} />
        )}

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C24D6F',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  )
}

