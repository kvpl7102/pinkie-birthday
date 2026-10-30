'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BaseMediaItem } from '../../data/2026/montage'
import { getImagePath } from '@/app/utils/paths'

interface VideoCardProps {
  item: BaseMediaItem
  index: number
  onOpenLightbox: () => void
}

export default function VideoCard({ item, onOpenLightbox }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  // Efficient video playback: pause when scrolled out of view, avoid heavy autoplay during scrolling
  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const scrollParent = container.closest('.album-scroll-container') || null

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !video.paused) {
            video.pause()
            setIsPlaying(false)
          }
        })
      },
      {
        root: scrollParent,
        threshold: 0,
      }
    )

    observer.observe(container)

    // Stop background playback when lightbox opens
    const handleLightboxState = (e: Event) => {
      const customEvent = e as CustomEvent<{ open: boolean }>
      if (customEvent.detail?.open) {
        video.pause()
        setIsPlaying(false)
      }
    }

    // Stop playback if another video begins playing audio
    const handleMediaPlay = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>
      if (customEvent.detail?.id !== item.id) {
        video.pause()
        setIsPlaying(false)
      }
    }

    window.addEventListener('montage-lightbox-state', handleLightboxState)
    window.addEventListener('montage-media-play', handleMediaPlay)

    return () => {
      observer.disconnect()
      window.removeEventListener('montage-lightbox-state', handleLightboxState)
      window.removeEventListener('montage-media-play', handleMediaPlay)
    }
  }, [item.id])

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    const nextMuted = !videoRef.current.muted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
    if (!nextMuted) {
      window.dispatchEvent(
        new CustomEvent('montage-media-play', { detail: { id: item.id } })
      )
    }
  }

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          if (!isMuted) {
            window.dispatchEvent(
              new CustomEvent('montage-media-play', { detail: { id: item.id } })
            )
          }
        })
        .catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true
            setIsMuted(true)
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
          }
        })
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleClickCard = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
    onOpenLightbox()
  }

  const isTall = item.aspectRatio === 'tall'
  const cardAspectRatio = isTall ? '4/5' : '16/9'
  const minHeight = isTall ? '320px' : '250px'

  return (
    <motion.div
      ref={containerRef}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#1A1216',
        border: '1px solid rgba(231, 111, 142, 0.25)',
        boxShadow: '0 14px 34px -8px rgba(120, 50, 75, 0.16)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={handleClickCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Element */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: cardAspectRatio,
          minHeight,
          background: '#0B0709',
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          src={getImagePath(item.src)}
          poster={getImagePath(item.thumb || item.poster)}
          playsInline
          muted={isMuted}
          loop
          preload="none"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '999px',
              background: 'rgba(231, 111, 142, 0.9)',
              color: '#FFFFFF',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 12px rgba(231, 111, 142, 0.4)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#FFFFFF',
                animation: isPlaying ? 'pulse 1.5s infinite' : 'none',
              }}
            />
            Thước phim
          </span>
        </div>

        {/* Controls Overlay (Always accessible) */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 4,
          }}
        >
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            style={{
              background: isMuted ? 'rgba(0, 0, 0, 0.65)' : 'rgba(231, 111, 142, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#FFFFFF',
              borderRadius: '999px',
              padding: '6px 12px',
              fontSize: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s ease',
            }}
          >
            {isMuted ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
                <span>Âm thanh: Tắt</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
                <span>Đang phát tiếng</span>
              </>
            )}
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Tạm dừng' : 'Phát tiếp'}
            style={{
              background: 'rgba(0, 0, 0, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
          >
            {isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
        </div>

        {/* Play Icon Center (When paused) */}
        {!isPlaying && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.3)',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'rgba(231, 111, 142, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                boxShadow: '0 8px 24px rgba(231, 111, 142, 0.5)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 3 20 12 6 21 6 3"></polygon>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Card Info Banner */}
      <div
        style={{
          padding: '14px 18px',
          background: '#FFFFFF',
          borderTop: '1px solid rgba(231, 111, 142, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.15rem',
              fontWeight: 600,
              color: '#2C1820',
              margin: 0,
            }}
          >
            {item.title}
          </h4>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#E76F8E',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Xem toàn màn hình →
          </span>
        </div>
      </div>
    </motion.div>
  )
}
